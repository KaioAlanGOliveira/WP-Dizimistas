package br.com.kaio.dizimistassrv.ep;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.kaio.dizimistassrv.bss.PagamentoBss;
import br.com.kaio.domain.Pagamento;
import br.com.kaio.domain.PagamentoId;
import br.com.kaio.domain.PagamentoView;

@Path(value = "/pagamento")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PagamentoEp {

	@Inject
	private PagamentoBss pagamentoBss;

	@GET
	public List<PagamentoView> listarPagamento() {

		try {
			List<PagamentoView> pg = pagamentoBss.getLista();
			return pg;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@POST
	public Pagamento adicionar(Pagamento pg) {
		try {
			pagamentoBss.adiocionar(pg);
			return pg;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@PUT
	public Pagamento editar(Pagamento pg) {

		try {
			pagamentoBss.editar(pg);
			return pg;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@DELETE
	public Response remover(PagamentoId pg) {

		try {
			pagamentoBss.remover(pg);
			return Response.ok(Map.of("mensagem", "Pagamento apagado com sucesso")).build();
		} catch (Exception e) {
			return Response.serverError().entity(Map.of("erro", e.getMessage())).build();
		}
	}
}
