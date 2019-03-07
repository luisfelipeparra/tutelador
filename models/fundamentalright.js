var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FundamentalRightSchema = new Schema(
    {
        right_name: {type: String, required: true, enum:['Vida', 'Salud', 'Igualdad', 'Libre expresión']},
        written_law: {type: String, required: true},
    }
);

// Virtual for this fundamentalright instance URL.
FundamentalRightSchema
    .virtual('url')
    .get(function () {
        return '/catalog/fundamentalright/'+this._id;
    });

// Export model.
module.exports = mongoose.model('FundamentalRight', FundamentalRightSchema);