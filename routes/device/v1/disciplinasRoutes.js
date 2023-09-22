/**
 * disciplinasRoutes.js
 * @description :: CRUD API routes for disciplinas
 */

const express = require('express');
const router = express.Router();
const disciplinasController = require('../../../controller/device/v1/disciplinasController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/disciplinas/create').post(auth(PLATFORM.DEVICE),checkRolePermission,disciplinasController.addDisciplinas);
router.route('/device/api/v1/disciplinas/list').post(auth(PLATFORM.DEVICE),checkRolePermission,disciplinasController.findAllDisciplinas);
router.route('/device/api/v1/disciplinas/count').post(auth(PLATFORM.DEVICE),checkRolePermission,disciplinasController.getDisciplinasCount);
router.route('/device/api/v1/disciplinas/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,disciplinasController.getDisciplinas);
router.route('/device/api/v1/disciplinas/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,disciplinasController.updateDisciplinas);    
router.route('/device/api/v1/disciplinas/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,disciplinasController.partialUpdateDisciplinas);
router.route('/device/api/v1/disciplinas/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,disciplinasController.softDeleteDisciplinas);
router.route('/device/api/v1/disciplinas/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,disciplinasController.softDeleteManyDisciplinas);
router.route('/device/api/v1/disciplinas/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,disciplinasController.bulkInsertDisciplinas);
router.route('/device/api/v1/disciplinas/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,disciplinasController.bulkUpdateDisciplinas);
router.route('/device/api/v1/disciplinas/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,disciplinasController.deleteDisciplinas);
router.route('/device/api/v1/disciplinas/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,disciplinasController.deleteManyDisciplinas);

module.exports = router;
