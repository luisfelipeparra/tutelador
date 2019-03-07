var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PersonTypeSchema = new Schema(
    {
        person_type: {type: String, required: true, enum:['Persona natural', 'Persona jurídica']},
    }
);

// Virtual for this persontype instance URL.
PersonTypeSchema
    .virtual('url')
    .get(function () {
        return '/catalog/persontype/'+this._id;
    });

// Export model.
module.exports = mongoose.model('PersonType', PersonTypeSchema);