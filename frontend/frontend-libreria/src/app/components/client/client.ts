import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Modal } from '../modal/modal';
import Swal from 'sweetalert2';

interface Cliente {
  cc: number;
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: number;
}

@Component({
  selector: 'app-client',
  imports: [FormsModule, Modal],
  templateUrl: './client.html',
  styleUrls: ['./client.scss'],
  encapsulation: ViewEncapsulation.None, 
})
export class Client implements OnInit {
  showModal = false;
  accion = '';
  modalTitle = '';

  nuevoCliente = {
    cc: 0,
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: 0
  };

  clientes: Cliente[] = [
    { cc: 10101010, nombre: 'Juan', apellido: 'Pérez', direccion: 'Calle 10 #23-45', telefono: 3001234567 },
    { cc: 20202020, nombre: 'Ana', apellido: 'Gómez', direccion: 'Carrera 5 #67-89', telefono: 3017654321 },
    { cc: 30303030, nombre: 'Carlos', apellido: 'López', direccion: 'Av. 80 #12-34', telefono: 3109876543 }
  ];

  ngOnInit(): void {}

  agregarCliente() {
    this.accion = 'agregar';
    this.modalTitle = 'Agregar Cliente';
    this.showModal = true;

    this.nuevoCliente = { cc: 0 , nombre: '', apellido: '', direccion: '', telefono: 0 };
  }

  confirmarAccion() {
    console.log('Acción confirmada:', this.nuevoCliente);
    this.limpiarCampos();
    Swal.fire({
      icon: 'success',
      title: 'Cliente agregado',
      text: `El cliente se ha agregado correctamente.`,
      confirmButtonColor: '#28a745'
    });
    this.cerrarModal();
  }

  cerrarModal() {
    this.showModal = false;
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

  limpiarCampos() {
    this.nuevoCliente = {
      cc: 0,
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: 0
    };
  }
}
