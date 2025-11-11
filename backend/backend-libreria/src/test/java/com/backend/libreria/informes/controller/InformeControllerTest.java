package com.backend.libreria.informes.controller;

import com.backend.libreria.informes.dto.InformeResponse;
import com.backend.libreria.informes.service.base.IInformeService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

class InformeControllerTest {

    @Mock
    private IInformeService informeService;

    @InjectMocks
    private InformeController informeController;

    InformeControllerTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void obtenerInforme_deberiaRetornarInformeResponse() {
        InformeResponse informeMock = new InformeResponse(
                3, 10, 4, 40.0f,
                Map.of("Novela", 5L, "Historia", 3L, "Ciencia", 2L),
                List.of("Juan Pérez (2 préstamos)", "María Gómez (1 préstamos)"),
                1.33f
        );

        when(informeService.generarInforme()).thenReturn(informeMock);

        ResponseEntity<InformeResponse> response = informeController.obtenerInforme();

        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().cantLibros()).isEqualTo(10);
        assertThat(response.getBody().clientesConMasPrestamos()).contains("Juan Pérez (2 préstamos)");
    }
}
