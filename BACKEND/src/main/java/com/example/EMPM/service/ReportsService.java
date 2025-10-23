package com.example.EMPM.service;

import com.example.EMPM.model.Space;

import java.util.List;
import java.util.Map;

public interface ReportsService {
    List<Space> getOccupiedSpaces();
    List<Space> getAvailableSpaces();
    Map<String, Integer> getSpaceSummary();
}
