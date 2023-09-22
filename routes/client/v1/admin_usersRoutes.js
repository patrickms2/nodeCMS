/**
 * admin_usersRoutes.js
 * @description :: CRUD API routes for admin_users
 */

const express = require('express');
const router = express.Router();
const admin_usersController = require('../../../controller/client/v1/admin_usersController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/admin_users/create').post(auth(PLATFORM.CLIENT),checkRolePermission,admin_usersController.addAdmin_users);
router.route('/client/api/v1/admin_users/list').post(auth(PLATFORM.CLIENT),checkRolePermission,admin_usersController.findAllAdmin_users);
router.route('/client/api/v1/admin_users/count').post(auth(PLATFORM.CLIENT),checkRolePermission,admin_usersController.getAdmin_usersCount);
router.route('/client/api/v1/admin_users/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,admin_usersController.getAdmin_users);
router.route('/client/api/v1/admin_users/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,admin_usersController.updateAdmin_users);    
router.route('/client/api/v1/admin_users/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,admin_usersController.partialUpdateAdmin_users);
router.route('/client/api/v1/admin_users/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,admin_usersController.softDeleteAdmin_users);
router.route('/client/api/v1/admin_users/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,admin_usersController.softDeleteManyAdmin_users);
router.route('/client/api/v1/admin_users/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,admin_usersController.bulkInsertAdmin_users);
router.route('/client/api/v1/admin_users/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,admin_usersController.bulkUpdateAdmin_users);
router.route('/client/api/v1/admin_users/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,admin_usersController.deleteAdmin_users);
router.route('/client/api/v1/admin_users/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,admin_usersController.deleteManyAdmin_users);

module.exports = router;
