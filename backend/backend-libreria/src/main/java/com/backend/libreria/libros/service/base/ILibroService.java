package com.backend.libreria.libros.service.base;

import com.backend.libreria.libros.entity.Libro;

import java.util.List;

public interface ILibroService {
    public Libro create(Libro libro) throws RuntimeException;
    public Libro findById(Long id) throws RuntimeException;
    public List<Libro> findAll();
    public Libro update(Libro libro) throws RuntimeException;
    public void delete(Long id) throws RuntimeException;}
