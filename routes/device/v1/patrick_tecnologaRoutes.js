/**
 * patrick_tecnologaRoutes.js
 * @description :: CRUD API routes for patrick_tecnologa
 */

const express = require('express');
const router = express.Router();
const patrick_tecnologaController = require('../../../controller/device/v1/patrick_tecnologaController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/patrick_tecnologa/create').post(auth(PLATFORM.DEVICE),checkRolePermission,patrick_tecnologaController.addPatrick_tecnologa);
router.route('/device/api/v1/patrick_tecnologa/list').post(auth(PLATFORM.DEVICE),checkRolePermission,patrick_tecnologaController.findAllPatrick_tecnologa);
router.route('/device/api/v1/patrick_tecnologa/count').post(auth(PLATFORM.DEVICE),checkRolePermission,patrick_tecnologaController.getPatrick_tecnologaCount);
router.route('/device/api/v1/patrick_tecnologa/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,patrick_tecnologaController.getPatrick_tecnologa);
router.route('/device/api/v1/patrick_tecnologa/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,patrick_tecnologaController.updatePatrick_tecnologa);    
router.route('/device/api/v1/patrick_tecnologa/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,patrick_tecnologaController.partialUpdatePatrick_tecnologa);
router.route('/device/api/v1/patrick_tecnologa/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,patrick_tecnologaController.softDeletePatrick_tecnologa);
router.route('/device/api/v1/patrick_tecnologa/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,patrick_tecnologaController.softDeleteManyPatrick_tecnologa);
router.route('/device/api/v1/patrick_tecnologa/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,patrick_tecnologaController.bulkInsertPatrick_tecnologa);
router.route('/device/api/v1/patrick_tecnologa/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,patrick_tecnologaController.bulkUpdatePatrick_tecnologa);
router.route('/device/api/v1/patrick_tecnologa/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,patrick_tecnologaController.deletePatrick_tecnologa);
router.route('/device/api/v1/patrick_tecnologa/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,patrick_tecnologaController.deleteManyPatrick_tecnologa);

module.exports = router;
