package com.nghiahd.server.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.SignatureException;
import org.apache.logging.log4j.util.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import io.jsonwebtoken.security.Keys;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;

@Component
public class TokenProvider implements InitializingBean {
    private static final String USERNAME = "username";
    private static final String AUTHORITIES_KEY = "authorities";
    Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    @Autowired
    private ReadEnvironment readEnvironment;

    private SecretKey key;

    public TokenProvider() {
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        byte[] keyBytes = Decoders.BASE64.decode(readEnvironment.getBase64Secret());
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String createToken(Authentication authentication, boolean rememberMe) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date validity;
//        if (rememberMe) {
//            validity = new Date(now + this.tokenValidityInMillisecondsForRememberMe);
//        } else {
//            validity = new Date(now + this.tokenValidityInMilliseconds);
//        }
        validity = new Date(now + readEnvironment.getTokenValidityInSeconds());

        return "Bearer " + Jwts.builder()
                .setIssuer("Product")
                .setSubject(authentication.getName())
//                .claim(USERNAME, authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .setIssuedAt(new Date())
                .signWith(this.key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();
    }

    public Authentication validateAndGetAuthentication(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(this.key)
                    .parseClaimsJws(token)
                    .getBody();

            Collection<? extends GrantedAuthority> authorities = null;

            if(Strings.isNotEmpty(claims.get(AUTHORITIES_KEY).toString())){
                authorities = Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                                .map(SimpleGrantedAuthority::new)
                                .collect(Collectors.toList());
            }

            User principal = new User(claims.getSubject(), "", authorities);
            return new UsernamePasswordAuthenticationToken(principal, token, authorities);

        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
            throw new BadCredentialsException(e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
            throw new BadCredentialsException(e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
            throw new BadCredentialsException(e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
            throw new BadCredentialsException(e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
            throw new BadCredentialsException(e.getMessage());
        }
    }

    public String parseJwt(String headerAuth) {
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }
        return null;
    }

}
