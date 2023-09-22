/**
 * personal_access_tokensRoutes.js
 * @description :: CRUD API routes for personal_access_tokens
 */

const express = require('express');
const router = express.Router();
const personal_access_tokensController = require('../../../controller/device/v1/personal_access_tokensController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/personal_access_tokens/create').post(auth(PLATFORM.DEVICE),checkRolePermission,personal_access_tokensController.addPersonal_access_tokens);
router.route('/device/api/v1/personal_access_tokens/list').post(auth(PLATFORM.DEVICE),checkRolePermission,personal_access_tokensController.findAllPersonal_access_tokens);
router.route('/device/api/v1/personal_access_tokens/count').post(auth(PLATFORM.DEVICE),checkRolePermission,personal_access_tokensController.getPersonal_access_tokensCount);
router.route('/device/api/v1/personal_access_tokens/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,personal_access_tokensController.getPersonal_access_tokens);
router.route('/device/api/v1/personal_access_tokens/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,personal_access_tokensController.updatePersonal_access_tokens);    
router.route('/device/api/v1/personal_access_tokens/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,personal_access_tokensController.partialUpdatePersonal_access_tokens);
router.route('/device/api/v1/personal_access_tokens/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,personal_access_tokensController.softDeletePersonal_access_tokens);
router.route('/device/api/v1/personal_access_tokens/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,personal_access_tokensController.softDeleteManyPersonal_access_tokens);
router.route('/device/api/v1/personal_access_tokens/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,personal_access_tokensController.bulkInsertPersonal_access_tokens);
router.route('/device/api/v1/personal_access_tokens/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,personal_access_tokensController.bulkUpdatePersonal_access_tokens);
router.route('/device/api/v1/personal_access_tokens/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,personal_access_tokensController.deletePersonal_access_tokens);
router.route('/device/api/v1/personal_access_tokens/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,personal_access_tokensController.deleteManyPersonal_access_tokens);

module.exports = router;
