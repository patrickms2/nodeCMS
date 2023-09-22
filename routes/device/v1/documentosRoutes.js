/**
 * documentosRoutes.js
 * @description :: CRUD API routes for documentos
 */

const express = require('express');
const router = express.Router();
const documentosController = require('../../../controller/device/v1/documentosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/documentos/create').post(auth(PLATFORM.DEVICE),checkRolePermission,documentosController.addDocumentos);
router.route('/device/api/v1/documentos/list').post(auth(PLATFORM.DEVICE),checkRolePermission,documentosController.findAllDocumentos);
router.route('/device/api/v1/documentos/count').post(auth(PLATFORM.DEVICE),checkRolePermission,documentosController.getDocumentosCount);
router.route('/device/api/v1/documentos/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,documentosController.getDocumentos);
router.route('/device/api/v1/documentos/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,documentosController.updateDocumentos);    
router.route('/device/api/v1/documentos/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,documentosController.partialUpdateDocumentos);
router.route('/device/api/v1/documentos/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,documentosController.softDeleteDocumentos);
router.route('/device/api/v1/documentos/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,documentosController.softDeleteManyDocumentos);
router.route('/device/api/v1/documentos/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,documentosController.bulkInsertDocumentos);
router.route('/device/api/v1/documentos/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,documentosController.bulkUpdateDocumentos);
router.route('/device/api/v1/documentos/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,documentosController.deleteDocumentos);
router.route('/device/api/v1/documentos/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,documentosController.deleteManyDocumentos);

module.exports = router;
