package com.nghiahd.server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ReadEnvironment {
    @Value("${jwt.secret}")
    private String base64Secret;

    @Value("${jwt.expiration}")
    private long tokenValidityInSeconds;

    @Value("${jwt.header}")
    private String header;

    @Value("${folder.images}")
    private String folderImages;

    public String getBase64Secret() {
        return base64Secret;
    }

    public long getTokenValidityInSeconds() {
        return tokenValidityInSeconds;
    }

    public String getHeader() {
        return header;
    }

    public String getFolderImages() {
        return folderImages;
    }

    public ReadEnvironment() {
    }

    public ReadEnvironment(String base64Secret, long tokenValidityInSeconds, String header, String folderImages) {
        this.base64Secret = base64Secret;
        this.tokenValidityInSeconds = tokenValidityInSeconds;
        this.header = header;
        this.folderImages = folderImages;
    }
}
