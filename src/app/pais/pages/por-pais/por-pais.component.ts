import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent implements OnInit {

  termino: string = 'Esp';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService:PaisService) { }

  ngOnInit(): void {
  }

  buscar(termino:string) {
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(this.termino)
      .subscribe({
        next: (paises) => {
          console.log(paises);
          this.paises = paises;
        },
        error: (err) => {
          this.hayError = true;
          this.paises = []
        }
    });
  }

  sugerencias(termino:string) {
    this.hayError = false;
    this.mostrarSugerencias = true;
    if(termino.length > 0) {
      this.paisService.buscarPais(termino).subscribe({
        next: (paises) => {
          this.paisesSugeridos = paises.slice(0,5);
        },
        error: (err) => {
          this.paisesSugeridos = [];
          this.hayError = true;
        }
      })
    } else {
      this.paisesSugeridos = []
    }
  }

}
