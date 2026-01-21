import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../service/usuario-service';
import { IUsuario } from '../../Interfaces/IUsuarios';


import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-update-user-dialog',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './update-user-dialog.html',
  styleUrl: './update-user-dialog.css',
})
export class UpdateUserDialog implements OnInit {
  private _fb = inject(FormBuilder);
  private _usuarioService = inject(UsuarioService);

  constructor(
    private dialogRef: MatDialogRef<UpdateUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: number,
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.GetUserById(this.data);
  }

  fgUsuario = this._fb.group({
    nombre: ['', Validators.required],
    correo: [''],
    isAdmin: [false],
    activo: [true],
  });

  object: IUsuario = {
    id: 0,
    nombre: '',
    email: '',
    contraseña: '',
    estado: false,
    isAdmin: false,
  };

  GetUserById(id: number) {
    this._usuarioService.GetUserById(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.fgUsuario.patchValue({
          nombre: data.nombre,
          correo: data.email,
          isAdmin: data.isAdmin,
          activo: data.estado,
        });
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  guardar() {
    console.log(this.fgUsuario.value);

    this.object.id = this.data;
    this.object.nombre = String(this.fgUsuario.get('nombre')?.value);
    this.object.email = String(this.fgUsuario.get('correo')?.value);
    this.object.isAdmin = Boolean(this.fgUsuario.get('isAdmin')?.value);
    this.object.estado = Boolean(this.fgUsuario.get('activo')?.value);

    this._usuarioService.UpdateUser(this.object).subscribe({
      next: (data) => {
        console.log(data);
      },
      error(err) {
        console.log(err.message);
      },
    });

    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
