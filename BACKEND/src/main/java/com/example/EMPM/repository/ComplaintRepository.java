package com.example.EMPM.repository;

import com.example.EMPM.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Page;


import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByResolved(boolean resolved);

    // ✅ Required for `getComplaintsByUser()`
    List<Complaint> findByUser(String user);

    Page<Complaint> findByResolved(boolean resolved, Pageable pageable);
}
