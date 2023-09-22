/**
 * admin_teamsRoutes.js
 * @description :: CRUD API routes for admin_teams
 */

const express = require('express');
const router = express.Router();
const admin_teamsController = require('../../../controller/device/v1/admin_teamsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/admin_teams/create').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_teamsController.addAdmin_teams);
router.route('/device/api/v1/admin_teams/list').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_teamsController.findAllAdmin_teams);
router.route('/device/api/v1/admin_teams/count').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_teamsController.getAdmin_teamsCount);
router.route('/device/api/v1/admin_teams/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,admin_teamsController.getAdmin_teams);
router.route('/device/api/v1/admin_teams/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_teamsController.updateAdmin_teams);    
router.route('/device/api/v1/admin_teams/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_teamsController.partialUpdateAdmin_teams);
router.route('/device/api/v1/admin_teams/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_teamsController.softDeleteAdmin_teams);
router.route('/device/api/v1/admin_teams/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_teamsController.softDeleteManyAdmin_teams);
router.route('/device/api/v1/admin_teams/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_teamsController.bulkInsertAdmin_teams);
router.route('/device/api/v1/admin_teams/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_teamsController.bulkUpdateAdmin_teams);
router.route('/device/api/v1/admin_teams/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,admin_teamsController.deleteAdmin_teams);
router.route('/device/api/v1/admin_teams/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_teamsController.deleteManyAdmin_teams);

module.exports = router;
