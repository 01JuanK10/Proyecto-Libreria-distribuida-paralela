import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Modal } from '../modal/modal';
import Swal from 'sweetalert2';
import { ClientService } from '../../services/client-service';

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
  clientes: Cliente[] = [];
  showModal = false;
  accion = '';
  modalTitle = '';
  nuevoCliente: Cliente = { cc: 0, nombre: '', apellido: '', direccion: '', telefono: 0 };
  clienteSeleccionado: Cliente = { cc: 0, nombre: '', apellido: '', direccion: '', telefono: 0 };

  constructor(private clienteService: ClientService) {}

  ngOnInit(): void {
    this.cargarClientes();

    this.clienteService.cliente$.subscribe(event => {
      if (event) {
        this.cargarClientes();
      }
    });
  }

  cargarClientes() {
    this.clienteService.getAll().subscribe({
      next: (data) => (this.clientes = data),
      error: (err) => console.error(err),
    });
  }

  agregarCliente() {
    this.accion = 'agregar';
    this.modalTitle = 'Agregar Cliente';
    this.showModal = true;
    this.nuevoCliente = { cc: 0, nombre: '', apellido: '', direccion: '', telefono: 0 };
  }

  confirmarAccion() {
    if (!this.validarCampos(this.nuevoCliente)) return;

    this.clienteService.create(this.nuevoCliente).subscribe({
      next: () => {
        Swal.fire('Cliente agregado', 'El cliente fue agregado correctamente.', 'success');
        this.cerrarModal
      },
      error: (err) => {
        if (err.message.includes('(400)')) {
          Swal.fire({
            icon: 'error',
            title: 'Cliente existente',
            text: `Ya existe un cliente con el documento ${this.nuevoCliente.cc}.`,
            confirmButtonColor: '#d33'
          });
        } else {
          Swal.fire('Error', 'Ocurrió un error al guardar el cliente.', 'error');
        }
      }
    });
  }

  actualizarCliente(cliente: Cliente) {
    this.accion = 'actualizarCliente';
    this.modalTitle = 'Actualizar Cliente';
    this.clienteSeleccionado = { ...cliente };
    this.showModal = true;
  }

  confirmarAccionActualizar() {
    if (!this.validarCampos(this.clienteSeleccionado)) {
      return;
    }

    this.clienteService.update(this.clienteSeleccionado).subscribe(() => {
      Swal.fire('Cliente actualizado', 'Los datos fueron actualizados correctamente.', 'success');
      this.cargarClientes();
      this.cerrarModal();
    });
  }

  eliminarCliente(cliente: Cliente) {
    Swal.fire({
      title: '¿Eliminar cliente?',
      text: `Se eliminará a ${cliente.nombre} ${cliente.apellido}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.cc).subscribe(() => {
          Swal.fire('Eliminado', `El cliente ${cliente.nombre} ha sido eliminado.`, 'success');
          this.cargarClientes();
        });
      }
    });
  }

  private validarCampos(cliente: Cliente): boolean {
    if (
      !cliente.cc ||
      !cliente.nombre.trim() ||
      !cliente.apellido.trim() ||
      !cliente.direccion.trim() ||
      !cliente.telefono
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de continuar.',
        confirmButtonColor: '#3085d6',
      });
      return false;
    }

    if (cliente.cc <= 0 || cliente.telefono <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Datos inválidos',
        text: 'El número de documento y teléfono deben ser mayores que 0.',
        confirmButtonColor: '#3085d6',
      });
      return false;
    }

    return true;
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

  cerrarModal() {
    this.showModal = false;
  }
}
