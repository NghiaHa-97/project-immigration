package com.nghiahd.server.model;

public class ResponseLogin {
    private String username;
    private String jwt;

    public ResponseLogin() {
    }

    public ResponseLogin(String username, String jwt) {
        this.username = username;
        this.jwt = jwt;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
}
