import express from 'express';
import Account from '../models/Account';
import AccountOwner from '../models/AccountOwner';

const accountRouter = express.Router();

accountRouter
  .get('/', async (req, res, next) => {
    try {
      const accounts = await Account.find(req.query);
      if (!accounts) {
        return next({ status: 404, message: 'No accounts found' });
      } else {
        res.send(accounts);
      }
    } catch (error) {
      next(error);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const owner = await AccountOwner.findById(req.body.owner);
      if (!owner) {
        return next({ status: 401, message: 'Account owner not found' });
      }
      const newAccount: {} = await Account.create(req.body);
      if (newAccount) {
        //@ts-ignore
        owner.accounts.push(newAccount);
        await owner.save();
        return res.send(newAccount);
      }
      res
        .status(400)
        .send({ error: 'Could not complete registration, please try again' });
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const options = { new: true, runValidators: true };
      const id = req.params.id;
      const updatedAccount = await Account.findByIdAndUpdate(
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

export default accountRouter;
