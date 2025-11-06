package com.backend.libreria.libros.dto;

public record PrestamoResponse(
        Long libroId,
        String titulo,
        boolean prestado,
        Long clienteCc,
        String nombreCliente
) {}
