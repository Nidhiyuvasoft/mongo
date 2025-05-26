const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const routes = require('./routes/Routes')
const app = express();
const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString)
const database = mongoose.connection


database.on('error',(error)=>{
    console.log(error)
})
database.once('connected',()=>{
    console.log('Database Connected')

})
app.use(express.json());
app.listen(3000,()=>{
    console.log(`server started at ${3000}`)
})
app.use('/api',routes)