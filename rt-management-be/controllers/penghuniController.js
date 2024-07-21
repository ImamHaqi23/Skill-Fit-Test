const { Penghuni } = require('../models');
const { cloudinary } = require('../config/cloudinary');

const statusMessage = require('../helpers/statusMessage');

const getAllPenghuni = async (req, res) => {
  try {
    const penghuni = await Penghuni.findAll();
    return statusMessage(
      res,
      200,
      true,
      'Get All Penghuni successfully!!',
      penghuni
    );
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

const getPenghuniById = async (req, res) => {
  try {
    const penghuni = await Penghuni.findByPk(req.params.id);
    if (!penghuni) {
      return statusMessage(res, 404, false, 'Penghuni not found');
    }
    return statusMessage(
      res,
      200,
      true,
      'Get Penghuni successfully!!',
      penghuni
    );
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

const createPenghuni = async (req, res) => {
  try {
    if (req.file && req.file.size > 2 * 1024 * 1024) {
      return responseHelper(
        res,
        400,
        false,
        'File size too large. Maximum limit is 2MB.'
      );
    }
    const { nama_lengkap, status_penghuni, sudah_menikah, nomor_telepon } =
      req.body;
    const foto_ktp = req.file ? req.file.path : null;

    const penghuni = await Penghuni.create({
      nama_lengkap,
      foto_ktp,
      status_penghuni,
      sudah_menikah,
      nomor_telepon,
    });

    statusMessage(res, 201, true, 'Penghuni created successfully', penghuni);
  } catch (error) {
    if (error.code === 'LIMIT_FILE_TYPES') {
      return statusMessage(
        res,
        400,
        false,
        'Invalid file type. Only JPG, JPEG, and PNG are allowed.'
      );
    }
    statusMessage(res, 400, false, error.message);
  }
};

const updatePenghuni = async (req, res) => {
  try {
    const penghuni = await Penghuni.findByPk(req.params.id);
    if (!penghuni) {
      return statusMessage(res, 404, false, 'Penghuni not found');
    }

    if (req.file) {
      if (req.file.size > 2 * 1024 * 1024) {
        return responseHelper(
          res,
          400,
          false,
          'File size too large. Maximum limit is 2MB.'
        );
      }

      if (penghuni.foto_ktp) {
        const publicId = penghuni.foto_ktp.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
    }

    const { nama_lengkap, status_penghuni, sudah_menikah, nomor_telepon } =
      req.body;
    const foto_ktp = req.file ? req.file.path : penghuni.foto_ktp;

    await penghuni.update({
      nama_lengkap,
      foto_ktp,
      status_penghuni,
      sudah_menikah,
      nomor_telepon,
    });

    statusMessage(res, 200, true, 'Penghuni updated successfully', penghuni);
  } catch (error) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return statusMessage(
        res,
        400,
        false,
        'File size too large. Maximum limit is 2MB.'
      );
    }
    if (error.code === 'LIMIT_FILE_TYPES') {
      return statusMessage(
        res,
        400,
        false,
        'Invalid file type. Only JPG, JPEG, and PNG are allowed.'
      );
    }
    statusMessage(res, 400, false, error.message);
  }
};

const deletePenghuni = async (req, res) => {
  try {
    const penghuni = await Penghuni.findByPk(req.params.id);

    if (!penghuni) {
      return statusMessage(res, 404, false, 'Penghuni not found');
    }

    if (penghuni.foto_ktp) {
      const publicId = penghuni.foto_ktp.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await penghuni.destroy();

    statusMessage(res, 200, true, 'Penghuni deleted successfully');
  } catch (error) {
    statusMessage(res, 400, false, error.message);
  }
};

module.exports = {
  getAllPenghuni,
  getPenghuniById,
  createPenghuni,
  updatePenghuni,
  deletePenghuni,
};
