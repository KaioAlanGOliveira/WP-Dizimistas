import { Component, Input, Output, EventEmitter, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from "primeng/inputnumber";
import { FielList } from '../domain/Fieis.model';
import { FielService } from '../service/fiel.service';

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
    InputNumber
  ],
  templateUrl: './popsFiel.html',
  styleUrl: './popsFiel.css'
})
export class PopsFiel implements OnChanges, OnInit {

  fieis: FielList[] = [];

  formularioFiel!: FormGroup;

  private modo: 'initial' | 'creating' | 'editing' = 'initial';

  @Input() fielSelecionado: FielList | null = null;
  @Output() visivelChange = new EventEmitter<boolean>();
  @Input() visivel = false;
  @Input() cmpAtivo = false;
  @Input() alterar = false;

  private fb = inject(FormBuilder);
  private fielService = inject(FielService);

  private originalFiel: FielList | null = null;

  ngOnInit() {
    this.initForm();
    this.carregarFieis();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visivel'] && !this.visivel) {
      this.resetToInitialState();
    }

    if (changes['fielSelecionado'] && this.fielSelecionado && this.formularioFiel) {
      this.originalFiel = { ...this.fielSelecionado };
      this.formularioFiel.patchValue(this.fielSelecionado);
    }
  }

  private initForm(): void {
    this.formularioFiel = this.fb.group({
      cpf: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      nome: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(3)]],
      email: [{ value: '', disabled: true }, [Validators.email]],
      idade: [{ value: null, disabled: true }, [Validators.min(0), Validators.max(120)]],
      telefone: [{ value: '', disabled: true }]
    });
  }

  carregarFieis() {
    this.fielService.listarTodos().subscribe({
      next: (dados) => this.fieis = dados || [],
      error: (err) => console.error('Erro ao buscar fiéis:', err)
    });
  }

  // ==================== CONTROLE CENTRALIZADO ====================
  private atualizarEstadoUI(): void {
    if (!this.formularioFiel) return;
    const isInitial = this.modo === 'initial';

    if (isInitial) {
      this.formularioFiel.disable();
    } else {
      this.formularioFiel.enable();
      if (this.modo === 'editing') {
        this.formularioFiel.get('cpf')?.disable();
      }
    }
  }

  get novoHabilitado() { return this.modo === 'initial'; }
  get alterarHabilitado() { return this.modo === 'initial' && !!this.fielSelecionado; }
  get apagarHabilitado() { return this.modo === 'initial' && !!this.fielSelecionado; }
  get fecharHabilitado() { return this.modo === 'initial'; }
  get salvarHabilitado() { return this.modo !== 'initial'; }
  get cancelarHabilitado() { return this.modo !== 'initial'; }

  // ==================== AÇÕES ====================
  novoFiel() {
    this.modo = 'creating';
    this.formularioFiel.reset();
    this.originalFiel = null;
    this.atualizarEstadoUI();
  }

  editar() {
    if (!this.fielSelecionado) return;
    this.modo = 'editing';
    this.originalFiel = { ...this.fielSelecionado };
    this.formularioFiel.patchValue(this.fielSelecionado);
    this.atualizarEstadoUI();
  }

  private removerMascaras(valor: any): string {
    if (!valor) return '';
    return valor.toString().replace(/\D/g, '');
  }

  salvar() {
    if (this.formularioFiel.invalid) {
      this.formularioFiel.markAllAsTouched();
      return;
    }

    const formRaw = this.formularioFiel.getRawValue();
    const payload: FielList = {
      ...formRaw,
      cpf: this.removerMascaras(formRaw.cpf),
      telefone: this.removerMascaras(formRaw.telefone)
    };

    if (this.modo === 'creating') {
      this.salvarNovo(payload);
      this.fecharModal();
    } else {
      this.atualizarFiel(payload);
    }
    this.modo = 'initial';
    this.atualizarEstadoUI();
  }

  private salvarNovo(payload: FielList) {
    this.fielService.salvarFiel(payload).subscribe({
      next: () => this.finalizarComSucesso(),
      error: (err) => console.error('Erro ao salvar fiel:', err)
    });
  }

  private atualizarFiel(payload: FielList) {
    if (!this.fielSelecionado) return;

    const atualizado: FielList = { ...this.fielSelecionado, ...payload };

    this.fielService.editarFiel(atualizado).subscribe({
      next: (a) => {
               console.log(a);   
               this.finalizarComSucesso();  
      },
      error: (err) => console.error('Erro ao atualizar fiel:', err)
    });
  }

  apagar() {
    if (!this.fielSelecionado?.cpf) return;

    this.fielService.apagarFiel(this.fielSelecionado).subscribe({
      next: () => {this.finalizarComSucesso(); this.recarregarPaginaInteira();},
      error: (err) => {this.finalizarComSucesso(); this.recarregarPaginaInteira();},
    });
  }

  cancelar() {
    if (this.modo === 'creating') {
      this.fecharModal();
    } else if (this.modo === 'editing' && this.originalFiel) {
      this.formularioFiel.patchValue(this.originalFiel);
      this.modo = 'initial';
      this.atualizarEstadoUI();
    }
  }

  private finalizarComSucesso() {
    this.fecharModal();
    this.carregarFieis();
  }

  fecharModal() {
    this.modo = 'initial';
    this.originalFiel = null;
    this.formularioFiel.reset();
    this.visivel = false;
    this.visivelChange.emit(false);
  }

  recarregarPaginaInteira() {
    window.location.reload();
  }

  private resetToInitialState() {
    this.modo = 'initial';
    this.originalFiel = null;
    if (this.fielSelecionado) {
      this.formularioFiel.patchValue(this.fielSelecionado);
    }
    this.atualizarEstadoUI();
  }
}