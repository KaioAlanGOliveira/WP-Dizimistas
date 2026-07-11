import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Fiel } from "./componentes/fiel/fiel";
import { Pagamento } from "./componentes/pagamento/pagamento";
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [
    trigger('routeAnimation', [
      transition('* => *', [

        style({
          opacity: 0,
          transform: 'translateX(80px)'
        }),

        animate(
          '1200ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({
            opacity: 1,
            transform: 'translateX(0)'
          })
        )

      ])
    ])
  ]
})
export class App {

  protected readonly title = signal('dizimistasng');

}