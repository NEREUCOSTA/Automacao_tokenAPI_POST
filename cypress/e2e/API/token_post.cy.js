describe('Teste de Token da API', () => {
  it('deve obter um token', () => {
    const url = "https://api-homologacao.getnet.com.br/auth/oauth/v2/token";

    // Credenciais
    const clientId = '67823c6d-58de-494f-96d9-86a4c22682cb'; // Ajuste para o clientId correto
    const clientSecret = 'c2d6a06f-5f31-448b-9079-7e170e8536e4'; // Ajuste para o clientSecret correto

    // Codificação Base64
    const base64Credentials = btoa(`${clientId}:${clientSecret}`);

    // Cabeçalhos de autenticação
    const headers = {
      Authorization: `Basic ${base64Credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    // Dados do corpo da requisição
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'oob' // Adiciona o scope conforme o exemplo curl
    }).toString();

    cy.request({
      method: 'POST',
      url: url,
      headers: headers,
      body: body,
      failOnStatusCode: false // Para evitar que falhe em códigos de status não 2xx
    }).then((response) => {
      // Verifica se a resposta é 200
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('access_token'); // Verifica se o token está presente
      expect(response.body).to.have.property('token_type', 'Bearer'); // Verifica o tipo de token
      expect(response.body).to.have.property('expires_in'); // Verifica a duração do token
      expect(response.body).to.have.property('scope', 'oob'); // Verifica o escopo
    });
  });
});
