/**
 * faqRoutes.js
 * @description :: CRUD API routes for faq
 */

const express = require('express');
const router = express.Router();
const faqController = require('../../../controller/device/v1/faqController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/faq/create').post(auth(PLATFORM.DEVICE),checkRolePermission,faqController.addFaq);
router.route('/device/api/v1/faq/list').post(auth(PLATFORM.DEVICE),checkRolePermission,faqController.findAllFaq);
router.route('/device/api/v1/faq/count').post(auth(PLATFORM.DEVICE),checkRolePermission,faqController.getFaqCount);
router.route('/device/api/v1/faq/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,faqController.getFaq);
router.route('/device/api/v1/faq/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,faqController.updateFaq);    
router.route('/device/api/v1/faq/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,faqController.partialUpdateFaq);
router.route('/device/api/v1/faq/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,faqController.softDeleteFaq);
router.route('/device/api/v1/faq/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,faqController.softDeleteManyFaq);
router.route('/device/api/v1/faq/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,faqController.bulkInsertFaq);
router.route('/device/api/v1/faq/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,faqController.bulkUpdateFaq);
router.route('/device/api/v1/faq/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,faqController.deleteFaq);
router.route('/device/api/v1/faq/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,faqController.deleteManyFaq);

module.exports = router;
