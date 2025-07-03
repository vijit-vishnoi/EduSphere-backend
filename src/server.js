import express from 'express';
const bodyParser=require('body-parser');

const app=express();

app.use('/api',apiRoutes);

app.listen(PORT,async()=>{
    console.log(`Server started on Port: ${PORT}`);
    
})