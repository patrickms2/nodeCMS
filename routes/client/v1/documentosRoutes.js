/**
 * documentosRoutes.js
 * @description :: CRUD API routes for documentos
 */

const express = require('express');
const router = express.Router();
const documentosController = require('../../../controller/client/v1/documentosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/documentos/create').post(auth(PLATFORM.CLIENT),checkRolePermission,documentosController.addDocumentos);
router.route('/client/api/v1/documentos/list').post(auth(PLATFORM.CLIENT),checkRolePermission,documentosController.findAllDocumentos);
router.route('/client/api/v1/documentos/count').post(auth(PLATFORM.CLIENT),checkRolePermission,documentosController.getDocumentosCount);
router.route('/client/api/v1/documentos/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,documentosController.getDocumentos);
router.route('/client/api/v1/documentos/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,documentosController.updateDocumentos);    
router.route('/client/api/v1/documentos/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,documentosController.partialUpdateDocumentos);
router.route('/client/api/v1/documentos/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,documentosController.softDeleteDocumentos);
router.route('/client/api/v1/documentos/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,documentosController.softDeleteManyDocumentos);
router.route('/client/api/v1/documentos/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,documentosController.bulkInsertDocumentos);
router.route('/client/api/v1/documentos/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,documentosController.bulkUpdateDocumentos);
router.route('/client/api/v1/documentos/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,documentosController.deleteDocumentos);
router.route('/client/api/v1/documentos/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,documentosController.deleteManyDocumentos);

module.exports = router;
