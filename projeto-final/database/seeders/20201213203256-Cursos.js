'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cursos', [{
      sigla : 'ES',
      nome : 'Engenharia de Software',
      descricao : 'Curso novo e interessante.',
      areaId : 1,
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cursos', null, {});
  }
};