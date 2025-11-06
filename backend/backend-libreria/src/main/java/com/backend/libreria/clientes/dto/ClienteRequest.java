package com.backend.libreria.clientes.dto;

public record ClienteRequest(
        Long cc,
        String nombre,
        String apellido,
        String direccion,
        Long telefono
) {}
