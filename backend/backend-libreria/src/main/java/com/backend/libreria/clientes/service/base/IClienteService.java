package com.backend.libreria.clientes.service.base;

import com.backend.libreria.clientes.entity.Cliente;
import java.util.List;

public interface IClienteService {
    Cliente create(Cliente cliente);
    List<Cliente> findAll();
    Cliente findById(Long cc);
    Cliente update(Cliente cliente);
    void delete(Long cc);
}
