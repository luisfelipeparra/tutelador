var Plaintiff = require('../models/plaintiff');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Plaintiffs.
exports.plaintiff_list = function(req, res, next) {

    Plaintiff.find()
        .exec(function (err, list_plaintiffs) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('plaintiff_list', { title: 'Plaintiff List', plaintiff_list: list_plaintiffs });
        })
};

// Display detail page for a specific Plaintiff.
exports.plaintiff_detail = function (req, res, next) {

    Plaintiff.findById(req.params.id)
        .exec(function (err, plaintiff) {
            if (err) { return next(err); }
            if (plaintiff==null) { // No results.
                var err = new Error('Plaintiff not found');
                err.status = 404;
                return next(err);
            }
            // Successful, so render.
            res.render('plaintiff_detail', {title: 'Plaintiff Detail', plaintiff: plaintiff});
        })
};

// Display Plaintiff create form on GET.
exports.plaintiff_create_get = function (req, res, next) {

    res.render('plaintiff_form', { title: 'Create Plaintiff' });
};

// Handle Plaintiff create on POST.
exports.plaintiff_create_post = [

    // Validate fields.
    body('plaintiff_person_type').isLength({ min: 1 }).trim().withMessage('Person type must be specified.')
        .isAlphanumeric().withMessage('Person type has non-alphanumeric characters.'),
    body('plaintiff_gender').isLength({ min: 1 }).trim().withMessage('Gender must be specified.')
        .isAlphanumeric().withMessage('Gender has non-alphanumeric characters.'),
    body('first_name').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('plaintiff_citizenship_card').isLength({ min: 1 }).trim().withMessage('Citizenship card must be specified.'),
    body('plaintiff_email').isLength({ min: 1 }).trim().withMessage('Email must be specified.'),
    body('plaintiff_address').isLength({ min: 1 }).trim().withMessage('Address must be specified.'),
    body('plaintiff_phone_number').isLength({ min: 1 }).trim().withMessage('Phone number must be specified.'),

    // Sanitize fields.
    sanitizeBody('plaintiff_person_type').trim().escape(),
    sanitizeBody('plaintiff_gender').trim().escape(),
    sanitizeBody('plaintiff_first_name').trim().escape(),
    sanitizeBody('plaintiff_family_name').trim().escape(),
    sanitizeBody('plaintiff_citizenship_card').trim().escape(),
    sanitizeBody('plaintiff_email').trim().escape(),
    sanitizeBody('plaintiff_address').trim().escape(),
    sanitizeBody('plaintiff_phone_number').trim().escape(),
    sanitizeBody('single_tutela').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Plaintiff object with escaped and trimmed data.
        var plaintiff = new Plaintiff(
            {
                plaintiff_person_type: req.body.plaintiff_person_type,
                plaintiff_gender: req.body.plaintiff_gender,
                plaintiff_first_name: req.body.plaintiff_first_name,
                plaintiff_family_name: req.body.plaintiff_family_name,
                plaintiff_citizenship_card: req.body.plaintiff_citizenship_card,
                plaintiff_email: req.body.plaintiff_email,
                plaintiff_address: req.body.plaintiff_address,
                plaintiff_phone_number: req.body.plaintiff_phone_number,
                single_tutela: req.body.single_tutela,
            });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('plaintiff_form', { title: 'Create Plaintiff', plaintiff: plaintiff, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save plaintiff.
            plaintiff.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new plaintiff record.
                res.redirect(plaintiff.url);
            });
        }
    }
];

// Display Plaintiff delete form on GET.
exports.plaintiff_delete_get = function(req, res, next) {

    Plaintiff.findById(req.params.id)
        .exec(function (err, plaintiff) {
            if (err) { return next(err); }
            if (plaintiff==null) { // No results.
                res.redirect('/catalog/plaintiffs');
            }
            // Successful, so render.
            res.render('plaintiff_delete', { title: 'Delete Plaintiff', plaintiff:  plaintiff});
        })
};

// Handle Plaintiff delete on POST.
exports.plaintiff_delete_post = function (req, res, next) {

    // Assume valid Plaintiff id in field.
    Plaintiff.findByIdAndRemove(req.body.id, function deletePlaintiff(err) {
        if (err) { return next(err); }
        // Success, so redirect to list of Plaintiff items.
        res.redirect('/catalog/plaintiffs');
    });
};

// Display Plaintiff update form on GET.
exports.plaintiff_update_get = function (req, res, next) {

    Plaintiff.findById(req.params.id, function (err, plaintiff) {
        if (err) { return next(err); }
        if (plaintiff == null) { // No results.
            var err = new Error('Plaintiff not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('plaintiff_form', { title: 'Update Plaintiff', plaintiff: plaintiff });
    });
};

// Handle Plaintiff update on POST.
exports.plaintiff_update_post = [

    // Validate fields.
    body('plaintiff_person_type').isLength({ min: 1 }).trim().withMessage('Person type must be specified.')
        .isAlphanumeric().withMessage('Person type has non-alphanumeric characters.'),
    body('plaintiff_gender').isLength({ min: 1 }).trim().withMessage('Gender must be specified.')
        .isAlphanumeric().withMessage('Gender has non-alphanumeric characters.'),
    body('first_name').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('plaintiff_citizenship_card').isLength({ min: 1 }).trim().withMessage('Citizenship card must be specified.'),
    body('plaintiff_email').isLength({ min: 1 }).trim().withMessage('Email must be specified.'),
    body('plaintiff_address').isLength({ min: 1 }).trim().withMessage('Address must be specified.'),
    body('plaintiff_phone_number').isLength({ min: 1 }).trim().withMessage('Phone number must be specified.'),

    // Sanitize fields.
    sanitizeBody('plaintiff_person_type').trim().escape(),
    sanitizeBody('plaintiff_gender').trim().escape(),
    sanitizeBody('plaintiff_first_name').trim().escape(),
    sanitizeBody('plaintiff_family_name').trim().escape(),
    sanitizeBody('plaintiff_citizenship_card').trim().escape(),
    sanitizeBody('plaintiff_email').trim().escape(),
    sanitizeBody('plaintiff_address').trim().escape(),
    sanitizeBody('plaintiff_phone_number').trim().escape(),
    sanitizeBody('single_tutela').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Plaintiff object with escaped/trimmed data and old id.
        var plaintiff = new Plaintiff(
            {
                plaintiff_person_type: req.body.plaintiff_person_type,
                plaintiff_gender: req.body.plaintiff_gender,
                plaintiff_first_name: req.body.plaintiff_first_name,
                plaintiff_family_name: req.body.plaintiff_family_name,
                plaintiff_citizenship_card: req.body.plaintiff_citizenship_card,
                plaintiff_email: req.body.plaintiff_email,
                plaintiff_address: req.body.plaintiff_address,
                plaintiff_phone_number: req.body.plaintiff_phone_number,
                single_tutela: req.body.single_tutela,
                _id:req.params.id // This is required, or a new ID will be assigned!
            });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('plaintiff_form', { title: 'Update Plaintiff', plaintiff: plaintiff, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Plaintiff.findByIdAndUpdate(req.params.id, plaintiff, {}, function (err, theplaintiff) {
                if (err) { return next(err); }
                // Successful - redirect to plaintiff detail page.
                res.redirect(theplaintiff.url);
            });
        }
    }
];