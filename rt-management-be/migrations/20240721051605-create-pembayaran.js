'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pembayarans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_penghuni: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      id_rumah: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      jenis_pembayaran: {
        allowNull: false,
        type: Sequelize.ENUM('kebersihan', 'satpam', 'other'),
      },
      keterangan: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nominal: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('pemasukan', 'pengeluaran'),
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('lunas', 'belum'),
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
    await queryInterface.dropTable('Pembayarans');
  },
};
