package com.example.EMPM.service.Impl;

import com.example.EMPM.model.Complaint;
import com.example.EMPM.repository.ComplaintRepository;
import com.example.EMPM.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;



@Service
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;

    @Autowired
    public ComplaintServiceImpl(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    @Override
    public Page<Complaint> getPendingComplaints(Pageable pageable) {
        return complaintRepository.findByResolved(false, pageable);
    }

    @Override
    public Page<Complaint> getResolvedComplaints(Pageable pageable) {
        return complaintRepository.findByResolved(true, pageable);
    }

    @Override
    public void markAsResolved(Long complaintId) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found with ID: " + complaintId));
        complaint.setResolved(true);
        complaintRepository.save(complaint);
    }

    @Override
    public Complaint saveComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    @Override
    public List<Complaint> getComplaintsByUser(String user) {
        return complaintRepository.findByUser(user);
    }

    

    @Override
    public List<Complaint> getPendingComplaints() {
        return complaintRepository.findByResolved(false);
    }

    @Override
    public List<Complaint> getResolvedComplaints() {
        return complaintRepository.findByResolved(true);
    }


}


