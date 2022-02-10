package com.nghiahd.server.common.mapper;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.nghiahd.server.constant.PatternFormatDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class LocalDateTimeDeserializer extends JsonDeserializer<LocalDateTime> {
    Logger log = LoggerFactory.getLogger(LocalDateTimeDeserializer.class);
    @Override
    public LocalDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(PatternFormatDate.DATETIME_REQUEST);
        try {
            return LocalDateTime.parse(jsonParser.readValueAs(String.class), formatter);
        }catch (Exception e){
            log.warn(e.getMessage());
            return null;
        }
    }
}
