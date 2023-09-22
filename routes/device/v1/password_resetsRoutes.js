/**
 * password_resetsRoutes.js
 * @description :: CRUD API routes for password_resets
 */

const express = require('express');
const router = express.Router();
const password_resetsController = require('../../../controller/device/v1/password_resetsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/password_resets/create').post(auth(PLATFORM.DEVICE),checkRolePermission,password_resetsController.addPassword_resets);
router.route('/device/api/v1/password_resets/list').post(auth(PLATFORM.DEVICE),checkRolePermission,password_resetsController.findAllPassword_resets);
router.route('/device/api/v1/password_resets/count').post(auth(PLATFORM.DEVICE),checkRolePermission,password_resetsController.getPassword_resetsCount);
router.route('/device/api/v1/password_resets/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,password_resetsController.getPassword_resets);
router.route('/device/api/v1/password_resets/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,password_resetsController.updatePassword_resets);    
router.route('/device/api/v1/password_resets/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,password_resetsController.partialUpdatePassword_resets);
router.route('/device/api/v1/password_resets/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,password_resetsController.softDeletePassword_resets);
router.route('/device/api/v1/password_resets/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,password_resetsController.softDeleteManyPassword_resets);
router.route('/device/api/v1/password_resets/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,password_resetsController.bulkInsertPassword_resets);
router.route('/device/api/v1/password_resets/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,password_resetsController.bulkUpdatePassword_resets);
router.route('/device/api/v1/password_resets/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,password_resetsController.deletePassword_resets);
router.route('/device/api/v1/password_resets/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,password_resetsController.deleteManyPassword_resets);

module.exports = router;
