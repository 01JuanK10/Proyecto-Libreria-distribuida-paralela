package com.backend.libreria.clientes.dto;

public record ClienteResponse(
        Long cc,
        String nombre,
        String apellido,
        String direccion,
        Long telefono
) {}
