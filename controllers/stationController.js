const Station = require('../models/Station');

exports.createStation = async (req, res) => {
  try {
    const station = new Station(req.body);
    await station.save();
    res.status(201).json(station);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) return res.status(404).json({ msg: 'Station not found' });
    res.json(station);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!station) return res.status(404).json({ msg: 'Station not found' });
    res.json(station);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndDelete(req.params.id);
    if (!station) return res.status(404).json({ msg: 'Station not found' });
    res.json({ msg: 'Station deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
