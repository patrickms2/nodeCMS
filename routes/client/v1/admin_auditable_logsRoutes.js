/**
 * admin_auditable_logsRoutes.js
 * @description :: CRUD API routes for admin_auditable_logs
 */

const express = require('express');
const router = express.Router();
const admin_auditable_logsController = require('../../../controller/client/v1/admin_auditable_logsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/admin_auditable_logs/create').post(auth(PLATFORM.CLIENT),checkRolePermission,admin_auditable_logsController.addAdmin_auditable_logs);
router.route('/client/api/v1/admin_auditable_logs/list').post(auth(PLATFORM.CLIENT),checkRolePermission,admin_auditable_logsController.findAllAdmin_auditable_logs);
router.route('/client/api/v1/admin_auditable_logs/count').post(auth(PLATFORM.CLIENT),checkRolePermission,admin_auditable_logsController.getAdmin_auditable_logsCount);
router.route('/client/api/v1/admin_auditable_logs/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,admin_auditable_logsController.getAdmin_auditable_logs);
router.route('/client/api/v1/admin_auditable_logs/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,admin_auditable_logsController.updateAdmin_auditable_logs);    
router.route('/client/api/v1/admin_auditable_logs/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,admin_auditable_logsController.partialUpdateAdmin_auditable_logs);
router.route('/client/api/v1/admin_auditable_logs/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,admin_auditable_logsController.softDeleteAdmin_auditable_logs);
router.route('/client/api/v1/admin_auditable_logs/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,admin_auditable_logsController.softDeleteManyAdmin_auditable_logs);
router.route('/client/api/v1/admin_auditable_logs/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,admin_auditable_logsController.bulkInsertAdmin_auditable_logs);
router.route('/client/api/v1/admin_auditable_logs/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,admin_auditable_logsController.bulkUpdateAdmin_auditable_logs);
router.route('/client/api/v1/admin_auditable_logs/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,admin_auditable_logsController.deleteAdmin_auditable_logs);
router.route('/client/api/v1/admin_auditable_logs/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,admin_auditable_logsController.deleteManyAdmin_auditable_logs);

module.exports = router;
