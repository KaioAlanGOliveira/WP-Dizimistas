package br.com.kaio.dizimistassrv.bss;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.Query;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.com.kaio.dizimistassrv.domain.Pagamento;
import br.com.kaio.dizimistassrv.domain.PagamentoId;
import br.com.kaio.dizimistassrv.domain.PagamentoView;
import br.com.kaio.dizimistassrv.persistence.Dao;

@Stateless
public class PagamentoBss {

	@PersistenceContext
	private EntityManager em;

	public List<PagamentoView> getLista() throws Exception {

		Dao<PagamentoView> dao = new Dao<>(em, PagamentoView.class);
		return dao.getList();
	}

	public Pagamento adiocionar(Pagamento pg) throws Exception {

		String sql = "SELECT MAX(cod_pagamento) AS maior_codigo FROM pagamento WHERE cpf = :cpf";
		Query query = (Query) em.createNativeQuery(sql);
		
		query.setParameter("cpf", pg.getId().getCpf());
		Number max = (Number) query.getSingleResult();
		Integer proximo = (max == null) ? 1 : max.intValue() + 1;

		try {
			pg.getId().setCodPagamento(proximo);
			em.persist(pg);
			return pg;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	public void editar(Pagamento pg) throws Exception {

		Pagamento existente = getPagamento(pg.getId());
		if (existente != null) {
			em.merge(pg);
		}
	}

	public Pagamento getPagamento(PagamentoId id) throws Exception {
		return em.find(Pagamento.class, id);
	}

	/**
	 * apagar todos desse cpf
	 */
	public void apagarTodos(String cpf) throws Exception {
		
		
		Dao<Pagamento> dao = new Dao<>(em, Pagamento.class); 
		List<Pagamento> lista = dao.getList();
		for (Pagamento pagamento : lista) {
			em.remove(pagamento);
		}
	}

	public void remover(PagamentoId cpf) throws Exception {

		var pagamento = getPagamento(cpf);
		em.remove(pagamento);
	}
}
