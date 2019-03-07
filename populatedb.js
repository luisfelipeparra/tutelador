#! /usr/bin/env node

console.log('This script populates some tutelador tests to database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var CCSelectionCriterion = require('./models/ccselectioncriterion');
var Defendant = require('./models/defendant');
var FirstInstance = require('./models/firstinstance');
var FundamentalRight = require('./models/fundamentalright');
var Gender = require('./models/gender');
var Legitimator = require('./models/legitimator');
var PersonType = require('./models/persontype');
var Plaintiff = require('./models/plaintiff');
var SchematicReview = require('./models/schematicreview');
var SecondInstance = require('./models/secondinstance');
var Tutela = require('./models/tutela');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var ccselectioncriteria = [];
var defendants = [];
var firstinstances = [];
var fundamentalrights = [];
var genders = [];
var legitimators = [];
var persontypes = [];
var plaintiffs = [];
var schematicreviews = [];
var secondinstances = [];
var tutelas = [];

function ccSelectionCriterionCreate(objective_criterion, subjective_criterion, cb) {

    ccselectioncriteriondetail = {
        objective_criterion: objective_criterion,
        subjective_criterion: subjective_criterion
    };

    var ccselectioncriterion = new CCSelectionCriterion(ccselectioncriteriondetail);
    ccselectioncriterion.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New CCSelectionCriterion: ' + ccselectioncriterion);
        ccselectioncriteria.push(ccselectioncriterion);
        cb(null, ccselectioncriterion)
    }  );
}

function defendantCreate(defendant_person_type, defendant_gender, defendant_name, defendant_address, cb) {

    defendantdetail = {
        defendant_name: defendant_name
    };
    if (defendant_person_type != false) defendantdetail.defendant_person_type = defendant_person_type;
    if (defendant_gender != false) defendantdetail.defendant_gender = defendant_gender;
    if (defendant_address != false) defendantdetail.defendant_address = defendant_address;

    var defendant = new Defendant(defendantdetail);
    defendant.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New Defendant: ' + defendant);
        defendants.push(defendant);
        cb(null, defendant)
    }  );
}

function firstInstanceCreate(first_judge_name, first_court_address, d_first_instance, first_description,
                             first_decision, first_ruling, d_first_ruling, plaintiff_agrees, defendant_agrees,
                             impugnment, d_impugnment, defendant_obeyed, disrespect_incident, d_disrespect_incident,
                             cb) {

    firstinstancedetail = {
        first_judge_name: first_judge_name,
        first_court_address: first_court_address
    };
    if (d_first_instance != false) firstinstancedetail.first_instance_date = d_first_instance;
    if (first_description != false) firstinstancedetail.first_description = first_description;
    if (first_decision != false) firstinstancedetail.first_decision = first_decision;
    if (first_ruling != false) firstinstancedetail.first_ruling = first_ruling;
    if (d_first_ruling != false) firstinstancedetail.first_ruling_date = d_first_ruling;
    if (plaintiff_agrees != false) firstinstancedetail.plaintiff_agrees = plaintiff_agrees;
    if (defendant_agrees != false) firstinstancedetail.defendant_agrees = defendant_agrees;
    if (impugnment != false) firstinstancedetail.impugnment = impugnment;
    if (d_impugnment != false) firstinstancedetail.impugnment_date = d_impugnment;
    if (defendant_obeyed != false) firstinstancedetail.defendant_obeyed = defendant_obeyed;
    if (disrespect_incident != false) firstinstancedetail.disrespect_incident = disrespect_incident;
    if (d_disrespect_incident != false) firstinstancedetail.disrespect_incident_date = d_disrespect_incident;

    var firstinstance = new FirstInstance(firstinstancedetail);
    firstinstance.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New FirstInstance: ' + firstinstance);
        firstinstances.push(firstinstance);
        cb(null, firstinstance)
    }  );
}

function fundamentalRightCreate(right_name, written_law, cb) {

    fundamentalrightdetail = {
        right_name: right_name,
        written_law: written_law
    };

    var fundamentalright = new FundamentalRight(fundamentalrightdetail);
    fundamentalright.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New FundamentalRight: ' + fundamentalright);
        fundamentalrights.push(fundamentalright);
        cb(null, fundamentalright)
    }  );
}

function genderCreate(gender, cb) {

    var gender = new Gender({ gender: gender });
    gender.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New Gender: ' + gender);
        genders.push(gender);
        cb(null, gender)
    }  );
}

function legitimatorCreate(legitimator_name, cb) {

    var legitimator = new Legitimator({ legitimator_name: legitimator_name });
    legitimator.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New Legitimator: ' + legitimator);
        legitimators.push(legitimator);
        cb(null, legitimator)
    }  );
}

function personTypeCreate(person_type, cb) {

    var persontype = new PersonType({ person_type: person_type });
    persontype.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New PersonType: ' + persontype);
        persontypes.push(persontype);
        cb(null, persontype)
    }  );
}

function plaintiffCreate(plaintiff_person_type, plaintiff_gender, plaintiff_first_name, plaintiff_family_name,
                         plaintiff_citizenship_card, plaintiff_email, plaintiff_address, plaintiff_phone_number,
                         single_tutela, cb) {

    plaintiffdetail = {
        plaintiff_first_name: plaintiff_first_name,
        plaintiff_family_name: plaintiff_family_name
    };
    if (plaintiff_person_type != false) plaintiffdetail.plaintiff_person_type = plaintiff_person_type;
    if (plaintiff_gender != false) plaintiffdetail.plaintiff_gender = plaintiff_gender;
    if (plaintiff_citizenship_card != false) plaintiffdetail.plaintiff_citizenship_card = plaintiff_citizenship_card;
    if (plaintiff_email != false) plaintiffdetail.plaintiff_email = plaintiff_email;
    if (plaintiff_address != false) plaintiffdetail.plaintiff_address = plaintiff_address;
    if (plaintiff_phone_number != false) plaintiffdetail.plaintiff_phone_number = plaintiff_phone_number;
    if (single_tutela != false) plaintiffdetail.single_tutela = single_tutela;

    var plaintiff = new Plaintiff(plaintiffdetail);
    plaintiff.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New Plaintiff: ' + plaintiff);
        plaintiffs.push(plaintiff);
        cb(null, plaintiff)
    }  );
}

function schematicReviewCreate(d_filing, place_of_filing, plaintiff, defendant, legitimator, case_file,
                               acts, cc_selection_criteria, violated_rights, plaintiff_reasons, plaintiff_petition,
                               legal_problem, special_protection, cb) {

    schematicreviewdetail = {
        plaintiff: plaintiff,
        defendant: defendant,
        legitimator: legitimator
    };
    if (d_filing != false) schematicreviewdetail.date_of_filing = d_filing;
    if (place_of_filing != false) schematicreviewdetail.place_of_filing = place_of_filing;
    if (case_file != false) schematicreviewdetail.case_file = case_file;
    if (acts != false) schematicreviewdetail.acts = acts;
    if (cc_selection_criteria != false) schematicreviewdetail.cc_selection_criteria = cc_selection_criteria;
    if (violated_rights != false) schematicreviewdetail.violated_rights = violated_rights;
    if (plaintiff_reasons != false) schematicreviewdetail.plaintiff_reasons = plaintiff_reasons;
    if (plaintiff_petition != false) schematicreviewdetail.plaintiff_petition = plaintiff_petition;
    if (legal_problem != false) schematicreviewdetail.legal_problem = legal_problem;
    if (special_protection != false) schematicreviewdetail.special_protection = special_protection;

    var schematicreview = new SchematicReview(schematicreviewdetail);
    schematicreview.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New SchematicReview: ' + schematicreview);
        schematicreviews.push(schematicreview);
        cb(null, schematicreview)
    }  );
}

function secondInstanceCreate(second_judge_name, second_court_address, d_second_instance, second_description,
                              second_decision, second_ruling, d_second_ruling, plaintiff_agrees, insistence,
                              d_insistence, cb) {

    secondinstancedetail = {
        second_judge_name: first_judge_name,
        second_court_address: first_court_address
    };
    if (d_second_instance != false) secondinstancedetail.second_instance_date = d_second_instance;
    if (second_description != false) secondinstancedetail.second_description = second_description;
    if (second_decision != false) secondinstancedetail.second_decision = second_decision;
    if (second_ruling != false) secondinstancedetail.second_ruling = second_ruling;
    if (d_second_ruling != false) secondinstancedetail.second_ruling_date = d_second_ruling;
    if (plaintiff_agrees != false) secondinstancedetail.plaintiff_agrees = plaintiff_agrees;
    if (insistence != false) secondinstancedetail.insistence = insistence;
    if (d_insistence != false) secondinstancedetail.insistence_date = d_insistence;

    var secondinstance = new SecondInstance(secondinstancedetail);
    secondinstance.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New SecondInstance: ' + secondinstance);
        secondinstances.push(secondinstance);
        cb(null, secondinstance)
    }  );
}

function tutelaCreate(communication_type, example, pre_selected, d_pre_selection, selected, d_selection, cc_decision,
                      cc_ruling, d_cc_ruling, cc_judgment, d_cc_judgment, published, publication_link, d_publication,
                      cb) {

    tuteladetail = {
        example: example,
    };
    if (communication_type != false) tuteladetail.communication_type = communication_type;
    if (pre_selected != false) tuteladetail.pre_selected = pre_selected;
    if (d_pre_selection != false) tuteladetail.pre_selection_date = d_pre_selection;
    if (selected != false) tuteladetail.selected = selected;
    if (d_selection != false) tuteladetail.selection_date = d_selection;
    if (cc_decision != false) tuteladetail.cc_decision = cc_decision;
    if (cc_ruling != false) tuteladetail.cc_ruling = cc_ruling;
    if (d_cc_ruling != false) tuteladetail.cc_ruling_date = d_cc_ruling;
    if (cc_judgment != false) tuteladetail.cc_judgment = cc_judgment;
    if (d_cc_judgment != false) tuteladetail.cc_judgment_date = d_cc_judgment;
    if (published != false) tuteladetail.published = published;
    if (publication_link != false) tuteladetail.publication_link = publication_link;
    if (d_publication != false) tuteladetail.publication_date = d_publication;

    var tutela = new Tutela(tuteladetail);
    tutela.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New Tutela: ' + tutela);
        tutelas.push(tutela);
        cb(null, tutela)
    }  );
}



function createCCSelectionCriteria(cb) {
    async.parallel([
            function(callback) {
                ccSelectionCriterionCreate('Criterio objetivo 1', 'Criterio subjetivo 1', callback);
            },
            function(callback) {
                ccSelectionCriterionCreate('Criterio objetivo 2', 'Criterio subjetivo 2', callback);
            }
        ],
        // optional callback
        cb);
}

function createDefendants(cb) {
    async.parallel([
            function(callback) {
                defendantCreate(persontypes[1], genders[1], 'Pedro Pérez', 'CR 1 50', callback);
            },
            function(callback) {
                defendantCreate(persontypes[2], genders[2], 'Universidad de Los Andes', 'CL 40 45', callback);
            }
        ],
        // optional callback
        cb);
}

function createFirstInstances(cb) {
    async.parallel([
            function(callback) {
                firstInstanceCreate('Juan', 'Paloquemao', '1920-01-02', 'Descripción de primera instancia', 'Concede', 'Debe entregar medicamentos', '1920-01-02', true, false, 'El demandado impugna', '1920-01-02', false, 'El demandado no cumple', '1920-01-02', callback);
            },
            function(callback) {
                firstInstanceCreate('Carlos', 'San Victorino', '1920-01-02', 'No hay descripción', 'Rechaza', 'No se justifica', '1920-01-02', false, true, 'El demandante impugna', '1920-01-02', true, 'No aplica', '1920-01-02', callback);
            }
        ],
        // optional callback
        cb);
}

function createFundamentalRights(cb) {
    async.parallel([
            function(callback) {
                fundamentalRightCreate('Derecho a la salud','Artículo 12', callback);
            },
            function(callback) {
                fundamentalRightCreate('Derecho a la libertad','Artículo 15', callback);
            }
        ],
        // optional callback
        cb);
}

function createGenders(cb) {
    async.parallel([
            function(callback) {
                genderCreate('Masculino', callback);
            },
            function(callback) {
                genderCreate('Femenino', callback);
            }
        ],
        // optional callback
        cb);
}

function createLegitimators(cb) {
    async.parallel([
            function(callback) {
                legitimatorCreate('Personería de Bogotá', callback);
            },
            function(callback) {
                legitimatorCreate('Defensoría del Pueblo', callback);
            }
        ],
        // optional callback
        cb);
}

function createPersonTypes(cb) {
    async.parallel([
            function(callback) {
                personTypeCreate('Persona natural', callback);
            },
            function(callback) {
                personTypeCreate('Persona jurídica', callback);
            }
        ],
        // optional callback
        cb);
}

function createPlaintiffs(cb) {
    async.parallel([
            function(callback) {
                plaintiffCreate(persontypes[1],genders[1],'Pablo','Cárdenas','123456','pablo@gmail.com','CR 81 64 3', '3145432102', true, callback);
            },
            function(callback) {
                plaintiffCreate(persontypes[2],genders[2],'Juana','Arévalo','789101','juana@outlook.es','CL 12 35 6', '3165049301', true, callback);
            }
        ],
        // optional callback
        cb);
}

function createSchematicReviews(cb) {
    async.parallel([
            function(callback) {
                schematicReviewCreate('1920-01-02', 'Bogotá', plaintiffs[1], defendants[1],legitimators[1],'150', 'Primero segundo tercero', ccselectioncriteria[1], fundamentalrights[1], 'Motivo 1', 'Que me den la medicina', 'Problema de salud','No', callback);
            },
            function(callback) {
                schematicReviewCreate('1920-01-02', 'Caldas', plaintiffs[2], defendants[2],legitimators[2],'320', 'Cuarto quinto sexto', ccselectioncriteria[2], fundamentalrights[2], 'Motivo 2', 'Que no molesten', 'Problema de libertad','Sí', callback);
            }
        ],
        // optional callback
        cb);
}

function createSecondInstances(cb) {
    async.parallel([
            function(callback) {
                secondInstanceCreate('Andrés', 'CL 12 34 01', '1920-01-02', 'Descripción segunda instancia', 'Rechaza', 'Fallo 2', '1920-01-02', 'Sí','No', '1920-01-02', callback);
            },
            function(callback) {
                secondInstanceCreate('Sergio', 'CL 51 78 91', '1920-01-02', 'Descripción 2 segunda instancia', 'Concede parcial', 'Fallo 22', '1920-01-02', 'No','Sí', '1920-01-02', callback);
            }
        ],
        // optional callback
        cb);
}

function createTutelas(cb) {
    async.parallel([
            function(callback) {
                tutelaCreate(true,'Ejemplo 1', true, '1920-01-02',false, '1920-01-02','Rechaza','Fallo final 1', '1920-01-02', 'Sentencia 1', '1920-01-02', true, 'www.caso1.com','1920-01-02', callback);
            },
            function(callback) {
                tutelaCreate(false,'Ejemplo 2', false, '1920-01-02',true, '1920-01-02','Concede','Fallo final 2', '1920-01-02', 'Sentencia 2', '1920-01-02', false, 'www.caso2.com','1920-01-02', callback);
            }
        ],
        // optional callback
        cb);
}


async.series([
        createCCSelectionCriteria,
        createDefendants,
        createFirstInstances,
        createFundamentalRights,
        createGenders,
        createLegitimators,
        createPersonTypes,
        createPlaintiffs,
        createSchematicReviews,
        createSecondInstances,
        createTutelas
    ],

// Optional callback
    function(err, results) {

        // All done, disconnect from database
        mongoose.connection.close();
    });