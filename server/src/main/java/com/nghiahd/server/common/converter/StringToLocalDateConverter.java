package com.nghiahd.server.common.converter;

import com.nghiahd.server.constant.PatternFormatDate;
import org.apache.logging.log4j.util.Strings;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class StringToLocalDateConverter implements Converter<String, LocalDate> {

    @Override
    public LocalDate convert(String source) {
        if (Strings.isEmpty(source)) {
            return null;
        }
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(PatternFormatDate.DATE_REQUEST);
            return LocalDate.parse(source, formatter);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
