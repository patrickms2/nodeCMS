/**
 * paginasRoutes.js
 * @description :: CRUD API routes for paginas
 */

const express = require('express');
const router = express.Router();
const paginasController = require('../../../controller/device/v1/paginasController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/paginas/create').post(auth(PLATFORM.DEVICE),checkRolePermission,paginasController.addPaginas);
router.route('/device/api/v1/paginas/list').post(auth(PLATFORM.DEVICE),checkRolePermission,paginasController.findAllPaginas);
router.route('/device/api/v1/paginas/count').post(auth(PLATFORM.DEVICE),checkRolePermission,paginasController.getPaginasCount);
router.route('/device/api/v1/paginas/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,paginasController.getPaginas);
router.route('/device/api/v1/paginas/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,paginasController.updatePaginas);    
router.route('/device/api/v1/paginas/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,paginasController.partialUpdatePaginas);
router.route('/device/api/v1/paginas/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,paginasController.softDeletePaginas);
router.route('/device/api/v1/paginas/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,paginasController.softDeleteManyPaginas);
router.route('/device/api/v1/paginas/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,paginasController.bulkInsertPaginas);
router.route('/device/api/v1/paginas/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,paginasController.bulkUpdatePaginas);
router.route('/device/api/v1/paginas/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,paginasController.deletePaginas);
router.route('/device/api/v1/paginas/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,paginasController.deleteManyPaginas);

module.exports = router;
