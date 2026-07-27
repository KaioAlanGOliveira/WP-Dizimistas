package br.com.kaio.dizimistassrv.bss;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.com.kaio.dizimistassrv.domain.Fiel;
import br.com.kaio.dizimistassrv.persistence.Dao;

@Stateless
public class FielBss {

	@PersistenceContext
	private EntityManager em;

	public List<Fiel> getList() {

		Dao<Fiel> dao = new Dao<>(em, Fiel.class);
		return dao.getList();
	}

	public void adicionar(Fiel f) throws Exception {

		try {
			em.persist(f);
		} catch (Exception e) {
			throw new RuntimeException("Erro ao adicionar fiel", e);
		}
	}

	public void remover(Fiel fiel) {

		try {
			em.remove(em.find(Fiel.class, fiel.getCpf()));
		} catch (Exception e) {
			throw new RuntimeException("Erro ao remover o fiel", e);
		}
	}

	public void alterar(Fiel fiel) {

		try {
			em.merge(fiel);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Erro ao atualizado o fiel", e);
		}
	}
}
