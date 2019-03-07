var SecondInstance = require('../models/secondinstance');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all SecondInstances.
exports.secondinstance_list = function(req, res, next) {

    SecondInstance.find()
        .exec(function (err, list_secondinstances) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('secondinstance_list', { title: 'Second Instance List', secondinstance_list: list_secondinstances });
        })
};

// Display detail page for a specific SecondInstance.
exports.secondinstance_detail = function (req, res, next) {

    SecondInstance.findById(req.params.id)
        .exec(function (err, secondinstance) {
            if (err) { return next(err); }
            if (secondinstance==null) { // No results.
                var err = new Error('Second Instance not found');
                err.status = 404;
                return next(err);
            }
            // Successful, so render.
            res.render('secondinstance_detail', {title: 'Second Instance Detail', secondinstance: secondinstance});
        })
};

// Display SecondInstance create form on GET.
exports.secondinstance_create_get = function (req, res, next) {

    res.render('secondinstance_form', { title: 'Create SecondInstance' });
};

// Handle SecondInstance create on POST.
exports.secondinstance_create_post = [

    // Validate fields.
    body('second_judge_name').isLength({ min: 1 }).trim().withMessage('Judge name must be specified.')
        .isAlphanumeric().withMessage('Judge name has non-alphanumeric characters.'),
    body('second_court_address').isLength({ min: 1 }).trim().withMessage('Court address must be specified.'),
    body('second_instance_date', 'Invalid date of second instance').optional({ checkFalsy: true }).isISO8601(),
    body('second_description').isLength({ min: 1 }).trim().withMessage('Description must be specified.'),
    body('second_decision').isLength({ min: 1 }).trim().withMessage('Decision must be specified.'),
    body('second_ruling').isLength({ min: 1 }).trim().withMessage('Ruling must be specified.'),
    body('second_ruling_date', 'Invalid date of second ruling').optional({ checkFalsy: true }).isISO8601(),
    body('insistence').isLength({ min: 1 }).trim().withMessage('Insistence must be specified.'),
    body('insistence_date', 'Invalid date of insistence').optional({ checkFalsy: true }).isISO8601(),

    // Sanitize fields.
    sanitizeBody('second_judge_name').trim().escape(),
    sanitizeBody('second_court_address').trim().escape(),
    sanitizeBody('second_instance_date').toDate(),
    sanitizeBody('second_description').trim().escape(),
    sanitizeBody('second_decision').trim().escape(),
    sanitizeBody('second_ruling').trim().escape(),
    sanitizeBody('second_ruling_date').toDate(),
    sanitizeBody('plaintiff_agrees').trim().escape(),
    sanitizeBody('insistence').trim().escape(),
    sanitizeBody('insistence_date').toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a SecondInstance object with escaped and trimmed data.
        var secondinstance = new SecondInstance(
            {
                second_judge_name: req.body.second_judge_name,
                second_court_address: req.body.second_court_address,
                second_instance_date: req.body.second_instance_date,
                second_description: req.body.second_description,
                second_decision: req.body.second_decision,
                second_ruling: req.body.second_ruling,
                second_ruling_date: req.body.second_ruling_date,
                plaintiff_agrees: req.body.plaintiff_agrees,
                insistence: req.body.insistence,
                insistence_date: req.body.insistence_date,
            });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('secondinstance_form', { title: 'Create SecondInstance', secondinstance: secondinstance, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save secondinstance.
            secondinstance.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new secondinstance record.
                res.redirect(secondinstance.url);
            });
        }
    }
];

// Display SecondInstance delete form on GET.
exports.secondinstance_delete_get = function(req, res, next) {

    SecondInstance.findById(req.params.id)
        .exec(function (err, secondinstance) {
            if (err) { return next(err); }
            if (secondinstance==null) { // No results.
                res.redirect('/catalog/secondinstances');
            }
            // Successful, so render.
            res.render('secondinstance_delete', { title: 'Delete SecondInstance', secondinstance:  secondinstance});
        })
};

// Handle SecondInstance delete on POST.
exports.secondinstance_delete_post = function (req, res, next) {

    // Assume valid SecondInstance id in field.
    SecondInstance.findByIdAndRemove(req.body.id, function deleteSecondInstance(err) {
        if (err) { return next(err); }
        // Success, so redirect to list of SecondInstance items.
        res.redirect('/catalog/secondinstances');
    });
};

// Display SecondInstance update form on GET.
exports.secondinstance_update_get = function (req, res, next) {

    SecondInstance.findById(req.params.id, function (err, secondinstance) {
        if (err) { return next(err); }
        if (secondinstance == null) { // No results.
            var err = new Error('SecondInstance not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('secondinstance_form', { title: 'Update SecondInstance', secondinstance: secondinstance });
    });
};

// Handle SecondInstance update on POST.
exports.secondinstance_update_post = [

    // Validate fields.
    body('second_judge_name').isLength({ min: 1 }).trim().withMessage('Judge name must be specified.')
        .isAlphanumeric().withMessage('Judge name has non-alphanumeric characters.'),
    body('second_court_address').isLength({ min: 1 }).trim().withMessage('Court address must be specified.'),
    body('second_instance_date', 'Invalid date of second instance').optional({ checkFalsy: true }).isISO8601(),
    body('second_description').isLength({ min: 1 }).trim().withMessage('Description must be specified.'),
    body('second_decision').isLength({ min: 1 }).trim().withMessage('Decision must be specified.'),
    body('second_ruling').isLength({ min: 1 }).trim().withMessage('Ruling must be specified.'),
    body('second_ruling_date', 'Invalid date of second ruling').optional({ checkFalsy: true }).isISO8601(),
    body('insistence').isLength({ min: 1 }).trim().withMessage('Insistence must be specified.'),
    body('insistence_date', 'Invalid date of insistence').optional({ checkFalsy: true }).isISO8601(),

    // Sanitize fields.
    sanitizeBody('second_judge_name').trim().escape(),
    sanitizeBody('second_court_address').trim().escape(),
    sanitizeBody('second_instance_date').toDate(),
    sanitizeBody('second_description').trim().escape(),
    sanitizeBody('second_decision').trim().escape(),
    sanitizeBody('second_ruling').trim().escape(),
    sanitizeBody('second_ruling_date').toDate(),
    sanitizeBody('plaintiff_agrees').trim().escape(),
    sanitizeBody('insistence').trim().escape(),
    sanitizeBody('insistence_date').toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a SecondInstance object with escaped/trimmed data and old id.
        var secondinstance = new SecondInstance(
            {
                second_judge_name: req.body.second_judge_name,
                second_court_address: req.body.second_court_address,
                second_instance_date: req.body.second_instance_date,
                second_description: req.body.second_description,
                second_decision: req.body.second_decision,
                second_ruling: req.body.second_ruling,
                second_ruling_date: req.body.second_ruling_date,
                plaintiff_agrees: req.body.plaintiff_agrees,
                insistence: req.body.insistence,
                insistence_date: req.body.insistence_date,
                _id:req.params.id // This is required, or a new ID will be assigned!
            });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('secondinstance_form', { title: 'Update SecondInstance', secondinstance: secondinstance, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            SecondInstance.findByIdAndUpdate(req.params.id, secondinstance, {}, function (err, thesecondinstance) {
                if (err) { return next(err); }
                // Successful - redirect to secondinstance detail page.
                res.redirect(thesecondinstance.url);
            });
        }
    }
];