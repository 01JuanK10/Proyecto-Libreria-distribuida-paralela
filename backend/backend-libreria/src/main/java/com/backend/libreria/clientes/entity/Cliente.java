package com.backend.libreria.clientes.entity;

import com.backend.libreria.libros.entity.Libro;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

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

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    private List<Libro> libros;
}
