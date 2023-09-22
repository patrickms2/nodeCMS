/**
 * enlacesRoutes.js
 * @description :: CRUD API routes for enlaces
 */

const express = require('express');
const router = express.Router();
const enlacesController = require('../../../controller/device/v1/enlacesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/enlaces/create').post(auth(PLATFORM.DEVICE),checkRolePermission,enlacesController.addEnlaces);
router.route('/device/api/v1/enlaces/list').post(auth(PLATFORM.DEVICE),checkRolePermission,enlacesController.findAllEnlaces);
router.route('/device/api/v1/enlaces/count').post(auth(PLATFORM.DEVICE),checkRolePermission,enlacesController.getEnlacesCount);
router.route('/device/api/v1/enlaces/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,enlacesController.getEnlaces);
router.route('/device/api/v1/enlaces/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,enlacesController.updateEnlaces);    
router.route('/device/api/v1/enlaces/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,enlacesController.partialUpdateEnlaces);
router.route('/device/api/v1/enlaces/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,enlacesController.softDeleteEnlaces);
router.route('/device/api/v1/enlaces/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,enlacesController.softDeleteManyEnlaces);
router.route('/device/api/v1/enlaces/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,enlacesController.bulkInsertEnlaces);
router.route('/device/api/v1/enlaces/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,enlacesController.bulkUpdateEnlaces);
router.route('/device/api/v1/enlaces/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,enlacesController.deleteEnlaces);
router.route('/device/api/v1/enlaces/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,enlacesController.deleteManyEnlaces);

module.exports = router;
