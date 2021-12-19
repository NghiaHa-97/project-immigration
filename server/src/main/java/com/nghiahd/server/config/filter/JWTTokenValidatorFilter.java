package com.nghiahd.server.config.filter;

import com.nghiahd.server.config.ReadEnvironment;
import com.nghiahd.server.config.TokenProvider;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
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

@Component
public class JWTTokenValidatorFilter extends OncePerRequestFilter {

    @Autowired
    private TokenProvider tokenProvider;

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
            Authentication auth = this.tokenProvider.validateAndGetAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getServletPath().equals("/admin/user/login")
                || request.getServletPath().equals("/admin/user/register");
    }
}
