package com.example.EMPM.repository;



import com.example.EMPM.model.Booking;
import com.example.EMPM.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user); // Get bookings by user
}
