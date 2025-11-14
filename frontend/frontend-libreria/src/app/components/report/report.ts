import { Component } from '@angular/core';
import { ReportService } from '../../services/report-service';
import { js2xml } from 'xml-js';

declare const pdfMake: any;

@Component({
  selector: 'app-report',
  templateUrl: './report.html',
  styleUrl: './report.scss',
})
export class Report {

  constructor(private informeService: ReportService) {}

  generarReportes() {
    this.informeService.obtenerInforme().subscribe((data) => {
      this.generarInformeXML(data);
      this.generarInformeResumen(data);
    });
  }

  generarInformeXML(data: any) {
    const xml = js2xml(data, { compact: true, spaces: 2 });

    const docDefinition = {
      content: [
        { text: 'Árbol XML del Informe', style: 'header' },
        { text: xml, fontSize: 10 }
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] }
      }
    };

    pdfMake.createPdf(docDefinition).download('informe-xml.pdf');
  }

  generarInformeResumen(data: any) {
    const docDefinition = {
      content: [
        { text: 'Resumen del Informe', style: 'header' },

        `Total de clientes: ${data.cantClientes}`,
        `Total de libros: ${data.cantLibros}`,
        `Libros prestados: ${data.cantLibrosPrestados}`,
        `Porcentaje prestados: ${data.porcentajeLibrosPrestados}%`,

        { text: '\nLibros por género:', bold: true },
        {
          ul: Object.entries(data.librosPorGenero)
            .map(([genero, cant]) => `${genero}: ${cant}`)
        },

        { text: '\nClientes con más préstamos:', bold: true },
        { ul: data.clientesConMasPrestamos },

        `\nPromedio libros prestados por cliente: ${data.promedioLibrosPrestadosPorCliente}`
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] }
      }
    };

    pdfMake.createPdf(docDefinition).download('informe-resumen.pdf');
  }
}
