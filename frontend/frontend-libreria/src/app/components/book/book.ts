import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Modal } from '../modal/modal';
import Swal from 'sweetalert2';
import { BookService } from '../../services/book-service';
import { ClientService } from '../../services/client-service';

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
  libros: Libro[] = [];
  showModal = false;
  accion = '';
  modalTitle = '';

  nuevoLibro = {
    id: '',
    titulo: '',
    autor: '',
    editorial: '',
    genero: '',
    prestado: false
  };

  libroId: number | null = null;
  clienteCC: number | null = null;

  libroSeleccionado: any = { id: 0, titulo: '', autor: '', editorial: '', genero: '', prestado: false };
  clienteSeleccionado: any = { nombre: '', apellido: '' };

  constructor(private bookService: BookService, private clientService: ClientService) {}

  ngOnInit(): void {
    this.cargarLibros();

    this.bookService.libro$.subscribe(event => {
      if (event) this.cargarLibros();
    });
  }

  cargarLibros() {
    this.bookService.getAll().subscribe({
      next: (data) => (this.libros = data),
      error: (err) => console.error(err),
    });
  }

  // ----------------------Agregar libro-----------------------
  abrirModalNuevoLibro() {
    this.accion = 'agregar';
    this.modalTitle = 'Agregar libro';
    this.showModal = true;
    this.nuevoLibro = { id: '', titulo: '', autor: '', editorial: '', genero: '', prestado: false };
  }

  confirmarAccion() {
    const { id, titulo, autor, editorial, genero } = this.nuevoLibro;

    if (!id || !titulo.trim() || !autor.trim() || !editorial.trim() || !genero.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de guardar el libro.',
        confirmButtonColor: '#f0ad4e'
      });
      return;
    }

    if (isNaN(Number(id)) || Number(id) <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'ID inválido',
        text: 'El ID debe ser un número positivo.',
        confirmButtonColor: '#f0ad4e'
      });
      return;
    }

    const libroExistente = this.libros.find(l => l.id === Number(id));
    if (libroExistente) {
      Swal.fire({
        icon: 'warning',
        title: 'ID duplicado',
        text: `Ya existe un libro con el ID ${id}.`,
        confirmButtonColor: '#f0ad4e'
      });
      return;
    }

    this.bookService.create(this.nuevoLibro).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Libro agregado',
          text: `El libro "${res.titulo}" se ha agregado correctamente.`,
          confirmButtonColor: '#28a745'
        });
        this.bookService.notifyChange();
        this.limpiarCampos();
        this.cerrarModal();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al agregar libro',
          text: err.error || 'Ocurrió un error inesperado.',
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  cerrarModal() {
    this.showModal = false;
  }

  // -----------------------Registrar préstamo-----------------------
  registrarPrestamo() {
    this.accion = 'registrarPrestamo';
    this.modalTitle = 'Registrar préstamo de libro';
    this.showModal = true;
    this.limpiarCampos();
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
    if (!this.clienteCC) {
      Swal.fire({
        icon: 'warning',
        title: 'Cédula no válida',
        text: 'Debes ingresar una cédula antes de buscar.',
        confirmButtonColor: '#f0ad4e'
      });
      return;
    }

    this.clientService.getById(this.clienteCC).subscribe({
      next: (cliente) => {
        this.clienteSeleccionado = cliente;
      },
      error: () => {
        this.clienteSeleccionado = { nombre: '', apellido: '' };
        Swal.fire({
          icon: 'error',
          title: 'Cliente no encontrado',
          text: `No existe ningún cliente con la cédula ${this.clienteCC}.`,
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  confirmarAccionPrestamo() {
    if (!this.libroId || !this.clienteCC) {
      Swal.fire({
        icon: 'warning',
        title: 'Faltan datos',
        text: 'Debes ingresar IDs válidos para el libro y el cliente antes de registrar el préstamo.',
        confirmButtonColor: '#f0ad4e'
      });
      return;
    }

    this.bookService.prestarLibro(this.libroId, this.clienteCC).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Préstamo registrado',
          text: `El libro se ha prestado correctamente.`,
          confirmButtonColor: '#28a745'
        });
        this.bookService.notifyChange();
        this.limpiarCampos();
        this.cerrarModal();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar préstamo',
          text: err.error || 'Ocurrió un error inesperado.',
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  // ----------------------Registrar devolución----------------------
  marcarDevuelto() {
    this.accion = 'registrarDevolucion';
    this.modalTitle = 'Registrar devolución';
    this.showModal = true;
    this.limpiarCampos();
  }

  confirmarAccionDevolucion() {
    if (!this.libroId || !this.clienteCC) {
      Swal.fire({
        icon: 'warning',
        title: 'Faltan datos',
        text: 'Debes ingresar IDs válidos para el libro y el cliente antes de registrar la devolución.',
        confirmButtonColor: '#f0ad4e'
      });
      return;
    }

    const libro = this.libros.find(l => l.id === this.libroId);
    if (libro && !libro.prestado) {
      Swal.fire({
        icon: 'info',
        title: 'Libro disponible',
        text: `El libro "${libro.titulo}" ya está disponible.`,
        confirmButtonColor: '#17a2b8'
      });
      return;
    }

    this.bookService.devolverLibro(this.libroId, this.clienteCC).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Devolución registrada',
          text: `El libro se ha devuelto correctamente.`,
          confirmButtonColor: '#28a745'
        });
        this.bookService.notifyChange();
        this.limpiarCampos();
        this.cerrarModal();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar devolución',
          text: err.error || 'Ocurrió un error inesperado.',
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  // ---------------------Limpiar campos---------------------
  limpiarCampos() {
    this.nuevoLibro = { id: '', titulo: '', autor: '', editorial: '', genero: '', prestado: false };
    this.libroId = null;
    this.clienteCC = null;
    this.libroSeleccionado = { titulo: '', autor: '', editorial: '' };
    this.clienteSeleccionado = { nombre: '', apellido: '' };
  }
}
