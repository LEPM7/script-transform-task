var assert = require('assert');
var script = require('../script-validation-task');
var quiz = require('./quiz-customer-profile-00-key_json.json');


describe('Script', function () {
  describe('Validacion de calificacion de candelas ', function () {
    it('CANDELA ALTO: deberia retornar 10 segun respuestas', function () {
      let respuestaCandelaAlto = require('./respuesta-candela/respuesta-candela-alto.json');
      assert.equal(script(quiz, respuestaCandelaAlto), 10);
    }),
      it('CANDELA MEDIO: deberia retornar 7.21 segun respuestas', function () {
        let respuestaCandelaMedio = require('./respuesta-candela/respuesta-candela-medio.json');
        assert.equal(script(quiz, respuestaCandelaMedio), 7.21);
      }),
      it('CANDELA BAJO: deberia retornar 3.05 segun respuestas', function () {
        let respuestaCandelaBajo = require('./respuesta-candela/respuesta-candela-bajo.json');
        assert.equal(script(quiz, respuestaCandelaBajo), 3.05);
      })
  });
});