package com.nghiahd.server.api.admin;

import com.nghiahd.server.config.ReadEnvironment;
import com.nghiahd.server.config.TokenProvider;
import com.nghiahd.server.domain.SysUserAdmin;
import com.nghiahd.server.model.RequestLogin;
import com.nghiahd.server.model.ResponseLogin;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity login(@RequestBody RequestLogin requestLogin, HttpServletRequest request, HttpServletResponse response){
        String uri = request.getRequestURI();
        log.info(uri + " login user admin");
        requestLogin.setUsername(Strings.trimToNull(requestLogin.getUsername()));
        requestLogin.setPassword(Strings.trimToNull(requestLogin.getPassword()));
        if (requestLogin.getUsername() == null || requestLogin.getPassword() == null) {
            log.error(uri + " username or password is empty");
            return ResponseEntity.badRequest().body("username or password is empty");
        }
        byte[] base64TokenUsername = requestLogin.getUsername().getBytes(StandardCharsets.UTF_8);
        byte[] base64TokenPwd = requestLogin.getPassword().getBytes(StandardCharsets.UTF_8);
        byte[] decodeUsername = Base64.getDecoder().decode(base64TokenUsername);
        byte[] decodePwd = Base64.getDecoder().decode(base64TokenPwd);
        String username = new String(decodeUsername, StandardCharsets.UTF_8);
        String pwd = new String(decodePwd, StandardCharsets.UTF_8);
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, pwd);
        try {
            Authentication authentication = this.authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            // create jwt
            String jwt = this.tokenProvider.createToken(authentication, false);
            response.setHeader(this.readEnvironment.getHeader(), jwt);

            // create cookie
            String encodedJwt = Base64.getUrlEncoder().encodeToString(jwt.getBytes(StandardCharsets.UTF_8));
            Cookie cookie = new Cookie(this.readEnvironment.getHeader(), encodedJwt);
            cookie.setMaxAge((int)this.readEnvironment.getTokenValidityInSeconds());
            cookie.setPath("/"+this.readEnvironment.getFolderImages());
            response.addCookie(cookie);

            return ResponseEntity.ok().body(new ResponseLogin(username, response.getHeader(this.readEnvironment.getHeader())));
        }catch (AuthenticationException e){
            SecurityContextHolder.clearContext();
            return ResponseEntity.badRequest().body(e.getMessage());
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
            return ResponseEntity.badRequest().body("username or password is empty");
        }

        byte[] base64TokenUsername = userAdmin.getUsername().getBytes(StandardCharsets.UTF_8);
        byte[] base64TokenPwd = userAdmin.getPassword().getBytes(StandardCharsets.UTF_8);
        byte[] decodeUsername = Base64.getDecoder().decode(base64TokenUsername);
        byte[] decodePwd = Base64.getDecoder().decode(base64TokenPwd);
        String username = new String(decodeUsername, StandardCharsets.UTF_8);
        String pwd = new String(decodePwd, StandardCharsets.UTF_8);
        if (sysUserAdminService.checkUsernameIsExist(username)) {
            log.error(uri + " username is exist");
            return ResponseEntity.badRequest().body("username " + username + " is exist");
        }
        userAdmin.setUsername(username);
        userAdmin.setPassword(this.passwordEncoder.encode(pwd));
        userAdmin.setCreateDate(LocalDateTime.now());
        userAdmin.setUpdateDate(LocalDateTime.now());
        SysUserAdmin result = this.sysUserAdminService.save(userAdmin);
        return ResponseEntity.ok().body(result);
    }

}
