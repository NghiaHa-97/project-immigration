package com.nghiahd.server.api.admin;

import com.nghiahd.server.common.*;
import com.nghiahd.server.config.ReadEnvironment;
import com.nghiahd.server.config.TokenProvider;
import com.nghiahd.server.constant.TypeLogin;
import com.nghiahd.server.domain.SysUserAdmin;
import com.nghiahd.server.model.RequestLogin;
import com.nghiahd.server.model.UserLogin;
import com.nghiahd.server.service.AuthService;
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
@RequestMapping(value = "api/admin/auth")
public class AuthAdminController {

    Logger log = LoggerFactory.getLogger(AuthAdminController.class);

    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;
    private final ReadEnvironment readEnvironment;
    private final MessageUtils messageUtils;

    public AuthAdminController(AuthService authService,
                               PasswordEncoder passwordEncoder,
                               AuthenticationManagerBuilder authenticationManagerBuilder,
                               TokenProvider tokenProvider,
                               ReadEnvironment readEnvironment,
                               MessageUtils messageUtils) {
        this.authService = authService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.tokenProvider = tokenProvider;
        this.readEnvironment = readEnvironment;
        this.messageUtils = messageUtils;
    }

    @PostMapping(value = "/login")
    public ResponseEntity<BodyResponseDTO<Authentication>> login(@RequestBody RequestLogin requestLogin,
                                                                 HttpServletRequest request,
                                                                 HttpServletResponse response) {
        String uri = request.getRequestURI();
        log.info(uri + " login user admin");
        requestLogin.setUsername(Strings.trimToNull(requestLogin.getUsername()));
        requestLogin.setPassword(Strings.trimToNull(requestLogin.getPassword()));
        if (requestLogin.getUsername() == null || requestLogin.getPassword() == null) {
            log.error(uri + " username or password is empty");
            return RestResponseWrapper.getResponse(ApiResponseCode.USERNAME_OR_PASSWORD_EMPTY.getStatus(),
                    ApiResponseCode.USERNAME_OR_PASSWORD_EMPTY,
                    this.messageUtils);
        }
        String username = Base64Common.decodeBaseToString(requestLogin.getUsername());
        String pwd = Base64Common.decodeBaseToString(requestLogin.getPassword());

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(TypeLogin.convertUserName(TypeLogin.ADMIN, username), pwd);
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

            ((UsernamePasswordAuthenticationToken) authentication).setDetails(jwt);
            // set username đúng để response
            ((UserLogin) authentication.getPrincipal()).setUsername(username);

            return RestResponseWrapper.getResponse(ApiResponseCode.LOGIN_SUCCESS.getStatus(),
                    ApiResponseCode.LOGIN_SUCCESS,
                    this.messageUtils,
                    authentication);
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
            return RestResponseWrapper.getResponse(ApiResponseCode.LOGIN_FAIL.getStatus(),
                    ApiResponseCode.LOGIN_FAIL,
                    this.messageUtils);
        }
    }

    @PostMapping(value = "/register")
    public ResponseEntity<BodyResponseDTO<SysUserAdmin>> register(@RequestBody SysUserAdmin userAdmin,
                                                                  HttpServletRequest request) {
        String uri = request.getRequestURI();
        log.info(uri + " register user admin");
        userAdmin.setUsername(Strings.trimToNull(userAdmin.getUsername()));
        userAdmin.setPassword(Strings.trimToNull(userAdmin.getPassword()));
        if (userAdmin.getUsername() == null || userAdmin.getPassword() == null) {
            log.error(uri + " username or password is empty");
            return RestResponseWrapper.getResponse(ApiResponseCode.USERNAME_OR_PASSWORD_EMPTY.getStatus(),
                    ApiResponseCode.USERNAME_OR_PASSWORD_EMPTY,
                    this.messageUtils);
        }

        String username = Base64Common.decodeBaseToString(userAdmin.getUsername());
        String pwd = Base64Common.decodeBaseToString(userAdmin.getPassword());

        if (this.authService.checkUsernameAdminIsExist(username)) {
            log.error(uri + " username is exist");
            return RestResponseWrapper.getResponse(ApiResponseCode.USERNAME_EXIST.getStatus(),
                    ApiResponseCode.USERNAME_EXIST,
                    this.messageUtils);
        }
        userAdmin.setUsername(username);
        userAdmin.setPassword(this.passwordEncoder.encode(pwd));
        userAdmin.setCreateDate(LocalDateTime.now());
        userAdmin.setUpdateDate(LocalDateTime.now());
        SysUserAdmin result = this.authService.saveAdmin(userAdmin);
//        return ResponseEntity.ok().body(result);
        return RestResponseWrapper.getResponse(ApiResponseCode.REGISTER_SUCCESS.getStatus(),
                ApiResponseCode.REGISTER_SUCCESS,
                this.messageUtils,
                result);
    }

    @GetMapping(value = "/logout")
    public ResponseEntity<BodyResponseDTO<Object>> logout(HttpServletRequest request, HttpServletResponse response) {
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

        return RestResponseWrapper.getResponse(ApiResponseCode.LOGOUT_SUCCESS.getStatus(),
                ApiResponseCode.LOGOUT_SUCCESS,
                this.messageUtils);
    }

    @GetMapping(value = "/get-user-refresh-app")
    public ResponseEntity<BodyResponseDTO<Authentication>> getUserRefreshApp() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return RestResponseWrapper.getResponse(ApiResponseCode.SUCCESS.getStatus(),
                ApiResponseCode.SUCCESS,
                this.messageUtils,
                authentication);
    }
}
