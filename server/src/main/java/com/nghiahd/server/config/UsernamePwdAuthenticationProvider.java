package com.nghiahd.server.config;

import com.nghiahd.server.constant.TypeLogin;
import com.nghiahd.server.model.UserLogin;
import com.nghiahd.server.service.AuthService;
import com.nghiahd.server.service.SysUserAdminService;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class UsernamePwdAuthenticationProvider implements AuthenticationProvider {

    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;
//    private final SysUserAdminService sysUserAdminService;
//    private final SysUserCustomerService sysUserCustomerService;

    public UsernamePwdAuthenticationProvider(PasswordEncoder passwordEncoder,
                                             AuthService authService) {
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String pwd = authentication.getCredentials().toString();
        UserLogin user = null;
        // check login with admin
        if(TypeLogin.compareAdmin(username)){
            user = this.authService.getUserAdminByUsername(TypeLogin.getUsername(username));
        }else{
            user = this.authService.getUserCustomerByUsername(TypeLogin.getUsername(username));
        }

        if (user != null) {
            if (passwordEncoder.matches(pwd, user.getPassword())) {
                // thêm prefix vào username để sau khi đọc token check lại
                user.setUsername(username);
                return new UsernamePasswordAuthenticationToken(user,
                        null,
                        Collections.singletonList(new SimpleGrantedAuthority(user.getRoleName() == null ? "ROLE_0" : user.getRoleName())));
            } else {
                throw new BadCredentialsException("Invalid password!");
            }
        } else {
            throw new BadCredentialsException("No user registered with this details!");
        }
    }

//    private List<GrantedAuthority> getGrantedAuthorities(Set<String> authorities) {
//        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
//        for (String authority : authorities) {
//            grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_0"));
//        }
//        return grantedAuthorities;
//    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
