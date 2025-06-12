import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  cocktails = [
    {
      title: 'Manhattan',
      subtitle: '¿Vienes del pasado?',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates, cumque..',
      image: 'https://imag.bonviveur.com/manhattan.jpg'
    },
    {
      title: 'Blue Lagoon',
      subtitle: 'El nuevo invitado',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, aspernatur?',
      image: 'https://cdn0.recetasgratis.net/es/posts/6/4/3/blue_lagoon_coctel_laguna_azul_77346_orig.jpg'
    },
    // ...agrega más cócteles aquí
  ];
}