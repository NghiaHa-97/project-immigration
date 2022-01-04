package com.nghiahd.server.common.mapper;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ObjectMapperUtils {
    public static <T> T convertJsonToObject(String json, Class<T> valueType) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        T object = null;
        try {
            object = mapper.readValue(json, valueType);
        } catch (Exception ex){
            ex.printStackTrace();
        }
        return object;

    }
}
