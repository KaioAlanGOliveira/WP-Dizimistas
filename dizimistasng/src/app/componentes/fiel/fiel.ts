import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask'; // Para CPF e Telefone
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FielService } from '../../service/fiel.service';
import { FielList } from '../../domain/FielList.model';
import { Router } from '@angular/router';
import { Pops } from '../../popsFiel/pops';

@Component({
  selector: 'app-fiel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputMaskModule, TableModule, Pops],
  templateUrl: './fiel.html',
  styleUrl: './fiel.css'
})
export class Fiel implements OnInit {
 
  alterar: boolean = false;
  fielSelecionado!: FielList;

  selecionado(fiel: FielList) {
    this.alterar = true;
    this.abrirMeuPopup();
    this.formularioFiel.patchValue(fiel);
    this.fielSelecionado = fiel;
  }

  // Começa falso para o pop-up iniciar fechado
  exibirModalPrincipal: boolean = false;

  fieis: FielList[] = [];
  fieisFiltrados: any[] = []; // Guarda a lista que aparece na tela

  constructor(private fielService: FielService) { }
  private router = inject(Router);

  irParaTelaInicial() {
    this.router.navigate(['/inicio']);
  }

  enviar() {
    throw new Error('Method not implemented.');
  }
  private fb = inject(FormBuilder);
  formularioFiel!: FormGroup;

  ngOnInit() {

    this.formularioFiel = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email]],
      idade: [null, [Validators.min(0), Validators.max(120)]],
      telefone: ['', [Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]]
    });
    this.carregarFieis();
  }

  carregarFieis(): void {
    this.fielService.listarTodos().subscribe({
      next: (dados) => {
        this.fieis = dados; // Atualiza o ecrã com os dados vindos do Java
        this.fieisFiltrados = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar fiéis do Java:', erro);
      }
    });
  }

  // Substitua apenas o método pesquisar por este:
  pesquisar(termo: string) {
    // 1. Garante que remove espaços em branco e passa para minúsculas
    const termoBusca = termo ? termo.toLowerCase().trim() : '';

    // 2. Se o campo estiver vazio, restaura a lista completa sem nova requisição à API
    if (!termoBusca) {
      this.fieisFiltrados = this.fieis;
      return;
    }

    // 3. Filtra localmente na memória avaliando se os campos existem
    this.fieisFiltrados = this.fieis.filter(f =>
      (f.nome && f.nome.toLowerCase().includes(termoBusca)) ||
      (f.cpf && f.cpf.includes(termoBusca))
    );
  }

   novoFiel() {
    this.alterar = false;
    this.exibirModalPrincipal = true;
  }

  abrirMeuPopup() {
    this.exibirModalPrincipal = true;
    this.alterar = true;
  }
}
