/**
 * artistas_obrasRoutes.js
 * @description :: CRUD API routes for artistas_obras
 */

const express = require('express');
const router = express.Router();
const artistas_obrasController = require('../../../controller/client/v1/artistas_obrasController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/artistas_obras/create').post(auth(PLATFORM.CLIENT),checkRolePermission,artistas_obrasController.addArtistas_obras);
router.route('/client/api/v1/artistas_obras/list').post(auth(PLATFORM.CLIENT),checkRolePermission,artistas_obrasController.findAllArtistas_obras);
router.route('/client/api/v1/artistas_obras/count').post(auth(PLATFORM.CLIENT),checkRolePermission,artistas_obrasController.getArtistas_obrasCount);
router.route('/client/api/v1/artistas_obras/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,artistas_obrasController.getArtistas_obras);
router.route('/client/api/v1/artistas_obras/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,artistas_obrasController.updateArtistas_obras);    
router.route('/client/api/v1/artistas_obras/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,artistas_obrasController.partialUpdateArtistas_obras);
router.route('/client/api/v1/artistas_obras/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,artistas_obrasController.softDeleteArtistas_obras);
router.route('/client/api/v1/artistas_obras/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,artistas_obrasController.softDeleteManyArtistas_obras);
router.route('/client/api/v1/artistas_obras/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,artistas_obrasController.bulkInsertArtistas_obras);
router.route('/client/api/v1/artistas_obras/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,artistas_obrasController.bulkUpdateArtistas_obras);
router.route('/client/api/v1/artistas_obras/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,artistas_obrasController.deleteArtistas_obras);
router.route('/client/api/v1/artistas_obras/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,artistas_obrasController.deleteManyArtistas_obras);

module.exports = router;
