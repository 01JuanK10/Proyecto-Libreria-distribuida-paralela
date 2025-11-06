package com.backend.libreria.libros.controller;

import com.backend.libreria.clientes.entity.Cliente;
import com.backend.libreria.clientes.service.impl.ClienteService;
import com.backend.libreria.libros.dto.*;
import com.backend.libreria.libros.entity.Libro;
import com.backend.libreria.libros.service.base.ILibroService;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<LibroResponse> create(@RequestBody LibroRequest request) {
        Libro libro = new Libro();
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

        return ResponseEntity.ok(response);
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
    public ResponseEntity<LibroResponse> getById(@PathVariable Long id) {
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
    }

    @PutMapping("/{id}")
    public ResponseEntity<LibroResponse> update(@PathVariable Long id, @RequestBody LibroRequest request) {
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
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        libroService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/prestar")
    public ResponseEntity<PrestamoResponse> prestarLibro(@RequestBody PrestamoRequest request) {
        Libro libro = libroService.findById(request.libroId());
        if (libro.isPrestado()) {
            throw new RuntimeException("El libro ya está prestado");
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
    }

    @PostMapping("/devolver")
    public ResponseEntity<PrestamoResponse> devolverLibro(@RequestBody DevolucionRequest request) {
        Libro libro = libroService.findById(request.libroId());

        if (!libro.isPrestado()) {
            throw new RuntimeException("El libro no está actualmente prestado");
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
    }


}
