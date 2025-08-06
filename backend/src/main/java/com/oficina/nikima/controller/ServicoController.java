package com.oficina.nikima.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.oficina.nikima.model.Moto;
import com.oficina.nikima.model.Servico;
import com.oficina.nikima.repository.MotoRepository;
import com.oficina.nikima.repository.ServicoRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/servicos")
@RequiredArgsConstructor
public class ServicoController {

    private final ServicoRepository servicoRepository;
    private final MotoRepository motoRepository;

    // Listar todos os serviços
    @GetMapping
    public List<Servico> listarTodos() {
        return servicoRepository.findAll();
    }

    // Buscar serviço por ID
    @GetMapping("/{id}")
    public ResponseEntity<Servico> buscarPorId(@PathVariable Long id) {
        return servicoRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // Criar novo serviço
    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Servico servico) {
        if (servico.getMoto() != null && servico.getMoto().getId() != null) {
            Optional<Moto> moto = motoRepository.findById(servico.getMoto().getId());
            if (moto.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Moto com ID " + servico.getMoto().getId() + " não encontrada.");
            }
            servico.setMoto(moto.get());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("ID da moto é obrigatório.");
        }

        Servico novo = servicoRepository.save(servico);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }

    // Atualizar serviço
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Servico atualizado) {
        return servicoRepository.findById(id)
            .map(servico -> {
                servico.setDescricao(atualizado.getDescricao());
                servico.setPreco(atualizado.getPreco());
                servico.setTipo(atualizado.getTipo());
                servico.setRealizadoPor(atualizado.getRealizadoPor());

                if (atualizado.getMoto() != null && atualizado.getMoto().getId() != null) {
                    Optional<Moto> novaMoto = motoRepository.findById(atualizado.getMoto().getId());
                    if (novaMoto.isEmpty()) {
                        return ResponseEntity.badRequest()
                            .body("Moto com ID " + atualizado.getMoto().getId() + " não encontrada.");
                    }
                    servico.setMoto(novaMoto.get());
                }

                Servico atualizadoServico = servicoRepository.save(servico);
                return ResponseEntity.ok(atualizadoServico);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // Deletar serviço
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletar(@PathVariable Long id) {
        return servicoRepository.findById(id)
            .map(servico -> {
                servicoRepository.delete(servico);
                return ResponseEntity.noContent().build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
}