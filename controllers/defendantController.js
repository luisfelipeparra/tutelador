var Defendant = require('../models/defendant');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Defendants.
exports.defendant_list = function(req, res, next) {

    Defendant.find()
        .exec(function (err, list_defendants) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('defendant_list', { title: 'Defendant List', defendant_list: list_defendants });
        })
};

// Display detail page for a specific Defendant.
exports.defendant_detail = function (req, res, next) {
    Defendant.findById(req.params.id)
    .exec(function (err, defendant) {
            if (err) { return next(err); }
            if (defendant==null) { // No results.
                var err = new Error('Defendant not found');
                err.status = 404;
                return next(err);
            }
            // Successful, so render.
            res.render('defendant_detail', {title: 'Defendant Detail', defendant: defendant});
        })

};

// Display Defendant create form on GET.
exports.defendant_create_get = function (req, res, next) {

    res.render('defendant_form', { title: 'Create Defendant' });
};

// Handle Defendant create on POST.
exports.defendant_create_post = [

    // Validate fields.
    body('defendant_name').isLength({ min: 1 }).trim().withMessage('Defendant name must be specified.')
        .isAlphanumeric().withMessage('Defendant name has non-alphanumeric characters.'),
    body('defendant_address').isLength({ min: 1 }).trim().withMessage('Defendant address must be specified.'),

    // Sanitize fields.
    sanitizeBody('defendant_person_type').trim().escape(),
    sanitizeBody('defendant_gender').trim().escape(),
    sanitizeBody('defendant_name').trim().escape(),
    sanitizeBody('defendant_address').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Defendant object with escaped and trimmed data.
        var defendant = new Defendant(
            {
                defendant_person_type: req.body.defendant_person_type,
                defendant_gender: req.body.defendant_gender,
                defendant_name: req.body.defendant_name,
                defendant_address: req.body.defendant_address,
            });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('defendant_form', { title: 'Create Defendant', defendant: defendant, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save defendant.
            defendant.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new defendant record.
                res.redirect(defendant.url);
            });
        }
    }
];

// Display Defendant delete form on GET.
exports.defendant_delete_get = function(req, res, next) {

    Defendant.findById(req.params.id)
        .exec(function (err, defendant) {
            if (err) { return next(err); }
            if (defendant==null) { // No results.
                res.redirect('/catalog/defendants');
            }
            // Successful, so render.
            res.render('defendant_delete', { title: 'Delete Defendant', defendant:  defendant});
        })
};

// Handle Defendant delete on POST.
exports.Defendant_delete_post = function (req, res, next) {

    // Assume valid Defendant id in field.
    Defendant.findByIdAndRemove(req.body.id, function deleteDefendant(err) {
        if (err) { return next(err); }
        // Success, so redirect to list of Defendant items.
        res.redirect('/catalog/defendants');
    });
};

// Display Defendant update form on GET.
exports.defendant_update_get = function (req, res, next) {

    Defendant.findById(req.params.id, function (err, defendant) {
        if (err) { return next(err); }
        if (defendant == null) { // No results.
            var err = new Error('Defendant not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('defendant_form', { title: 'Update Defendant', defendant: defendant });
    });
};

// Handle Defendant update on POST.
exports.defendant_update_post = [

    // Validate fields.
    body('defendant_name').isLength({ min: 1 }).trim().withMessage('Defendant name must be specified.')
        .isAlphanumeric().withMessage('Defendant name has non-alphanumeric characters.'),
    body('defendant_address').isLength({ min: 1 }).trim().withMessage('Defendant address must be specified.'),

    // Sanitize fields.
    sanitizeBody('defendant_person_type').trim().escape(),
    sanitizeBody('defendant_gender').trim().escape(),
    sanitizeBody('defendant_name').trim().escape(),
    sanitizeBody('defendant_address').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Defendant object with escaped/trimmed data and old id.
        var defendant = new Defendant(
            {
                defendant_person_type: req.body.defendant_person_type,
                defendant_gender: req.body.defendant_gender,
                defendant_name: req.body.defendant_name,
                defendant_address: req.body.defendant_address,
                _id:req.params.id // This is required, or a new ID will be assigned!
            });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('defendant_form', { title: 'Update Defendant', defendant: defendant, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Defendant.findByIdAndUpdate(req.params.id, defendant, {}, function (err, thedefendant) {
                if (err) { return next(err); }
                // Successful - redirect to defendant detail page.
                res.redirect(thedefendant.url);
            });
        }
    }
];