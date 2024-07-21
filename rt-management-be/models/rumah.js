'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rumah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rumah.belongsTo(models.Penghuni, {
        foreignKey: 'id_penghuni',
        as: 'penghuni',
      });

      Rumah.hasMany(models.HistoryPenghuni, {
        foreignKey: 'id_rumah',
        as: 'historypenghuni',
      });

      Rumah.hasMany(models.Pembayaran, {
        foreignKey: 'id_rumah',
        as: 'pembayaran',
      });
    }
  }
  Rumah.init(
    {
      id_penghuni: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Penghunis',
          key: 'id',
        },
        allowNull: true,
        defaultValue: null,
      },
      status_rumah: {
        type: DataTypes.ENUM('dihuni', 'kosong'),
        defaultValue: 'kosong',
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Rumah',
    }
  );
  return Rumah;
};
