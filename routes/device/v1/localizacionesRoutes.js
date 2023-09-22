/**
 * localizacionesRoutes.js
 * @description :: CRUD API routes for localizaciones
 */

const express = require('express');
const router = express.Router();
const localizacionesController = require('../../../controller/device/v1/localizacionesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/localizaciones/create').post(auth(PLATFORM.DEVICE),checkRolePermission,localizacionesController.addLocalizaciones);
router.route('/device/api/v1/localizaciones/list').post(auth(PLATFORM.DEVICE),checkRolePermission,localizacionesController.findAllLocalizaciones);
router.route('/device/api/v1/localizaciones/count').post(auth(PLATFORM.DEVICE),checkRolePermission,localizacionesController.getLocalizacionesCount);
router.route('/device/api/v1/localizaciones/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,localizacionesController.getLocalizaciones);
router.route('/device/api/v1/localizaciones/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,localizacionesController.updateLocalizaciones);    
router.route('/device/api/v1/localizaciones/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,localizacionesController.partialUpdateLocalizaciones);
router.route('/device/api/v1/localizaciones/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,localizacionesController.softDeleteLocalizaciones);
router.route('/device/api/v1/localizaciones/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,localizacionesController.softDeleteManyLocalizaciones);
router.route('/device/api/v1/localizaciones/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,localizacionesController.bulkInsertLocalizaciones);
router.route('/device/api/v1/localizaciones/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,localizacionesController.bulkUpdateLocalizaciones);
router.route('/device/api/v1/localizaciones/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,localizacionesController.deleteLocalizaciones);
router.route('/device/api/v1/localizaciones/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,localizacionesController.deleteManyLocalizaciones);

module.exports = router;
