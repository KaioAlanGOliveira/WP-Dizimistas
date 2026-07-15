import { Component, Input, Output, EventEmitter, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from "primeng/inputnumber";
import { Pagamento, PagamentoId, Pagamentos } from '../domain/Pagamentos.model';
import { PagamentoService } from '../service/pagamento.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FielList } from '../domain/Fieis.model';
import { FielService } from '../service/fiel.service';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-pops',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DialogModule,
    ButtonModule,
    InputMaskModule,
    MessageModule,
    InputTextModule,
    FormsModule,
    InputNumber,
    CommonModule,
    ReactiveFormsModule,
    RadioButtonModule,
    AutoCompleteModule
  ],
  templateUrl: './popPagamento.html',
  styleUrl: './popPagamento.css'
})
export class PopsPagamento implements OnChanges, OnInit {
  [x: string]: any;
  fieis: FielList[] = [];
  fieisFiltrados: any[] = []; 
  formularioPagamento!: FormGroup;

  private modo: 'initial' | 'creating' | 'editing' = 'initial';

  @Input() pagamentoSelecionado: Pagamentos | null = null;
  @Output() visivelChange = new EventEmitter<boolean>();
  @Input() visivel = false;
  @Input() cmpAtivo = false;
  @Input() alterar = false;

  private fb = inject(FormBuilder);
  private pagamentoService = inject(PagamentoService);

  private originalPagamento: Pagamentos | null = null;
  visivelPagamento: any;
  tipoPagamento: any;

  constructor(private fielService: FielService) { }

  ngOnInit() {
    this.initForm();
    this.carregarFieis();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visivel'] && !this.visivel) {
      this.resetToInitialState();
    }

    if (changes['pagamentoSelecionado'] && this.pagamentoSelecionado && this.formularioPagamento) {
      this.originalPagamento = { ...this.pagamentoSelecionado };
      this.formularioPagamento.patchValue(this.pagamentoSelecionado);
    }
  }

  private initForm(): void {
    this.formularioPagamento = this.fb.group({
      codigo: [{ value: '', disabled: true }],
      valor: [{ value: 0, disabled: true }, [Validators.required]],
      tipoPagamento: [{ value: 1, disabled: true }, [Validators.required]],
      nome: [''],
      cpf: [''],
    });
  }

  // ==================== CONTROLE CENTRALIZADO ====================
  private atualizarEstadoUI(): void {
    if (!this.formularioPagamento) return;
    const isInitial = this.modo === 'initial';

    if (isInitial) {
      this.formularioPagamento.disable();
    } else {
      this.formularioPagamento.enable();
      if (this.modo === 'editing') {
        this.formularioPagamento.get('codigo')?.disable();
      }
    }
  }

  get novoHabilitado() { return this.modo === 'initial'; }
  get alterarHabilitado() { return this.modo === 'initial' && !!this.pagamentoSelecionado; }
  get apagarHabilitado() { return this.modo === 'initial' && !!this.pagamentoSelecionado; }
  get fecharHabilitado() { return this.modo === 'initial'; }
  get salvarHabilitado() { return this.modo !== 'initial'; }
  get cancelarHabilitado() { return this.modo !== 'initial'; }

  // ==================== AÇÕES ====================
  novoPagamento() {
    this.modo = 'creating';
    this.formularioPagamento.reset({
      tipo: 0,
      valor: 0
    });
    this.originalPagamento = null;
    this.atualizarEstadoUI();
  }

  editarPagamento() {
    if (!this.pagamentoSelecionado) return;
    this.modo = 'editing';
    this.originalPagamento = { ...this.pagamentoSelecionado };
    this.formularioPagamento.patchValue(this.pagamentoSelecionado);
    this.atualizarEstadoUI();
  }

  salvarPagamento() {
    
    if (this.formularioPagamento.invalid) {
      this.formularioPagamento.markAllAsTouched();
      return;
    }

    const formRaw = this.formularioPagamento.getRawValue();
    const pg: Pagamento = new Pagamento();
    
    const koko:any = this.formularioPagamento.get('nome')?.getRawValue();

    pg.id = new PagamentoId();
    pg.id.cpf = koko['cpf'];
    pg.tipo = this.formularioPagamento.get('tipo')?.getRawValue();
    pg.valor = this.formularioPagamento.get('valor')?.getRawValue();
    console.log(this.formularioPagamento.get('tipo'));
    

    const payload: Pagamento = { ...pg };
    

    if (this.modo === 'creating') {
      this.salvarNovo(payload);
      // this.fecharModal();
      // this.recarregarPaginaInteira();
    } else {
      this.atualizarPagamento(payload);
    }
    this.modo = 'initial';
    this.atualizarEstadoUI();
  }

  private salvarNovo(payload: Pagamento) {
    this.pagamentoService.salvarPagamento(payload).subscribe({
      next: () => this.finalizarComSucesso(),
      error: (err) => console.error('Erro ao salvar pagamento:', err)
    });
  }

  private atualizarPagamento(payload: Pagamento) {
    if (!this.pagamentoSelecionado) return;

    const atualizado: Pagamentos = { ...this.pagamentoSelecionado, ...payload };

    this.pagamentoService.editarPagamento(atualizado).subscribe({
      next: () => this.finalizarComSucesso(),
      error: (err) => console.error('Erro ao atualizar pagamento:', err)
    });
  }

  apagarPagamento() {
    if (!this.pagamentoSelecionado?.codPagamento) return;

    this.pagamentoService.apagarPagamento(this.pagamentoSelecionado).subscribe({
      next: () => { this.finalizarComSucesso(); this.recarregarPaginaInteira(); },
      error: (err) => { this.finalizarComSucesso(); this.recarregarPaginaInteira(); },
    });
  }

  cancelarPagamento() {
    if (this.modo === 'creating') {
      this.fecharModal();
      this.recarregarPaginaInteira();
    } else if (this.modo === 'editing' && this.originalPagamento) {
      this.formularioPagamento.patchValue(this.originalPagamento);
      this.modo = 'initial';
      this.atualizarEstadoUI();
    }
  }

  private finalizarComSucesso() {
    this.fecharModal();
  }

  fecharModal() {
    this.modo = 'initial';
    this.originalPagamento = null;
    this.formularioPagamento.reset();
    this.visivel = false;
    this.visivelChange.emit(false);
  }

  recarregarPaginaInteira() {
    window.location.reload();
  }

  private resetToInitialState() {
    this.modo = 'initial';
    this.originalPagamento = null;
    if (this.pagamentoSelecionado) {
      this.formularioPagamento.patchValue(this.pagamentoSelecionado);
    }
    this.atualizarEstadoUI();
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

  buscarFieis(event: any) {
    const busca = event.query.toLowerCase().trim();

    this.fieisFiltrados = this.fieis.filter(fiel =>
      fiel.nome?.toLowerCase().includes(busca) ||
      fiel.cpf?.includes(busca)
    );
  }

}