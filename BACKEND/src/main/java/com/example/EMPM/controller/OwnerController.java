package com.example.EMPM.controller;

import com.example.EMPM.model.Space;
import com.example.EMPM.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/owner")
@CrossOrigin(origins = "*")
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    @GetMapping("/spaces")
    public List<Space> getAllSpaces() {
        return ownerService.getAllSpaces();
    }

    @PostMapping("/spaces")
    public Space addSpace(@RequestBody Space space) {
        return ownerService.addSpace(space);
    }

    @DeleteMapping("/spaces/{id}")
    public void deleteSpace(@PathVariable Long id) {
        ownerService.deleteSpace(id);
    }

    // ✅ Updated to use Map for request body
    @PostMapping("/allocate")
    public Space allocateSpace(@RequestBody Map<String, Long> payload) {
        Long spaceId = payload.get("spaceId");
        return ownerService.allocateSpace(spaceId);
    }

    // ✅ Updated to use Map for request body
    @PostMapping("/deallocate")
    public Space deallocateSpace(@RequestBody Map<String, Long> payload) {
        Long spaceId = payload.get("spaceId");
        return ownerService.deallocateSpace(spaceId);
    }
}
