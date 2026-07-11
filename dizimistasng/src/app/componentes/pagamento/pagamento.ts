import { Component } from '@angular/core';


import { inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask'; // Para CPF e Telefone
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.html',
  styleUrl: './pagamento.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputMaskModule, TableModule],
})
export class Pagamento implements OnInit {
  private fb = inject(FormBuilder);
  formularioFiel!: FormGroup;

  ngOnInit() {

    console.log(this.fieis);
    this.formularioFiel = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email]],
      idade: [null, [Validators.min(0), Validators.max(120)]],
      telefone: ['', [Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]]
    });
  }

  sumeterFiel() {
    if (this.formularioFiel.valid) {
      console.log('Dados do Fiel prontos para enviar:', this.formularioFiel.value);
      // Aqui você faz a requisição HTTP para a sua API Java
    } else {
      this.formularioFiel.markAllAsTouched();
    }
  }

  fieis = [
    {
      nome: 'João Silva',
      cpf: '123.456.789-00',
      telefone: '(61) 99999-9999',
      email: 'joao@email.com',
      cidade: 'Brasília'
    },
    {
      nome: 'Maria Oliveira',
      cpf: '987.654.321-00',
      telefone: '(61) 98888-8888',
      email: 'maria@email.com',
      cidade: 'Taguatinga'
    },
    {
      nome: 'Pedro Santos',
      cpf: '111.222.333-44',
      telefone: '(61) 97777-7777',
      email: 'pedro@email.com',
      cidade: 'Ceilândia'
    }
  ];
}
