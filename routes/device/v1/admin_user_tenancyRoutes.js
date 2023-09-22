/**
 * admin_user_tenancyRoutes.js
 * @description :: CRUD API routes for admin_user_tenancy
 */

const express = require('express');
const router = express.Router();
const admin_user_tenancyController = require('../../../controller/device/v1/admin_user_tenancyController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/admin_user_tenancy/create').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_tenancyController.addAdmin_user_tenancy);
router.route('/device/api/v1/admin_user_tenancy/list').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_tenancyController.findAllAdmin_user_tenancy);
router.route('/device/api/v1/admin_user_tenancy/count').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_tenancyController.getAdmin_user_tenancyCount);
router.route('/device/api/v1/admin_user_tenancy/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_tenancyController.getAdmin_user_tenancy);
router.route('/device/api/v1/admin_user_tenancy/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_tenancyController.updateAdmin_user_tenancy);    
router.route('/device/api/v1/admin_user_tenancy/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_tenancyController.partialUpdateAdmin_user_tenancy);
router.route('/device/api/v1/admin_user_tenancy/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_tenancyController.softDeleteAdmin_user_tenancy);
router.route('/device/api/v1/admin_user_tenancy/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_tenancyController.softDeleteManyAdmin_user_tenancy);
router.route('/device/api/v1/admin_user_tenancy/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_tenancyController.bulkInsertAdmin_user_tenancy);
router.route('/device/api/v1/admin_user_tenancy/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_tenancyController.bulkUpdateAdmin_user_tenancy);
router.route('/device/api/v1/admin_user_tenancy/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_tenancyController.deleteAdmin_user_tenancy);
router.route('/device/api/v1/admin_user_tenancy/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_user_tenancyController.deleteManyAdmin_user_tenancy);

module.exports = router;
