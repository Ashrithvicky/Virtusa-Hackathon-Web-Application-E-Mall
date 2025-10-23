package com.example.EMPM.dto;
import lombok.Data;

@Data
public class BookingRequest {
    private Long userId;
    private Long spaceId;
    private String date; // ISO format (yyyy-MM-dd)
}
