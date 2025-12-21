package com.example.Rum.dto.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Generic API response wrapper for all endpoints
 * @param <T> Type of data being returned
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponseDTO<T> {
    private String status;
    private String message;
    private T data;
    private Integer processed;
    private Integer failed;
    private String error;

    public static <T> ApiResponseDTO<T> success(String message, T data) {
        ApiResponseDTO<T> response = new ApiResponseDTO<>();
        response.setStatus("success");
        response.setMessage(message);
        response.setData(data);
        return response;
    }

    public static <T> ApiResponseDTO<T> success(String message, T data, Integer processed, Integer failed) {
        ApiResponseDTO<T> response = new ApiResponseDTO<>();
        response.setStatus("success");
        response.setMessage(message);
        response.setData(data);
        response.setProcessed(processed);
        response.setFailed(failed);
        return response;
    }

    public static <T> ApiResponseDTO<T> error(String errorMessage) {
        ApiResponseDTO<T> response = new ApiResponseDTO<>();
        response.setStatus("error");
        response.setError(errorMessage);
        return response;
    }
}

