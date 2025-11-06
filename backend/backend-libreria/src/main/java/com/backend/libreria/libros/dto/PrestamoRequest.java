package com.backend.libreria.libros.dto;

public record PrestamoRequest(
        Long libroId,
        Long clienteCc
) {}
