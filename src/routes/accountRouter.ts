import express from 'express';
import Account from '../models/Account';
import AccountOwner from '../models/AccountOwner';

const accountRouter = express.Router();

accountRouter
  //this populates the info in the home page for the onClick function
  .get('/:id', async (req, res, next) => {
    try {
      const accounts = await Account.findById(req.params.id);
      if (!accounts) {
        return next({ status: 404, message: 'No accounts found' });
      } else {
        res.send(accounts);
      }
    } catch (error) {
      next(error);
    }
  })
  //this post request creates a new account
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
  //this patch adds credit card to account ONLY
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

  //this put records financial transactions made with specified account id or credit card number
  .put('/', async (req, res, next) => {
    const options = { new: true, runValidators: true };
    const filter = req.body.identifier;
    const update = {
      accountBalance: req.body.accountBalance,
      accountActivity: req.body.accountActivity
    };
    try {
      const account = await Account.findOneAndUpdate(
        req.body.identifier,
        update,
        { new: true }
      );
      res.send(account);
    } catch (error) {
      next(error);
    }
  });

export default accountRouter;
