const { Rumah, Penghuni } = require('../models');
const statusMessage = require('../helpers/statusMessage');

const getAllRumah = async (req, res) => {
  try {
    const rumah = await Rumah.findAll({
      include: {
        model: Penghuni,
        as: 'penghuni',
        attributes: ['id', 'nama_lengkap'],
      },
    });
    return statusMessage(res, 200, true, 'Get All Rumah successfully!!', rumah);
  } catch (error) {
    return statusMessage(
      res,
      500,
      false,
      'Internal server error!!',
      error.message
    );
  }
};

const getRumahById = async (req, res) => {
  try {
    const rumah = await Rumah.findByPk(req.params.id, {
      include: {
        model: Penghuni,
        as: 'penghuni',
        attributes: ['id', 'nama_lengkap'],
      },
    });
    if (!rumah) {
      return statusMessage(res, 404, false, 'Rumah not found');
    }
    return statusMessage(res, 200, true, 'Get Rumah successfully!!', rumah);
  } catch (error) {
    return statusMessage(
      res,
      500,
      false,
      'Internal server error!!',
      error.message
    );
  }
};

const createRumah = async (req, res) => {
  try {
    let { id_penghuni, status_rumah } = req.body;

    if (id_penghuni) {
      const existingRumah = await Rumah.findOne({ where: { id_penghuni } });
      if (existingRumah) {
        return statusMessage(
          res,
          400,
          false,
          'Penghuni is already assigned to another house'
        );
      }
      status_rumah = 'dihuni';
    } else {
      status_rumah = 'kosong';
    }

    const rumah = await Rumah.create({
      id_penghuni,
      status_rumah,
    });

    return statusMessage(res, 201, true, 'Rumah created successfully', rumah);
  } catch (error) {
    return statusMessage(res, 400, false, error.message);
  }
};

const updateRumah = async (req, res) => {
  try {
    const rumah = await Rumah.findByPk(req.params.id);
    if (!rumah) {
      return statusMessage(res, 404, false, 'Rumah not found');
    }

    let { id_penghuni, status_rumah } = req.body;

    if (id_penghuni) {
      const existingRumah = await Rumah.findOne({ where: { id_penghuni } });
      if (existingRumah && existingRumah.id !== rumah.id) {
        return statusMessage(
          res,
          400,
          false,
          'Penghuni is already assigned to another house'
        );
      }
      status_rumah = 'dihuni';
    } else {
      id_penghuni = null;
      status_rumah = 'kosong';
    }

    await rumah.update({
      id_penghuni,
      status_rumah,
    });

    return statusMessage(res, 200, true, 'Rumah updated successfully', rumah);
  } catch (error) {
    return statusMessage(res, 400, false, error.message);
  }
};

const deleteRumah = async (req, res) => {
  try {
    const rumah = await Rumah.findByPk(req.params.id);

    if (!rumah) {
      return statusMessage(res, 404, false, 'Rumah not found');
    }

    await rumah.destroy();

    return statusMessage(res, 200, true, 'Rumah deleted successfully');
  } catch (error) {
    return statusMessage(res, 400, false, error.message);
  }
};

module.exports = {
  getAllRumah,
  getRumahById,
  createRumah,
  updateRumah,
  deleteRumah,
};
