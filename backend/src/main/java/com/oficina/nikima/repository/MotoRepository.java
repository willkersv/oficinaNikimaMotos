package com.oficina.nikima.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.oficina.nikima.model.Moto;
import com.oficina.nikima.model.Status;

public interface MotoRepository extends JpaRepository<Moto, Long> {
    List<Moto> findByStatus(Status status);
}
