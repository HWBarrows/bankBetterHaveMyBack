import express from 'express';
import AccountOwner from '../models/AccountOwner';

const accountOwnerRouter = express.Router();

accountOwnerRouter
  .get('/', async (req, res, next) => {
    try {
      const accountOwner = await AccountOwner.find(req.query);
      if (!accountOwner) {
        return next({ status: 404, message: 'Account not found' });
      } else {
        res.send(accountOwner);
      }
    } catch (error) {
      next(error);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newAccountOwner = await AccountOwner.signup(req.body);
      if (newAccountOwner) {
        return res.send(newAccountOwner);
      }
      res
        .status(400)
        .send({ error: 'Could not complete registration, please try again' });
    } catch (error) {
      next(error);
    }
  })
  .get('/:email', async (req, res, next) => {
    try {
      const currentAccountOwner = await AccountOwner.find({
        email: req.params.email
      });
      if (!currentAccountOwner) {
        return res.status(400).send({
          error:
            'Account not found, please check your email address and try again'
        });
      }
      return res.send(currentAccountOwner);
    } catch (error) {
      next(error);
    }
  });

export default accountOwnerRouter;
