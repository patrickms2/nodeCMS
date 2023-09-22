/**
 * obras_disciplinasRoutes.js
 * @description :: CRUD API routes for obras_disciplinas
 */

const express = require('express');
const router = express.Router();
const obras_disciplinasController = require('../../../controller/client/v1/obras_disciplinasController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/obras_disciplinas/create').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_disciplinasController.addObras_disciplinas);
router.route('/client/api/v1/obras_disciplinas/list').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_disciplinasController.findAllObras_disciplinas);
router.route('/client/api/v1/obras_disciplinas/count').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_disciplinasController.getObras_disciplinasCount);
router.route('/client/api/v1/obras_disciplinas/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,obras_disciplinasController.getObras_disciplinas);
router.route('/client/api/v1/obras_disciplinas/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_disciplinasController.updateObras_disciplinas);    
router.route('/client/api/v1/obras_disciplinas/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_disciplinasController.partialUpdateObras_disciplinas);
router.route('/client/api/v1/obras_disciplinas/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_disciplinasController.softDeleteObras_disciplinas);
router.route('/client/api/v1/obras_disciplinas/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_disciplinasController.softDeleteManyObras_disciplinas);
router.route('/client/api/v1/obras_disciplinas/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_disciplinasController.bulkInsertObras_disciplinas);
router.route('/client/api/v1/obras_disciplinas/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_disciplinasController.bulkUpdateObras_disciplinas);
router.route('/client/api/v1/obras_disciplinas/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,obras_disciplinasController.deleteObras_disciplinas);
router.route('/client/api/v1/obras_disciplinas/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_disciplinasController.deleteManyObras_disciplinas);

module.exports = router;
