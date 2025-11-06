package com.backend.libreria.clientes.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "clientes")
public class Cliente {

    @Id
    private Long cc;

    private String nombre;
    private String apellido;
    private String direccion;
    private Long telefono;
}
