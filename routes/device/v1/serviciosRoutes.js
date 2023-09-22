/**
 * serviciosRoutes.js
 * @description :: CRUD API routes for servicios
 */

const express = require('express');
const router = express.Router();
const serviciosController = require('../../../controller/device/v1/serviciosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/servicios/create').post(auth(PLATFORM.DEVICE),checkRolePermission,serviciosController.addServicios);
router.route('/device/api/v1/servicios/list').post(auth(PLATFORM.DEVICE),checkRolePermission,serviciosController.findAllServicios);
router.route('/device/api/v1/servicios/count').post(auth(PLATFORM.DEVICE),checkRolePermission,serviciosController.getServiciosCount);
router.route('/device/api/v1/servicios/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,serviciosController.getServicios);
router.route('/device/api/v1/servicios/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,serviciosController.updateServicios);    
router.route('/device/api/v1/servicios/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,serviciosController.partialUpdateServicios);
router.route('/device/api/v1/servicios/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,serviciosController.softDeleteServicios);
router.route('/device/api/v1/servicios/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,serviciosController.softDeleteManyServicios);
router.route('/device/api/v1/servicios/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,serviciosController.bulkInsertServicios);
router.route('/device/api/v1/servicios/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,serviciosController.bulkUpdateServicios);
router.route('/device/api/v1/servicios/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,serviciosController.deleteServicios);
router.route('/device/api/v1/servicios/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,serviciosController.deleteManyServicios);

module.exports = router;
