var CCSelectionCriterion = require('../models/ccselectioncriterion');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all CCSelectionCriteria.
exports.ccselectioncriterion_list = function(req, res, next) {

    CCSelectionCriterion.find()
        .exec(function (err, list_ccselectioncriteria) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('ccselectioncriterion_list', { title: 'CC Selection Criterion List', ccselectioncriterion_list: list_ccselectioncriteria });
        })
};

// Display detail page for a specific CCSelectionCriterion.
exports.ccselectioncriterion_detail = function (req, res, next) {

    CCSelectionCriterion.findById(req.params.id)
        .exec(function (err, ccselectioncriterion) {
            if (err) { return next(err); }
            if (ccselectioncriterion==null) { // No results.
                var err = new Error('CC Selection Criterion not found');
                err.status = 404;
                return next(err);
            }
            // Successful, so render.
            res.render('ccselectioncriterion_detail', {title: 'CC Selection Criterion Detail', ccselectioncriterion: ccselectioncriterion});
        })
};

// Display CCSelectionCriterion create form on GET.
exports.ccselectioncriterion_create_get = function (req, res, next) {

    res.render('ccselectioncriterion_form', { title: 'Create CCSelectionCriterion' });
};

// Handle CCSelectionCriterion create on POST.
exports.ccselectioncriterion_create_post = [

    // Validate fields.
    body('objective_criterion').isLength({ min: 1 }).trim().withMessage('Objective criterion must be specified.'),
    body('subjective_criterion').isLength({ min: 1 }).trim().withMessage('Subjective criterion must be specified.'),

    // Sanitize fields.
    sanitizeBody('objective_criterion').trim().escape(),
    sanitizeBody('subjective_criterion').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a CCSelectionCriterion object with escaped and trimmed data.
        var ccselectioncriterion = new CCSelectionCriterion(
            {
                objective_criterion: req.body.objective_criterion,
                subjective_criterion: req.body.subjective_criterion,
            });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('ccselectioncriterion_form', { title: 'Create CCSelectionCriterion', ccselectioncriterion: ccselectioncriterion, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save ccselectioncriterion.
            ccselectioncriterion.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new ccselectioncriterion record.
                res.redirect(ccselectioncriterion.url);
            });
        }
    }
];

// Display CCSelectionCriterion delete form on GET.
exports.ccselectioncriterion_delete_get = function(req, res, next) {

    CCSelectionCriterion.findById(req.params.id)
        .exec(function (err, ccselectioncriterion) {
            if (err) { return next(err); }
            if (ccselectioncriterion==null) { // No results.
                res.redirect('/catalog/ccselectioncriteria');
            }
            // Successful, so render.
            res.render('ccselectioncriterion_delete', { title: 'Delete CCSelectionCriterion', ccselectioncriterion:  ccselectioncriterion});
        })
};

// Handle CCSelectionCriterion delete on POST.
exports.ccselectioncriterion_delete_post = function (req, res, next) {

    // Assume valid CCSelectionCriterion id in field.
    CCSelectionCriterion.findByIdAndRemove(req.body.id, function deleteCCSelectionCriterion(err) {
        if (err) { return next(err); }
        // Success, so redirect to list of CCSelectionCriterion items.
        res.redirect('/catalog/ccselectioncriteria');
    });
};

// Display CCSelectionCriterion update form on GET.
exports.ccselectioncriterion_update_get = function (req, res, next) {

    CCSelectionCriterion.findById(req.params.id, function (err, ccselectioncriterion) {
        if (err) { return next(err); }
        if (ccselectioncriterion == null) { // No results.
            var err = new Error('CCSelectionCriterion not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('ccselectioncriterion_form', { title: 'Update CCSelectionCriterion', ccselectioncriterion: ccselectioncriterion });
    });
};

// Handle CCSelectionCriterion update on POST.
exports.ccselectioncriterion_update_post = [

    // Validate fields.
    body('objective_criterion').isLength({ min: 1 }).trim().withMessage('Objective criterion must be specified.'),
    body('subjective_criterion').isLength({ min: 1 }).trim().withMessage('Subjective criterion must be specified.'),

    // Sanitize fields.
    sanitizeBody('objective_criterion').trim().escape(),
    sanitizeBody('subjective_criterion').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a CCSelectionCriterion object with escaped/trimmed data and old id.
        var ccselectioncriterion = new CCSelectionCriterion(
            {
                objective_criterion: req.body.objective_criterion,
                subjective_criterion: req.body.subjective_criterion,
                _id:req.params.id // This is required, or a new ID will be assigned!
            });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('ccselectioncriterion_form', { title: 'Update CCSelectionCriterion', ccselectioncriterion: ccselectioncriterion, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            CCSelectionCriterion.findByIdAndUpdate(req.params.id, ccselectioncriterion, {}, function (err, theccselectioncriterion) {
                if (err) { return next(err); }
                // Successful - redirect to ccselectioncriterion detail page.
                res.redirect(theccselectioncriterion.url);
            });
        }
    }
];