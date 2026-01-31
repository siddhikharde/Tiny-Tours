import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';

import { checkJwtToken } from './middleware/jwt.js';
import { getHealth,getHome } from './controllers/home.js';
import { postLogin,postSignUp } from './controllers/aouth.js';
import { postTours, getTours, putTours } from './controllers/tours.js';
import ImageKit from '@imagekit/nodejs'

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT||3000;

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

app.get('/auth', function (req, res) {
  const { token, expire, signature } = client.helper.getAuthenticationParameters();
  res.send({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
});

app.get('/',getHome);
app.get('/health',getHealth);

app.post('/signUp',postSignUp )
app.post('/login',postLogin )

app.post('/tours',checkJwtToken, postTours )
app.get('/tours', checkJwtToken, getTours )
app.put('/tours/:id',checkJwtToken, putTours)

 app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
 })  

