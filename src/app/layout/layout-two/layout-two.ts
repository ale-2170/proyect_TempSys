import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from '../../components/side-bar/side-bar';

@Component({
  selector: 'app-layout-two',
  imports: [RouterOutlet, SideBar],
  templateUrl: './layout-two.html',
  styleUrl: './layout-two.css',
})
export class LayoutTwo {}
