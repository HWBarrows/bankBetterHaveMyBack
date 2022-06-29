import { body, check } from 'express-validator';

const alpha = 'abcdefghijklmnopqrstuvwxyz ';
const upperAlpha = alpha.toUpperCase();
const symbolsNumber = '+-().1234567890 ';

const validator = [
  body('topic')
    .isWhitelisted(`${alpha}${upperAlpha}`)
    .withMessage('only-letters-from-the-Latin-alphabet-are-accepted'),
  //the line below needs to be changed to validate what i want
  check('primaryAddress.*.street').isWhitelisted(
    `${alpha}${upperAlpha}${symbolsNumber}`
  )
];
