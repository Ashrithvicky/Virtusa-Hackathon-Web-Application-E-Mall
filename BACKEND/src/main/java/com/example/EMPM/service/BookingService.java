package com.example.EMPM.service;


import com.example.EMPM.dto.BookingRequest;
import com.example.EMPM.model.Booking;
import com.example.EMPM.model.User;

import java.util.List;
import java.util.Optional;

public interface BookingService {
    Booking saveBooking(Booking booking);
    List<Booking> getBookingsByUser(User user);
    void cancelBooking(Long bookingId);
    Optional<Booking> getBookingById(Long id);
    Booking createBooking(BookingRequest request);
}
