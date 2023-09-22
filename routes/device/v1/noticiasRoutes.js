/**
 * noticiasRoutes.js
 * @description :: CRUD API routes for noticias
 */

const express = require('express');
const router = express.Router();
const noticiasController = require('../../../controller/device/v1/noticiasController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/noticias/create').post(auth(PLATFORM.DEVICE),checkRolePermission,noticiasController.addNoticias);
router.route('/device/api/v1/noticias/list').post(auth(PLATFORM.DEVICE),checkRolePermission,noticiasController.findAllNoticias);
router.route('/device/api/v1/noticias/count').post(auth(PLATFORM.DEVICE),checkRolePermission,noticiasController.getNoticiasCount);
router.route('/device/api/v1/noticias/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,noticiasController.getNoticias);
router.route('/device/api/v1/noticias/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,noticiasController.updateNoticias);    
router.route('/device/api/v1/noticias/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,noticiasController.partialUpdateNoticias);
router.route('/device/api/v1/noticias/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,noticiasController.softDeleteNoticias);
router.route('/device/api/v1/noticias/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,noticiasController.softDeleteManyNoticias);
router.route('/device/api/v1/noticias/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,noticiasController.bulkInsertNoticias);
router.route('/device/api/v1/noticias/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,noticiasController.bulkUpdateNoticias);
router.route('/device/api/v1/noticias/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,noticiasController.deleteNoticias);
router.route('/device/api/v1/noticias/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,noticiasController.deleteManyNoticias);

module.exports = router;
