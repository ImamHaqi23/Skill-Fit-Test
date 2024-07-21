'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rumahs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_penghuni: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Penghunis',
          key: 'id',
        },
        allowNull: true,
        defaultValue: null,
      },
      status_rumah: {
        type: Sequelize.ENUM('dihuni', 'kosong'),
        defaultValue: 'kosong',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rumahs');
  },
};
