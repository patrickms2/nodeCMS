/**
 * serviciosRoutes.js
 * @description :: CRUD API routes for servicios
 */

const express = require('express');
const router = express.Router();
const serviciosController = require('../../../controller/client/v1/serviciosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/servicios/create').post(auth(PLATFORM.CLIENT),checkRolePermission,serviciosController.addServicios);
router.route('/client/api/v1/servicios/list').post(auth(PLATFORM.CLIENT),checkRolePermission,serviciosController.findAllServicios);
router.route('/client/api/v1/servicios/count').post(auth(PLATFORM.CLIENT),checkRolePermission,serviciosController.getServiciosCount);
router.route('/client/api/v1/servicios/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,serviciosController.getServicios);
router.route('/client/api/v1/servicios/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,serviciosController.updateServicios);    
router.route('/client/api/v1/servicios/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,serviciosController.partialUpdateServicios);
router.route('/client/api/v1/servicios/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,serviciosController.softDeleteServicios);
router.route('/client/api/v1/servicios/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,serviciosController.softDeleteManyServicios);
router.route('/client/api/v1/servicios/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,serviciosController.bulkInsertServicios);
router.route('/client/api/v1/servicios/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,serviciosController.bulkUpdateServicios);
router.route('/client/api/v1/servicios/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,serviciosController.deleteServicios);
router.route('/client/api/v1/servicios/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,serviciosController.deleteManyServicios);

module.exports = router;
