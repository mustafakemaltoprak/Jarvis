const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

const jokeRouter = require('./routes/joke');

app.use('/joke', jokeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} 🚀`);
});
