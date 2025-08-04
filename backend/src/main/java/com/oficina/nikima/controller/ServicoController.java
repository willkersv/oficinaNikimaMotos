package com.oficina.nikima.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.oficina.nikima.model.Servico;
import com.oficina.nikima.repository.ServicoRepository;

import java.util.List;

@RestController
@RequestMapping("/servicos")
@RequiredArgsConstructor
public class ServicoController {

    private final ServicoRepository servicoRepository;

    @GetMapping
    public List<Servico> listarTodos() {
        return servicoRepository.findAll();
    }

    @PostMapping
    public Servico criar(@RequestBody Servico servico) {
        return servicoRepository.save(servico);
    }
}