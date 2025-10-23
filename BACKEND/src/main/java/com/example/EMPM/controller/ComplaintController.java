package com.example.EMPM.controller;

import com.example.EMPM.model.Complaint;
import com.example.EMPM.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ComplaintController {

    private final ComplaintService complaintService;

    @Autowired
    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    // -----------------------------------------
    // 🚹 USER COMPLAINT ENDPOINTS
    // -----------------------------------------

    // ✅ Submit complaint from user
    @PostMapping("/user/complaints")
    public ResponseEntity<Complaint> submitUserComplaint(@RequestBody Complaint complaint) {
        Complaint savedComplaint = complaintService.saveComplaint(complaint);
        return ResponseEntity.ok(savedComplaint);
    }

    // ✅ Get complaints by user (username/email)
    @GetMapping("/user/complaints/{username}")
    public ResponseEntity<List<Complaint>> getUserComplaints(@PathVariable String username) {
        List<Complaint> complaints = complaintService.getComplaintsByUser(username);
        return ResponseEntity.ok(complaints);
    }

    // -----------------------------------------
    // 🧑‍💼 OWNER COMPLAINT ENDPOINTS
    // -----------------------------------------

    // ✅ Non-paginated: Get all pending complaints
    @GetMapping("/owner/complaints/pending")
    public ResponseEntity<List<Complaint>> getAllPendingComplaints() {
        return ResponseEntity.ok(complaintService.getPendingComplaints());
    }

    // ✅ Non-paginated: Get all resolved complaints
    @GetMapping("/owner/complaints/resolved")
    public ResponseEntity<List<Complaint>> getAllResolvedComplaints() {
        return ResponseEntity.ok(complaintService.getResolvedComplaints());
    }

    // ✅ Paginated: Get pending complaints (page & size)
    @GetMapping("/owner/complaints/pending-paged")
    public ResponseEntity<Page<Complaint>> getPendingComplaintsPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(complaintService.getPendingComplaints(PageRequest.of(page, size)));
    }

    // ✅ Paginated: Get resolved complaints (page & size)
    @GetMapping("/owner/complaints/resolved-paged")
    public ResponseEntity<Page<Complaint>> getResolvedComplaintsPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(complaintService.getResolvedComplaints(PageRequest.of(page, size)));
    }

    // ✅ Resolve a complaint
    @PostMapping("/owner/complaints/resolve/{id}")
    public ResponseEntity<String> resolveComplaint(@PathVariable("id") Long id) {
        complaintService.markAsResolved(id);
        return ResponseEntity.ok("✅ Complaint marked as resolved.");
    }
}
