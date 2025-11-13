package com.backend.libreria.libros.entity;

import com.backend.libreria.clientes.entity.Cliente;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "libros")
public class Libro {
    @Id
    private Long id;
    private String titulo;
    private String autor;
    private String editorial;
    private String genero;
    private boolean prestado;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

}
