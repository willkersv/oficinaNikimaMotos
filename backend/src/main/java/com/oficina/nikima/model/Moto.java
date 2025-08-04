package com.oficina.nikima.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Moto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String modelo;
    private String placa;
    private LocalDateTime dataEntrada;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String mecanicoResponsavel;
    private String funcionarioNota;

    @OneToMany(mappedBy = "moto", cascade = CascadeType.ALL)
    private List<Servico> servicos;
}
