const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var cors = require('cors');

const uri = "mongodb+srv://Flo:06lbl3u@cluster0.dg1gk.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName:'GroupomaniaDb' })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user' );


const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;