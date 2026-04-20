package com.AgriZed.exception;

public class ApiException extends RuntimeException {
    private int statusCode;
    private String timestamp;

    public ApiException(int statusCode, String message) {
        super(message);
        this.statusCode = statusCode;
        this.timestamp = java.time.LocalDateTime.now().toString();
    }

    public int getStatusCode() { return statusCode; }
    public String getTimestamp() { return timestamp; }
}