package com.backend.libreria.informes.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.libreria.clientes.entity.Cliente;
import com.backend.libreria.clientes.repository.IClienteRepository;
import com.backend.libreria.informes.dto.InformeResponse;
import com.backend.libreria.informes.service.base.IInformeService;
import com.backend.libreria.libros.entity.Libro;
import com.backend.libreria.libros.repository.ILibroRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InformeService implements IInformeService {

    private final IClienteRepository clienteRepository;
    private final ILibroRepository libroRepository;

    @Override
    public InformeResponse generarInforme() {
        List<Libro> libros = libroRepository.findAll();
        List<Cliente> clientes = clienteRepository.findAll();

        int cantClientes = clientes.size();
        int cantLibros = libros.size();
        int cantLibrosPrestados = (int) libros.stream()
                .filter(Libro::isPrestado)
                .count();

        float porcentajeLibrosPrestados = cantLibros > 0
                ? (cantLibrosPrestados * 100f) / cantLibros
                : 0f;

        Map<String, Long> librosPorGenero = libros.stream()
                .collect(Collectors.groupingBy(Libro::getGenero, Collectors.counting()));

        Map<Cliente, Long> prestamosPorCliente = libros.stream()
                .filter(Libro::isPrestado)
                .filter(libro -> libro.getCliente() != null)
                .collect(Collectors.groupingBy(Libro::getCliente, Collectors.counting()));

        List<String> clientesConMasPrestamos = prestamosPorCliente.entrySet().stream()
                .sorted(Map.Entry.<Cliente, Long>comparingByValue().reversed())
                .limit(3)
                .map(entry -> entry.getKey().getNombre() + " " + entry.getKey().getApellido()
                        + " (" + entry.getValue() + " préstamos)")
                .collect(Collectors.toList());

        // ⚖️ Promedio de libros prestados por cliente
        float promedioLibrosPrestadosPorCliente = cantClientes > 0
                ? (float) cantLibrosPrestados / cantClientes
                : 0f;

        return new InformeResponse(
                cantClientes,
                cantLibros,
                cantLibrosPrestados,
                porcentajeLibrosPrestados,
                librosPorGenero,
                clientesConMasPrestamos,
                promedioLibrosPrestadosPorCliente
        );
    }
}
