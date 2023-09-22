/**
 * fotoobraRoutes.js
 * @description :: CRUD API routes for fotoobra
 */

const express = require('express');
const router = express.Router();
const fotoobraController = require('../../../controller/client/v1/fotoobraController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/fotoobra/create').post(auth(PLATFORM.CLIENT),checkRolePermission,fotoobraController.addFotoobra);
router.route('/client/api/v1/fotoobra/list').post(auth(PLATFORM.CLIENT),checkRolePermission,fotoobraController.findAllFotoobra);
router.route('/client/api/v1/fotoobra/count').post(auth(PLATFORM.CLIENT),checkRolePermission,fotoobraController.getFotoobraCount);
router.route('/client/api/v1/fotoobra/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,fotoobraController.getFotoobra);
router.route('/client/api/v1/fotoobra/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,fotoobraController.updateFotoobra);    
router.route('/client/api/v1/fotoobra/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,fotoobraController.partialUpdateFotoobra);
router.route('/client/api/v1/fotoobra/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,fotoobraController.softDeleteFotoobra);
router.route('/client/api/v1/fotoobra/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,fotoobraController.softDeleteManyFotoobra);
router.route('/client/api/v1/fotoobra/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,fotoobraController.bulkInsertFotoobra);
router.route('/client/api/v1/fotoobra/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,fotoobraController.bulkUpdateFotoobra);
router.route('/client/api/v1/fotoobra/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,fotoobraController.deleteFotoobra);
router.route('/client/api/v1/fotoobra/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,fotoobraController.deleteManyFotoobra);

module.exports = router;
