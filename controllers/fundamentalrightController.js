var FundamentalRight = require('../models/fundamentalright');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all FundamentalRights.
exports.fundamentalright_list = function(req, res, next) {

    FundamentalRight.find()
        .exec(function (err, list_fundamentalrights) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('fundamentalright_list', { title: 'Fundamental Right List', fundamentalright_list: list_fundamentalrights });
        })
};

// Display detail page for a specific FundamentalRight.
exports.fundamentalright_detail = function (req, res, next) {
    FundamentalRight.findById(req.params.id)
.exec(function (err, fundamentalright) {
        if (err) { return next(err); }
        if (fundamentalright==null) { // No results.
            var err = new Error('Fundamental Right not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('fundamentalright_detail', {title: 'Fundamental Right Detail', fundamentalright: fundamentalright});
    })
};

// Display FundamentalRight create form on GET.
exports.fundamentalright_create_get = function (req, res, next) {

    res.render('fundamentalright_form', { title: 'Create FundamentalRight' });
};

// Handle FundamentalRight create on POST.
exports.fundamentalright_create_post = [

    // Validate fields.
    body('right_name').isLength({ min: 1 }).trim().withMessage('Right must be specified.'),
    body('written_law').isLength({ min: 1 }).trim().withMessage('Law must be specified.'),

    // Sanitize fields.
    sanitizeBody('right_name').trim().escape(),
    sanitizeBody('written_law').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a FundamentalRight object with escaped and trimmed data.
        var fundamentalright = new FundamentalRight(
            {
                right_name: req.body.right_name,
                written_law: req.body.written_law,
            });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('fundamentalright_form', { title: 'Create FundamentalRight', fundamentalright: fundamentalright, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save fundamentalright.
            fundamentalright.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new fundamentalright record.
                res.redirect(fundamentalright.url);
            });
        }
    }
];

// Display FundamentalRight delete form on GET.
exports.fundamentalright_delete_get = function(req, res, next) {

    FundamentalRight.findById(req.params.id)
        .exec(function (err, fundamentalright) {
            if (err) { return next(err); }
            if (fundamentalright==null) { // No results.
                res.redirect('/catalog/fundamentalrights');
            }
            // Successful, so render.
            res.render('fundamentalright_delete', { title: 'Delete FundamentalRight', fundamentalright:  fundamentalright});
        })
};

// Handle FundamentalRight delete on POST.
exports.fundamentalright_delete_post = function (req, res, next) {

    // Assume valid FundamentalRight id in field.
    FundamentalRight.findByIdAndRemove(req.body.id, function deleteFundamentalRight(err) {
        if (err) { return next(err); }
        // Success, so redirect to list of FundamentalRight items.
        res.redirect('/catalog/fundamentalrights');
    });
};

// Display FundamentalRight update form on GET.
exports.fundamentalright_update_get = function (req, res, next) {

    FundamentalRight.findById(req.params.id, function (err, fundamentalright) {
        if (err) { return next(err); }
        if (fundamentalright == null) { // No results.
            var err = new Error('FundamentalRight not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('fundamentalright_form', { title: 'Update FundamentalRight', fundamentalright: fundamentalright });
    });
};

// Handle FundamentalRight update on POST.
exports.fundamentalright_update_post = [

    // Validate fields.
    body('right_name').isLength({ min: 1 }).trim().withMessage('Right must be specified.'),
    body('written_law').isLength({ min: 1 }).trim().withMessage('Law must be specified.'),

    // Sanitize fields.
    sanitizeBody('right_name').trim().escape(),
    sanitizeBody('written_law').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a FundamentalRight object with escaped/trimmed data and old id.
        var fundamentalright = new FundamentalRight(
            {
                right_name: req.body.right_name,
                written_law: req.body.written_law,
                _id:req.params.id // This is required, or a new ID will be assigned!
            });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('fundamentalright_form', { title: 'Update FundamentalRight', fundamentalright: fundamentalright, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            FundamentalRight.findByIdAndUpdate(req.params.id, fundamentalright, {}, function (err, thefundamentalright) {
                if (err) { return next(err); }
                // Successful - redirect to fundamentalright detail page.
                res.redirect(thefundamentalright.url);
            });
        }
    }
];