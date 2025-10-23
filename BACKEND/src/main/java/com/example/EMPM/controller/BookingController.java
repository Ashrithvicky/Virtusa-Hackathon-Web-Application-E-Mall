package com.example.EMPM.controller;

import com.example.EMPM.dto.BookingRequest;
import com.example.EMPM.model.Booking;
import com.example.EMPM.model.User;
import com.example.EMPM.service.BookingService;
import com.example.EMPM.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    private final BookingService bookingService;
    private final UserService userService;

    @Autowired
    public BookingController(BookingService bookingService, UserService userService) {
        this.bookingService = bookingService;
        this.userService = userService;
    }

    // ✅ 1. Book a space
    @PostMapping("/book")
    public ResponseEntity<?> bookSpace(@RequestBody BookingRequest request) {
        try {
            Booking booking = bookingService.createBooking(request);
            return ResponseEntity.ok(booking); // or return only a message
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Booking failed: " + e.getMessage());
        }
    }

    // ✅ 2. Get all bookings by user
    @GetMapping("/bookings/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable Long userId) {
        Optional<User> userOpt = userService.getUserById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<Booking> bookings = bookingService.getBookingsByUser(userOpt.get());
        return ResponseEntity.ok(bookings);
    }

    // ✅ 3. Cancel a booking
    @DeleteMapping("/bookings/{bookingId}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long bookingId) {
        try {
            bookingService.cancelBooking(bookingId);
            return ResponseEntity.ok("✅ Booking cancelled successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Failed to cancel booking: " + e.getMessage());
        }
    }

    // ✅ 4. Get booking by ID
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long bookingId) {
        return bookingService.getBookingById(bookingId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
