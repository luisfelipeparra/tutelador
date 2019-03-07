var SchematicReview = require('../models/schematicreview');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all SchematicReviews.
exports.schematicreview_list = function(req, res, next) {

    SchematicReview.find()
        .exec(function (err, list_schematicreviews) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('schematicreview_list', { title: 'Schematic Review List', schematicreview_list: list_schematicreviews });
        })
};

// Display detail page for a specific SchematicReview.
exports.schematicreview_detail = function (req, res, next) {

    SchematicReview.findById(req.params.id)
        .exec(function (err, schematicreview) {
            if (err) { return next(err); }
            if (schematicreview==null) { // No results.
                var err = new Error('Schematic Review not found');
                err.status = 404;
                return next(err);
            }
            // Successful, so render.
            res.render('schematicreview_detail', {title: 'Schematic Review Detail', schematicreview: schematicreview});
        })
};

// Display SchematicReview create form on GET.
exports.schematicreview_create_get = function (req, res, next) {

    res.render('schematicreview_form', { title: 'Create SchematicReview' });
};

// Handle SchematicReview create on POST.
exports.schematicreview_create_post = [

    // Validate fields.
    body('date_of_filing', 'Invalid date of filing').optional({ checkFalsy: true }).isISO8601(),
    body('place_of_filing').isLength({ min: 1 }).trim().withMessage('Place of filing must be specified.'),
    body('plaintiff').isLength({ min: 1 }).trim().withMessage('Plaintiff must be specified.'),
    body('defendant').isLength({ min: 1 }).trim().withMessage('Defendant must be specified.'),
    body('legitimator').isLength({ min: 1 }).trim().withMessage('Legitimator must be specified.'),
    body('case_file').isLength({ min: 1 }).trim().withMessage('Case file must be specified.'),
    body('acts').isLength({ min: 1 }).trim().withMessage('Acts must be specified.'),
    body('cc_selection_criteria').isLength({ min: 1 }).trim().withMessage('Selection criteria must be specified.'),
    body('violated_rights').isLength({ min: 1 }).trim().withMessage('Violated rights must be specified.'),
    body('plaintiff_reasons').isLength({ min: 1 }).trim().withMessage('Plaintiff reasons must be specified.'),
    body('plaintiff_petition').isLength({ min: 1 }).trim().withMessage('Plaintiff petition must be specified.'),
    body('legal_problem').isLength({ min: 1 }).trim().withMessage('Legal problem must be specified.'),

    // Sanitize fields.
    sanitizeBody('date_of_filing').toDate(),
    sanitizeBody('place_of_filing').trim().escape(),
    sanitizeBody('plaintiff').trim().escape(),
    sanitizeBody('defendant').trim().escape(),
    sanitizeBody('legitimator').trim().escape(),
    sanitizeBody('case_file').trim().escape(),
    sanitizeBody('acts').trim().escape(),
    sanitizeBody('cc_selection_criteria').trim().escape(),
    sanitizeBody('violated_rights').trim().escape(),
    sanitizeBody('plaintiff_reasons').trim().escape(),
    sanitizeBody('plaintiff_petition').trim().escape(),
    sanitizeBody('legal_problem').trim().escape(),
    sanitizeBody('special_protection').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a SchematicReview object with escaped and trimmed data.
        var schematicreview = new SchematicReview(
            {
                date_of_filing: req.body.date_of_filing,
                place_of_filing: req.body.place_of_filing,
                plaintiff: req.body.plaintiff,
                defendant: req.body.defendant,
                legitimator: req.body.legitimator,
                case_file: req.body.case_file,
                acts: req.body.acts,
                cc_selection_criteria: req.body.cc_selection_criteria,
                violated_rights: req.body.violated_rights,
                plaintiff_reasons: req.body.plaintiff_reasons,
                plaintiff_petition: req.body.plaintiff_petition,
                legal_problem: req.body.legal_problem,
                special_protection: req.body.special_protection,
            });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('schematicreview_form', { title: 'Create SchematicReview', schematicreview: schematicreview, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save schematicreview.
            schematicreview.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new schematicreview record.
                res.redirect(schematicreview.url);
            });
        }
    }
];

// Display SchematicReview delete form on GET.
exports.schematicreview_delete_get = function(req, res, next) {

    SchematicReview.findById(req.params.id)
        .exec(function (err, schematicreview) {
            if (err) { return next(err); }
            if (schematicreview==null) { // No results.
                res.redirect('/catalog/schematicreviews');
            }
            // Successful, so render.
            res.render('schematicreview_delete', { title: 'Delete SchematicReview', schematicreview:  schematicreview});
        })
};

// Handle SchematicReview delete on POST.
exports.schematicreview_delete_post = function (req, res, next) {

    // Assume valid SchematicReview id in field.
    SchematicReview.findByIdAndRemove(req.body.id, function deleteSchematicReview(err) {
        if (err) { return next(err); }
        // Success, so redirect to list of SchematicReview items.
        res.redirect('/catalog/schematicreviews');
    });
};

// Display SchematicReview update form on GET.
exports.schematicreview_update_get = function (req, res, next) {

    SchematicReview.findById(req.params.id, function (err, schematicreview) {
        if (err) { return next(err); }
        if (schematicreview == null) { // No results.
            var err = new Error('SchematicReview not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('schematicreview_form', { title: 'Update SchematicReview', schematicreview: schematicreview });
    });
};

// Handle SchematicReview update on POST.
exports.schematicreview_update_post = [

    // Validate fields.
    body('date_of_filing', 'Invalid date of filing').optional({ checkFalsy: true }).isISO8601(),
    body('place_of_filing').isLength({ min: 1 }).trim().withMessage('Place of filing must be specified.'),
    body('plaintiff').isLength({ min: 1 }).trim().withMessage('Plaintiff must be specified.'),
    body('defendant').isLength({ min: 1 }).trim().withMessage('Defendant must be specified.'),
    body('legitimator').isLength({ min: 1 }).trim().withMessage('Legitimator must be specified.'),
    body('case_file').isLength({ min: 1 }).trim().withMessage('Case file must be specified.'),
    body('acts').isLength({ min: 1 }).trim().withMessage('Acts must be specified.'),
    body('cc_selection_criteria').isLength({ min: 1 }).trim().withMessage('Selection criteria must be specified.'),
    body('violated_rights').isLength({ min: 1 }).trim().withMessage('Violated rights must be specified.'),
    body('plaintiff_reasons').isLength({ min: 1 }).trim().withMessage('Plaintiff reasons must be specified.'),
    body('plaintiff_petition').isLength({ min: 1 }).trim().withMessage('Plaintiff petition must be specified.'),
    body('legal_problem').isLength({ min: 1 }).trim().withMessage('Legal problem must be specified.'),

    // Sanitize fields.
    sanitizeBody('date_of_filing').toDate(),
    sanitizeBody('place_of_filing').trim().escape(),
    sanitizeBody('plaintiff').trim().escape(),
    sanitizeBody('defendant').trim().escape(),
    sanitizeBody('legitimator').trim().escape(),
    sanitizeBody('case_file').trim().escape(),
    sanitizeBody('acts').trim().escape(),
    sanitizeBody('cc_selection_criteria').trim().escape(),
    sanitizeBody('violated_rights').trim().escape(),
    sanitizeBody('plaintiff_reasons').trim().escape(),
    sanitizeBody('plaintiff_petition').trim().escape(),
    sanitizeBody('legal_problem').trim().escape(),
    sanitizeBody('special_protection').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a SchematicReview object with escaped/trimmed data and old id.
        var schematicreview = new SchematicReview(
            {
                date_of_filing: req.body.date_of_filing,
                place_of_filing: req.body.place_of_filing,
                plaintiff: req.body.plaintiff,
                defendant: req.body.defendant,
                legitimator: req.body.legitimator,
                case_file: req.body.case_file,
                acts: req.body.acts,
                cc_selection_criteria: req.body.cc_selection_criteria,
                violated_rights: req.body.violated_rights,
                plaintiff_reasons: req.body.plaintiff_reasons,
                plaintiff_petition: req.body.plaintiff_petition,
                legal_problem: req.body.legal_problem,
                special_protection: req.body.special_protection,
                _id:req.params.id // This is required, or a new ID will be assigned!
            });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('schematicreview_form', { title: 'Update SchematicReview', schematicreview: schematicreview, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            SchematicReview.findByIdAndUpdate(req.params.id, schematicreview, {}, function (err, theschematicreview) {
                if (err) { return next(err); }
                // Successful - redirect to schematicreview detail page.
                res.redirect(theschematicreview.url);
            });
        }
    }
];