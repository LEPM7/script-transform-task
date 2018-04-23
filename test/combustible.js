var assert = require('assert');
var script = require('../script-validation-task');
var quiz = require('./quiz-customer-profile-00-key_json.json');


describe('Script', function () {
  describe('Validacion de calificacion de combustible ', function () {
    it('CANDELA ALTO: deberia retornar 9.65 segun respuestas', function () {
      let respuestaCombustibleAlto = require('./respuesta-combustible/respuesta-combustible-alto.json');
      assert.equal(script(quiz, respuestaCombustibleAlto), 9.65);
    }),
      it('CANDELA MEDIO: deberia retornar 6.26 segun respuestas', function () {
        let respuestaCombustibleMedio = require('./respuesta-combustible/respuesta-combustible-medio.json');
        assert.equal(script(quiz, respuestaCombustibleMedio), 6.26);
      }),
      it('CANDELA BAJO: deberia retornar 2.5 segun respuestas', function () {
        let respuestaCombustibleBajo = require('./respuesta-combustible/respuesta-combustible-bajo.json');
        assert.equal(script(quiz, respuestaCombustibleBajo), 1.9);
      })
  });
});