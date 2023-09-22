/**
 * disciplinasRoutes.js
 * @description :: CRUD API routes for disciplinas
 */

const express = require('express');
const router = express.Router();
const disciplinasController = require('../../../controller/client/v1/disciplinasController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/disciplinas/create').post(auth(PLATFORM.CLIENT),checkRolePermission,disciplinasController.addDisciplinas);
router.route('/client/api/v1/disciplinas/list').post(auth(PLATFORM.CLIENT),checkRolePermission,disciplinasController.findAllDisciplinas);
router.route('/client/api/v1/disciplinas/count').post(auth(PLATFORM.CLIENT),checkRolePermission,disciplinasController.getDisciplinasCount);
router.route('/client/api/v1/disciplinas/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,disciplinasController.getDisciplinas);
router.route('/client/api/v1/disciplinas/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,disciplinasController.updateDisciplinas);    
router.route('/client/api/v1/disciplinas/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,disciplinasController.partialUpdateDisciplinas);
router.route('/client/api/v1/disciplinas/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,disciplinasController.softDeleteDisciplinas);
router.route('/client/api/v1/disciplinas/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,disciplinasController.softDeleteManyDisciplinas);
router.route('/client/api/v1/disciplinas/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,disciplinasController.bulkInsertDisciplinas);
router.route('/client/api/v1/disciplinas/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,disciplinasController.bulkUpdateDisciplinas);
router.route('/client/api/v1/disciplinas/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,disciplinasController.deleteDisciplinas);
router.route('/client/api/v1/disciplinas/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,disciplinasController.deleteManyDisciplinas);

module.exports = router;
