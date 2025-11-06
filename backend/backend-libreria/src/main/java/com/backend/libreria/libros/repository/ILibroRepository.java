package com.backend.libreria.libros.repository;

import com.backend.libreria.libros.entity.Libro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ILibroRepository extends JpaRepository<Libro,Long> {
}
