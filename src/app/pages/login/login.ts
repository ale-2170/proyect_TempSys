import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth-service';
import { ILogin } from '../../Interfaces/ILogin';
import { Router, RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  loginFg = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    clave: ['', Validators.required]
  });

  IniciarSesion() {

    if (this.loginFg.invalid) {
      this.loginFg.markAllAsTouched();
      return;
    }

    const obj: ILogin = {
      email: this.loginFg.value.email!,
      clave: this.loginFg.value.clave!
    };

this._authService.login(obj).subscribe({
  next: () => {
    this._router.navigate(['/dashboard']);
  },
  error: (error) => {
    Swal.fire({
      icon: 'error',
      title: 'Error de autenticación',
      text: error?.error?.message || 'Usuario o contraseña incorrectos',
      confirmButtonText: 'Aceptar'
    });
  }
});
  }

}
