import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/routes';
import { UserRepository } from './repositories/UserRepository';

const API_PORT = process.env.PORT ?? 3000;
const app = express();

// EXPRESS APP USAGES 
app.use(cors())
app.use(express.json())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// EXPRESS APP USE ROUTES
app.use('/', router)

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserRepository.login({ username, password })
    res.send({ user })
  } catch (err: any) {
    res.status(401).send(err.message)
  }
})

app.post('/register', async (req, res) => {
  const { username, password, confirmPassword, nombre, apellido, email, is_active } = req.body
  console.log(email)
  try {
    const id = await UserRepository.create({ username, password, confirmPassword, nombre, apellido, email, is_active })
    res.send({ id })
  } catch (err: any) {
    res.status(400).send(err.message)
  }
})

app.listen(API_PORT, () => {
    console.log(`API Listening on port: ${API_PORT}`);
})