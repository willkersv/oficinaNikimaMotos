package com.oficina.nikima.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.oficina.nikima.model.Moto;
import com.oficina.nikima.model.Status;
import com.oficina.nikima.repository.MotoRepository;

import java.util.List;

@RestController
@RequestMapping("/motos")
@RequiredArgsConstructor
public class MotoController {

    private final MotoRepository motoRepository;

    @GetMapping
    public List<Moto> listarTodas() {
        return motoRepository.findAll();
    }

    @PostMapping
    public Moto criar(@RequestBody Moto moto) {
        return motoRepository.save(moto);
    }

    @PutMapping("/{id}/status")
    public Moto atualizarStatus(@PathVariable Long id, @RequestParam String status) {
        var moto = motoRepository.findById(id).orElseThrow();
        moto.setStatus(Status.valueOf(status.toUpperCase()));
        return motoRepository.save(moto);
    }
}
