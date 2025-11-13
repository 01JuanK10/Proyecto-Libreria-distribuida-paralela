package com.backend.libreria.libros.dto;

public record LibroRequest(
        Long id,
        String titulo,
        String autor,
        String editorial,
        String genero,
        boolean prestado
) { }
