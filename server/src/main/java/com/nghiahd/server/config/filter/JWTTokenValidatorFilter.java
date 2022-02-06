package com.nghiahd.server.config.filter;

import com.nghiahd.server.config.ReadEnvironment;
import com.nghiahd.server.config.TokenProvider;
import com.nghiahd.server.constant.TypeLogin;
import com.nghiahd.server.model.UserLogin;
import com.nghiahd.server.service.AuthService;
import com.nghiahd.server.service.SysUserAdminService;
import com.nghiahd.server.service.SysUserCustomerService;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Base64;
import java.util.Collections;

@Component
public class JWTTokenValidatorFilter extends OncePerRequestFilter {

    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    private AuthService authService;
//    @Autowired
//    private SysUserAdminService sysUserAdminService;
//    @Autowired
//    private SysUserCustomerService sysUserCustomerService;
    @Autowired
    private ReadEnvironment readEnvironment;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // if load images
        String jwt = null;
        if (request.getServletPath().startsWith("/" + readEnvironment.getFolderImages())) {
            Cookie[] cookies = request.getCookies();
            if(cookies != null){
                for ( Cookie c: cookies) {
                    if(c.getName().equals(this.readEnvironment.getHeader())){
                        byte[] decodedBytes = Base64.getDecoder().decode(c.getValue());
                        jwt = this.tokenProvider.parseJwt(new String(decodedBytes));
                        break;
                    }
                }
            }

        }else{
            jwt = this.tokenProvider.parseJwt(request.getHeader(this.readEnvironment.getHeader()));
        }
        if (Strings.isNotEmpty(jwt)) {
            String username = this.tokenProvider.validateAndGetUserName(jwt);
            UserLogin user = null;
            if(TypeLogin.compareAdmin(username)){
                user = this.authService.getUserAdminByUsername(TypeLogin.getUsername(username));
            }else{
                user = this.authService.getUserCustomerByUsername(TypeLogin.getUsername(username));
            }
            SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(user,
                    null,
                    Collections.singletonList(new SimpleGrantedAuthority(user.getRoleName() == null ? "ROLE_0" : user.getRoleName())))
            );
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getServletPath().equals("/api/admin/auth/login")
                || request.getServletPath().equals("/api/admin/auth/register")
                || request.getServletPath().equals("/api/public/auth/login");
    }
}
