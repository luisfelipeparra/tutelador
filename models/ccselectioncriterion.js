var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CCSelectionCriterionSchema = new Schema(
    {
        objective_criterion: {type: String, required: true},
        subjective_criterion: {type: String, required: true},
    }
);

// Virtual for this ccselectioncriterion instance URL.
CCSelectionCriterionSchema
    .virtual('url')
    .get(function () {
        return '/catalog/ccselectioncriterion/'+this._id;
    });

// Export model.
module.exports = mongoose.model('CCSelectionCriterion', CCSelectionCriterionSchema);