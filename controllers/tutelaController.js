var Tutela = require('../models/tutela');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Tutelas.
exports.tutela_list = function(req, res, next) {

    Tutela.find()
        .exec(function (err, list_ccselectioncriteria) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('ccselectioncriterion_list', { title: 'CC Selection Criterion List', ccselectioncriterion_list: list_ccselectioncriteria });
        })
};

// Display detail page for a specific Tutela.
exports.tutela_detail = function (req, res, next) {

    Tutela.findById(req.params.id)
        .exec(function (err, tutela) {
            if (err) { return next(err); }
            if (tutela==null) { // No results.
                var err = new Error('Tutela not found');
                err.status = 404;
                return next(err);
            }
            // Successful, so render.
            res.render('tutela_detail', {title: 'Tutela Detail', tutela: tutela});
        })
};

// Display Tutela create form on GET.
exports.tutela_create_get = function (req, res, next) {

    res.render('tutela_form', { title: 'Create Tutela' });
};

// Handle Tutela create on POST.
exports.tutela_create_post = [

    // Validate fields.
    body('pre_selection_date', 'Invalid date of pre selection').optional({ checkFalsy: true }).isISO8601(),
    body('selection_date', 'Invalid date of selection').optional({ checkFalsy: true }).isISO8601(),
    body('cc_decision').isLength({ min: 1 }).trim().withMessage('Final decision must be specified.'),
    body('cc_ruling').isLength({ min: 1 }).trim().withMessage('Final ruling must be specified.'),
    body('cc_ruling_date', 'Invalid date of final ruling').optional({ checkFalsy: true }).isISO8601(),
    body('cc_judgment').isLength({ min: 1 }).trim().withMessage('Judgment must be specified.'),
    body('cc_judgment_date', 'Invalid date of judgment').optional({ checkFalsy: true }).isISO8601(),
    body('publication_link').isLength({ min: 1 }).trim().withMessage('Case link must be specified.'),
    body('publication_date', 'Invalid date of case publication').optional({ checkFalsy: true }).isISO8601(),

    // Sanitize fields.
    sanitizeBody('communication_type').trim().escape(),
    sanitizeBody('example').trim().escape(),
    sanitizeBody('pre_selected').trim().escape(),
    sanitizeBody('pre_selection_date').toDate(),
    sanitizeBody('selected').trim().escape(),
    sanitizeBody('selection_date').toDate(),
    sanitizeBody('cc_decision').trim().escape(),
    sanitizeBody('cc_ruling').trim().escape(),
    sanitizeBody('cc_ruling_date').toDate(),
    sanitizeBody('cc_judgment').trim().escape(),
    sanitizeBody('cc_judgment_date').toDate(),
    sanitizeBody('published').trim().escape(),
    sanitizeBody('publication_link').trim().escape(),
    sanitizeBody('publication_date').toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Tutela object with escaped and trimmed data.
        var tutela = new Tutela(
            {
                communication_type: req.body.communication_type,
                example: req.body.example,
                pre_selected: req.body.pre_selected,
                pre_selection_date: req.body.pre_selection_date,
                selected: req.body.selected,
                selection_date: req.body.selection_date,
                cc_decision: req.body.cc_decision,
                cc_ruling: req.body.cc_ruling,
                cc_ruling_date: req.body.cc_ruling_date,
                cc_judgment: req.body.cc_judgment,
                cc_judgment_date: req.body.cc_judgment_date,
                published: req.body.published,
                publication_link: req.body.publication_link,
                publication_date: req.body.publication_date,
            });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('tutela_form', { title: 'Create Tutela', tutela: tutela, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save tutela.
            tutela.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new tutela record.
                res.redirect(tutela.url);
            });
        }
    }
];

// Display Tutela delete form on GET.
exports.tutela_delete_get = function(req, res, next) {

    Tutela.findById(req.params.id)
        .exec(function (err, tutela) {
            if (err) { return next(err); }
            if (tutela==null) { // No results.
                res.redirect('/catalog/tutelas');
            }
            // Successful, so render.
            res.render('tutela_delete', { title: 'Delete Tutela', tutela:  tutela});
        })
};

// Handle Tutela delete on POST.
exports.tutela_delete_post = function (req, res, next) {

    // Assume valid Tutela id in field.
    Tutela.findByIdAndRemove(req.body.id, function deleteTutela(err) {
        if (err) { return next(err); }
        // Success, so redirect to list of Tutela items.
        res.redirect('/catalog/tutelas');
    });
};

// Display Tutela update form on GET.
exports.tutela_update_get = function (req, res, next) {

    Tutela.findById(req.params.id, function (err, tutela) {
        if (err) { return next(err); }
        if (tutela == null) { // No results.
            var err = new Error('Tutela not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('tutela_form', { title: 'Update Tutela', tutela: tutela });
    });
};

// Handle Tutela update on POST.
exports.tutela_update_post = [

    // Validate fields.
    body('pre_selection_date', 'Invalid date of pre selection').optional({ checkFalsy: true }).isISO8601(),
    body('selection_date', 'Invalid date of selection').optional({ checkFalsy: true }).isISO8601(),
    body('cc_decision').isLength({ min: 1 }).trim().withMessage('Final decision must be specified.'),
    body('cc_ruling').isLength({ min: 1 }).trim().withMessage('Final ruling must be specified.'),
    body('cc_ruling_date', 'Invalid date of final ruling').optional({ checkFalsy: true }).isISO8601(),
    body('cc_judgment').isLength({ min: 1 }).trim().withMessage('Judgment must be specified.'),
    body('cc_judgment_date', 'Invalid date of judgment').optional({ checkFalsy: true }).isISO8601(),
    body('publication_link').isLength({ min: 1 }).trim().withMessage('Case link must be specified.'),
    body('publication_date', 'Invalid date of case publication').optional({ checkFalsy: true }).isISO8601(),

    // Sanitize fields.
    sanitizeBody('communication_type').trim().escape(),
    sanitizeBody('example').trim().escape(),
    sanitizeBody('pre_selected').trim().escape(),
    sanitizeBody('pre_selection_date').toDate(),
    sanitizeBody('selected').trim().escape(),
    sanitizeBody('selection_date').toDate(),
    sanitizeBody('cc_decision').trim().escape(),
    sanitizeBody('cc_ruling').trim().escape(),
    sanitizeBody('cc_ruling_date').toDate(),
    sanitizeBody('cc_judgment').trim().escape(),
    sanitizeBody('cc_judgment_date').toDate(),
    sanitizeBody('published').trim().escape(),
    sanitizeBody('publication_link').trim().escape(),
    sanitizeBody('publication_date').toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Tutela object with escaped/trimmed data and old id.
        var tutela = new Tutela(
            {
                communication_type: req.body.communication_type,
                example: req.body.example,
                pre_selected: req.body.pre_selected,
                pre_selection_date: req.body.pre_selection_date,
                selected: req.body.selected,
                selection_date: req.body.selection_date,
                cc_decision: req.body.cc_decision,
                cc_ruling: req.body.cc_ruling,
                cc_ruling_date: req.body.cc_ruling_date,
                cc_judgment: req.body.cc_judgment,
                cc_judgment_date: req.body.cc_judgment_date,
                published: req.body.published,
                publication_link: req.body.publication_link,
                publication_date: req.body.publication_date,
                _id:req.params.id // This is required, or a new ID will be assigned!
            });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('tutela_form', { title: 'Update Tutela', tutela: tutela, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Tutela.findByIdAndUpdate(req.params.id, tutela, {}, function (err, thetutela) {
                if (err) { return next(err); }
                // Successful - redirect to tutela detail page.
                res.redirect(thetutela.url);
            });
        }
    }
];