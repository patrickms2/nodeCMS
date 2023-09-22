/**
 * reservasRoutes.js
 * @description :: CRUD API routes for reservas
 */

const express = require('express');
const router = express.Router();
const reservasController = require('../../../controller/device/v1/reservasController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/reservas/create').post(auth(PLATFORM.DEVICE),checkRolePermission,reservasController.addReservas);
router.route('/device/api/v1/reservas/list').post(auth(PLATFORM.DEVICE),checkRolePermission,reservasController.findAllReservas);
router.route('/device/api/v1/reservas/count').post(auth(PLATFORM.DEVICE),checkRolePermission,reservasController.getReservasCount);
router.route('/device/api/v1/reservas/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,reservasController.getReservas);
router.route('/device/api/v1/reservas/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,reservasController.updateReservas);    
router.route('/device/api/v1/reservas/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,reservasController.partialUpdateReservas);
router.route('/device/api/v1/reservas/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,reservasController.softDeleteReservas);
router.route('/device/api/v1/reservas/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,reservasController.softDeleteManyReservas);
router.route('/device/api/v1/reservas/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,reservasController.bulkInsertReservas);
router.route('/device/api/v1/reservas/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,reservasController.bulkUpdateReservas);
router.route('/device/api/v1/reservas/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,reservasController.deleteReservas);
router.route('/device/api/v1/reservas/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,reservasController.deleteManyReservas);

module.exports = router;
