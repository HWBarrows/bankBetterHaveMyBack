import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connect from './lib/connect';
import globalErrorHandler from './middlewares/globalErrorHandler';
import accountOwnerRouter from './routes/accountOwnerRouter';
import loginRouter from './routes/loginRouter';

const app = express();
dotenv.config();
connect();

app.use(express.json());
app.use(cors());
app.use('/accountOwner', accountOwnerRouter);
app.use('/login', loginRouter);
app.use(globalErrorHandler);
const port = process.env.PORT;
app.get('/', (req, res) => res.send('Hi Everybody!'));
app.listen(port, () => console.log(`Serving fun at http://localhost:${port}`));
