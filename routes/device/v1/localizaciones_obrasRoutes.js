/**
 * localizaciones_obrasRoutes.js
 * @description :: CRUD API routes for localizaciones_obras
 */

const express = require('express');
const router = express.Router();
const localizaciones_obrasController = require('../../../controller/device/v1/localizaciones_obrasController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/localizaciones_obras/create').post(auth(PLATFORM.DEVICE),checkRolePermission,localizaciones_obrasController.addLocalizaciones_obras);
router.route('/device/api/v1/localizaciones_obras/list').post(auth(PLATFORM.DEVICE),checkRolePermission,localizaciones_obrasController.findAllLocalizaciones_obras);
router.route('/device/api/v1/localizaciones_obras/count').post(auth(PLATFORM.DEVICE),checkRolePermission,localizaciones_obrasController.getLocalizaciones_obrasCount);
router.route('/device/api/v1/localizaciones_obras/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,localizaciones_obrasController.getLocalizaciones_obras);
router.route('/device/api/v1/localizaciones_obras/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,localizaciones_obrasController.updateLocalizaciones_obras);    
router.route('/device/api/v1/localizaciones_obras/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,localizaciones_obrasController.partialUpdateLocalizaciones_obras);
router.route('/device/api/v1/localizaciones_obras/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,localizaciones_obrasController.softDeleteLocalizaciones_obras);
router.route('/device/api/v1/localizaciones_obras/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,localizaciones_obrasController.softDeleteManyLocalizaciones_obras);
router.route('/device/api/v1/localizaciones_obras/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,localizaciones_obrasController.bulkInsertLocalizaciones_obras);
router.route('/device/api/v1/localizaciones_obras/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,localizaciones_obrasController.bulkUpdateLocalizaciones_obras);
router.route('/device/api/v1/localizaciones_obras/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,localizaciones_obrasController.deleteLocalizaciones_obras);
router.route('/device/api/v1/localizaciones_obras/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,localizaciones_obrasController.deleteManyLocalizaciones_obras);

module.exports = router;
