package com.backend.libreria.libros.controller;

import com.backend.libreria.clientes.entity.Cliente;
import com.backend.libreria.clientes.service.impl.ClienteService;
import com.backend.libreria.libros.dto.*;
import com.backend.libreria.libros.entity.Libro;
import com.backend.libreria.libros.service.base.ILibroService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/libros")
public class LibroController {

    private final ILibroService libroService;
    private final ClienteService clienteService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody LibroRequest request) {
        try {
            Libro libro = new Libro();
            libro.setId(request.id());
            libro.setTitulo(request.titulo());
            libro.setAutor(request.autor());
            libro.setEditorial(request.editorial());
            libro.setGenero(request.genero());
            libro.setPrestado(request.prestado());

            Libro saved = libroService.create(libro);
            LibroResponse response = new LibroResponse(
                    saved.getId(),
                    saved.getTitulo(),
                    saved.getAutor(),
                    saved.getEditorial(),
                    saved.getGenero(),
                    saved.isPrestado()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<LibroResponse>> getAll() {
        List<LibroResponse> libros = libroService.findAll().stream()
                .map(libro -> new LibroResponse(
                        libro.getId(),
                        libro.getTitulo(),
                        libro.getAutor(),
                        libro.getEditorial(),
                        libro.getGenero(),
                        libro.isPrestado()
                ))
                .toList();
        return ResponseEntity.ok(libros);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            Libro libro = libroService.findById(id);
            LibroResponse response = new LibroResponse(
                    libro.getId(),
                    libro.getTitulo(),
                    libro.getAutor(),
                    libro.getEditorial(),
                    libro.getGenero(),
                    libro.isPrestado()
            );
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody LibroRequest request) {
        try {
            Libro libro = libroService.findById(id);
            libro.setTitulo(request.titulo());
            libro.setAutor(request.autor());
            libro.setEditorial(request.editorial());
            libro.setGenero(request.genero());
            libro.setPrestado(request.prestado());

            Libro updated = libroService.update(libro);
            LibroResponse response = new LibroResponse(
                    updated.getId(),
                    updated.getTitulo(),
                    updated.getAutor(),
                    updated.getEditorial(),
                    updated.getGenero(),
                    updated.isPrestado()
            );
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            libroService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping("/prestar")
    public ResponseEntity<?> prestarLibro(@RequestBody PrestamoRequest request) {
        try {
            Libro libro = libroService.findById(request.libroId());
            if (libro.isPrestado()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("El libro ya está prestado");
            }

            Cliente cliente = clienteService.findById(request.clienteCc());
            libro.setPrestado(true);
            libro.setCliente(cliente);

            Libro actualizado = libroService.update(libro);
            PrestamoResponse response = new PrestamoResponse(
                    actualizado.getId(),
                    actualizado.getTitulo(),
                    actualizado.isPrestado(),
                    cliente.getCc(),
                    cliente.getNombre()
            );
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PostMapping("/devolver")
    public ResponseEntity<?> devolverLibro(@RequestBody DevolucionRequest request) {
        try {
            Libro libro = libroService.findById(request.libroId());
            if (!libro.isPrestado()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("El libro no está actualmente prestado");
            }

            Cliente cliente = libro.getCliente();
            libro.setPrestado(false);
            libro.setCliente(null);

            Libro actualizado = libroService.update(libro);
            PrestamoResponse response = new PrestamoResponse(
                    actualizado.getId(),
                    actualizado.getTitulo(),
                    actualizado.isPrestado(),
                    cliente != null ? cliente.getCc() : null,
                    cliente != null ? cliente.getNombre() : null
            );
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
}
