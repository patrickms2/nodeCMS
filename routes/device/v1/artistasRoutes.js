/**
 * artistasRoutes.js
 * @description :: CRUD API routes for artistas
 */

const express = require('express');
const router = express.Router();
const artistasController = require('../../../controller/device/v1/artistasController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/artistas/create').post(auth(PLATFORM.DEVICE),checkRolePermission,artistasController.addArtistas);
router.route('/device/api/v1/artistas/list').post(auth(PLATFORM.DEVICE),checkRolePermission,artistasController.findAllArtistas);
router.route('/device/api/v1/artistas/count').post(auth(PLATFORM.DEVICE),checkRolePermission,artistasController.getArtistasCount);
router.route('/device/api/v1/artistas/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,artistasController.getArtistas);
router.route('/device/api/v1/artistas/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,artistasController.updateArtistas);    
router.route('/device/api/v1/artistas/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,artistasController.partialUpdateArtistas);
router.route('/device/api/v1/artistas/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,artistasController.softDeleteArtistas);
router.route('/device/api/v1/artistas/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,artistasController.softDeleteManyArtistas);
router.route('/device/api/v1/artistas/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,artistasController.bulkInsertArtistas);
router.route('/device/api/v1/artistas/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,artistasController.bulkUpdateArtistas);
router.route('/device/api/v1/artistas/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,artistasController.deleteArtistas);
router.route('/device/api/v1/artistas/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,artistasController.deleteManyArtistas);

module.exports = router;
