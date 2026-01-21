import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Console, error } from 'console';
import { IUsuario } from '../../Interfaces/IUsuarios';
import { UsuarioService } from '../../service/usuario-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
private _fb = inject(FormBuilder)
private _UsuarioService = inject(UsuarioService)
private _route = inject(Router)

RegistroFg = this._fb.group({
  nombre:['',Validators.required],
  email:['', [Validators.required, Validators.email]],
  clave:['', Validators.required],
  claveConf:['',Validators.required]
})

Prueba(){
  Swal.fire('Prueba', 'SweetAlert funciona', 'success');
}

Registrar() {

  // 1️⃣ Formulario inválido
  if (this.RegistroFg.invalid) {
    Swal.fire({
      icon: 'warning',
      title: 'Formulario incompleto',
      text: 'Por favor completa todos los campos correctamente.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  // 2️⃣ Contraseñas diferentes
  if (
    this.RegistroFg.get('clave')?.value !==
    this.RegistroFg.get('claveConf')?.value
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Contraseñas no coinciden',
      text: 'Las contraseñas deben ser iguales.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  // 3️⃣ Construir objeto
  const obj: IUsuario = {
    id: 0,
    nombre: String(this.RegistroFg.get('nombre')?.value),
    email: String(this.RegistroFg.get('email')?.value),
    contraseña: String(this.RegistroFg.get('clave')?.value),
    estado: true,
    isAdmin: false
  };

  // 4️⃣ Alerta de carga
  Swal.fire({
    title: 'Creando usuario...',
    didOpen: () => Swal.showLoading(),
    allowOutsideClick: false
  });

  // 5️⃣ Llamada al servicio
  this._UsuarioService.SetUser(obj).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Tu cuenta fue creada correctamente.',
        confirmButtonText: 'Ir a iniciar sesión'
      }).then(() => {
        this._route.navigate(['/login']);
      });
    },

    // 6️⃣ Error al crear usuario
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear usuario',
        text:
          err?.error?.message ||
          'No se pudo crear el usuario. Intenta nuevamente.',
        confirmButtonText: 'Aceptar'
      });
    }
  });
}


}
