const mongoose = require('mongoose');
const config = require('config');

const ConnectDB = async () => {
    try {
        await mongoose.connect(config.get('mongoURI'), { useUnifiedTopology: true, 
                                                         useNewUrlParser: true,
                                                         useCreateIndex: true
                                                        });
        console.log('mongoDB connected');

    } catch (error) {
        console.error(error.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = ConnectDB;

