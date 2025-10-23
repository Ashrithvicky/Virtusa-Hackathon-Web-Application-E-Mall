package com.example.EMPM.service;
import com.example.EMPM.model.Space;

import java.util.List;

public interface SpaceService {
    Space addSpace(Space space);
    List<Space> getAllSpaces();
    void allocateSpace(Long id);
    void deallocateSpace(Long id);
    void deleteSpace(Long id);
    public List<Space> getAvailableSpaces();
    public Space getSpaceById(Long spaceId);


}
