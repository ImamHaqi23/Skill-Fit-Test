const router = require('express').Router();

const {
  getAllRumah,
  createRumah,
  updateRumah,
  deleteRumah,
  getRumahById,
} = require('../controllers/rumahController');

router.get('/get-all-rumah', getAllRumah);
router.get('/get-rumah-by-id/:id', getRumahById);
router.post('/create-rumah', createRumah);
router.put('/update-rumah/:id', updateRumah);
router.delete('/delete-rumah/:id', deleteRumah);

module.exports = router;
