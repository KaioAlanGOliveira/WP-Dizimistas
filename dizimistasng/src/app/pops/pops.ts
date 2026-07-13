import { Component, Input, Output, EventEmitter, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { FielList } from '../domain/FielList.model';
import { FielService } from '../service/fiel.service';
import { error } from 'console';
import { InputNumber } from "primeng/inputnumber";
import { Fiel } from '../componentes/fiel/fiel';

@Component({
  selector: 'app-pops',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DialogModule, ButtonModule, InputMaskModule, MessageModule, InputTextModule, FormsModule, InputNumber],
  templateUrl: './pops.html',
  styleUrl: './pops.css'
})
export class Pops implements OnChanges, OnInit {
  fieis: FielList[] = [];
  fieisFiltrados: any[] = [];
  formularioFiel!: FormGroup;

  @Input() fielSelecionado: FielList | null = null;
  @Output() visivelChange = new EventEmitter<boolean>();
  @Input() visivel = false;

  private fb = inject(FormBuilder);
  private fielService = inject(FielService);


  ngOnInit() {
    this.carregarFieis();

    if (this.fielSelecionado) {
      this.formularioFiel.patchValue(this.fielSelecionado);
    }



    this.formularioFiel = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email]],
      idade: [null, [Validators.min(0), Validators.max(120)]],
      telefone: ['', [Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]]
    });


  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fielSelecionado'] && this.formularioFiel && this.fielSelecionado) {
      this.formularioFiel.patchValue(this.fielSelecionado);
    }
  }
  carregarFieis() {
    this.fielService.listarTodos().subscribe({
      next: (dados) => {
        this.fieis = dados;
        this.fieisFiltrados = [...dados];
      },
      error: (err) => console.error('Erro ao buscar fiéis:', err)
    });
  }

  fecharModal() {
    this.visivel = false;
    this.visivelChange.emit(false);
  }

  removerMascaras(valor: string): string {

    if (!valor) {
      return '';
    }

    return valor.replace(/\D/g, '');

  };

  sumeterFiel() {
    if (this.formularioFiel.valid) {
      const novoFiel: FielList = {
        ...this.formularioFiel.value,
        cpf: this.removerMascaras(this.formularioFiel.value.cpf),
        telefone: this.removerMascaras(this.formularioFiel.value.telefone),
        idade: this.formularioFiel.value.idade
      };

      this.fielService.salvarFiel(novoFiel).subscribe({
        next: (resposta) => {
          console.log('Fiel salvo com sucesso no java', resposta);
          this.carregarFieis();
          this.formularioFiel.reset();
          this.fecharModal();
        },
        error: (err) => {
          console.error('Erro ao enviar dados para o servidor:', err);
        }
      });
    } else {
      this.formularioFiel.markAllAsTouched();
    }
  }

  editarFiel() {
    if (this.formularioFiel.valid && this.fielSelecionado) {

      const fielAtualizado: FielList = {
        ...this.fielSelecionado,          // mantém os campos que não estão no formulário
        ...this.formularioFiel.value,     // pega os valores alterados
        cpf: this.removerMascaras(this.formularioFiel.value.cpf),
        telefone: this.removerMascaras(this.formularioFiel.value.telefone)
      };

      this.fielService.editarFiel(fielAtualizado).subscribe({
        next: (resposta) => {
          console.log('Fiel atualizado com sucesso!', resposta);
          this.carregarFieis();
          this.formularioFiel.reset();
          this.fecharModal();
        },
        error: (err) => {
          console.error('Erro ao atualizar fiel:', err);
        }
      });
    }
  }
}
