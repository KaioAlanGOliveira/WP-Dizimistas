package br.com.kaio.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class PagamentoId implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "cpf", length = 14)
	private String cpf;

	@Column(name = "cod_pagamento")
	private Integer codPagamento;

	public PagamentoId() {
	}

	public PagamentoId(String cpf, Integer codPagamento) {
		this.cpf = cpf;
		this.codPagamento = codPagamento;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public Integer getCodPagamento() {
		return codPagamento;
	}

	public void setCodPagamento(Integer codPagamento) {
		this.codPagamento = codPagamento;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof PagamentoId))
			return false;
		PagamentoId that = (PagamentoId) o;
		return Objects.equals(cpf, that.cpf) && Objects.equals(codPagamento, that.codPagamento);
	}

	@Override
	public int hashCode() {
		return Objects.hash(cpf, codPagamento);
	}
}