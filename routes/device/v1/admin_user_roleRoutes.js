/**
 * admin_user_roleRoutes.js
 * @description :: CRUD API routes for admin_user_role
 */

const express = require('express');
const router = express.Router();
const admin_user_roleController = require('../../../controller/device/v1/admin_user_roleController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/admin_user_role/create').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_roleController.addAdmin_user_role);
router.route('/device/api/v1/admin_user_role/list').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_roleController.findAllAdmin_user_role);
router.route('/device/api/v1/admin_user_role/count').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_roleController.getAdmin_user_roleCount);
router.route('/device/api/v1/admin_user_role/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_roleController.getAdmin_user_role);
router.route('/device/api/v1/admin_user_role/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_roleController.updateAdmin_user_role);    
router.route('/device/api/v1/admin_user_role/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_roleController.partialUpdateAdmin_user_role);
router.route('/device/api/v1/admin_user_role/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_roleController.softDeleteAdmin_user_role);
router.route('/device/api/v1/admin_user_role/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_roleController.softDeleteManyAdmin_user_role);
router.route('/device/api/v1/admin_user_role/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_roleController.bulkInsertAdmin_user_role);
router.route('/device/api/v1/admin_user_role/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_roleController.bulkUpdateAdmin_user_role);
router.route('/device/api/v1/admin_user_role/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_roleController.deleteAdmin_user_role);
router.route('/device/api/v1/admin_user_role/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_roleController.deleteManyAdmin_user_role);

module.exports = router;
