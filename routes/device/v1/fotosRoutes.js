/**
 * fotosRoutes.js
 * @description :: CRUD API routes for fotos
 */

const express = require('express');
const router = express.Router();
const fotosController = require('../../../controller/device/v1/fotosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/fotos/create').post(auth(PLATFORM.DEVICE),checkRolePermission,fotosController.addFotos);
router.route('/device/api/v1/fotos/list').post(auth(PLATFORM.DEVICE),checkRolePermission,fotosController.findAllFotos);
router.route('/device/api/v1/fotos/count').post(auth(PLATFORM.DEVICE),checkRolePermission,fotosController.getFotosCount);
router.route('/device/api/v1/fotos/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,fotosController.getFotos);
router.route('/device/api/v1/fotos/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,fotosController.updateFotos);    
router.route('/device/api/v1/fotos/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,fotosController.partialUpdateFotos);
router.route('/device/api/v1/fotos/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,fotosController.softDeleteFotos);
router.route('/device/api/v1/fotos/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,fotosController.softDeleteManyFotos);
router.route('/device/api/v1/fotos/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,fotosController.bulkInsertFotos);
router.route('/device/api/v1/fotos/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,fotosController.bulkUpdateFotos);
router.route('/device/api/v1/fotos/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,fotosController.deleteFotos);
router.route('/device/api/v1/fotos/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,fotosController.deleteManyFotos);

module.exports = router;
