const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true
    },
    location: {
        latitude: Number,
        longitude: Number,
    },
    status:{
        type: String,
        enum: ['Active', 'Inactive']
    },
    powerOutput: Number,
    connectorType: String
});

module.exports = mongoose.model('Station',stationSchema);