package com.example.EMPM.service;
import com.example.EMPM.model.Space;
import java.util.List;

public interface OwnerService {

    List<Space> getAllSpaces();

    Space addSpace(Space space);

    void deleteSpace(Long id);

    Space allocateSpace(Long id);

    Space deallocateSpace(Long id);
} 
