/**
 * catalogosRoutes.js
 * @description :: CRUD API routes for catalogos
 */

const express = require('express');
const router = express.Router();
const catalogosController = require('../../../controller/device/v1/catalogosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/catalogos/create').post(auth(PLATFORM.DEVICE),checkRolePermission,catalogosController.addCatalogos);
router.route('/device/api/v1/catalogos/list').post(auth(PLATFORM.DEVICE),checkRolePermission,catalogosController.findAllCatalogos);
router.route('/device/api/v1/catalogos/count').post(auth(PLATFORM.DEVICE),checkRolePermission,catalogosController.getCatalogosCount);
router.route('/device/api/v1/catalogos/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,catalogosController.getCatalogos);
router.route('/device/api/v1/catalogos/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,catalogosController.updateCatalogos);    
router.route('/device/api/v1/catalogos/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,catalogosController.partialUpdateCatalogos);
router.route('/device/api/v1/catalogos/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,catalogosController.softDeleteCatalogos);
router.route('/device/api/v1/catalogos/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,catalogosController.softDeleteManyCatalogos);
router.route('/device/api/v1/catalogos/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,catalogosController.bulkInsertCatalogos);
router.route('/device/api/v1/catalogos/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,catalogosController.bulkUpdateCatalogos);
router.route('/device/api/v1/catalogos/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,catalogosController.deleteCatalogos);
router.route('/device/api/v1/catalogos/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,catalogosController.deleteManyCatalogos);

module.exports = router;
