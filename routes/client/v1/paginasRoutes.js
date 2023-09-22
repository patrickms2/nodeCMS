/**
 * paginasRoutes.js
 * @description :: CRUD API routes for paginas
 */

const express = require('express');
const router = express.Router();
const paginasController = require('../../../controller/client/v1/paginasController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/paginas/create').post(auth(PLATFORM.CLIENT),checkRolePermission,paginasController.addPaginas);
router.route('/client/api/v1/paginas/list').post(auth(PLATFORM.CLIENT),checkRolePermission,paginasController.findAllPaginas);
router.route('/client/api/v1/paginas/count').post(auth(PLATFORM.CLIENT),checkRolePermission,paginasController.getPaginasCount);
router.route('/client/api/v1/paginas/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,paginasController.getPaginas);
router.route('/client/api/v1/paginas/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,paginasController.updatePaginas);    
router.route('/client/api/v1/paginas/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,paginasController.partialUpdatePaginas);
router.route('/client/api/v1/paginas/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,paginasController.softDeletePaginas);
router.route('/client/api/v1/paginas/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,paginasController.softDeleteManyPaginas);
router.route('/client/api/v1/paginas/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,paginasController.bulkInsertPaginas);
router.route('/client/api/v1/paginas/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,paginasController.bulkUpdatePaginas);
router.route('/client/api/v1/paginas/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,paginasController.deletePaginas);
router.route('/client/api/v1/paginas/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,paginasController.deleteManyPaginas);

module.exports = router;
