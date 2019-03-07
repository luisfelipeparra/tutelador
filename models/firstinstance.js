var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FirstInstanceSchema = new Schema(
    {
        first_judge_name: {type: String, required: true},
        first_court_address: {type: String, required: true, enum:['Paloquemao', 'etc']},
        first_instance_date: {type: Date},
        first_description: {type: String, required: true},
        first_decision: {type: String, required: true, enum:['Concede', 'Concede parcial', 'Rechaza', 'Niega']},
        first_ruling: {type: String, required: true},
        first_ruling_date: {type: Date},
        plaintiff_agrees: {type: Boolean, required: true},
        defendant_agrees: {type: Boolean, required: true},
        impugnment: {type: String, required: true},
        impugnment_date: {type: Date},
        defendant_obeyed: {type: Boolean, required: true},
        disrespect_incident: {type: String, required: true},
        disrespect_incident_date: {type: Date},
    }
);

// Virtual for this firstinstance object's URL.
FirstInstanceSchema
    .virtual('url')
    .get(function () {
            return '/catalog/firstinstance/'+this._id;
    });

FirstInstanceSchema
    .virtual('first_instance_date_yyyy_mm_dd')
    .get(function () {
            return moment(this.first_instance_date).format('YYYY-MM-DD');
    });

FirstInstanceSchema
    .virtual('first_ruling_date_yyyy_mm_dd')
    .get(function () {
            return moment(this.first_ruling_date).format('YYYY-MM-DD');
    });

FirstInstanceSchema
    .virtual('impugnment_date_yyyy_mm_dd')
    .get(function () {
            return moment(this.impugnment_date).format('YYYY-MM-DD');
    });

FirstInstanceSchema
    .virtual('disrespect_incident_date_yyyy_mm_dd')
    .get(function () {
            return moment(this.disrespect_incident_date).format('YYYY-MM-DD');
    });

// Export model.
module.exports = mongoose.model('FirstInstance', FirstInstanceSchema);