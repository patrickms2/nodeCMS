/**
 * obrasRoutes.js
 * @description :: CRUD API routes for obras
 */

const express = require('express');
const router = express.Router();
const obrasController = require('../../../controller/device/v1/obrasController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/obras/create').post(auth(PLATFORM.DEVICE),checkRolePermission,obrasController.addObras);
router.route('/device/api/v1/obras/list').post(auth(PLATFORM.DEVICE),checkRolePermission,obrasController.findAllObras);
router.route('/device/api/v1/obras/count').post(auth(PLATFORM.DEVICE),checkRolePermission,obrasController.getObrasCount);
router.route('/device/api/v1/obras/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,obrasController.getObras);
router.route('/device/api/v1/obras/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,obrasController.updateObras);    
router.route('/device/api/v1/obras/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,obrasController.partialUpdateObras);
router.route('/device/api/v1/obras/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,obrasController.softDeleteObras);
router.route('/device/api/v1/obras/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,obrasController.softDeleteManyObras);
router.route('/device/api/v1/obras/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,obrasController.bulkInsertObras);
router.route('/device/api/v1/obras/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,obrasController.bulkUpdateObras);
router.route('/device/api/v1/obras/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,obrasController.deleteObras);
router.route('/device/api/v1/obras/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,obrasController.deleteManyObras);

module.exports = router;
