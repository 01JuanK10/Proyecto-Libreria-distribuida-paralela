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
  styleUrl: './client.scss',
})
export class Client implements OnInit {
  showModal = false;
  accion = '';
  modalTitle = '';

  nuevoCliente = {
    cc: null,
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: null
  };

  clienteSeleccionado: Cliente = {
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

    this.nuevoCliente = { cc: null , nombre: '', apellido: '', direccion: '', telefono: null };
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
    this.accion = 'actualizarCliente';
    this.modalTitle = 'Actualizar Cliente';
    this.clienteSeleccionado = { ...cliente };
    this.showModal = true;
  }

  confirmarAccionActualizar() {
    if (this.accion === 'actualizarCliente') {
      const index = this.clientes.findIndex(c => c.cc === this.clienteSeleccionado.cc);
      if (index !== -1) {
        this.clientes[index] = { ...this.clienteSeleccionado };
        Swal.fire({
          icon: 'success',
          title: 'Cliente actualizado',
          text: 'La información del cliente fue actualizada correctamente.',
          confirmButtonColor: '#3085d6'
        });
      }
    } else {
      this.clientes.push({ ...this.clienteSeleccionado });
      Swal.fire({
        icon: 'success',
        title: 'Cliente agregado',
        text: 'El nuevo cliente fue agregado correctamente.',
        confirmButtonColor: '#3085d6'
      });
    }
    this.limpiarCampos();
    this.showModal = false;
  }

  eliminarCliente(cliente: Cliente) {
    Swal.fire({
      title: '¿Eliminar cliente?',
      text: `Se eliminará a ${cliente.nombre} ${cliente.apellido}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientes = this.clientes.filter(c => c.cc !== cliente.cc);
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: `El cliente ${cliente.nombre} ha sido eliminado.`,
          timer: 1800,
          showConfirmButton: false
        });
      }
    });
  }

  limpiarCampos() {
    this.nuevoCliente = {
      cc: null,
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: null
    };
  }
}
