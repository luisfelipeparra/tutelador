var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SchematicReviewSchema = new Schema(
    {
            date_of_filing: {type: Date},
            place_of_filing: {type: String, required: true},
            plaintiff: { type: Schema.ObjectId, ref: 'Plaintiff', required: true},
            defendant: { type: Schema.ObjectId, ref: 'Defendant', required: true},
            legitimator: { type: Schema.ObjectId, ref: 'Legitimator', required: true},
            case_file: {type: Number, required: true},
            acts: {type: String, required: true},
            cc_selection_criteria: { type: Schema.ObjectId, ref: 'CCSelectionCriteira', required: true},
            violated_rights: { type: Schema.ObjectId, ref: 'FundamentalRights', required: true},
            plaintiff_reasons: {type: String, required: true},
            plaintiff_petition: {type: String, required: true},
            legal_problem: {type: String, required: true},
            special_protection: {type: Boolean, required: true},
    }
);

// Virtual for this schematicreview instance URL.
SchematicReviewSchema
    .virtual('url')
    .get(function () {
        return '/catalog/schematicreview/'+this._id;
    });

SchematicReviewSchema
    .virtual('date_of_filing_yyyy_mm_dd')
    .get(function () {
        return moment(this.date_of_filing).format('YYYY-MM-DD');
    });

// Export model.
module.exports = mongoose.model('SchematicReview', SchematicReviewSchema);