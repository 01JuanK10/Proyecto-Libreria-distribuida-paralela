package com.backend.libreria.informes.controller;

import com.backend.libreria.informes.dto.InformeResponse;
import com.backend.libreria.informes.service.base.IInformeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/informes")
public class InformeController {

    private final IInformeService informeService;

    @GetMapping
    public ResponseEntity<InformeResponse> obtenerInforme() {
        InformeResponse informe = informeService.generarInforme();
        return ResponseEntity.ok(informe);
    }
}
