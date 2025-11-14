import { Component } from '@angular/core';
import { ReportService } from '../../services/report-service';

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

  convertToXML(obj: any, indent: string = ''): string {
    let xml = '';

    for (let key in obj) {
      const value = obj[key];

      if (typeof value === 'object' && value !== null) {
        xml += `${indent}<${key}>\n`;
        xml += this.convertToXML(value, indent + '  ');
        xml += `${indent}</${key}>\n`;
      } else {
        xml += `${indent}<${key}>${value}</${key}>\n`;
      }
    }

    return xml;
  }

  generarInformeXML(data: any) {
    const xml = this.convertToXML(data);

    const docDefinition = {
      content: [
        { text: 'Árbol XML del Informe', style: 'header' },
        { text: xml, fontSize: 9 }
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
