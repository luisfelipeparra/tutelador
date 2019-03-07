var Legitimator = require('../models/legitimator');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Legitimators.
exports.legitimator_list = function(req, res, next) {

    Legitimator.find()
        .exec(function (err, list_legitimators) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('legitimator_list', { title: 'Legitimator List', legitimator_list: list_legitimators });
        })
};

// Display detail page for a specific Legitimator.
exports.legitimator_detail = function (req, res, next) {
    Legitimator.findById(req.params.id)
.exec(function (err, legitimator) {
        if (err) { return next(err); }
        if (legitimator==null) { // No results.
            var err = new Error('Legitimator not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('legitimator_detail', {title: 'Legitimator Detail', legitimator: legitimator});
    })
};

// Display Legitimator create form on GET.
exports.legitimator_create_get = function (req, res, next) {

    res.render('legitimator_form', { title: 'Create Legitimator' });
};

// Handle Legitimator create on POST.
exports.legitimator_create_post = [

    // Validate fields.
    body('legitimator_name').isLength({ min: 1 }).trim().withMessage('Legitimator must be specified.')
        .isAlphanumeric().withMessage('Legitimator has non-alphanumeric characters.'),

    // Sanitize fields.
    sanitizeBody('legitimator_name').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Legitimator object with escaped and trimmed data.
        var legitimator = new Legitimator(
            {
                legitimator_name: req.body.legitimator_name,
            });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('legitimator_form', { title: 'Create Legitimator', legitimator: legitimator, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.
            // Check if Legitimator with same name already exists.
            legitimator.findOne({ 'legitimator_name': req.body.legitimator_name})
                .exec(function(err, found_legitimator) {
                    if (err) {return next(err); }

                    if (found_legitimator) {
                        // Legitimator exists, redirect to its detail page.
                        res.redirect(found_legitimator.url);
                    }
                    else {
                        legitimator.save(function (err) {
                            if (err) { return next(err); }
                            // Legitimator saved. Redirect to legitimator detail page.
                            res.redirect(legitimator.url);
                        });
                    }
                });
        }
    }
];

// Display Legitimator delete form on GET.
exports.legitimator_delete_get = function(req, res, next) {

    Legitimator.findById(req.params.id)
        .exec(function (err, legitimator) {
            if (err) { return next(err); }
            if (legitimator==null) { // No results.
                res.redirect('/catalog/legitimators');
            }
            // Successful, so render.
            res.render('legitimator_delete', { title: 'Delete Legitimator', legitimator:  legitimator});
        })
};

// Handle Legitimator delete on POST.
exports.legitimator_delete_post = function (req, res, next) {

    // Assume valid Legitimator id in field.
    Legitimator.findByIdAndRemove(req.body.id, function deleteLegitimator(err) {
        if (err) { return next(err); }
        // Success, so redirect to list of Legitimator items.
        res.redirect('/catalog/legitimators');
    });
};

// Display Legitimator update form on GET.
exports.legitimator_update_get = function (req, res, next) {

    Legitimator.findById(req.params.id, function (err, legitimator) {
        if (err) { return next(err); }
        if (legitimator == null) { // No results.
            var err = new Error('Legitimator not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('legitimator_form', { title: 'Update Legitimator', legitimator: legitimator });
    });
};

// Handle Legitimator update on POST.
exports.legitimator_update_post = [

    // Validate fields.
    body('legitimator_name').isLength({ min: 1 }).trim().withMessage('Legitimator must be specified.')
        .isAlphanumeric().withMessage('Legitimator has non-alphanumeric characters.'),

    // Sanitize fields.
    sanitizeBody('legitimator_name').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Legitimator object with escaped/trimmed data and old id.
        var legitimator = new Legitimator(
            {
                legitimator_name: req.body.legitimator_name,
                _id:req.params.id // This is required, or a new ID will be assigned!
            });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('legitimator_form', { title: 'Update Legitimator', legitimator: legitimator, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Legitimator.findByIdAndUpdate(req.params.id, legitimator, {}, function (err, thelegitimator) {
                if (err) { return next(err); }
                // Successful - redirect to legitimator detail page.
                res.redirect(thelegitimator.url);
            });
        }
    }
];