package com.example.EMPM.service.Impl;

import com.example.EMPM.model.Space;
import com.example.EMPM.service.OwnerService;
import com.example.EMPM.repository.SpaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OwnerServiceImpl implements OwnerService {

    @Autowired
    private SpaceRepository spaceRepository;

    @Override
    public List<Space> getAllSpaces() {
        return spaceRepository.findAll();
    }

    @Override
    public Space addSpace(Space space) {
        return spaceRepository.save(space);
    }

    @Override
    public void deleteSpace(Long id) {
        spaceRepository.deleteById(id);
    }

    @Override
    public Space allocateSpace(Long id) {
        Space space = spaceRepository.findById(id).orElseThrow(() -> new RuntimeException("Space not found"));
        space.setAllocated(true);
        return spaceRepository.save(space);
    }

    @Override
    public Space deallocateSpace(Long id) {
        Space space = spaceRepository.findById(id).orElseThrow(() -> new RuntimeException("Space not found"));
        space.setAllocated(false);
        return spaceRepository.save(space);
    }
}
