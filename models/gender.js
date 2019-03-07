var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenderSchema = new Schema(
    {
        gender: {type: String, required: true, enum:['Masculino', 'Femenino', 'LGBTI']},
    }
);

// Virtual for this gender instance URL.
GenderSchema
    .virtual('url')
    .get(function () {
        return '/catalog/gender/'+this._id;
    });

// Export model.
module.exports = mongoose.model('Gender', GenderSchema);