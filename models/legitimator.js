var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LegitimatorSchema = new Schema(
    {
        legitimator_name: {type: String, required: true, enum:['Abogado', 'Representante legal', 'Personería/Defensoría del pueblo', 'Demandante']},
    }
);

// Virtual for this legitimator instance URL.
LegitimatorSchema
    .virtual('url')
    .get(function () {
        return '/catalog/legitimator/'+this._id;
    });

// Export model.
module.exports = mongoose.model('Legitimator', LegitimatorSchema);