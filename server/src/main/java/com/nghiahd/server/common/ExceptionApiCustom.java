package com.nghiahd.server.common;

public class ExceptionApiCustom extends RuntimeException{
    private static final long serialVersionUID = -5384156840706102789L;
    private ApiResponseCode restError;
    private String[] params;
    public ExceptionApiCustom(ApiResponseCode restError) {
        super(restError.getMessage());
        this.restError = restError;
    }

    public ExceptionApiCustom(ApiResponseCode restError, String... params){
        super(restError.getMessage());
        this.restError = restError;
        this.params = params;
    }

    public ApiResponseCode getRestError() {
        return restError;
    }

    public void setRestError(ApiResponseCode restError) {
        this.restError = restError;
    }

    public String[] getParams() {
        return params;
    }

    public void setParams(String[] params) {
        this.params = params;
    }
}
