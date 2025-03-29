import express from 'express';
import 'dotenv/config';
import authRoute from './api/routes/authRoute';

const app = express();
const port = 8080;

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
