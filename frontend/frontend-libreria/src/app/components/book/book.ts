import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Modal } from '../modal/modal';

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  editorial: string;
  genero: string;
  prestado: boolean;
}

@Component({
  selector: 'app-book',
  imports: [FormsModule, Modal],
  templateUrl: './book.html',
  styleUrl: './book.scss',
})
export class Book implements OnInit{
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

  clientes = [
    { cc: 101, nombre: 'Laura', apellido: 'Gómez' },
    { cc: 102, nombre: 'Carlos', apellido: 'Ruiz' }
  ];
  
  libroId = 0;
  clienteCC = 0;

  libroSeleccionado = { titulo: '', autor: '', editorial: '' };
  clienteSeleccionado = { nombre: '', apellido: '' };


  ngOnInit(): void {}

  abrirModalNuevoLibro() {
    this.accion = 'agregar';
    this.modalTitle = 'Agregar libro';
    this.showModal = true;
    
    this.nuevoLibro = {
      id: '',
      titulo: '',
      autor: '',
      editorial: '',
      genero: ''
    };
  }

  confirmarAccion() {
    // Aquí puedes colocar la lógica para guardar el libro o lo que necesites
    console.log('Acción confirmada:', this.nuevoLibro);
    // Por ejemplo, podrías emitir un evento o cerrar el modal
  }

  cerrarModal() {
    this.showModal = false;
  }

  registrarPrestamo() {
    this.accion = 'registrarPrestamo';
    this.modalTitle = 'Registrar préstamo de libro';
    this.showModal = true;

    this.cargarDatosLibro();
    this.cargarDatosCliente();

  }

  cargarDatosLibro() {
    const libro = this.libros.find(l => l.id === this.libroId);
    if (libro) {
      this.libroSeleccionado = { 
        titulo: libro.titulo, 
        autor: libro.autor, 
        editorial: libro.editorial 
      };
    } else {
      this.libroSeleccionado = { titulo: '', autor: '', editorial: '' };
      alert('Libro no encontrado');
    }
  }

  cargarDatosCliente() {
    const cliente = this.clientes.find(c => c.cc === this.clienteCC);
    if (cliente) {
      this.clienteSeleccionado = { 
        nombre: cliente.nombre, 
        apellido: cliente.apellido 
      };
    } else {
      this.clienteSeleccionado = { nombre: '', apellido: '' };
      alert('Cliente no encontrado');
    }
  }

  marcarDevuelto() {
    alert('Marcar libro como devuelto');
  }
}

