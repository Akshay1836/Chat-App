const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3001;
const cookieParser=require('cookie-parser')
const authRoutes=require('./routes/authRoutes')
const connectDB=require('./db/connect')
const messageRoutes=require('./routes/messageRoutes')
const userRoutes=require('./routes/userRoutes')
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send("hi again ");
});
app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);
app.use('/api/users',userRoutes);

const start = async () => {
  try {
        await connectDB();
    app.listen(PORT, (error) => {
      if (!error) {
        console.log('App running on ' + PORT);
      } else {
        console.log(error);
      }
    });
  } catch (error) {
    console.log('Error occurred:' + error);
  }
};

start();