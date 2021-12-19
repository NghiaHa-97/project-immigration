package com.nghiahd.server.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

//@RestController
public class Test {

//    @PostMapping("/public/user/login")
    public ResponseEntity<List<String>> setCookie(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // create a cookie
        Cookie cookie = new Cookie("username", "LLLL");
//
//        //add cookie to response
        response.addCookie(cookie);

        String a = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        Cookie[] cookies = request.getCookies();
        String cookiess = request.getHeader("Cookie");
        ObjectMapper mapper = new ObjectMapper();

        try {

            // convert JSON string to Map
            Map map = mapper.readValue(a, Map.class);

            // it works
            //Map<String, String> map = mapper.readValue(json, new TypeReference<Map<String, String>>() {});

            System.out.println(map);

        } catch (IOException e) {
            e.printStackTrace();
        }
        List<String> aaaa= Arrays.asList("2llllll");
//        JSONObject.quote(s)
        return new ResponseEntity<>(aaaa, HttpStatus.OK);
    }
}
