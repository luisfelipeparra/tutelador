var express = require('express');
var router = express.Router();


// Require our controllers.
var cc_selection_criterion_controller = require('../controllers/ccselectioncriterionController');
var defendant_controller = require('../controllers/defendantController');
var first_instance_controller = require('../controllers/firstinstanceController');
var fundamental_right_controller = require('../controllers/fundamentalrightController');
var gender_controller = require('../controllers/genderController');
var legitimator_controller = require('../controllers/legitimatorController');
var person_type_controller = require('../controllers/persontypeController');
var plaintiff_controller = require('../controllers/plaintiffController');
var schematic_review_controller = require('../controllers/schematicreviewController');
var second_instance_controller = require('../controllers/secondinstanceController');
var tutela_controller = require('../controllers/tutelaController');


/// CCSELECTIONCRITERION ROUTES ///

// GET request for creating a CCSelectionCriterion. NOTE This must come before route that displays CCSelectionCriterion (uses id).
router.get('/ccselectioncriterion/create', cc_selection_criterion_controller.ccselectioncriterion_create_get);

// POST request for creating CCSelectionCriterion.
router.post('/ccselectioncriterion/create', cc_selection_criterion_controller.ccselectioncriterion_create_post);

// GET request to delete CCSelectionCriterion.
router.get('/ccselectioncriterion/:id/delete', cc_selection_criterion_controller.ccselectioncriterion_delete_get);

// POST request to delete CCSelectionCriterion.
router.post('/ccselectioncriterion/:id/delete', cc_selection_criterion_controller.ccselectioncriterion_delete_post);

// GET request to update CCSelectionCriterion.
router.get('/ccselectioncriterion/:id/update', cc_selection_criterion_controller.ccselectioncriterion_update_get);

// POST request to update CCSelectionCriterion.
router.post('/ccselectioncriterion/:id/update', cc_selection_criterion_controller.ccselectioncriterion_update_post);

// GET request for one CCSelectionCriterion.
router.get('/ccselectioncriterion/:id', cc_selection_criterion_controller.ccselectioncriterion_detail);

// GET request for list of all CCSelectionCriteria.
router.get('/ccselectioncriteria', cc_selection_criterion_controller.ccselectioncriterion_list);


/// DEFENDANT ROUTES ///

// GET request for creating a Defendant. NOTE This must come before route that displays Defendant (uses id).
router.get('/defendant/create', defendant_controller.defendant_create_get);

// POST request for creating Defendant.
router.post('/defendant/create', defendant_controller.defendant_create_post);

// GET request to delete Defendant.
router.get('/defendant/:id/delete', defendant_controller.defendant_delete_get);

// POST request to delete Defendant.
router.post('/defendant/:id/delete', defendant_controller.defendant_delete_post);

// GET request to update Defendant.
router.get('/defendant/:id/update', defendant_controller.defendant_update_get);

// POST request to update Defendant.
router.post('/defendant/:id/update', defendant_controller.defendant_update_post);

// GET request for one Defendant.
router.get('/defendant/:id', defendant_controller.defendant_detail);

// GET request for list of all Defendants.
router.get('/defendants', defendant_controller.defendant_list);


/// FIRSTINSTANCE ROUTES ///

// GET request for creating a FirstInstance. NOTE This must come before route that displays FirstInstance (uses id).
router.get('/firstinstance/create', first_instance_controller.firstinstance_create_get);

// POST request for creating FirstInstance.
router.post('/firstinstance/create', first_instance_controller.firstinstance_create_post);

// GET request to delete FirstInstance.
router.get('/firstinstance/:id/delete', first_instance_controller.firstinstance_delete_get);

// POST request to delete FirstInstance.
router.post('/firstinstance/:id/delete', first_instance_controller.firstinstance_delete_post);

// GET request to update FirstInstance.
router.get('/firstinstance/:id/update', first_instance_controller.firstinstance_update_get);

// POST request to update FirstInstance.
router.post('/firstinstance/:id/update', first_instance_controller.firstinstance_update_post);

// GET request for one FirstInstance.
router.get('/firstinstance/:id', first_instance_controller.firstinstance_detail);

// GET request for list of all FirstInstances.
router.get('/firstinstances', first_instance_controller.firstinstance_list);


/// FUNDAMENTALRIGHT ROUTES ///

// GET request for creating a FundamentalRight. NOTE This must come before route that displays FundamentalRight (uses id).
router.get('/fundamentalright/create', fundamental_right_controller.fundamentalright_create_get);

// POST request for creating FundamentalRight.
router.post('/fundamentalright/create', fundamental_right_controller.fundamentalright_create_post);

// GET request to delete FundamentalRight.
router.get('/fundamentalright/:id/delete', fundamental_right_controller.fundamentalright_delete_get);

// POST request to delete FundamentalRight.
router.post('/fundamentalright/:id/delete', fundamental_right_controller.fundamentalright_delete_post);

// GET request to update FundamentalRight.
router.get('/fundamentalright/:id/update', fundamental_right_controller.fundamentalright_update_get);

// POST request to update FundamentalRight.
router.post('/fundamentalright/:id/update', fundamental_right_controller.fundamentalright_update_post);

// GET request for one FundamentalRight.
router.get('/fundamentalright/:id', fundamental_right_controller.fundamentalright_detail);

// GET request for list of all FundamentalRights.
router.get('/fundamentalrights', fundamental_right_controller.fundamentalright_list);


/// GENDER ROUTES ///

// GET request for creating a Gender. NOTE This must come before route that displays Gender (uses id).
router.get('/gender/create', gender_controller.gender_create_get);

// POST request for creating Gender.
router.post('/gender/create', gender_controller.gender_create_post);

// GET request to delete Gender.
router.get('/gender/:id/delete', gender_controller.gender_delete_get);

// POST request to delete Gender.
router.post('/gender/:id/delete', gender_controller.gender_delete_post);

// GET request to update Gender.
router.get('/gender/:id/update', gender_controller.gender_update_get);

// POST request to update Gender.
router.post('/gender/:id/update', gender_controller.gender_update_post);

// GET request for one Gender.
router.get('/gender/:id', gender_controller.gender_detail);

// GET request for list of all Genders.
router.get('/genders', gender_controller.gender_list);


/// LEGITIMATOR ROUTES ///

// GET request for creating a Legitimator. NOTE This must come before route that displays Legitimator (uses id).
router.get('/legitimator/create', legitimator_controller.legitimator_create_get);

// POST request for creating Legitimator.
router.post('/legitimator/create', legitimator_controller.legitimator_create_post);

// GET request to delete Legitimator.
router.get('/legitimator/:id/delete', legitimator_controller.legitimator_delete_get);

// POST request to delete Legitimator.
router.post('/legitimator/:id/delete', legitimator_controller.legitimator_delete_post);

// GET request to update Legitimator.
router.get('/legitimator/:id/update', legitimator_controller.legitimator_update_get);

// POST request to update Legitimator.
router.post('/legitimator/:id/update', legitimator_controller.legitimator_update_post);

// GET request for one Legitimator.
router.get('/legitimator/:id', legitimator_controller.legitimator_detail);

// GET request for list of all Legitimators.
router.get('/legitimators', legitimator_controller.legitimator_list);


/// PERSONTYPE ROUTES ///

// GET request for creating a PersonType. NOTE This must come before route that displays PersonType (uses id).
router.get('/persontype/create', person_type_controller.persontype_create_get);

// POST request for creating PersonType.
router.post('/persontype/create', person_type_controller.persontype_create_post);

// GET request to delete PersonType.
router.get('/persontype/:id/delete', person_type_controller.persontype_delete_get);

// POST request to delete PersonType.
router.post('/persontype/:id/delete', person_type_controller.persontype_delete_post);

// GET request to update PersonType.
router.get('/persontype/:id/update', person_type_controller.persontype_update_get);

// POST request to update PersonType.
router.post('/persontype/:id/update', person_type_controller.persontype_update_post);

// GET request for one PersonType.
router.get('/persontype/:id', person_type_controller.persontype_detail);

// GET request for list of all PersonTypes.
router.get('/persontypes', person_type_controller.persontype_list);


/// PLAINTIFF ROUTES ///

// GET request for creating a Plaintiff. NOTE This must come before route that displays Plaintiff (uses id).
router.get('/plaintiff/create', plaintiff_controller.plaintiff_create_get);

// POST request for creating Plaintiff.
router.post('/plaintiff/create', plaintiff_controller.plaintiff_create_post);

// GET request to delete Plaintiff.
router.get('/plaintiff/:id/delete', plaintiff_controller.plaintiff_delete_get);

// POST request to delete Plaintiff.
router.post('/plaintiff/:id/delete', plaintiff_controller.plaintiff_delete_post);

// GET request to update Plaintiff.
router.get('/plaintiff/:id/update', plaintiff_controller.plaintiff_update_get);

// POST request to update Plaintiff.
router.post('/plaintiff/:id/update', plaintiff_controller.plaintiff_update_post);

// GET request for one Plaintiff.
router.get('/plaintiff/:id', plaintiff_controller.plaintiff_detail);

// GET request for list of all Plaintiffs.
router.get('/plaintiffs', plaintiff_controller.plaintiff_list);


/// SCHEMATICREVIEW ROUTES ///

// GET request for creating a SchematicReview. NOTE This must come before route that displays SchematicReview (uses id).
router.get('/schematicreview/create', schematic_review_controller.schematicreview_create_get);

// POST request for creating SchematicReview.
router.post('/schematicreview/create', schematic_review_controller.schematicreview_create_post);

// GET request to delete SchematicReview.
router.get('/schematicreview/:id/delete', schematic_review_controller.schematicreview_delete_get);

// POST request to delete SchematicReview.
router.post('/schematicreview/:id/delete', schematic_review_controller.schematicreview_delete_post);

// GET request to update SchematicReview.
router.get('/schematicreview/:id/update', schematic_review_controller.schematicreview_update_get);

// POST request to update SchematicReview.
router.post('/schematicreview/:id/update', schematic_review_controller.schematicreview_update_post);

// GET request for one SchematicReview.
router.get('/schematicreview/:id', schematic_review_controller.schematicreview_detail);

// GET request for list of all SchematicReviews.
router.get('/schematicreviews', schematic_review_controller.schematicreview_list);


/// SECONDINSTANCE ROUTES ///

// GET request for creating a SecondInstance. NOTE This must come before route that displays SecondInstance (uses id).
router.get('/secondinstance/create', second_instance_controller.secondinstance_create_get);

// POST request for creating SecondInstance.
router.post('/secondinstance/create', second_instance_controller.secondinstance_create_post);

// GET request to delete SecondInstance.
router.get('/secondinstance/:id/delete', second_instance_controller.secondinstance_delete_get);

// POST request to delete SecondInstance.
router.post('/secondinstance/:id/delete', second_instance_controller.secondinstance_delete_post);

// GET request to update SecondInstance.
router.get('/secondinstance/:id/update', second_instance_controller.secondinstance_update_get);

// POST request to update SecondInstance.
router.post('/secondinstance/:id/update', second_instance_controller.secondinstance_update_post);

// GET request for one SecondInstance.
router.get('/secondinstance/:id', second_instance_controller.secondinstance_detail);

// GET request for list of all SecondInstances.
router.get('/secondinstances', second_instance_controller.secondinstance_list);


/// TUTELA ROUTES ///

// GET catalog home page.
router.get('/', tutela_controller.index);

// GET request for creating a Tutela. NOTE This must come before route that displays Tutela (uses id).
router.get('/tutela/create', tutela_controller.tutela_create_get);

// POST request for creating Tutela.
router.post('/tutela/create', tutela_controller.tutela_create_post);

// GET request to delete Tutela.
router.get('/tutela/:id/delete', tutela_controller.tutela_delete_get);

// POST request to delete Tutela.
router.post('/tutela/:id/delete', tutela_controller.tutela_delete_post);

// GET request to update Tutela.
router.get('/tutela/:id/update', tutela_controller.tutela_update_get);

// POST request to update Tutela.
router.post('/tutela/:id/update', tutela_controller.tutela_update_post);

// GET request for one Tutela.
router.get('/tutela/:id', tutela_controller.tutela_detail);

// GET request for list of all Tutelas.
router.get('/tutelas', tutela_controller.tutela_list);



module.exports = router;
