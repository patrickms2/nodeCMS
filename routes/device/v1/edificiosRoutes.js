/**
 * edificiosRoutes.js
 * @description :: CRUD API routes for edificios
 */

const express = require('express');
const router = express.Router();
const edificiosController = require('../../../controller/device/v1/edificiosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/edificios/create').post(auth(PLATFORM.DEVICE),checkRolePermission,edificiosController.addEdificios);
router.route('/device/api/v1/edificios/list').post(auth(PLATFORM.DEVICE),checkRolePermission,edificiosController.findAllEdificios);
router.route('/device/api/v1/edificios/count').post(auth(PLATFORM.DEVICE),checkRolePermission,edificiosController.getEdificiosCount);
router.route('/device/api/v1/edificios/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,edificiosController.getEdificios);
router.route('/device/api/v1/edificios/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,edificiosController.updateEdificios);    
router.route('/device/api/v1/edificios/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,edificiosController.partialUpdateEdificios);
router.route('/device/api/v1/edificios/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,edificiosController.softDeleteEdificios);
router.route('/device/api/v1/edificios/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,edificiosController.softDeleteManyEdificios);
router.route('/device/api/v1/edificios/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,edificiosController.bulkInsertEdificios);
router.route('/device/api/v1/edificios/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,edificiosController.bulkUpdateEdificios);
router.route('/device/api/v1/edificios/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,edificiosController.deleteEdificios);
router.route('/device/api/v1/edificios/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,edificiosController.deleteManyEdificios);

module.exports = router;
