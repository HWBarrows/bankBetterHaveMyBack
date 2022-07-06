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
      const accountOwner = await AccountOwner.findById(req.body.accountOwner);
      if (!accountOwner) {
        return next({ status: 401, message: 'Account owner not found' });
      }
      const newAccount: {} = await Account.create(req.body);
      if (newAccount) {
        //@ts-ignore
        accountOwner.accounts.push(newAccount);
        await accountOwner.save();
        return res.send(newAccount);
      }
      res
        .status(400)
        .send({ error: 'Could not complete registration, please try again' });
    } catch (error) {
      next(error);
    }
  })
  //this patch request is to update the balance.
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
  })
  //this put is to record transactions in the accountActivity array
  .put('/:id', async (req, res, next) => {
    try {
      const account = await Account.updateOne(
        { _id: req.params.id },
        { $push: { accountActivity: req.body } }
      );
      res.send(account);
    } catch (error) {
      next(error);
    }
  });

export default accountRouter;
