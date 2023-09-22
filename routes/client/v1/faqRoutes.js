/**
 * faqRoutes.js
 * @description :: CRUD API routes for faq
 */

const express = require('express');
const router = express.Router();
const faqController = require('../../../controller/client/v1/faqController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/faq/create').post(auth(PLATFORM.CLIENT),checkRolePermission,faqController.addFaq);
router.route('/client/api/v1/faq/list').post(auth(PLATFORM.CLIENT),checkRolePermission,faqController.findAllFaq);
router.route('/client/api/v1/faq/count').post(auth(PLATFORM.CLIENT),checkRolePermission,faqController.getFaqCount);
router.route('/client/api/v1/faq/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,faqController.getFaq);
router.route('/client/api/v1/faq/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,faqController.updateFaq);    
router.route('/client/api/v1/faq/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,faqController.partialUpdateFaq);
router.route('/client/api/v1/faq/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,faqController.softDeleteFaq);
router.route('/client/api/v1/faq/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,faqController.softDeleteManyFaq);
router.route('/client/api/v1/faq/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,faqController.bulkInsertFaq);
router.route('/client/api/v1/faq/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,faqController.bulkUpdateFaq);
router.route('/client/api/v1/faq/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,faqController.deleteFaq);
router.route('/client/api/v1/faq/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,faqController.deleteManyFaq);

module.exports = router;
