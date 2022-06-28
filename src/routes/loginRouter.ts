import express from 'express';
import AccountOwner from '../models/AccountOwner';

const loginRouter = express.Router();

loginRouter.post('/', async (req, res, next) => {
  try {
    const currentAccountOwner = await AccountOwner.find({
      email: req.body.email
    });
    if (!currentAccountOwner[0]) {
      return res.status(400).send({
        error:
          'Account not found, please check your email address and try again'
      });
    }

    const validAccountOwner = await AccountOwner.login(req.body);
    if (validAccountOwner) {
      return res.send(validAccountOwner);
    }
    res.status(401).send({ error: 'Invalid credentials, please try again' });
  } catch (error) {
    next(error);
  }
});

export default loginRouter;
