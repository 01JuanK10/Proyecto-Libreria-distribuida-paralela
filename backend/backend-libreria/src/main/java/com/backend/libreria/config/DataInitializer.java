package com.backend.libreria.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.backend.libreria.clientes.entity.Cliente;
import com.backend.libreria.clientes.repository.IClienteRepository;
import com.backend.libreria.libros.entity.Libro;
import com.backend.libreria.libros.repository.ILibroRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(IClienteRepository clienteRepository, ILibroRepository libroRepository) {
        return args -> {

            // ==============================
            // CLIENTES INICIALES
            // ==============================
            if (clienteRepository.count() == 0) {
                Cliente c1 = new Cliente(1001L, "Juan", "Pérez", "Calle 10 #1-11", 3001111111L, null);
                Cliente c2 = new Cliente(1002L, "María", "Gómez", "Carrera 20 #2-22", 3002222222L, null);
                Cliente c3 = new Cliente(1003L, "Carlos", "Ruiz", "Avenida 30 #3-33", 3003333333L, null);
                Cliente c4 = new Cliente(1004L, "Laura", "Martínez", "Calle 40 #4-44", 3004444444L, null);
                Cliente c5 = new Cliente(1005L, "Andrés", "Salazar", "Carrera 50 #5-55", 3005555555L, null);

                clienteRepository.saveAll(List.of(c1, c2, c3, c4, c5));
                System.out.println("✅ Clientes iniciales insertados");
            }

            // ==============================
            // LIBROS INICIALES
            // ==============================
            if (libroRepository.count() == 0) {

                // Obtener clientes
                List<Cliente> clientes = clienteRepository.findAll();
                Cliente c1 = clientes.get(0);
                Cliente c2 = clientes.get(1);
                Cliente c3 = clientes.get(2);

                // Libros
                List<Libro> libros = List.of(
                        new Libro(1L, "Cien años de soledad", "Gabriel García Márquez", "Sudamericana", "Novela", true, c1),
                        new Libro(2L, "El amor en los tiempos del cólera", "Gabriel García Márquez", "Oveja Negra", "Novela", true, c1),
                        new Libro(3L, "Crónica de una muerte anunciada", "Gabriel García Márquez", "Sudamericana", "Novela", true, c1),

                        new Libro(4L, "Breve historia del tiempo", "Stephen Hawking", "Planeta", "Ciencia", true, c2),
                        new Libro(5L, "El universo en una cáscara de nuez", "Stephen Hawking", "Planeta", "Ciencia", true, c2),

                        new Libro(6L, "La historia del tiempo", "Carl Sagan", "Debate", "Ciencia", false, null),
                        new Libro(7L, "Cosmos", "Carl Sagan", "Planeta", "Ciencia", false, null),

                        new Libro(8L, "La historia de Roma", "Mary Beard", "Crítica", "Historia", true, c3),
                        new Libro(9L, "Los orígenes del mundo moderno", "Robert Marks", "Ariel", "Historia", false, null),
                        new Libro(10L, "La Segunda Guerra Mundial", "Antony Beevor", "Crítica", "Historia", false, null),

                        new Libro(11L, "1984", "George Orwell", "Secker & Warburg", "Distopía", false, null),
                        new Libro(12L, "Rebelión en la granja", "George Orwell", "Penguin", "Distopía", false, null),

                        new Libro(13L, "Física para todos", "Paul Hewitt", "Pearson", "Ciencia", true, c3),
                        new Libro(14L, "El origen de las especies", "Charles Darwin", "Murray", "Ciencia", false, null),

                        new Libro(15L, "La Iliada", "Homero", "Alianza", "Historia", false, null),
                        new Libro(16L, "La Odisea", "Homero", "Alianza", "Historia", false, null),

                        new Libro(17L, "El principito", "Antoine de Saint-Exupéry", "Reynal & Hitchcock", "Fábula", false, null),
                        new Libro(18L, "Don Quijote de la Mancha", "Miguel de Cervantes", "Espasa", "Novela", true, c2),
                        new Libro(19L, "Rayuela", "Julio Cortázar", "Sudamericana", "Novela", true, c3),
                        new Libro(20L, "Pedro Páramo", "Juan Rulfo", "Fondo de Cultura Económica", "Novela", false, null)
                );

                libroRepository.saveAll(libros);
            }

            System.out.println("Datos iniciales cargados correctamente en la base de datos.");
        };
    }
}
