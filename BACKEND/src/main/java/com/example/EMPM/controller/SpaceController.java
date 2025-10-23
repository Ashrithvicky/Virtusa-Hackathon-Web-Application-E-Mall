package com.example.EMPM.controller;

import com.example.EMPM.model.Space;
import com.example.EMPM.service.SpaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class SpaceController {

    private final SpaceService spaceService;

    @Autowired
    public SpaceController(SpaceService spaceService) {
        this.spaceService = spaceService;
    }

    // ✅ 1. Fetch all available (non-allocated) spaces
    @GetMapping("/available-spaces")
    public List<Space> getAvailableSpaces() {
        return spaceService.getAvailableSpaces();
    }

    // ✅ 2. Fetch space details by ID
    @GetMapping("/space/{spaceId}")
    public Space getSpaceById(@PathVariable Long spaceId) {
        return spaceService.getSpaceById(spaceId);
    }
}
