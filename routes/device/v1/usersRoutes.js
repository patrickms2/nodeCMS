/**
 * usersRoutes.js
 * @description :: CRUD API routes for users
 */

const express = require('express');
const router = express.Router();
const usersController = require('../../../controller/device/v1/usersController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/users/create').post(auth(PLATFORM.DEVICE),checkRolePermission,usersController.addUsers);
router.route('/device/api/v1/users/list').post(auth(PLATFORM.DEVICE),checkRolePermission,usersController.findAllUsers);
router.route('/device/api/v1/users/count').post(auth(PLATFORM.DEVICE),checkRolePermission,usersController.getUsersCount);
router.route('/device/api/v1/users/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,usersController.getUsers);
router.route('/device/api/v1/users/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,usersController.updateUsers);    
router.route('/device/api/v1/users/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,usersController.partialUpdateUsers);
router.route('/device/api/v1/users/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,usersController.softDeleteUsers);
router.route('/device/api/v1/users/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,usersController.softDeleteManyUsers);
router.route('/device/api/v1/users/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,usersController.bulkInsertUsers);
router.route('/device/api/v1/users/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,usersController.bulkUpdateUsers);
router.route('/device/api/v1/users/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,usersController.deleteUsers);
router.route('/device/api/v1/users/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,usersController.deleteManyUsers);

module.exports = router;
