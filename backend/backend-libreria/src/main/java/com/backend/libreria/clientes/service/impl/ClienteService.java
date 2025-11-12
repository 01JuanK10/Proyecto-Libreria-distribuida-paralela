package com.backend.libreria.clientes.service.impl;

import com.backend.libreria.clientes.entity.Cliente;
import com.backend.libreria.clientes.repository.IClienteRepository;
import com.backend.libreria.clientes.service.base.IClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteService implements IClienteService {
    private final IClienteRepository clienteRepository;

    @Override
    public Cliente create(Cliente cliente) {
        if (clienteRepository.existsById(cliente.getCc())) {
            throw new RuntimeException("Ya existe un cliente con la cédula: " + cliente.getCc());
        }
        return clienteRepository.save(cliente);
    }

    @Override
    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    @Override
    public Cliente findById(Long cc) {
        return clienteRepository.findById(cc)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con cédula: " + cc));
    }

    @Override
    public Cliente update(Cliente cliente) {
        if (!clienteRepository.existsById(cliente.getCc())) {
            throw new RuntimeException("No se puede actualizar. Cliente no encontrado con cédula: " + cliente.getCc());
        }
        return clienteRepository.save(cliente);
    }

    @Override
    public void delete(Long cc) {
        if (!clienteRepository.existsById(cc)) {
            throw new RuntimeException("No se puede eliminar. Cliente no encontrado con cédula: " + cc);
        }
        clienteRepository.deleteById(cc);
    }
}
