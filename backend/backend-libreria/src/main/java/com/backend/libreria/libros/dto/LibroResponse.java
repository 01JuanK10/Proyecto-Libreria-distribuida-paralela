package com.backend.libreria.libros.dto;


public record LibroResponse(
        Long id,
        String titulo,
        String autor,
        String editorial,
        String genero,
        boolean prestado
) { }
