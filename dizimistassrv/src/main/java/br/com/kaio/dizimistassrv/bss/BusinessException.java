package br.com.kaio.dizimistassrv.bss;

/**
 * Exceção personalizada para erros de regra de negócio.
 * <p>
 * Permite associar um código de erro estruturado (ex: "ERR_001", "USUARIO_DUPLICADO")
 * para facilitar tratamento no frontend, logs ou internacionalização.
 * </p>
 */
public class BusinessException extends Exception {

    private static final long serialVersionUID = 1L;

    private final String errorCode;

    // Construtor mais comum: só mensagem (sem código → usa default ou null)
    public BusinessException(String message ) {
        this(null, message, null);
    }

    // Construtor completo: código + mensagem
    public BusinessException(String errorCode, String message) {
        this(errorCode, message, null);
    }

    // Construtor completo: código + mensagem + causa
    public BusinessException(String errorCode, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;  // pode ser null
    }

    // Construtor útil para wrap de outra exceção (mantém o código se existir)
    public BusinessException(String errorCode, Throwable cause) {
        super(cause != null ? cause.getMessage() : "Erro de negócio sem mensagem detalhada", cause);
        this.errorCode = errorCode;
    }

    // Construtor para wrap simples de exceção (sem código explícito)
    public BusinessException(Throwable cause) {
        this(null, cause);
    }

    /**
     * Retorna o código de erro associado (pode ser null se não informado).
     * @return código de erro ou null
     */
    public String getErrorCode() {
        return errorCode;
    }

    /**
     * Verifica se existe um código de erro definido.
     */
    public boolean hasErrorCode() {
        return errorCode != null && !errorCode.trim().isEmpty();
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("BusinessException");
        if (hasErrorCode()) {
            sb.append(" [").append(errorCode).append("]");
        }
        sb.append(": ").append(getMessage());
        return sb.toString();
    }
}