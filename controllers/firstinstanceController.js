var FirstInstance = require('../models/firstinstance');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all FirstInstances.
exports.firstinstance_list = function(req, res, next) {

    FirstInstance.find()
        .exec(function (err, list_firstinstances) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('firstinstance_list', { title: 'First Instance List', firstinstance_list: list_firstinstances });
        })
};

// Display detail page for a specific FirstInstance.
exports.firstinstance_detail = function (req, res, next) {
    FirstInstance.findById(req.params.id)
.exec(function (err, firstinstance) {
        if (err) { return next(err); }
        if (firstinstance==null) { // No results.
            var err = new Error('First Instance not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('firstinstance_detail', {title: 'First Instance Detail', firstinstance: firstinstance});
    })
};

// Display FirstInstance create form on GET.
exports.firstinstance_create_get = function (req, res, next) {

    res.render('firstinstance_form', { title: 'Create FirstInstance' });
};

// Handle FirstInstance create on POST.
exports.firstinstance_create_post = [

    // Validate fields.
    body('first_judge_name').isLength({ min: 1 }).trim().withMessage('Judge name must be specified.')
        .isAlphanumeric().withMessage('Judge name has non-alphanumeric characters.'),
    body('first_court_address').isLength({ min: 1 }).trim().withMessage('Court address must be specified.'),
    body('first_instance_date', 'Invalid date of first instance').optional({ checkFalsy: true }).isISO8601(),
    body('first_description').isLength({ min: 1 }).trim().withMessage('Description must be specified.'),
    body('first_decision').isLength({ min: 1 }).trim().withMessage('Decision must be specified.'),
    body('first_ruling').isLength({ min: 1 }).trim().withMessage('Ruling must be specified.'),
    body('first_ruling_date', 'Invalid date of first ruling').optional({ checkFalsy: true }).isISO8601(),
    body('impugnment').isLength({ min: 1 }).trim().withMessage('Impugnment must be specified.'),
    body('impugnment_date', 'Invalid date of impugnment').optional({ checkFalsy: true }).isISO8601(),
    body('disrespect_incident').isLength({ min: 1 }).trim().withMessage('Disrespect incident must be specified.'),
    body('disrespect_incident_date', 'Invalid date of disrespect incident').optional({ checkFalsy: true }).isISO8601(),

    // Sanitize fields.
    sanitizeBody('first_judge_name').trim().escape(),
    sanitizeBody('first_court_address').trim().escape(),
    sanitizeBody('first_instance_date').toDate(),
    sanitizeBody('first_description').trim().escape(),
    sanitizeBody('first_decision').trim().escape(),
    sanitizeBody('first_ruling').trim().escape(),
    sanitizeBody('first_ruling_date').toDate(),
    sanitizeBody('plaintiff_agrees').trim().escape(),
    sanitizeBody('defendant_agrees').trim().escape(),
    sanitizeBody('impugnment').trim().escape(),
    sanitizeBody('impugnment_date').toDate(),
    sanitizeBody('defendant_obeyed').trim().escape(),
    sanitizeBody('disrespect_incident').trim().escape(),
    sanitizeBody('disrespect_incident_date').toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a FirstInstance object with escaped and trimmed data.
        var firstinstance = new FirstInstance(
            {
                first_judge_name: req.body.first_judge_name,
                first_court_address: req.body.first_court_address,
                first_instance_date: req.body.first_instance_date,
                first_description: req.body.first_description,
                first_decision: req.body.first_decision,
                first_ruling: req.body.first_ruling,
                first_ruling_date: req.body.first_ruling_date,
                plaintiff_agrees: req.body.plaintiff_agrees,
                defendant_agrees: req.body.defendant_agrees,
                impugnment: req.body.impugnment,
                impugnment_date: req.body.impugnment_date,
                defendant_obeyed: req.body.defendant_obeyed,
                disrespect_incident: req.body.disrespect_incident,
                disrespect_incident_date: req.body.disrespect_incident_date,
            });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('firstinstance_form', { title: 'Create FirstInstance', firstinstance: firstinstance, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save firstinstance.
            firstinstance.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new firstinstance record.
                res.redirect(firstinstance.url);
            });
        }
    }
];

// Display FirstInstance delete form on GET.
exports.firstinstance_delete_get = function(req, res, next) {

    FirstInstance.findById(req.params.id)
        .exec(function (err, firstinstance) {
            if (err) { return next(err); }
            if (firstinstance==null) { // No results.
                res.redirect('/catalog/firstinstances');
            }
            // Successful, so render.
            res.render('firstinstance_delete', { title: 'Delete FirstInstance', firstinstance:  firstinstance});
        })
};

// Handle FirstInstance delete on POST.
exports.firstinstance_delete_post = function (req, res, next) {

    // Assume valid FirstInstance id in field.
    FirstInstance.findByIdAndRemove(req.body.id, function deleteFirstInstance(err) {
        if (err) { return next(err); }
        // Success, so redirect to list of FirstInstance items.
        res.redirect('/catalog/firstinstances');
    });
};

// Display FirstInstance update form on GET.
exports.firstinstance_update_get = function (req, res, next) {

    FirstInstance.findById(req.params.id, function (err, firstinstance) {
        if (err) { return next(err); }
        if (firstinstance == null) { // No results.
            var err = new Error('FirstInstance not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('firstinstance_form', { title: 'Update FirstInstance', firstinstance: firstinstance });
    });
};

// Handle FirstInstance update on POST.
exports.firstinstance_update_post = [

    // Validate fields.
    body('first_judge_name').isLength({ min: 1 }).trim().withMessage('Judge name must be specified.')
        .isAlphanumeric().withMessage('Judge name has non-alphanumeric characters.'),
    body('first_court_address').isLength({ min: 1 }).trim().withMessage('Court address must be specified.'),
    body('first_instance_date', 'Invalid date of first instance').optional({ checkFalsy: true }).isISO8601(),
    body('first_description').isLength({ min: 1 }).trim().withMessage('Description must be specified.'),
    body('first_decision').isLength({ min: 1 }).trim().withMessage('Decision must be specified.'),
    body('first_ruling').isLength({ min: 1 }).trim().withMessage('Ruling must be specified.'),
    body('first_ruling_date', 'Invalid date of first ruling').optional({ checkFalsy: true }).isISO8601(),
    body('impugnment').isLength({ min: 1 }).trim().withMessage('Impugnment must be specified.'),
    body('impugnment_date', 'Invalid date of impugnment').optional({ checkFalsy: true }).isISO8601(),
    body('disrespect_incident').isLength({ min: 1 }).trim().withMessage('Disrespect incident must be specified.'),
    body('disrespect_incident_date', 'Invalid date of disrespect incident').optional({ checkFalsy: true }).isISO8601(),

    // Sanitize fields.
    sanitizeBody('first_judge_name').trim().escape(),
    sanitizeBody('first_court_address').trim().escape(),
    sanitizeBody('first_instance_date').toDate(),
    sanitizeBody('first_description').trim().escape(),
    sanitizeBody('first_decision').trim().escape(),
    sanitizeBody('first_ruling').trim().escape(),
    sanitizeBody('first_ruling_date').toDate(),
    sanitizeBody('plaintiff_agrees').trim().escape(),
    sanitizeBody('defendant_agrees').trim().escape(),
    sanitizeBody('impugnment').trim().escape(),
    sanitizeBody('impugnment_date').toDate(),
    sanitizeBody('defendant_obeyed').trim().escape(),
    sanitizeBody('disrespect_incident').trim().escape(),
    sanitizeBody('disrespect_incident_date').toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a FirstInstance object with escaped/trimmed data and old id.
        var firstinstance = new FirstInstance(
            {
                first_judge_name: req.body.first_judge_name,
                first_court_address: req.body.first_court_address,
                first_instance_date: req.body.first_instance_date,
                first_description: req.body.first_description,
                first_decision: req.body.first_decision,
                first_ruling: req.body.first_ruling,
                first_ruling_date: req.body.first_ruling_date,
                plaintiff_agrees: req.body.plaintiff_agrees,
                defendant_agrees: req.body.defendant_agrees,
                impugnment: req.body.impugnment,
                impugnment_date: req.body.impugnment_date,
                defendant_obeyed: req.body.defendant_obeyed,
                disrespect_incident: req.body.disrespect_incident,
                disrespect_incident_date: req.body.disrespect_incident_date,
                _id:req.params.id // This is required, or a new ID will be assigned!
            });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('firstinstance_form', { title: 'Update FirstInstance', firstinstance: firstinstance, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            FirstInstance.findByIdAndUpdate(req.params.id, firstinstance, {}, function (err, thefirstinstance) {
                if (err) { return next(err); }
                // Successful - redirect to firstinstance detail page.
                res.redirect(thefirstinstance.url);
            });
        }
    }
];