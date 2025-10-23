package com.example.EMPM.service.Impl;
import com.example.EMPM.model.Space;
import com.example.EMPM.repository.SpaceRepository;
import com.example.EMPM.service.ReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportsServiceImpl implements ReportsService {

    private final SpaceRepository spaceRepository;

    @Autowired
    public ReportsServiceImpl(SpaceRepository spaceRepository) {
        this.spaceRepository = spaceRepository;
    }

    @Override
    public List<Space> getOccupiedSpaces() {
        return spaceRepository.findAll().stream()
                .filter(Space::isAllocated)
                .toList();
    }

    @Override
    public List<Space> getAvailableSpaces() {
        return spaceRepository.findAll().stream()
                .filter(space -> !space.isAllocated())
                .toList();
    }

    @Override
    public Map<String, Integer> getSpaceSummary() {
        List<Space> spaces = spaceRepository.findAll();
        int available = (int) spaces.stream().filter(space -> !space.isAllocated()).count();
        int occupied = (int) spaces.stream().filter(Space::isAllocated).count();

        Map<String, Integer> result = new HashMap<>();
        result.put("available", available);
        result.put("occupied", occupied);
        return result;
    }
}
