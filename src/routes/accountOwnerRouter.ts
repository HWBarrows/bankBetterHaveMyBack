import express from 'express';
import AccountOwner from '../models/AccountOwner';

const accountOwnerRouter = express.Router();

accountOwnerRouter
  //I think this endpoint does nothing and is a security concern
  .get('/', async (req, res, next) => {
    try {
      const accountOwner = await AccountOwner.find(req.query);
      // accountOwner.populate()
      if (!accountOwner[0]) {
        return next({ status: 404, message: 'Account not found' });
      } else {
        res.send(accountOwner);
      }
    } catch (error) {
      next(error);
    }
  })
  //This endpoint creates new accountOwners
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
  //this creates a virtual credit card
  .patch('/:id', async (req, res, next) => {
    try {
      const options = { new: true, runValidators: true };
      const id = req.params.id;
      const updatedAccount = await AccountOwner.findByIdAndUpdate(
        id,
        req.body,
        options
      );
      if (!updatedAccount) {
        return next({ status: 404, message: 'Account not found' });
      }
      res.send(updatedAccount);
    } catch (error) {
      next(error);
    }
  });

export default accountOwnerRouter;
