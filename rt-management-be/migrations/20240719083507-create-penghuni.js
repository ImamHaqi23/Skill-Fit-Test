'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Penghunis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_lengkap: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      foto_ktp: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status_penghuni: {
        allowNull: false,
        type: Sequelize.ENUM('kontrak', 'tetap'),
      },
      nomor_telepon: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      sudah_menikah: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Penghunis');
  },
};
