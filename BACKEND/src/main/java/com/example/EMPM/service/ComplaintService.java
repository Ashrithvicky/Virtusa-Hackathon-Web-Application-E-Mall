package com.example.EMPM.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.EMPM.model.Complaint;


public interface ComplaintService {

    List<Complaint> getPendingComplaints();

    List<Complaint> getResolvedComplaints();

    void markAsResolved(Long complaintId);

    // ✅ NEW: Save complaint (for users)
    Complaint saveComplaint(Complaint complaint);

    // ✅ NEW: Fetch complaints by username/email
    List<Complaint> getComplaintsByUser(String user);

    Page<Complaint> getPendingComplaints(Pageable pageable);
    Page<Complaint> getResolvedComplaints(Pageable pageable);

}
