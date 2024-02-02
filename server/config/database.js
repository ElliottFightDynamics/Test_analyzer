const mongoose = require('mongoose');

const mongoDBUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/codebaseAnalysis';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoDBUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;