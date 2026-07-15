import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask'; // Para CPF e Telefone
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PagamentoService } from '../../service/pagamento.service';
import { Pagamentos } from '../../domain/Pagamentos.model';
import { Router } from '@angular/router';
import { PopsPagamento } from '../../popPagamento/popPagamento';
import { PagamentosVw } from '../../domain/PagamentosVw.model';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputMaskModule, TableModule, PopsPagamento],
  templateUrl: './pagamento.html',
  styleUrl: './pagamento.css'
})
export class Pagamento implements OnInit {


  // Começa falso para o pop-up iniciar fechado
  exibirModalPrincipal: boolean = false;

  pagamentosList: PagamentosVw[] = [];
  pagamentosVwList: PagamentosVw[] = [];
  pagamentosFiltrados: any[] = []; // Guarda a lista que aparece na tela

  constructor(private PagamentoService: PagamentoService) { }
  private router = inject(Router);

  alterar: boolean = false;
  pagamentoSelecionado: any;

  private fb = inject(FormBuilder);
  formularioPagamento!: FormGroup;

  novoPagamento() {
    this.alterar = false;
    this.exibirModalPrincipal = true;
    this.abrirMeuPopup();
  }

  selecionado(pg: Pagamentos) {
    this.alterar = true;
    this.formularioPagamento.patchValue(pg);
    this.pagamentoSelecionado = pg;
    this.abrirMeuPopup();
  }

  irParaTelaInicial() {
    this.router.navigate(['/inicio']);
  }

  enviar() {
    throw new Error('Method not implemented.');
  }


  ngOnInit() {

    this.formularioPagamento = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email]],
      idade: [null, [Validators.min(0), Validators.max(120)]],
      telefone: ['', [Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]]
    });
    this.carregarPagamentos();
  }

  carregarPagamentos(): void {
    this.PagamentoService.listarTodosVw().subscribe({
      next: (dados) => {
        this.pagamentosList = dados; // Atualiza o ecrã com os dados vindos do Java
        this.pagamentosFiltrados = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar pagamentos do Java:', erro);
      }
    });
  }

  // Substitua apenas o método pesquisar por este:
  pesquisar(termo: string) {

    const termoBusca = termo ? termo.toLowerCase().trim() : '';

    // 2. Se o campo estiver vazio, restaura a lista completa sem nova requisição à API
    if (!termoBusca) {
      this.pagamentosFiltrados = this.pagamentosList;
      return;
    }

    // 3. Filtra localmente na memória avaliando se os campos existem
    this.pagamentosFiltrados = this.pagamentosVwList.filter(pg =>
      (pg.nome && pg.nome.toLowerCase().includes(termoBusca))
    );
  }

  abrirMeuPopup() {
    this.exibirModalPrincipal = true;
    this.alterar = true;
  }

}
