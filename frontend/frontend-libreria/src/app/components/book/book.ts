import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Modal } from '../modal/modal';
import Swal from 'sweetalert2';

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  editorial: string;
  genero: string;
  prestado: boolean;
}

interface Cliente {
  cc: number;
  nombre: string;
  apellido: string;
}

@Component({
  selector: 'app-book',
  imports: [FormsModule, Modal],
  templateUrl: './book.html',
  styleUrl: './book.scss',
})
export class Book implements OnInit {
  showModal = false;
  accion = '';
  modalTitle = '';

  nuevoLibro = {
    id: '',
    titulo: '',
    autor: '',
    editorial: '',
    genero: ''
  };

  libros: Libro[] = [
    { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', editorial: 'Sudamericana', genero: 'Realismo mágico', prestado: false },
    { id: 2, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', editorial: 'Francisco de Robles', genero: 'Novela', prestado: true }
  ];

  clientes: Cliente[] = [
    { cc: 101, nombre: 'Laura', apellido: 'Gómez' },
    { cc: 102, nombre: 'Carlos', apellido: 'Ruiz' }
  ];

  libroId: number | null = null;
  clienteCC: number | null = null;

  libroSeleccionado: Partial<Libro> = { titulo: '', autor: '', editorial: '' };
  clienteSeleccionado: Partial<Cliente> = { nombre: '', apellido: '' };

  ngOnInit(): void {}

  abrirModalNuevoLibro() {
    this.accion = 'agregar';
    this.modalTitle = 'Agregar libro';
    this.showModal = true;

    this.nuevoLibro = { id: '', titulo: '', autor: '', editorial: '', genero: '' };
  }

  confirmarAccion() {
    console.log('Acción confirmada:', this.nuevoLibro);
    Swal.fire({
      icon: 'success',
      title: 'Libro agregado',
      text: `El libro "${this.nuevoLibro.titulo}" se ha agregado correctamente.`,
      confirmButtonColor: '#28a745'
    });
    this.cerrarModal();
  }

  cerrarModal() {
    this.showModal = false;
  }

  // 📗 Modal de préstamo
  registrarPrestamo() {
    this.accion = 'registrarPrestamo';
    this.modalTitle = 'Registrar préstamo de libro';
    this.showModal = true;
  }

  cargarDatosLibro() {
    const libro = this.libros.find(l => l.id === this.libroId);
    if (libro) {
      this.libroSeleccionado = libro;
    } else {
      this.libroSeleccionado = { titulo: '', autor: '', editorial: '' };
      Swal.fire({
        icon: 'error',
        title: 'Libro no encontrado',
        text: `No existe ningún libro con el ID ${this.libroId}.`,
        confirmButtonColor: '#d33'
      });
    }
  }

  cargarDatosCliente() {
    const cliente = this.clientes.find(c => c.cc === this.clienteCC);
    if (cliente) {
      this.clienteSeleccionado = cliente;
    } else {
      this.clienteSeleccionado = { nombre: '', apellido: '' };
      Swal.fire({
        icon: 'error',
        title: 'Cliente no encontrado',
        text: `No existe ningún cliente con la cédula ${this.clienteCC}.`,
        confirmButtonColor: '#d33'
      });
    }
  }

  confirmarAccionPrestamo() {
    if (!this.libroSeleccionado?.titulo || !this.clienteSeleccionado?.nombre) {
      Swal.fire({
        icon: 'warning',
        title: 'Faltan datos',
        text: 'Debes ingresar IDs válidos para el libro y el cliente antes de registrar el préstamo.',
        confirmButtonColor: '#f0ad4e'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Nuevo prestamo registrado',
      text: `El libro se ha prestado correctamente.`,
      confirmButtonColor: '#28a745'
    });
    this.cerrarModal();
  }

  marcarDevuelto() {
    Swal.fire({
      icon: 'info',
      title: 'Devolución registrada',
      text: 'El libro se ha marcado como devuelto.',
      confirmButtonColor: '#00bcd4'
    });
  }
}
