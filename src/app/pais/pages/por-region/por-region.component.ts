import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
  ]
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania']
  regionActiva: string = '';
  paises: Country[] = [];
  error: string = '';

  constructor(private paisService: PaisService) { }

  ngOnInit(): void { }

  getClaseCSS(region: string): string {
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary'
  }

  activarRegion(region: string) {
    if(region !== this.regionActiva) {
      this.regionActiva = region;
      this.buscarRegion(region);
    }
  }

  buscarRegion(region: string) {
    this.paisService.buscarRegion(region).subscribe({
      next: (paises) => {
        this.paises = paises;
      },
      error: (err) => {
        this.paises = [];
        this.error = err
      }
    })
  }

}
