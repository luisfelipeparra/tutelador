var Gender = require('../models/gender');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Genders.
exports.gender_list = function(req, res, next) {

    Gender.find()
        .exec(function (err, list_genders) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('gender_list', { title: 'Gender List', gender_list: list_genders });
        })
};

// Display detail page for a specific Gender.
exports.gender_detail = function (req, res, next) {
    Gender.findById(req.params.id)
.exec(function (err, gender) {
        if (err) { return next(err); }
        if (gender==null) { // No results.
            var err = new Error('Gender not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('gender_detail', {title: 'Gender Detail', gender: gender});
    })
};

// Display Gender create form on GET.
exports.gender_create_get = function (req, res, next) {

    res.render('gender_form', { title: 'Create Gender' });
};

// Handle Gender create on POST.
exports.gender_create_post = [

    // Validate fields.
    body('gender').isLength({ min: 1 }).trim().withMessage('Gender must be specified.')
        .isAlphanumeric().withMessage('Gender has non-alphanumeric characters.'),

    // Sanitize fields.
    sanitizeBody('gender').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Gender object with escaped and trimmed data.
        var gender = new Gender(
            {
                gender: req.body.gender,
            });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('gender_form', { title: 'Create Gender', gender: gender, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.
            // Check if Gender with same name already exists.
            Gender.findOne({ 'gender': req.body.gender})
                .exec(function(err, found_gender) {
                    if (err) {return next(err); }

                    if (found_gender) {
                        // Gender exists, redirect to its detail page.
                        res.redirect(found_gender.url);
                    }
                    else {
                        gender.save(function (err) {
                            if (err) { return next(err); }
                            // Gender saved. Redirect to gender detail page.
                            res.redirect(gender.url);
                        });
                    }
                });
        }
    }
];

// Display Gender delete form on GET.
exports.gender_delete_get = function(req, res, next) {

    Gender.findById(req.params.id)
        .exec(function (err, gender) {
            if (err) { return next(err); }
            if (gender==null) { // No results.
                res.redirect('/catalog/genders');
            }
            // Successful, so render.
            res.render('gender_delete', { title: 'Delete Gender', gender:  gender});
        })
};

// Handle Gender delete on POST.
exports.gender_delete_post = function (req, res, next) {

    // Assume valid Gender id in field.
    Gender.findByIdAndRemove(req.body.id, function deleteGender(err) {
        if (err) { return next(err); }
        // Success, so redirect to list of Gender items.
        res.redirect('/catalog/genders');
    });
};

// Display Gender update form on GET.
exports.gender_update_get = function (req, res, next) {

    Gender.findById(req.params.id, function (err, gender) {
        if (err) { return next(err); }
        if (gender == null) { // No results.
            var err = new Error('Gender not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('gender_form', { title: 'Update Gender', gender: gender });
    });
};

// Handle Gender update on POST.
exports.gender_update_post = [

    // Validate fields.
    body('gender').isLength({ min: 1 }).trim().withMessage('Gender must be specified.')
        .isAlphanumeric().withMessage('Gender has non-alphanumeric characters.'),

    // Sanitize fields.
    sanitizeBody('gender').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Gender object with escaped/trimmed data and old id.
        var gender = new Gender(
            {
                gender: req.body.gender,
                _id:req.params.id // This is required, or a new ID will be assigned!
            });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('gender_form', { title: 'Update Gender', gender: gender, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Gender.findByIdAndUpdate(req.params.id, gender, {}, function (err, thegender) {
                if (err) { return next(err); }
                // Successful - redirect to gender detail page.
                res.redirect(thegender.url);
            });
        }
    }
];