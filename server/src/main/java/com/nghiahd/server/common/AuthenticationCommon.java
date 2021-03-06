package com.nghiahd.server.common;

import com.nghiahd.server.model.UserLogin;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthenticationCommon {
    public static UserLogin getUserLoginContext(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ((UserLogin) authentication.getPrincipal());
    }
    public static boolean checkNotNullWorkUnitIDAndEmployeeID() {
        UserLogin userLogin = AuthenticationCommon.getUserLoginContext();
        return userLogin != null && userLogin.getWorkUnitID() != null && userLogin.getEmployeeID() != null;
    }
}
