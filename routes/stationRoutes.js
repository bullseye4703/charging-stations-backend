const express = require('express');
const {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation,
} = require('../controllers/stationController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createStation);
router.get('/', getAllStations);
router.get('/:id', auth, getStationById);
router.put('/:id', auth, updateStation);
router.delete('/:id', auth, deleteStation);

module.exports = router;
