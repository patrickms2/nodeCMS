/**
 * eventosRoutes.js
 * @description :: CRUD API routes for eventos
 */

const express = require('express');
const router = express.Router();
const eventosController = require('../../../controller/client/v1/eventosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/eventos/create').post(auth(PLATFORM.CLIENT),checkRolePermission,eventosController.addEventos);
router.route('/client/api/v1/eventos/list').post(auth(PLATFORM.CLIENT),checkRolePermission,eventosController.findAllEventos);
router.route('/client/api/v1/eventos/count').post(auth(PLATFORM.CLIENT),checkRolePermission,eventosController.getEventosCount);
router.route('/client/api/v1/eventos/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,eventosController.getEventos);
router.route('/client/api/v1/eventos/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,eventosController.updateEventos);    
router.route('/client/api/v1/eventos/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,eventosController.partialUpdateEventos);
router.route('/client/api/v1/eventos/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,eventosController.softDeleteEventos);
router.route('/client/api/v1/eventos/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,eventosController.softDeleteManyEventos);
router.route('/client/api/v1/eventos/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,eventosController.bulkInsertEventos);
router.route('/client/api/v1/eventos/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,eventosController.bulkUpdateEventos);
router.route('/client/api/v1/eventos/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,eventosController.deleteEventos);
router.route('/client/api/v1/eventos/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,eventosController.deleteManyEventos);

module.exports = router;
