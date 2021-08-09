const mongoose = require("mongoose");

const url = 'mongodb+srv://lukeitty:Tradewinds11@cluster0.tmjgl.mongodb.net/creativeproject330?retryWrites=true&w=majority';
const options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(url, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(`mongoose successfully connected to mongoDB @ ${url}`)
});

module.exports = db;