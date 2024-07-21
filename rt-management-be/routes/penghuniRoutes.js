const router = require('express').Router();

const {
  getAllPenghuni,
  createPenghuni,
  updatePenghuni,
  deletePenghuni,
  getPenghuniById,
} = require('../controllers/penghuniController');
const upload = require('../middlewares/upload');

router.get('/get-all-penghuni', getAllPenghuni);
router.get('/get-penghuni-by-id/:id', getPenghuniById);
router.post('/create-penghuni', upload.single('foto_ktp'), createPenghuni);
router.put('/update-penghuni/:id', upload.single('foto_ktp'), updatePenghuni);
router.delete('/delete-penghuni/:id', deletePenghuni);

module.exports = router;
