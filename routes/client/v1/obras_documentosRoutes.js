/**
 * obras_documentosRoutes.js
 * @description :: CRUD API routes for obras_documentos
 */

const express = require('express');
const router = express.Router();
const obras_documentosController = require('../../../controller/client/v1/obras_documentosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/obras_documentos/create').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_documentosController.addObras_documentos);
router.route('/client/api/v1/obras_documentos/list').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_documentosController.findAllObras_documentos);
router.route('/client/api/v1/obras_documentos/count').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_documentosController.getObras_documentosCount);
router.route('/client/api/v1/obras_documentos/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,obras_documentosController.getObras_documentos);
router.route('/client/api/v1/obras_documentos/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_documentosController.updateObras_documentos);    
router.route('/client/api/v1/obras_documentos/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_documentosController.partialUpdateObras_documentos);
router.route('/client/api/v1/obras_documentos/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_documentosController.softDeleteObras_documentos);
router.route('/client/api/v1/obras_documentos/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_documentosController.softDeleteManyObras_documentos);
router.route('/client/api/v1/obras_documentos/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_documentosController.bulkInsertObras_documentos);
router.route('/client/api/v1/obras_documentos/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_documentosController.bulkUpdateObras_documentos);
router.route('/client/api/v1/obras_documentos/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,obras_documentosController.deleteObras_documentos);
router.route('/client/api/v1/obras_documentos/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_documentosController.deleteManyObras_documentos);

module.exports = router;
