import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario-service';
import { Ipagination } from '../../Interfaces/Ipagination';
import { IPaginatedResponse, IUser } from '../../Interfaces/IPaginatedResponse';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserDialog } from '../update-user-dialog/update-user-dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  imports: [FormsModule, CommonModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario implements OnInit {
  private _usuarioService = inject(UsuarioService);
  private cdr = inject(ChangeDetectorRef);
  page: number = 1;
  pageSize: number = 10;

  totalPage: number = 0;
  pageActual: number = 0;
  totalItems: number = 0;

  pagination: Ipagination = {
    page: this.page,
    pageSize: this.pageSize,
  };

  usuario: IUser[] = [];

  ngOnInit(): void {
    this.GetUserPagination(this.pagination);
  }

  constructor(private dialog: MatDialog) {}

  GetUserPagination(pagination: Ipagination) {
    this._usuarioService.GetUserPagination(pagination).subscribe({
      next: (data: IPaginatedResponse) => {
        console.log(data);
        this.usuario = data.items;
        this.totalPage = data.totalPages;
        this.totalItems = data.totalItems;

         this.cdr.detectChanges();
      },
      error(err) {
        console.log(err.message);
      },
    });
  }

  ReloadUserPagination(page: number, pageSize: number) {
    this.pagination.page = page;
    this.pagination.pageSize = pageSize;

    this.GetUserPagination(this.pagination);
  }

  NextPagination() {
    if (this.pagination.page < this.totalPage) {
      this.pagination.page++;
      console.log(this.pagination.page);
      this.GetUserPagination(this.pagination);
    }
  }

  BackPagination() {
    if (this.pagination.page > 1) {
      console.log(this.pagination.page);
      this.pagination.page--;
      this.GetUserPagination(this.pagination);
    }
  }

  openDialog(id: number) {
    const dialogRef = this.dialog
      .open(UpdateUserDialog, {
        data: id,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) this.GetUserPagination(this.pagination);
      });
  }
}
