/**
 * tipos_documentosRoutes.js
 * @description :: CRUD API routes for tipos_documentos
 */

const express = require('express');
const router = express.Router();
const tipos_documentosController = require('../../../controller/device/v1/tipos_documentosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/tipos_documentos/create').post(auth(PLATFORM.DEVICE),checkRolePermission,tipos_documentosController.addTipos_documentos);
router.route('/device/api/v1/tipos_documentos/list').post(auth(PLATFORM.DEVICE),checkRolePermission,tipos_documentosController.findAllTipos_documentos);
router.route('/device/api/v1/tipos_documentos/count').post(auth(PLATFORM.DEVICE),checkRolePermission,tipos_documentosController.getTipos_documentosCount);
router.route('/device/api/v1/tipos_documentos/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,tipos_documentosController.getTipos_documentos);
router.route('/device/api/v1/tipos_documentos/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,tipos_documentosController.updateTipos_documentos);    
router.route('/device/api/v1/tipos_documentos/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,tipos_documentosController.partialUpdateTipos_documentos);
router.route('/device/api/v1/tipos_documentos/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,tipos_documentosController.softDeleteTipos_documentos);
router.route('/device/api/v1/tipos_documentos/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,tipos_documentosController.softDeleteManyTipos_documentos);
router.route('/device/api/v1/tipos_documentos/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,tipos_documentosController.bulkInsertTipos_documentos);
router.route('/device/api/v1/tipos_documentos/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,tipos_documentosController.bulkUpdateTipos_documentos);
router.route('/device/api/v1/tipos_documentos/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,tipos_documentosController.deleteTipos_documentos);
router.route('/device/api/v1/tipos_documentos/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,tipos_documentosController.deleteManyTipos_documentos);

module.exports = router;
