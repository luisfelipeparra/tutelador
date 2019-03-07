var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SecondInstanceSchema = new Schema(
    {
        second_judge_name: {type: String, required: true},
        second_court_address: {type: String, required: true, enum:['Paloquemao', 'etc']},
        second_instance_date: {type: Date},
        second_description: {type: String, required: true},
        second_decision: {type: String, required: true, enum:['Concede', 'Concede parcial', 'Rechaza', 'Niega']},
        second_ruling: {type: String, required: true},
        second_ruling_date: {type: Date},
        plaintiff_agrees: {type: Boolean, required: true},
        insistence: {type: String, required: true},
        insistence_date: {type: Date},
    }
);

// Virtual for this secondinstance object's URL.
SecondInstanceSchema
    .virtual('url')
    .get(function () {
            return '/catalog/secondinstance/'+this._id;
    });

SecondInstanceSchema
    .virtual('second_instance_date_yyyy_mm_dd')
    .get(function () {
        return moment(this.second_instance_date).format('YYYY-MM-DD');
    });

SecondInstanceSchema
    .virtual('second_ruling_date_yyyy_mm_dd')
    .get(function () {
        return moment(this.second_ruling_date).format('YYYY-MM-DD');
    });

SecondInstanceSchema
    .virtual('insistence_date_yyyy_mm_dd')
    .get(function () {
        return moment(this.insistence_date).format('YYYY-MM-DD');
    });

// Export model.
module.exports = mongoose.model('SecondInstance', SecondInstanceSchema);