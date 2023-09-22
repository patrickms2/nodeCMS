/**
 * comerciosRoutes.js
 * @description :: CRUD API routes for comercios
 */

const express = require('express');
const router = express.Router();
const comerciosController = require('../../../controller/client/v1/comerciosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/comercios/create').post(auth(PLATFORM.CLIENT),checkRolePermission,comerciosController.addComercios);
router.route('/client/api/v1/comercios/list').post(auth(PLATFORM.CLIENT),checkRolePermission,comerciosController.findAllComercios);
router.route('/client/api/v1/comercios/count').post(auth(PLATFORM.CLIENT),checkRolePermission,comerciosController.getComerciosCount);
router.route('/client/api/v1/comercios/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,comerciosController.getComercios);
router.route('/client/api/v1/comercios/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,comerciosController.updateComercios);    
router.route('/client/api/v1/comercios/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,comerciosController.partialUpdateComercios);
router.route('/client/api/v1/comercios/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,comerciosController.softDeleteComercios);
router.route('/client/api/v1/comercios/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,comerciosController.softDeleteManyComercios);
router.route('/client/api/v1/comercios/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,comerciosController.bulkInsertComercios);
router.route('/client/api/v1/comercios/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,comerciosController.bulkUpdateComercios);
router.route('/client/api/v1/comercios/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,comerciosController.deleteComercios);
router.route('/client/api/v1/comercios/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,comerciosController.deleteManyComercios);

module.exports = router;
