const express=require('express');
const bodyParser=require('body-parser');
const {PORT} = require ('../src/config/serverConfig');
const app=express();

app.use(express.json());

const authRoutes=require('./routes');
app.use('/api/v1',authRoutes);
app.use('/api/v1/classrooms', require('./routes/classroom.routes'));

app.listen(PORT,async()=>{
    console.log(`Server started on Port: ${PORT}`);
})