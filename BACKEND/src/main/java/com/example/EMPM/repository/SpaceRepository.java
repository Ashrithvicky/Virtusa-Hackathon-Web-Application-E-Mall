package com.example.EMPM.repository;

import com.example.EMPM.model.Space;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SpaceRepository extends JpaRepository<Space, Long> {
    // Additional custom queries can go here if needed in future
    List<Space> findByAllocatedFalse();
}

