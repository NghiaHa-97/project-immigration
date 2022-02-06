package com.nghiahd.server.constant;

public class TypeLogin {
    // ID bộ
    public static final String PUBLIC = "0";
    // ID cục
    public static final String ADMIN = "1";

    public static String convertUserName(String type, String s){
        return type + s;
    }

    public static String getUsername(String s){
        return s.substring(1);
    }

    public static boolean compareAdmin(String s){
        return ADMIN.equals(s.substring(0,1));
    }

    public static boolean comparePublic(String s){
        return PUBLIC.equals(s.substring(0,1));
    }


}
