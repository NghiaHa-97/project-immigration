package com.nghiahd.server.api.admin;

import com.nghiahd.server.common.Base64Common;
import com.nghiahd.server.common.CookieCommon;
import com.nghiahd.server.config.ReadEnvironment;
import com.nghiahd.server.config.TokenProvider;
import com.nghiahd.server.domain.SysUserAdmin;
import com.nghiahd.server.model.RequestLogin;
import com.nghiahd.server.model.ResponseLogin;
import com.nghiahd.server.model.ResponseMessage;
import com.nghiahd.server.model.UserLogin;
import com.nghiahd.server.service.SysUserAdminService;
import org.apache.logging.log4j.util.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Base64;

@RestController
@RequestMapping(value = "/admin/user")
public class UserController {

    Logger log = LoggerFactory.getLogger(UserController.class);

    private final SysUserAdminService sysUserAdminService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;
    private final ReadEnvironment readEnvironment;

    public UserController(SysUserAdminService sysUserAdminService,
                          PasswordEncoder passwordEncoder,
                          AuthenticationManagerBuilder authenticationManagerBuilder,
                          TokenProvider tokenProvider,
                          ReadEnvironment readEnvironment) {
        this.sysUserAdminService = sysUserAdminService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.tokenProvider = tokenProvider;
        this.readEnvironment = readEnvironment;
    }

    @PostMapping(value = "/login")
    public ResponseEntity login(@RequestBody RequestLogin requestLogin, HttpServletRequest request, HttpServletResponse response) {
        String uri = request.getRequestURI();
        log.info(uri + " login user admin");
        requestLogin.setUsername(Strings.trimToNull(requestLogin.getUsername()));
        requestLogin.setPassword(Strings.trimToNull(requestLogin.getPassword()));
        if (requestLogin.getUsername() == null || requestLogin.getPassword() == null) {
            log.error(uri + " username or password is empty");
            return ResponseEntity.badRequest().body(new ResponseMessage("username or password is empty", false));
        }
        String username = Base64Common.decodeBaseToString(requestLogin.getUsername());
        String pwd = Base64Common.decodeBaseToString(requestLogin.getPassword());

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, pwd);
        try {
            Authentication authentication = this.authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            // create jwt
            String jwt = this.tokenProvider.createToken(authentication, false);
            response.setHeader(this.readEnvironment.getHeader(), jwt);

            // create cookie
            String encodeJwt = Base64.getUrlEncoder().encodeToString(jwt.getBytes(StandardCharsets.UTF_8));
            Cookie cookie = CookieCommon.createCookie(this.readEnvironment.getHeader(),
                    encodeJwt,
                    (int) this.readEnvironment.getTokenValidityInSeconds(),
                    "/" + this.readEnvironment.getFolderImages());
            response.addCookie(cookie);
//            return ResponseEntity.ok().body(new ResponseLogin(username, response.getHeader(this.readEnvironment.getHeader())));
            ((UsernamePasswordAuthenticationToken) authentication).setDetails(jwt);
            return ResponseEntity.ok().body(authentication);
        } catch (AuthenticationException e) {
            SecurityContextHolder.clearContext();
            // delete cookie
            Cookie cookie = CookieCommon.createCookie(this.readEnvironment.getHeader(),
                    null,
                    0,
                    "/" + this.readEnvironment.getFolderImages());
            response.addCookie(cookie);
            // remove header
            if (response.getHeader(this.readEnvironment.getHeader()) != null) {
                response.setHeader(this.readEnvironment.getHeader(), null);
            }
            return ResponseEntity.badRequest().body(new ResponseMessage(e.getMessage(), false));
        }
    }

    @PostMapping(value = "/register")
    public ResponseEntity register(@RequestBody SysUserAdmin userAdmin, HttpServletRequest request) {
        String uri = request.getRequestURI();
        log.info(uri + " register user admin");
        userAdmin.setUsername(Strings.trimToNull(userAdmin.getUsername()));
        userAdmin.setPassword(Strings.trimToNull(userAdmin.getPassword()));
        if (userAdmin.getUsername() == null || userAdmin.getPassword() == null) {
            log.error(uri + " username or password is empty");
            return ResponseEntity.badRequest().body(new ResponseMessage("username or password is empty", false));
        }

        String username = Base64Common.decodeBaseToString(userAdmin.getUsername());
        String pwd = Base64Common.decodeBaseToString(userAdmin.getPassword());

        if (sysUserAdminService.checkUsernameIsExist(username)) {
            log.error(uri + " username is exist");
            return ResponseEntity.badRequest().body(new ResponseMessage("username " + username + " is exist", false));
        }
        userAdmin.setUsername(username);
        userAdmin.setPassword(this.passwordEncoder.encode(pwd));
        userAdmin.setCreateDate(LocalDateTime.now());
        userAdmin.setUpdateDate(LocalDateTime.now());
        SysUserAdmin result = this.sysUserAdminService.save(userAdmin);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping(value = "/logout")
    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {
        String uri = request.getRequestURI();
        log.info(uri + " logout user admin");
        // clear context
        SecurityContextHolder.clearContext();
        // delete cookie
        Cookie cookie = CookieCommon.createCookie(this.readEnvironment.getHeader(),
                null,
                0,
                "/" + this.readEnvironment.getFolderImages());
        response.addCookie(cookie);
        // remove header
        if (response.getHeader(this.readEnvironment.getHeader()) != null) {
            response.setHeader(this.readEnvironment.getHeader(), null);
        }

        return ResponseEntity.ok().body(new ResponseMessage("Logout success", true));
    }

    @GetMapping(value = "/get-user-refresh-app")
    public ResponseEntity getUserRefreshApp(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        return ResponseEntity.ok().body(authentication);
    }


}
