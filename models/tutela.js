var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TutelaSchema = new Schema(
    {
        communication_type: {type: Boolean, required: true},
        example: {type: String, required: true},
        pre_selected: {type: Boolean, required: true},
        pre_selection_date: {type: Date},
        selected: {type: Boolean, required: true},
        selection_date: {type: Date},
        cc_decision: {type: String, required: true, enum:['Concede', 'Concede parcial', 'Rechaza', 'Niega']},
        cc_ruling: {type: String, required: true},
        cc_ruling_date: {type: Date},
        cc_judgment: {type: String, required: true},
        cc_judgment_date: {type: Date},
        published: {type: Boolean, required: true},
        publication_link: {type: String, required: true},
        publication_date: {type: Date},
    }
);

// Virtual for this tutela instance URL.
TutelaSchema
    .virtual('url')
    .get(function () {
            return '/catalog/tutela/'+this._id;
    });

TutelaSchema
    .virtual('pre_selection_date_yyyy_mm_dd')
    .get(function () {
            return moment(this.pre_selection_date).format('YYYY-MM-DD');
    });

TutelaSchema
    .virtual('selection_date_yyyy_mm_dd')
    .get(function () {
            return moment(this.selection_date).format('YYYY-MM-DD');
    });

TutelaSchema
    .virtual('cc_ruling_date_yyyy_mm_dd')
    .get(function () {
            return moment(this.cc_ruling_date).format('YYYY-MM-DD');
    });

TutelaSchema
    .virtual('cc_judgment_date_yyyy_mm_dd')
    .get(function () {
            return moment(this.cc_judgment_date).format('YYYY-MM-DD');
    });

TutelaSchema
    .virtual('publication_date_yyyy_mm_dd')
    .get(function () {
            return moment(this.publication_date).format('YYYY-MM-DD');
    });

// Export model.
module.exports = mongoose.model('Tutela', TutelaSchema);