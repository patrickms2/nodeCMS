/**
 * edificiosRoutes.js
 * @description :: CRUD API routes for edificios
 */

const express = require('express');
const router = express.Router();
const edificiosController = require('../../../controller/client/v1/edificiosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/edificios/create').post(auth(PLATFORM.CLIENT),checkRolePermission,edificiosController.addEdificios);
router.route('/client/api/v1/edificios/list').post(auth(PLATFORM.CLIENT),checkRolePermission,edificiosController.findAllEdificios);
router.route('/client/api/v1/edificios/count').post(auth(PLATFORM.CLIENT),checkRolePermission,edificiosController.getEdificiosCount);
router.route('/client/api/v1/edificios/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,edificiosController.getEdificios);
router.route('/client/api/v1/edificios/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,edificiosController.updateEdificios);    
router.route('/client/api/v1/edificios/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,edificiosController.partialUpdateEdificios);
router.route('/client/api/v1/edificios/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,edificiosController.softDeleteEdificios);
router.route('/client/api/v1/edificios/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,edificiosController.softDeleteManyEdificios);
router.route('/client/api/v1/edificios/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,edificiosController.bulkInsertEdificios);
router.route('/client/api/v1/edificios/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,edificiosController.bulkUpdateEdificios);
router.route('/client/api/v1/edificios/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,edificiosController.deleteEdificios);
router.route('/client/api/v1/edificios/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,edificiosController.deleteManyEdificios);

module.exports = router;
