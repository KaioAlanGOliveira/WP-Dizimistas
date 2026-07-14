package br.com.kaio.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "pagamento")
public class Pagamento {

	@EmbeddedId
	private PagamentoId id;

	@Column(name = "valor", nullable = false)
	private BigDecimal valor;

	@Column(name = "tipo", nullable = false)
	private Integer tipo;

	public Pagamento() {
	}

	public Pagamento(PagamentoId id, BigDecimal valor, Integer tipo) {
		this.id = id;
		this.valor = valor;
		this.tipo = tipo;
	}

	public PagamentoId getId() {
		return id;
	}

	public void setId(PagamentoId id) {
		this.id = id;
	}

	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	public Integer getTipo() {
		return tipo;
	}

	public void setTipo(Integer tipo) {
		this.tipo = tipo;
	}
}