'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penghuni extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Penghuni.hasOne(models.Rumah, {
        foreignKey: 'id_penghuni',
        as: 'rumah',
      });

      Penghuni.hasOne(models.HistoryPenghuni, {
        foreignKey: 'id_penghuni',
        as: 'historypenghuni',
      });

      Penghuni.hasMany(models.Pembayaran, {
        foreignKey: 'id_penghuni',
        as: 'pembayaran',
      });
    }
  }
  Penghuni.init(
    {
      nama_lengkap: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      foto_ktp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status_penghuni: {
        type: DataTypes.ENUM('kontrak', 'tetap'),
        allowNull: false,
      },
      nomor_telepon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sudah_menikah: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Penghuni',
    }
  );
  return Penghuni;
};
