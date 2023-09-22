/**
 * clientesRoutes.js
 * @description :: CRUD API routes for clientes
 */

const express = require('express');
const router = express.Router();
const clientesController = require('../../../controller/client/v1/clientesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/clientes/create').post(auth(PLATFORM.CLIENT),checkRolePermission,clientesController.addClientes);
router.route('/client/api/v1/clientes/list').post(auth(PLATFORM.CLIENT),checkRolePermission,clientesController.findAllClientes);
router.route('/client/api/v1/clientes/count').post(auth(PLATFORM.CLIENT),checkRolePermission,clientesController.getClientesCount);
router.route('/client/api/v1/clientes/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,clientesController.getClientes);
router.route('/client/api/v1/clientes/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,clientesController.updateClientes);    
router.route('/client/api/v1/clientes/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,clientesController.partialUpdateClientes);
router.route('/client/api/v1/clientes/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,clientesController.softDeleteClientes);
router.route('/client/api/v1/clientes/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,clientesController.softDeleteManyClientes);
router.route('/client/api/v1/clientes/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,clientesController.bulkInsertClientes);
router.route('/client/api/v1/clientes/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,clientesController.bulkUpdateClientes);
router.route('/client/api/v1/clientes/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,clientesController.deleteClientes);
router.route('/client/api/v1/clientes/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,clientesController.deleteManyClientes);

module.exports = router;
