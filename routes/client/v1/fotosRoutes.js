/**
 * fotosRoutes.js
 * @description :: CRUD API routes for fotos
 */

const express = require('express');
const router = express.Router();
const fotosController = require('../../../controller/client/v1/fotosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/fotos/create').post(auth(PLATFORM.CLIENT),checkRolePermission,fotosController.addFotos);
router.route('/client/api/v1/fotos/list').post(auth(PLATFORM.CLIENT),checkRolePermission,fotosController.findAllFotos);
router.route('/client/api/v1/fotos/count').post(auth(PLATFORM.CLIENT),checkRolePermission,fotosController.getFotosCount);
router.route('/client/api/v1/fotos/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,fotosController.getFotos);
router.route('/client/api/v1/fotos/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,fotosController.updateFotos);    
router.route('/client/api/v1/fotos/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,fotosController.partialUpdateFotos);
router.route('/client/api/v1/fotos/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,fotosController.softDeleteFotos);
router.route('/client/api/v1/fotos/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,fotosController.softDeleteManyFotos);
router.route('/client/api/v1/fotos/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,fotosController.bulkInsertFotos);
router.route('/client/api/v1/fotos/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,fotosController.bulkUpdateFotos);
router.route('/client/api/v1/fotos/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,fotosController.deleteFotos);
router.route('/client/api/v1/fotos/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,fotosController.deleteManyFotos);

module.exports = router;
