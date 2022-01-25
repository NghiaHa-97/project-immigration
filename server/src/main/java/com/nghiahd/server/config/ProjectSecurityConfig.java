package com.nghiahd.server.config;

import com.nghiahd.server.config.filter.JWTTokenValidatorFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class ProjectSecurityConfig extends WebSecurityConfigurerAdapter {

    private final JWTTokenValidatorFilter jwtTokenValidatorFilter;

    public ProjectSecurityConfig(JWTTokenValidatorFilter jwtTokenValidatorFilter) {
        this.jwtTokenValidatorFilter = jwtTokenValidatorFilter;
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // disable send and create Session
        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .cors().configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(Arrays.asList("http://localhost:4200", "http://localhost:4201"));
                    config.setAllowedMethods(Collections.singletonList("*"));
                    config.setAllowCredentials(true);
                    config.setAllowedHeaders(Collections.singletonList("*"));
                    config.setExposedHeaders(Collections.singletonList("Authorization"));
                    config.setMaxAge(3600L);
                    return config;
                })
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/*/user/login").permitAll()
                .antMatchers("/api/admin/user/register").permitAll()
                .anyRequest().authenticated();
        http.addFilterBefore(this.jwtTokenValidatorFilter, UsernamePasswordAuthenticationFilter.class);

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
