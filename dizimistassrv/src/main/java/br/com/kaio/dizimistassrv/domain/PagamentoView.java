package br.com.kaio.dizimistassrv.domain;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "vw_fieis_pagamento_busca")
public class PagamentoView {

	@EmbeddedId
	private PagamentoId id;

	@Column(name = "valor")
	private Double valor;

	@Column(name = "nome")
	private String nome;

	public Double getValor() {
		return valor;
	}

	public PagamentoId getId() {
		return id;
	}

	public void setId(PagamentoId id) {
		this.id = id;
	}

	public void setValor(Double valor) {
		this.valor = valor;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public PagamentoView() {
		super();
	}
}
