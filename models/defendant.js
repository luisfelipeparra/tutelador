var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DefendantSchema = new Schema(
    {
        defendant_person_type: { type: Schema.ObjectId, ref: 'PersonType'},
        defendant_gender: { type: Schema.ObjectId, ref: 'Gender'},
        defendant_name: {type: String, required: true},
        defendant_address: {type: String, required: true},
    }
);

// Virtual for this defendant instance URL.
DefendantSchema
    .virtual('url')
    .get(function () {
        return '/catalog/defendant/'+this._id;
    });

// Export model.
module.exports = mongoose.model('Defendant', DefendantSchema);