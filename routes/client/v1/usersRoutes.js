/**
 * usersRoutes.js
 * @description :: CRUD API routes for users
 */

const express = require('express');
const router = express.Router();
const usersController = require('../../../controller/client/v1/usersController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/users/create').post(auth(PLATFORM.CLIENT),checkRolePermission,usersController.addUsers);
router.route('/client/api/v1/users/list').post(auth(PLATFORM.CLIENT),checkRolePermission,usersController.findAllUsers);
router.route('/client/api/v1/users/count').post(auth(PLATFORM.CLIENT),checkRolePermission,usersController.getUsersCount);
router.route('/client/api/v1/users/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,usersController.getUsers);
router.route('/client/api/v1/users/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,usersController.updateUsers);    
router.route('/client/api/v1/users/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,usersController.partialUpdateUsers);
router.route('/client/api/v1/users/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,usersController.softDeleteUsers);
router.route('/client/api/v1/users/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,usersController.softDeleteManyUsers);
router.route('/client/api/v1/users/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,usersController.bulkInsertUsers);
router.route('/client/api/v1/users/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,usersController.bulkUpdateUsers);
router.route('/client/api/v1/users/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,usersController.deleteUsers);
router.route('/client/api/v1/users/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,usersController.deleteManyUsers);

module.exports = router;
