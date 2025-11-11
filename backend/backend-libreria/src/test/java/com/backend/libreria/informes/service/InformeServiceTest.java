package com.backend.libreria.informes.service;

import com.backend.libreria.clientes.entity.Cliente;
import com.backend.libreria.clientes.repository.IClienteRepository;
import com.backend.libreria.informes.dto.InformeResponse;
import com.backend.libreria.informes.service.impl.InformeService;
import com.backend.libreria.libros.entity.Libro;
import com.backend.libreria.libros.repository.ILibroRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.within;
import static org.mockito.Mockito.when;

class InformeServiceTest {

    @Mock
    private IClienteRepository clienteRepository;

    @Mock
    private ILibroRepository libroRepository;

    @InjectMocks
    private InformeService informeService;

    private Cliente cliente1;
    private Cliente cliente2;
    private Libro libro1;
    private Libro libro2;
    private Libro libro3;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        cliente1 = new Cliente();
        cliente1.setNombre("Juan");
        cliente1.setApellido("Pérez");

        cliente2 = new Cliente();
        cliente2.setNombre("María");
        cliente2.setApellido("Gómez");

        libro1 = new Libro();
        libro1.setGenero("Novela");
        libro1.setPrestado(true);
        libro1.setCliente(cliente1);

        libro2 = new Libro();
        libro2.setGenero("Historia");
        libro2.setPrestado(false);

        libro3 = new Libro();
        libro3.setGenero("Novela");
        libro3.setPrestado(true);
        libro3.setCliente(cliente2);
    }

    @Test
    void generarInforme_deberiaRetornarDatosCorrectos() {
        when(clienteRepository.findAll()).thenReturn(List.of(cliente1, cliente2));
        when(libroRepository.findAll()).thenReturn(List.of(libro1, libro2, libro3));

        InformeResponse informe = informeService.generarInforme();

        assertThat(informe.cantClientes()).isEqualTo(2);
        assertThat(informe.cantLibros()).isEqualTo(3);
        assertThat(informe.cantLibrosPrestados()).isEqualTo(2);
        assertThat(informe.porcentajeLibrosPrestados()).isEqualTo(66.66667f, within(0.01f));

        Map<String, Long> librosPorGenero = informe.librosPorGenero();
        assertThat(librosPorGenero.get("Novela")).isEqualTo(2L);
        assertThat(librosPorGenero.get("Historia")).isEqualTo(1L);

        assertThat(informe.clientesConMasPrestamos()).contains("Juan Pérez (1 préstamos)");
        assertThat(informe.promedioLibrosPrestadosPorCliente()).isEqualTo(1.0f);
    }
}

