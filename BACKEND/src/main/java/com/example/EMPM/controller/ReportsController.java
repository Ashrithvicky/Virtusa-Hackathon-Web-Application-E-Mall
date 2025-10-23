package com.example.EMPM.controller;

import com.example.EMPM.model.Space;
import com.example.EMPM.service.ReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ReportsController {

    @Autowired
    private ReportsService reportsService;

    // ================================
    // 🧑 Owner Endpoints
    // ================================

    @GetMapping("/owner/reports/occupied")
    public List<Space> getOccupiedSpacesForOwner() {
        return reportsService.getOccupiedSpaces();
    }

    @GetMapping("/owner/reports/available")
    public List<Space> getAvailableSpacesForOwner() {
        return reportsService.getAvailableSpaces();
    }

    @GetMapping("/owner/reports/summary")
    public Map<String, Integer> getSummaryForOwner() {
        return reportsService.getSpaceSummary();
    }

    // ================================
    // 🙋 User Endpoints
    // ================================

    @GetMapping("/user/reports/available")
    public List<Space> getAvailableSpacesForUser() {
        return reportsService.getAvailableSpaces(); // Only available spaces shown to user
    }

    @GetMapping("/user/reports/summary")
    public Map<String, Integer> getSummaryForUser() {
        // Only available count exposed to user, not occupied
        int available = reportsService.getAvailableSpaces().size();

        Map<String, Integer> result = new HashMap<>();
        result.put("available", available);
        return result;
    }
}
