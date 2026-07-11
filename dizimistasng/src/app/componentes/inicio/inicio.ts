import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';  

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ButtonModule],  
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit { 

  private router = inject(Router);
  items: MenuItem[] | undefined;

  irParaPagamento() {
    this.router.navigate(['/pagamento']);
  }

  irParaFiel() {
    this.router.navigate(['/Fiel']);
  }

  ngOnInit() {
    this.items = [
      { label: 'Início', icon: 'pi pi-home', routerLink: '/inicio' },
      { label: 'Fiel', icon: 'pi pi-user', routerLink: '/Fiel' },
      { label: 'Pagamento', icon: 'pi pi-credit-card', routerLink: '/pagamento' }
    ];
  }
}
