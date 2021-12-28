package com.nghiahd.server.common;

import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;
@Component
@RequiredArgsConstructor
public class MessageUtils {
    private final MessageSource messageSource;
    public String populate(String key) {
        return populate(key, null);
    }

    public String populate(String key, String[] params) {
        return messageSource.getMessage(key, params, LocaleContextHolder.getLocale());
    }
}