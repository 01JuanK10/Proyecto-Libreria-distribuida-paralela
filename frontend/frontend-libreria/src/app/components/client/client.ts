import { Component } from '@angular/core';

interface Cliente {
  cc: number;
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: number;
}

@Component({
  selector: 'app-client',
  imports: [],
  templateUrl: './client.html',
  styleUrl: './client.scss',
})
export class Client {
  clientes: Cliente[] = [
    { cc: 10101010, nombre: 'Juan', apellido: 'Pérez', direccion: 'Calle 10 #23-45', telefono: 3001234567 },
    { cc: 20202020, nombre: 'Ana', apellido: 'Gómez', direccion: 'Carrera 5 #67-89', telefono: 3017654321 },
    { cc: 30303030, nombre: 'Carlos', apellido: 'López', direccion: 'Av. 80 #12-34', telefono: 3109876543 }
  ];

  agregarCliente() {
    const nuevo: Cliente = {
      cc: parseInt(prompt('Ingrese la cédula del cliente:') || '0', 10),
      nombre: prompt('Ingrese el nombre del cliente:') || '',
      apellido: prompt('Ingrese el apellido del cliente:') || '',
      direccion: prompt('Ingrese la dirección del cliente:') || '',
      telefono: parseInt(prompt('Ingrese el teléfono del cliente:') || '0', 10)
    };

    if (nuevo.cc && nuevo.nombre.trim()) {
      this.clientes.push(nuevo);
      alert('✅ Cliente agregado correctamente');
    } else {
      alert('⚠️ Debe ingresar al menos la cédula y el nombre');
    }
  }

  actualizarCliente(cliente: Cliente) {
    const nombre = prompt('Nuevo nombre:', cliente.nombre);
    const apellido = prompt('Nuevo apellido:', cliente.apellido);
    const direccion = prompt('Nueva dirección:', cliente.direccion);
    const telefono = prompt('Nuevo teléfono:', cliente.telefono.toString());

    if (nombre !== null) cliente.nombre = nombre;
    if (apellido !== null) cliente.apellido = apellido;
    if (direccion !== null) cliente.direccion = direccion;
    if (telefono !== null) cliente.telefono = parseInt(telefono, 10);

    alert('✅ Datos del cliente actualizados');
  }

  eliminarCliente(cc: string) {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      this.clientes = this.clientes.filter(c => c.cc !== parseInt(cc, 10));
      alert('🗑️ Cliente eliminado correctamente');
    }
  }
}
