import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TempService } from '../../service/temp-service';
import { ITemp } from '../../Interfaces/ITemp';
import { FormsModule } from '@angular/forms';
import { interval, startWith, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    console.log('Funciono');
    this.GetTempNow();
    this.getTempByTime(1440);

    // Ejecuta inmediatamente y luego cada 5 minutos
    interval(5 * 60 * 1000)
      .pipe(
        startWith(0), // ejecuta al iniciar
        switchMap(() => this._tempservice.GetTempNow()),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (data) => console.log('DATA:', data),
        error: (err) => console.error('ERROR:', err),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _tempservice = inject(TempService);
  tempNow: number = 0;
  humedaNow: number = 0;
  tempAfter: number = 0;
  humedadAfter: number = 0;
  selectedMinutes: number = 0;

  getTempByTime(minutes: number) {
    this._tempservice.GetTempByMinutes(minutes).subscribe({
      next: (data) => {
        console.log(data);
        this.tempAfter = data.temperatura;
        this.humedadAfter = data.humedadPorcentaje;

         this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  GetTempNow() {
    this._tempservice.GetTempNow().subscribe({
      next: (data: any) => {
        console.log(data);
        this.tempNow = data.temperatura;
        this.humedaNow = data.humedadPorcentaje;

        console.log('Humeda es igual a: ', this.humedaNow);
        console.log('temperatura es igual a: ', this.tempNow);

         this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
}
