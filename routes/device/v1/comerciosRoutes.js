/**
 * comerciosRoutes.js
 * @description :: CRUD API routes for comercios
 */

const express = require('express');
const router = express.Router();
const comerciosController = require('../../../controller/device/v1/comerciosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/comercios/create').post(auth(PLATFORM.DEVICE),checkRolePermission,comerciosController.addComercios);
router.route('/device/api/v1/comercios/list').post(auth(PLATFORM.DEVICE),checkRolePermission,comerciosController.findAllComercios);
router.route('/device/api/v1/comercios/count').post(auth(PLATFORM.DEVICE),checkRolePermission,comerciosController.getComerciosCount);
router.route('/device/api/v1/comercios/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,comerciosController.getComercios);
router.route('/device/api/v1/comercios/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,comerciosController.updateComercios);    
router.route('/device/api/v1/comercios/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,comerciosController.partialUpdateComercios);
router.route('/device/api/v1/comercios/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,comerciosController.softDeleteComercios);
router.route('/device/api/v1/comercios/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,comerciosController.softDeleteManyComercios);
router.route('/device/api/v1/comercios/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,comerciosController.bulkInsertComercios);
router.route('/device/api/v1/comercios/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,comerciosController.bulkUpdateComercios);
router.route('/device/api/v1/comercios/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,comerciosController.deleteComercios);
router.route('/device/api/v1/comercios/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,comerciosController.deleteManyComercios);

module.exports = router;
