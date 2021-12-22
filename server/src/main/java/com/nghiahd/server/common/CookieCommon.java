package com.nghiahd.server.common;

import javax.servlet.http.Cookie;

public class CookieCommon {

    // validity = 0 is remove cookie
    public static Cookie createCookie(String name, String value, int validity, String path){
        Cookie cookie = new Cookie(name, value);
        cookie.setMaxAge(validity);
        cookie.setPath(path);
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        return cookie;
    }
}
