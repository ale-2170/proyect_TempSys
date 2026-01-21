import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { Usuario } from './pages/usuario/usuario';
import { LayoutOne } from './layout/layout-one/layout-one';
import { LayoutTwo } from './layout/layout-two/layout-two';
import { Registro } from './pages/registro/registro';

export const routes: Routes = [

  // 🔐 AUTH
  {
    path: '',
    component: LayoutOne,
    children: [
      { path: 'login', component: Login },
      { path: 'registro', component: Registro },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  // 🏠 APP
  {
    path: '',
    component: LayoutTwo,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'usuarios', component: Usuario }
    ]
  },

  // ❌ NOT FOUND
  {
    path: '**',
    redirectTo: 'login'
  }
];
