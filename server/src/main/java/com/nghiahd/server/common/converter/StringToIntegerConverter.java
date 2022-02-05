package com.nghiahd.server.common.converter;

import org.apache.logging.log4j.util.Strings;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringToIntegerConverter implements Converter<String, Integer> {

    @Override
    public Integer convert(String source) {
        if (Strings.isEmpty(source)) {
            return null;
        }
        if (source.equals("null")) {
            return null;
        }
        try {
            return Integer.parseInt(source);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}