import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';

import { checkJwtToken } from './middleware/jwt.js';
import { getHealth,getHome } from './controllers/home.js';
import { postLogin,postSignUp } from './controllers/aouth.js';
import { postTours, getTours } from './controllers/tours.js';

dotenv.config();

 const app=express();
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT||3000;


app.get('/',getHome);
app.get('/health',getHealth);

app.post('/signUp',postSignUp )
 app.post('/login',postLogin )

app.post('/tours',checkJwtToken, postTours )

app.get('/tours', checkJwtToken, getTours )

 app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
 })  

