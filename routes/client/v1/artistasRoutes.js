/**
 * artistasRoutes.js
 * @description :: CRUD API routes for artistas
 */

const express = require('express');
const router = express.Router();
const artistasController = require('../../../controller/client/v1/artistasController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/artistas/create').post(auth(PLATFORM.CLIENT),checkRolePermission,artistasController.addArtistas);
router.route('/client/api/v1/artistas/list').post(auth(PLATFORM.CLIENT),checkRolePermission,artistasController.findAllArtistas);
router.route('/client/api/v1/artistas/count').post(auth(PLATFORM.CLIENT),checkRolePermission,artistasController.getArtistasCount);
router.route('/client/api/v1/artistas/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,artistasController.getArtistas);
router.route('/client/api/v1/artistas/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,artistasController.updateArtistas);    
router.route('/client/api/v1/artistas/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,artistasController.partialUpdateArtistas);
router.route('/client/api/v1/artistas/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,artistasController.softDeleteArtistas);
router.route('/client/api/v1/artistas/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,artistasController.softDeleteManyArtistas);
router.route('/client/api/v1/artistas/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,artistasController.bulkInsertArtistas);
router.route('/client/api/v1/artistas/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,artistasController.bulkUpdateArtistas);
router.route('/client/api/v1/artistas/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,artistasController.deleteArtistas);
router.route('/client/api/v1/artistas/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,artistasController.deleteManyArtistas);

module.exports = router;
