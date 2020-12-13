'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      nome: "Lino Mota",
      email: "lcmn@icomp.ufam.edu.br",
      senha: "12345678",
      cursoId: 1
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};