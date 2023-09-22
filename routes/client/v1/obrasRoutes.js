/**
 * obrasRoutes.js
 * @description :: CRUD API routes for obras
 */

const express = require('express');
const router = express.Router();
const obrasController = require('../../../controller/client/v1/obrasController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/obras/create').post(auth(PLATFORM.CLIENT),checkRolePermission,obrasController.addObras);
router.route('/client/api/v1/obras/list').post(auth(PLATFORM.CLIENT),checkRolePermission,obrasController.findAllObras);
router.route('/client/api/v1/obras/count').post(auth(PLATFORM.CLIENT),checkRolePermission,obrasController.getObrasCount);
router.route('/client/api/v1/obras/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,obrasController.getObras);
router.route('/client/api/v1/obras/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obrasController.updateObras);    
router.route('/client/api/v1/obras/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obrasController.partialUpdateObras);
router.route('/client/api/v1/obras/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obrasController.softDeleteObras);
router.route('/client/api/v1/obras/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,obrasController.softDeleteManyObras);
router.route('/client/api/v1/obras/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,obrasController.bulkInsertObras);
router.route('/client/api/v1/obras/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,obrasController.bulkUpdateObras);
router.route('/client/api/v1/obras/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,obrasController.deleteObras);
router.route('/client/api/v1/obras/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,obrasController.deleteManyObras);

module.exports = router;
