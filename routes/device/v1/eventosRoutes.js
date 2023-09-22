/**
 * eventosRoutes.js
 * @description :: CRUD API routes for eventos
 */

const express = require('express');
const router = express.Router();
const eventosController = require('../../../controller/device/v1/eventosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/eventos/create').post(auth(PLATFORM.DEVICE),checkRolePermission,eventosController.addEventos);
router.route('/device/api/v1/eventos/list').post(auth(PLATFORM.DEVICE),checkRolePermission,eventosController.findAllEventos);
router.route('/device/api/v1/eventos/count').post(auth(PLATFORM.DEVICE),checkRolePermission,eventosController.getEventosCount);
router.route('/device/api/v1/eventos/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,eventosController.getEventos);
router.route('/device/api/v1/eventos/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,eventosController.updateEventos);    
router.route('/device/api/v1/eventos/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,eventosController.partialUpdateEventos);
router.route('/device/api/v1/eventos/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,eventosController.softDeleteEventos);
router.route('/device/api/v1/eventos/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,eventosController.softDeleteManyEventos);
router.route('/device/api/v1/eventos/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,eventosController.bulkInsertEventos);
router.route('/device/api/v1/eventos/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,eventosController.bulkUpdateEventos);
router.route('/device/api/v1/eventos/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,eventosController.deleteEventos);
router.route('/device/api/v1/eventos/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,eventosController.deleteManyEventos);

module.exports = router;
