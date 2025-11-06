package com.backend.libreria.clientes.controller;

import com.backend.libreria.clientes.dto.ClienteRequest;
import com.backend.libreria.clientes.dto.ClienteResponse;
import com.backend.libreria.clientes.entity.Cliente;
import com.backend.libreria.clientes.service.base.IClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final IClienteService clienteService;

    @PostMapping
    public ResponseEntity<ClienteResponse> create(@RequestBody ClienteRequest request) {
        Cliente cliente = new Cliente();
        cliente.setCc(request.cc());
        cliente.setNombre(request.nombre());
        cliente.setApellido(request.apellido());
        cliente.setDireccion(request.direccion());
        cliente.setTelefono(request.telefono());

        Cliente saved = clienteService.create(cliente);
        ClienteResponse response = new ClienteResponse(
                saved.getCc(),
                saved.getNombre(),
                saved.getApellido(),
                saved.getDireccion(),
                saved.getTelefono()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ClienteResponse>> getAll() {
        List<ClienteResponse> clientes = clienteService.findAll().stream()
                .map(cliente -> new ClienteResponse(
                        cliente.getCc(),
                        cliente.getNombre(),
                        cliente.getApellido(),
                        cliente.getDireccion(),
                        cliente.getTelefono()
                ))
                .toList();

        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/{cc}")
    public ResponseEntity<ClienteResponse> getById(@PathVariable Long cc) {
        Cliente cliente = clienteService.findById(cc);
        ClienteResponse response = new ClienteResponse(
                cliente.getCc(),
                cliente.getNombre(),
                cliente.getApellido(),
                cliente.getDireccion(),
                cliente.getTelefono()
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{cc}")
    public ResponseEntity<ClienteResponse> update(@PathVariable Long cc, @RequestBody ClienteRequest request) {
        Cliente cliente = clienteService.findById(cc);
        cliente.setNombre(request.nombre());
        cliente.setApellido(request.apellido());
        cliente.setDireccion(request.direccion());
        cliente.setTelefono(request.telefono());

        Cliente updated = clienteService.update(cliente);

        ClienteResponse response = new ClienteResponse(
                updated.getCc(),
                updated.getNombre(),
                updated.getApellido(),
                updated.getDireccion(),
                updated.getTelefono()
        );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{cc}")
    public ResponseEntity<Void> delete(@PathVariable Long cc) {
        clienteService.delete(cc);
        return ResponseEntity.noContent().build();
    }
}
