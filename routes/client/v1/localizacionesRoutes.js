/**
 * localizacionesRoutes.js
 * @description :: CRUD API routes for localizaciones
 */

const express = require('express');
const router = express.Router();
const localizacionesController = require('../../../controller/client/v1/localizacionesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/localizaciones/create').post(auth(PLATFORM.CLIENT),checkRolePermission,localizacionesController.addLocalizaciones);
router.route('/client/api/v1/localizaciones/list').post(auth(PLATFORM.CLIENT),checkRolePermission,localizacionesController.findAllLocalizaciones);
router.route('/client/api/v1/localizaciones/count').post(auth(PLATFORM.CLIENT),checkRolePermission,localizacionesController.getLocalizacionesCount);
router.route('/client/api/v1/localizaciones/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,localizacionesController.getLocalizaciones);
router.route('/client/api/v1/localizaciones/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,localizacionesController.updateLocalizaciones);    
router.route('/client/api/v1/localizaciones/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,localizacionesController.partialUpdateLocalizaciones);
router.route('/client/api/v1/localizaciones/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,localizacionesController.softDeleteLocalizaciones);
router.route('/client/api/v1/localizaciones/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,localizacionesController.softDeleteManyLocalizaciones);
router.route('/client/api/v1/localizaciones/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,localizacionesController.bulkInsertLocalizaciones);
router.route('/client/api/v1/localizaciones/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,localizacionesController.bulkUpdateLocalizaciones);
router.route('/client/api/v1/localizaciones/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,localizacionesController.deleteLocalizaciones);
router.route('/client/api/v1/localizaciones/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,localizacionesController.deleteManyLocalizaciones);

module.exports = router;
