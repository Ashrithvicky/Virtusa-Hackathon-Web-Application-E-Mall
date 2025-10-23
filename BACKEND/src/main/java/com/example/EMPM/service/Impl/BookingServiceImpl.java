package com.example.EMPM.service.Impl;

import com.example.EMPM.dto.BookingRequest;
import com.example.EMPM.model.Booking;
import com.example.EMPM.model.Space;
import com.example.EMPM.model.User;
import com.example.EMPM.repository.BookingRepository;
import com.example.EMPM.repository.SpaceRepository;
import com.example.EMPM.repository.UserRepository;
import com.example.EMPM.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final SpaceRepository spaceRepository;
    private final UserRepository userRepository;

    @Autowired
    public BookingServiceImpl(
            BookingRepository bookingRepository,
            SpaceRepository spaceRepository,
            UserRepository userRepository
    ) {
        this.bookingRepository = bookingRepository;
        this.spaceRepository = spaceRepository;
        this.userRepository = userRepository;
    }

    // ✅ Create Booking and allocate space
    @Override
    public Booking createBooking(BookingRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Space space = spaceRepository.findById(request.getSpaceId())
                .orElseThrow(() -> new RuntimeException("Space not found"));

        if (space.isAllocated()) {
            throw new RuntimeException("Space already allocated");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setSpace(space);
        booking.setBookingDate(LocalDate.parse(request.getDate()));
        booking.setActive(true);

        // Allocate the space after booking
        space.setAllocated(true);
        spaceRepository.save(space);

        return bookingRepository.save(booking);
    }

    // ✅ Save booking directly if needed (not used often)
    @Override
    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    // ✅ Get all bookings by a user
    @Override
    public List<Booking> getBookingsByUser(User user) {
        return bookingRepository.findByUser(user);
    }

    // ✅ Cancel a booking (deletes it + deallocates space)
    @Override
    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Deallocate the space
        Space space = booking.getSpace();
        space.setAllocated(false);
        spaceRepository.save(space);

        // Delete booking
        bookingRepository.deleteById(bookingId);
    }

    // ✅ Get single booking by ID
    @Override
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }
}
