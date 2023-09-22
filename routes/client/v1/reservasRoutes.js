/**
 * reservasRoutes.js
 * @description :: CRUD API routes for reservas
 */

const express = require('express');
const router = express.Router();
const reservasController = require('../../../controller/client/v1/reservasController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/reservas/create').post(auth(PLATFORM.CLIENT),checkRolePermission,reservasController.addReservas);
router.route('/client/api/v1/reservas/list').post(auth(PLATFORM.CLIENT),checkRolePermission,reservasController.findAllReservas);
router.route('/client/api/v1/reservas/count').post(auth(PLATFORM.CLIENT),checkRolePermission,reservasController.getReservasCount);
router.route('/client/api/v1/reservas/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,reservasController.getReservas);
router.route('/client/api/v1/reservas/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,reservasController.updateReservas);    
router.route('/client/api/v1/reservas/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,reservasController.partialUpdateReservas);
router.route('/client/api/v1/reservas/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,reservasController.softDeleteReservas);
router.route('/client/api/v1/reservas/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,reservasController.softDeleteManyReservas);
router.route('/client/api/v1/reservas/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,reservasController.bulkInsertReservas);
router.route('/client/api/v1/reservas/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,reservasController.bulkUpdateReservas);
router.route('/client/api/v1/reservas/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,reservasController.deleteReservas);
router.route('/client/api/v1/reservas/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,reservasController.deleteManyReservas);

module.exports = router;
