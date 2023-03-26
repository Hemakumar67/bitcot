const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/todo';
exports.connectDB = () => {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB');
    })
        .catch((error) => {
            console.error('Failed to connect to MongoDB', error);
        });

};

exports.disconnectDB = () => {
    mongoose.disconnect();
    console.log('Database disconnected');
}

