import createUserAdm from '../integration/shared/createdUserAdmin';
import createUser from '../integration/shared/createdUser'

Cypress.Commands.add('login', (options = {}) => {
  const { admin, normal } = options;

  if (admin) {
    return createUserAdm().then((userData) => {
      const emailUsuario = userData.email;
      const senhaUsuario = userData.password;

      return cy.request({
        log: true,
        failOnStatusCode: true,
        method: 'POST',
        url: '/login',
        headers: {
          "accept": "application/json",
          "content-type": "application/json"
        },
        body: {
          "email": emailUsuario,
          "password": senhaUsuario
        },
      }).then((response) => {
        console.log(response);
        localStorage.setItem('token', response.body.authorization);
        expect(localStorage.getItem('token')).not.null;
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("Login realizado com sucesso");
      });
    });

  } else if (normal) {
    return createUser().then((userData) => {
      const emailUsuario = userData.email;
      const senhaUsuario = userData.password;

      return cy.request({
        log: true,
        failOnStatusCode: true,
        method: 'POST',
        url: '/login',
        headers: {
          "accept": "application/json",
          "content-type": "application/json"
        },
        body: {
          "email": emailUsuario,
          "password": senhaUsuario
        },
      }).then((response) => {
        console.log(response)
        localStorage.setItem('token', response.body.authorization);
        expect(localStorage.getItem('token')).not.null;
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("Login realizado com sucesso");
      });
    });
  } else {
    return Promise.reject('Deve ser definido que tipo de usuário');
  }
});










