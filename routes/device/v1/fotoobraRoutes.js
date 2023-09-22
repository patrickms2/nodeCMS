/**
 * fotoobraRoutes.js
 * @description :: CRUD API routes for fotoobra
 */

const express = require('express');
const router = express.Router();
const fotoobraController = require('../../../controller/device/v1/fotoobraController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/fotoobra/create').post(auth(PLATFORM.DEVICE),checkRolePermission,fotoobraController.addFotoobra);
router.route('/device/api/v1/fotoobra/list').post(auth(PLATFORM.DEVICE),checkRolePermission,fotoobraController.findAllFotoobra);
router.route('/device/api/v1/fotoobra/count').post(auth(PLATFORM.DEVICE),checkRolePermission,fotoobraController.getFotoobraCount);
router.route('/device/api/v1/fotoobra/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,fotoobraController.getFotoobra);
router.route('/device/api/v1/fotoobra/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,fotoobraController.updateFotoobra);    
router.route('/device/api/v1/fotoobra/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,fotoobraController.partialUpdateFotoobra);
router.route('/device/api/v1/fotoobra/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,fotoobraController.softDeleteFotoobra);
router.route('/device/api/v1/fotoobra/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,fotoobraController.softDeleteManyFotoobra);
router.route('/device/api/v1/fotoobra/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,fotoobraController.bulkInsertFotoobra);
router.route('/device/api/v1/fotoobra/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,fotoobraController.bulkUpdateFotoobra);
router.route('/device/api/v1/fotoobra/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,fotoobraController.deleteFotoobra);
router.route('/device/api/v1/fotoobra/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,fotoobraController.deleteManyFotoobra);

module.exports = router;
