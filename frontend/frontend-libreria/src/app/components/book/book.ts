import { Component, OnInit } from '@angular/core';

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
  imports: [],
  templateUrl: './book.html',
  styleUrl: './book.scss',
})
export class Book implements OnInit{
  libros: Libro[] = [
    { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', editorial: 'Sudamericana', genero: 'Realismo mágico', prestado: false },
    { id: 2, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', editorial: 'Francisco de Robles', genero: 'Novela', prestado: true }
  ];

  ngOnInit(): void {}

  abrirModalNuevoLibro() {
    alert('Abrir modal para agregar un nuevo libro 📘');
  }

  registrarPrestamo() {
    alert('Registrar préstamo de libro');
  }

  marcarDevuelto() {
    alert('Marcar libro como devuelto');
  }
}
