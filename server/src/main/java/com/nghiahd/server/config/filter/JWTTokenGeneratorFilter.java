//package com.nghiahd.server.config.filter;
//
//import com.nghiahd.server.config.TokenProvider;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@Component
//public class JWTTokenGeneratorFilter extends OncePerRequestFilter {
//    @Autowired
//    private TokenProvider tokenProvider;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null) {
//            String jwt = this.tokenProvider.createToken(authentication, false);
//            response.setHeader(this.tokenProvider.getHeader(), jwt);
//        }
//        filterChain.doFilter(request, response);
//    }
//}
