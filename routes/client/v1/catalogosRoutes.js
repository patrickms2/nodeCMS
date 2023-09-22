/**
 * catalogosRoutes.js
 * @description :: CRUD API routes for catalogos
 */

const express = require('express');
const router = express.Router();
const catalogosController = require('../../../controller/client/v1/catalogosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/catalogos/create').post(auth(PLATFORM.CLIENT),checkRolePermission,catalogosController.addCatalogos);
router.route('/client/api/v1/catalogos/list').post(auth(PLATFORM.CLIENT),checkRolePermission,catalogosController.findAllCatalogos);
router.route('/client/api/v1/catalogos/count').post(auth(PLATFORM.CLIENT),checkRolePermission,catalogosController.getCatalogosCount);
router.route('/client/api/v1/catalogos/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,catalogosController.getCatalogos);
router.route('/client/api/v1/catalogos/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,catalogosController.updateCatalogos);    
router.route('/client/api/v1/catalogos/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,catalogosController.partialUpdateCatalogos);
router.route('/client/api/v1/catalogos/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,catalogosController.softDeleteCatalogos);
router.route('/client/api/v1/catalogos/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,catalogosController.softDeleteManyCatalogos);
router.route('/client/api/v1/catalogos/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,catalogosController.bulkInsertCatalogos);
router.route('/client/api/v1/catalogos/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,catalogosController.bulkUpdateCatalogos);
router.route('/client/api/v1/catalogos/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,catalogosController.deleteCatalogos);
router.route('/client/api/v1/catalogos/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,catalogosController.deleteManyCatalogos);

module.exports = router;
