package com.oficina.nikima.model;



import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    @Enumerated(EnumType.STRING)
    private TipoServico tipo;

    private String realizadoPor;

    private Double preco;

    @ManyToOne
    @JoinColumn(name = "moto_id")
    @JsonIgnore
    private Moto moto;
}
