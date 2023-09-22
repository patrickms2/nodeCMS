/**
 * password_reset_tokensRoutes.js
 * @description :: CRUD API routes for password_reset_tokens
 */

const express = require('express');
const router = express.Router();
const password_reset_tokensController = require('../../../controller/client/v1/password_reset_tokensController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/password_reset_tokens/create').post(auth(PLATFORM.CLIENT),checkRolePermission,password_reset_tokensController.addPassword_reset_tokens);
router.route('/client/api/v1/password_reset_tokens/list').post(auth(PLATFORM.CLIENT),checkRolePermission,password_reset_tokensController.findAllPassword_reset_tokens);
router.route('/client/api/v1/password_reset_tokens/count').post(auth(PLATFORM.CLIENT),checkRolePermission,password_reset_tokensController.getPassword_reset_tokensCount);
router.route('/client/api/v1/password_reset_tokens/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,password_reset_tokensController.getPassword_reset_tokens);
router.route('/client/api/v1/password_reset_tokens/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,password_reset_tokensController.updatePassword_reset_tokens);    
router.route('/client/api/v1/password_reset_tokens/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,password_reset_tokensController.partialUpdatePassword_reset_tokens);
router.route('/client/api/v1/password_reset_tokens/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,password_reset_tokensController.softDeletePassword_reset_tokens);
router.route('/client/api/v1/password_reset_tokens/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,password_reset_tokensController.softDeleteManyPassword_reset_tokens);
router.route('/client/api/v1/password_reset_tokens/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,password_reset_tokensController.bulkInsertPassword_reset_tokens);
router.route('/client/api/v1/password_reset_tokens/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,password_reset_tokensController.bulkUpdatePassword_reset_tokens);
router.route('/client/api/v1/password_reset_tokens/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,password_reset_tokensController.deletePassword_reset_tokens);
router.route('/client/api/v1/password_reset_tokens/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,password_reset_tokensController.deleteManyPassword_reset_tokens);

module.exports = router;
