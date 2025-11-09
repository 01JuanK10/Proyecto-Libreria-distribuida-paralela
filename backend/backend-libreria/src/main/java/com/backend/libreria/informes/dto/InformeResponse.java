package com.backend.libreria.informes.dto;

import java.util.List;
import java.util.Map;

public record InformeResponse(
        Integer cantClientes,
        Integer cantLibros,
        Integer cantLibrosPrestados,
        Float porcentajeLibrosPrestados,
        Map<String, Long> librosPorGenero,
        List<String> clientesConMasPrestamos,
        Float promedioLibrosPrestadosPorCliente
) {}
