"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const alpha = 'abcdefghijklmnopqrstuvwxyz ';
const upperAlpha = alpha.toUpperCase();
const symbolsNumber = '+-().1234567890 ';
const validator = [
    (0, express_validator_1.body)('topic')
        .isWhitelisted(`${alpha}${upperAlpha}`)
        .withMessage('only-letters-from-the-Latin-alphabet-are-accepted'),
    //the line below needs to be changed to validate what i want
    (0, express_validator_1.check)('primaryAddress.*.street').isWhitelisted(`${alpha}${upperAlpha}${symbolsNumber}`)
];
//# sourceMappingURL=validator.js.map