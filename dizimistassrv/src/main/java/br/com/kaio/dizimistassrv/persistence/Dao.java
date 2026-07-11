package br.com.kaio.dizimistassrv.persistence;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

public class Dao<T> {

	private EntityManager em;
	private Class<T> entityClass;

	public Dao(EntityManager em, Class<T> entityClass) {

		this.entityClass = entityClass;
		this.em = em;
	}

	public List<T> getList() {

		try {
			String jpql = "select obj from " + entityClass.getName() + " obj";
			TypedQuery<T> query = em.createQuery(jpql, entityClass);
			return query.getResultList();
		} catch (Exception e) {
			throw new RuntimeException("Erro ao listar fiéis", e);
		}
	}
}
