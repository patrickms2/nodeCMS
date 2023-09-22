/**
 * secciones_webRoutes.js
 * @description :: CRUD API routes for secciones_web
 */

const express = require('express');
const router = express.Router();
const secciones_webController = require('../../../controller/client/v1/secciones_webController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/secciones_web/create').post(auth(PLATFORM.CLIENT),checkRolePermission,secciones_webController.addSecciones_web);
router.route('/client/api/v1/secciones_web/list').post(auth(PLATFORM.CLIENT),checkRolePermission,secciones_webController.findAllSecciones_web);
router.route('/client/api/v1/secciones_web/count').post(auth(PLATFORM.CLIENT),checkRolePermission,secciones_webController.getSecciones_webCount);
router.route('/client/api/v1/secciones_web/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,secciones_webController.getSecciones_web);
router.route('/client/api/v1/secciones_web/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,secciones_webController.updateSecciones_web);    
router.route('/client/api/v1/secciones_web/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,secciones_webController.partialUpdateSecciones_web);
router.route('/client/api/v1/secciones_web/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,secciones_webController.softDeleteSecciones_web);
router.route('/client/api/v1/secciones_web/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,secciones_webController.softDeleteManySecciones_web);
router.route('/client/api/v1/secciones_web/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,secciones_webController.bulkInsertSecciones_web);
router.route('/client/api/v1/secciones_web/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,secciones_webController.bulkUpdateSecciones_web);
router.route('/client/api/v1/secciones_web/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,secciones_webController.deleteSecciones_web);
router.route('/client/api/v1/secciones_web/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,secciones_webController.deleteManySecciones_web);

module.exports = router;
