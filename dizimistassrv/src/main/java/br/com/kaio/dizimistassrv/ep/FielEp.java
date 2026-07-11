package br.com.kaio.dizimistassrv.ep;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.com.kaio.dizimistassrv.bss.FielBss;
import br.com.kaio.dizimistassrv.domain.Fiel;

@Path(value = "/fiel")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class FielEp {

	@Inject
	private FielBss fielBss;

	@GET
	public List<Fiel> listarFiel() {

		List<Fiel> fieis = fielBss.getList();
		return fieis;
	}

	@POST
	public String adicionar(Fiel fiel) {

		try {
			fielBss.adicionar(fiel);
			return "Novo fiel cadastrado no banco de dizimistas";
		} catch (Exception e) {
			return e.getMessage();
		}
	}

	@DELETE
	public String remover(Fiel fiel) {

		try {
			fielBss.remover(fiel);
			return "Fiel removido do banco de dizimistas";
		} catch (Exception e) {
			return "Não foi possivel fazer essa transação. Porque: " + e.getMessage();
		}

	}

	@PUT
	public String editar(Fiel fiel) {

		try {
			fielBss.aturar(fiel);
			return "Fiel auterado do banco de dizimistas";
		} catch (Exception e) {
			return "Não foi possivel fazer essa transação. Porque: " + e.getMessage();
		}
	}
}
