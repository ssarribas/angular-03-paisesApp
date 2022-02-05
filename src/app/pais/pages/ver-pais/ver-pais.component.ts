import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { PaisService } from '../../services/pais.service';
import { Country, Translation } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;
  translations: Translation[] = [];
  error: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.paisService.getPaisPorAlpha(id)),
        tap(console.log)
      )
      .subscribe(pais => {
        this.pais = pais[0];
        this.translations = Object.values<Translation>(this.pais.translations);
        console.log(this.translations);
      })

    // this.activatedRoute.params
    //   .subscribe(({id}) => {
    //     console.log(id);
    //     this.paisService.getPaisPorAlpha(id).subscribe( pais => {
    //       console.log(pais);
    //     })
    //   })
  }

}
