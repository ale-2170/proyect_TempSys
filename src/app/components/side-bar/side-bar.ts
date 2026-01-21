import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [RouterModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {
  private _router = inject(Router);

  public GotoDashboard() {
    this._router.navigate(['dashboard']);
  }

  public GotoUsuario() {
    this._router.navigate(['usuarios']);
  }
}
