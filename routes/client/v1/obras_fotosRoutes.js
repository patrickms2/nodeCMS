/**
 * obras_fotosRoutes.js
 * @description :: CRUD API routes for obras_fotos
 */

const express = require('express');
const router = express.Router();
const obras_fotosController = require('../../../controller/client/v1/obras_fotosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/obras_fotos/create').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_fotosController.addObras_fotos);
router.route('/client/api/v1/obras_fotos/list').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_fotosController.findAllObras_fotos);
router.route('/client/api/v1/obras_fotos/count').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_fotosController.getObras_fotosCount);
router.route('/client/api/v1/obras_fotos/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,obras_fotosController.getObras_fotos);
router.route('/client/api/v1/obras_fotos/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_fotosController.updateObras_fotos);    
router.route('/client/api/v1/obras_fotos/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_fotosController.partialUpdateObras_fotos);
router.route('/client/api/v1/obras_fotos/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_fotosController.softDeleteObras_fotos);
router.route('/client/api/v1/obras_fotos/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_fotosController.softDeleteManyObras_fotos);
router.route('/client/api/v1/obras_fotos/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_fotosController.bulkInsertObras_fotos);
router.route('/client/api/v1/obras_fotos/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_fotosController.bulkUpdateObras_fotos);
router.route('/client/api/v1/obras_fotos/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,obras_fotosController.deleteObras_fotos);
router.route('/client/api/v1/obras_fotos/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_fotosController.deleteManyObras_fotos);

module.exports = router;
