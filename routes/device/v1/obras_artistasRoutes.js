/**
 * obras_artistasRoutes.js
 * @description :: CRUD API routes for obras_artistas
 */

const express = require('express');
const router = express.Router();
const obras_artistasController = require('../../../controller/device/v1/obras_artistasController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/obras_artistas/create').post(auth(PLATFORM.DEVICE),checkRolePermission,obras_artistasController.addObras_artistas);
router.route('/device/api/v1/obras_artistas/list').post(auth(PLATFORM.DEVICE),checkRolePermission,obras_artistasController.findAllObras_artistas);
router.route('/device/api/v1/obras_artistas/count').post(auth(PLATFORM.DEVICE),checkRolePermission,obras_artistasController.getObras_artistasCount);
router.route('/device/api/v1/obras_artistas/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,obras_artistasController.getObras_artistas);
router.route('/device/api/v1/obras_artistas/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,obras_artistasController.updateObras_artistas);    
router.route('/device/api/v1/obras_artistas/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,obras_artistasController.partialUpdateObras_artistas);
router.route('/device/api/v1/obras_artistas/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,obras_artistasController.softDeleteObras_artistas);
router.route('/device/api/v1/obras_artistas/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,obras_artistasController.softDeleteManyObras_artistas);
router.route('/device/api/v1/obras_artistas/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,obras_artistasController.bulkInsertObras_artistas);
router.route('/device/api/v1/obras_artistas/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,obras_artistasController.bulkUpdateObras_artistas);
router.route('/device/api/v1/obras_artistas/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,obras_artistasController.deleteObras_artistas);
router.route('/device/api/v1/obras_artistas/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,obras_artistasController.deleteManyObras_artistas);

module.exports = router;
