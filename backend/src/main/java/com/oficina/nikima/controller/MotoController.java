package com.oficina.nikima.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    // Listar todas ou filtrar por status
    @GetMapping
    public List<Moto> listarTodos(@RequestParam(required = false) String status) {
        if (status != null) {
            try {
                return motoRepository.findByStatus(Status.valueOf(status.toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Status inválido: " + status);
            }
        }
        return motoRepository.findAll();
    }

    // Buscar moto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Moto> buscarPorId(@PathVariable Long id) {
        return motoRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // Criar nova moto
    @PostMapping
    public ResponseEntity<Moto> criar(@RequestBody Moto moto) {
        Moto novaMoto = motoRepository.save(moto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaMoto);
    }

    // Atualizar moto por ID
    @PutMapping("/{id}")
    public ResponseEntity<Moto> atualizar(@PathVariable Long id, @RequestBody Moto atualizada) {
        return motoRepository.findById(id)
            .map(moto -> {
                moto.setModelo(atualizada.getModelo());
                moto.setPlaca(atualizada.getPlaca());
                moto.setDataEntrada(atualizada.getDataEntrada());
                moto.setStatus(atualizada.getStatus());
                moto.setMecanicoResponsavel(atualizada.getMecanicoResponsavel());
                moto.setFuncionarioNota(atualizada.getFuncionarioNota());
                moto.setServicos(atualizada.getServicos());
                return ResponseEntity.ok(motoRepository.save(moto));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // Atualizar somente o status da moto
    @PutMapping("/{id}/status")
    public ResponseEntity<Moto> atualizarStatus(@PathVariable Long id, @RequestParam Status status) {
        return motoRepository.findById(id)
            .map(moto -> {
                moto.setStatus(status);
                return ResponseEntity.ok(motoRepository.save(moto));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // Deletar moto
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletar(@PathVariable Long id) {
        return motoRepository.findById(id)
            .map(moto -> {
                motoRepository.delete(moto);
                return ResponseEntity.noContent().build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
