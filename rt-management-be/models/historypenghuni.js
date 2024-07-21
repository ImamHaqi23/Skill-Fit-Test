'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoryPenghuni extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HistoryPenghuni.belongsTo(models.Rumah, {
        foreignKey: 'id_rumah',
        as: 'rumah',
      });

      HistoryPenghuni.belongsTo(models.Penghuni, {
        foreignKey: 'id_penghuni',
        as: 'penghuni',
      });
    }
  }
  HistoryPenghuni.init(
    {
      id_rumah: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Rumahs',
          key: 'id',
        },
      },
      id_penghuni: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Penghunis',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'HistoryPenghuni',
    }
  );
  return HistoryPenghuni;
};
