'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pembayaran.belongsTo(models.Penghuni, {
        foreignKey: 'id_penghuni',
        as: 'penghuni',
      });

      Pembayaran.belongsTo(models.Rumah, {
        foreignKey: 'id_rumah',
        as: 'rumah',
      });
    }
  }
  Pembayaran.init(
    {
      id_penghuni: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Penghunis',
          key: 'id',
        },
      },
      id_rumah: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Rumahs',
          key: 'id',
        },
      },
      jenis_pembayaran: {
        type: DataTypes.ENUM('kebersihan', 'satpam', 'other'),
        allowNull: false,
      },
      keterangan: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      nominal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('pemasukan', 'pengeluaran'),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('lunas', 'belum'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Pembayaran',
    }
  );
  return Pembayaran;
};
