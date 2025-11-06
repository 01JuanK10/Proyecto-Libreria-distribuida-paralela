package com.backend.libreria.libros.service.impl;

import com.backend.libreria.libros.entity.Libro;
import com.backend.libreria.libros.repository.ILibroRepository;
import com.backend.libreria.libros.service.base.ILibroService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class LibroService implements ILibroService {

    private final ILibroRepository libroRepository;

    @Override
    public Libro create(Libro libro) throws RuntimeException {
        return libroRepository.save(libro);
    }

    @Override
    public Libro findById(Long id) throws RuntimeException {
        return libroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Libro no encontrado con id: " + id));
    }

    @Override
    public List<Libro> findAll() {
        return libroRepository.findAll();
    }

    @Override
    public Libro update(Libro libro) throws RuntimeException {
        Libro existente = libroRepository.findById(libro.getId())
                .orElseThrow(() -> new RuntimeException("Libro no encontrado con id: " + libro.getId()));

        existente.setTitulo(libro.getTitulo());
        existente.setAutor(libro.getAutor());
        existente.setEditorial(libro.getEditorial());
        existente.setGenero(libro.getGenero());
        existente.setPrestado(libro.isPrestado());

        return libroRepository.save(existente);
    }

    @Override
    public void delete(Long id) throws RuntimeException {
        if (!libroRepository.existsById(id)) {
            throw new RuntimeException("No se puede eliminar. Libro no encontrado con id: " + id);
        }
        libroRepository.deleteById(id);
    }
}
