package com.example.EMPM.service.Impl;
import com.example.EMPM.model.Space;
import com.example.EMPM.repository.SpaceRepository;
import com.example.EMPM.service.SpaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpaceServiceImpl implements SpaceService {

    private final SpaceRepository spaceRepository;

    @Autowired
    public SpaceServiceImpl(SpaceRepository spaceRepository) {
        this.spaceRepository = spaceRepository;
    }

    @Override
    public Space addSpace(Space space) {
        return spaceRepository.save(space);
    }

    @Override
    public List<Space> getAllSpaces() {
        return spaceRepository.findAll();
    }

    @Override
    public void allocateSpace(Long id) {
        Space space = spaceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Space not found"));
        space.setAllocated(true);
        spaceRepository.save(space);
    }

    @Override
    public void deallocateSpace(Long id) {
        Space space = spaceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Space not found"));
        space.setAllocated(false);
        spaceRepository.save(space);
    }

    @Override
    public void deleteSpace(Long id) {
        spaceRepository.deleteById(id);
    }

    @Override
    public List<Space> getAvailableSpaces() {
        return spaceRepository.findByAllocatedFalse();
    }

    @Override
    public Space getSpaceById(Long spaceId) {
        return spaceRepository.findById(spaceId)
            .orElseThrow(() -> new RuntimeException("Space not found with ID: " + spaceId));
    }


}
