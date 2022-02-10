package com.nghiahd.server.common.mapper;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.nghiahd.server.constant.PatternFormatDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class LocalDateDeserializer extends JsonDeserializer<LocalDate> {
    Logger log = LoggerFactory.getLogger(LocalDateDeserializer.class);
    @Override
    public LocalDate deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(PatternFormatDate.DATE_REQUEST);
        try {
            return LocalDate.parse(jsonParser.readValueAs(String.class), formatter);
        }catch (Exception e){
            log.warn(e.getMessage());
            return null;
        }
    }
}
