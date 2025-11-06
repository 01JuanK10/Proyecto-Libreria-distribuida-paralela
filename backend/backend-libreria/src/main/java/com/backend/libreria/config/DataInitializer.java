package com.backend.libreria.config;

import com.backend.libreria.clientes.entity.Cliente;
import com.backend.libreria.clientes.repository.IClienteRepository;
import com.backend.libreria.libros.entity.Libro;
import com.backend.libreria.libros.repository.ILibroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

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
                Cliente cliente1 = new Cliente();
                cliente1.setCc(1001L);
                cliente1.setNombre("Laura");
                cliente1.setApellido("Martínez");
                cliente1.setDireccion("Calle 12 #4-56");
                cliente1.setTelefono(3005678901L);

                Cliente cliente2 = new Cliente();
                cliente2.setCc(1002L);
                cliente2.setNombre("Carlos");
                cliente2.setApellido("Ramírez");
                cliente2.setDireccion("Carrera 45 #10-23");
                cliente2.setTelefono(3126789012L);

                Cliente cliente3 = new Cliente();
                cliente3.setCc(1003L);
                cliente3.setNombre("María");
                cliente3.setApellido("González");
                cliente3.setDireccion("Avenida 30 #5-12");
                cliente3.setTelefono(3204567890L);

                clienteRepository.saveAll(List.of(cliente1, cliente2, cliente3));
                System.out.println("Clientes iniciales insertados");
            }

            // ==============================
            // LIBROS INICIALES
            // ==============================
            if (libroRepository.count() == 0) {
                Libro l1 = new Libro();
                l1.setTitulo("Cien años de soledad");
                l1.setAutor("Gabriel García Márquez");
                l1.setEditorial("Sudamericana");
                l1.setGenero("Realismo mágico");
                l1.setPrestado(false);

                Libro l2 = new Libro();
                l2.setTitulo("El amor en los tiempos del cólera");
                l2.setAutor("Gabriel García Márquez");
                l2.setEditorial("Oveja Negra");
                l2.setGenero("Romance");
                l2.setPrestado(false);

                Libro l3 = new Libro();
                l3.setTitulo("La Odisea");
                l3.setAutor("Homero");
                l3.setEditorial("Alianza Editorial");
                l3.setGenero("Épico");
                l3.setPrestado(false);

                Libro l4 = new Libro();
                l4.setTitulo("1984");
                l4.setAutor("George Orwell");
                l4.setEditorial("Secker & Warburg");
                l4.setGenero("Distopía");
                l4.setPrestado(false);

                Libro l5 = new Libro();
                l5.setTitulo("El principito");
                l5.setAutor("Antoine de Saint-Exupéry");
                l5.setEditorial("Reynal & Hitchcock");
                l5.setGenero("Fábula");
                l5.setPrestado(false);

                libroRepository.saveAll(List.of(l1, l2, l3, l4, l5));
                System.out.println("Libros iniciales insertados");
            }

            System.out.println("Datos iniciales cargados correctamente en la base de datos.");
        };
    }
}
