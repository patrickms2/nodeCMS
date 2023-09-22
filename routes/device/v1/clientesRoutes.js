/**
 * clientesRoutes.js
 * @description :: CRUD API routes for clientes
 */

const express = require('express');
const router = express.Router();
const clientesController = require('../../../controller/device/v1/clientesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/clientes/create').post(auth(PLATFORM.DEVICE),checkRolePermission,clientesController.addClientes);
router.route('/device/api/v1/clientes/list').post(auth(PLATFORM.DEVICE),checkRolePermission,clientesController.findAllClientes);
router.route('/device/api/v1/clientes/count').post(auth(PLATFORM.DEVICE),checkRolePermission,clientesController.getClientesCount);
router.route('/device/api/v1/clientes/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,clientesController.getClientes);
router.route('/device/api/v1/clientes/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,clientesController.updateClientes);    
router.route('/device/api/v1/clientes/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,clientesController.partialUpdateClientes);
router.route('/device/api/v1/clientes/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,clientesController.softDeleteClientes);
router.route('/device/api/v1/clientes/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,clientesController.softDeleteManyClientes);
router.route('/device/api/v1/clientes/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,clientesController.bulkInsertClientes);
router.route('/device/api/v1/clientes/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,clientesController.bulkUpdateClientes);
router.route('/device/api/v1/clientes/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,clientesController.deleteClientes);
router.route('/device/api/v1/clientes/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,clientesController.deleteManyClientes);

module.exports = router;
