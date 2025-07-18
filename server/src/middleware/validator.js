const { body, param, validationResult } = require('express-validator');

// Validation chains
const urlValidationRules = [
  body('originalUrl')
    .trim()
    .notEmpty()
    .withMessage('Original URL is required')
    .isURL()
    .withMessage('Invalid URL format'),
  
  body('validity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Validity must be a positive integer'),
  
  body('shortcode')
    .optional()
    .isLength({ min: 5, max: 7 })
    .withMessage('Shortcode must be between 5-7 characters')
    .isAlphanumeric()
    .withMessage('Shortcode must contain only letters and numbers')
];

const shortcodeParamRules = [
  param('shortcode')
    .isAlphanumeric()
    .withMessage('Shortcode must be alphanumeric')
    .isLength({ min: 5, max: 7 })
    .withMessage('Shortcode must be between 5-7 characters')
];

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  urlValidationRules,
  shortcodeParamRules,
  validate
};