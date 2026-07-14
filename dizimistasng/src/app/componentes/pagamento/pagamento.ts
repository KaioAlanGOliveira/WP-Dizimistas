import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { PagamentoService } from '../../service/pagamento.service';
import { Pagamentos } from '../../domain/Pagamentos.model';
import { Router } from '@angular/router';
import { Pops } from '../../popPagamento/popPagamento';
import { EventEmitter } from 'stream';


@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    TableModule,
    Pops
  ],
  templateUrl: './pagamento.html',
  styleUrl: './pagamento.css'
})
export class Pagamento implements OnInit {

  @Input() visivel: boolean = false;
  @Input() alterar: boolean = false;
  @Input() pagamentoSelecionado: Pagamentos | null = null;

  @Output() visivelChange = new EventEmitter<boolean>();

  selecionado(pagamento: Pagamentos) {
    this.alterar = true;
    this.abrirMeuPopup();
    this.formularioPagamento.patchValue(pagamento);
    this.pagamentoSelecionado = pagamento;
  }

  exibirModalPrincipal: boolean = false;

  pagamentos: Pagamentos[] = [];
  pagamentosFiltrados: Pagamentos[] = [];

  constructor(private pagamentoService: PagamentoService) { }

  private router = inject(Router);

  private fb = inject(FormBuilder);
  formularioPagamento!: FormGroup;

  irParaTelaInicial() {
    this.router.navigate(['/inicio']);
  }

  enviar() {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {

    this.formularioPagamento = this.fb.group({
      cpf: ['', [
        Validators.required,
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
      ]],
      nome: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.email
      ]],
      idade: [null, [
        Validators.min(0),
        Validators.max(120)
      ]],
      telefone: ['', [
        Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)
      ]]
    });

    this.carregarPagamentos();
  }

  carregarPagamentos(): void {
    this.pagamentoService.listarTodos().subscribe({
      next: (dados) => {
        this.pagamentos = dados;
        this.pagamentosFiltrados = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar pagamentos do Java:', erro);
      }
    });
  }

  pesquisar(termo: string) {

    const termoBusca = termo ? termo.toLowerCase().trim() : '';

    if (!termoBusca) {
      this.pagamentosFiltrados = this.pagamentos;
      return;
    }

    this.pagamentosFiltrados = this.pagamentos.filter(p =>
      (p && p)
    );
  }

  novoPagamento() {
    this.alterar = false;
    this.exibirModalPrincipal = true;
  }

  abrirMeuPopup() {
    this.exibirModalPrincipal = true;
    this.alterar = true;
  }

}