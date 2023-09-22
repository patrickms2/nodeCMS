/**
 * obraRoutes.js
 * @description :: CRUD API routes for obra
 */

const express = require('express');
const router = express.Router();
const obraController = require('../../../controller/device/v1/obraController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/obra/create').post(auth(PLATFORM.DEVICE),checkRolePermission,obraController.addObra);
router.route('/device/api/v1/obra/list').post(auth(PLATFORM.DEVICE),checkRolePermission,obraController.findAllObra);
router.route('/device/api/v1/obra/count').post(auth(PLATFORM.DEVICE),checkRolePermission,obraController.getObraCount);
router.route('/device/api/v1/obra/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,obraController.getObra);
router.route('/device/api/v1/obra/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,obraController.updateObra);    
router.route('/device/api/v1/obra/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,obraController.partialUpdateObra);
router.route('/device/api/v1/obra/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,obraController.softDeleteObra);
router.route('/device/api/v1/obra/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,obraController.softDeleteManyObra);
router.route('/device/api/v1/obra/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,obraController.bulkInsertObra);
router.route('/device/api/v1/obra/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,obraController.bulkUpdateObra);
router.route('/device/api/v1/obra/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,obraController.deleteObra);
router.route('/device/api/v1/obra/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,obraController.deleteManyObra);

module.exports = router;
