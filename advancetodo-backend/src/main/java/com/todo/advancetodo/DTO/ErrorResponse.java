package com.todo.advancetodo.DTO;

public record ErrorResponse(
    int statusCode,
    String message,
    long timestamp
) {}
