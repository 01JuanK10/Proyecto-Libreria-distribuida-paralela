package com.backend.libreria.libros.dto;

public record LibroRequest(
        String titulo,
        String autor,
        String editorial,
        String genero,
        boolean prestado
) { }
