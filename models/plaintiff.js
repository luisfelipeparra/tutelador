var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PlaintiffSchema = new Schema(
    {
        plaintiff_person_type: { type: Schema.ObjectId, ref: 'PersonType'},
        plaintiff_gender: { type: Schema.ObjectId, ref: 'Gender'},
        plaintiff_first_name: {type: String, required: true},
        plaintiff_family_name: {type: String, required: true},
        plaintiff_citizenship_card: {type: Number, required: true},
        plaintiff_email: {type: String, required: true},
        plaintiff_address: {type: String, required: true},
        plaintiff_phone_number: {type: Number, required: true, min: 10, max: 10},
        single_tutela: {type: Boolean, required: true},
    }
);

// Virtual properties for author "full" name.
PlaintiffSchema
    .virtual('name')
    .get(function () {
            return this.plaintiff_family_name +', '+this.plaintiff_first_name;
    });

// Virtual for this plaintiff instance URL.
PlaintiffSchema
    .virtual('url')
    .get(function () {
        return '/catalog/plaintiff/'+this._id;
    });

// Export model.
module.exports = mongoose.model('Plaintiff', PlaintiffSchema);