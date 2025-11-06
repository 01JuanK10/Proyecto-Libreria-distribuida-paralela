package com.backend.libreria.libros.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "libros")
public class Libro {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String titulo;
    private String autor;
    private String editorial;
    private String genero;
    private boolean prestado;

    //private String nombrePersona;

    // Getters y setters
}
