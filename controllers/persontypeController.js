var PersonType = require('../models/persontype');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all PersonTypes.
exports.persontype_list = function(req, res, next) {

    PersonType.find()
        .exec(function (err, list_persontypes) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('persontype_list', { title: 'Person Type List', persontype_list: list_persontypes });
        })
};

// Display detail page for a specific PersonType.
exports.persontype_detail = function (req, res, next) {
    PersonType.findById(req.params.id)
.exec(function (err, persontype) {
        if (err) { return next(err); }
        if (persontype==null) { // No results.
            var err = new Error('Person Type not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('persontype_detail', {title: 'Person Type Detail', persontype: persontype});
    })
};

// Display PersonType create form on GET.
exports.persontype_create_get = function (req, res, next) {

    res.render('persontype_form', { title: 'Create PersonType' });
};

// Handle PersonType create on POST.
exports.persontype_create_post = [

    // Validate fields.
    body('person_type').isLength({ min: 1 }).trim().withMessage('Person type must be specified.')
        .isAlphanumeric().withMessage('Person type has non-alphanumeric characters.'),

    // Sanitize fields.
    sanitizeBody('person_type').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a PersonType object with escaped and trimmed data.
        var persontype = new PersonType(
            {
                person_type: req.body.person_type,
            });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('persontype_form', { title: 'Create PersonType', persontype: persontype, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.
            // Check if Person Type with same name already exists.
            PersonType.findOne({ 'person_type': req.body.person_type})
                .exec(function(err, found_persontype) {
                    if (err) {return next(err); }

                    if (found_persontype) {
                        // Person Type exists, redirect to its detail page.
                        res.redirect(found_persontype.url);
                    }
                    else {
                        persontype.save(function (err) {
                            if (err) { return next(err); }
                            // Person Type saved. Redirect to persontype detail page.
                            res.redirect(persontype.url);
                        });
                    }
                });
        }
    }
];

// Display PersonType delete form on GET.
exports.persontype_delete_get = function(req, res, next) {

    PersonType.findById(req.params.id)
        .exec(function (err, persontype) {
            if (err) { return next(err); }
            if (persontype==null) { // No results.
                res.redirect('/catalog/persontypes');
            }
            // Successful, so render.
            res.render('persontype_delete', { title: 'Delete PersonType', persontype:  persontype});
        })
};

// Handle PersonType delete on POST.
exports.persontype_delete_post = function (req, res, next) {

    // Assume valid PersonType id in field.
    PersonType.findByIdAndRemove(req.body.id, function deletePersonType(err) {
        if (err) { return next(err); }
        // Success, so redirect to list of PersonType items.
        res.redirect('/catalog/persontypes');
    });
};

// Display PersonType update form on GET.
exports.persontype_update_get = function (req, res, next) {

    PersonType.findById(req.params.id, function (err, persontype) {
        if (err) { return next(err); }
        if (persontype == null) { // No results.
            var err = new Error('PersonType not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('persontype_form', { title: 'Update PersonType', persontype: persontype });
    });
};

// Handle PersonType update on POST.
exports.persontype_update_post = [

    // Validate fields.
    body('person_type').isLength({ min: 1 }).trim().withMessage('Person type must be specified.')
        .isAlphanumeric().withMessage('Person type has non-alphanumeric characters.'),

    // Sanitize fields.
    sanitizeBody('person_type').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a PersonType object with escaped/trimmed data and old id.
        var persontype = new PersonType(
            {
                person_type: req.body.person_type,
                _id:req.params.id // This is required, or a new ID will be assigned!
            });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('persontype_form', { title: 'Update PersonType', persontype: persontype, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            PersonType.findByIdAndUpdate(req.params.id, persontype, {}, function (err, thepersontype) {
                if (err) { return next(err); }
                // Successful - redirect to persontype detail page.
                res.redirect(thepersontype.url);
            });
        }
    }
];