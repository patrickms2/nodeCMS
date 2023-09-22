/**
 * propiedadesRoutes.js
 * @description :: CRUD API routes for propiedades
 */

const express = require('express');
const router = express.Router();
const propiedadesController = require('../../../controller/device/v1/propiedadesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/propiedades/create').post(auth(PLATFORM.DEVICE),checkRolePermission,propiedadesController.addPropiedades);
router.route('/device/api/v1/propiedades/list').post(auth(PLATFORM.DEVICE),checkRolePermission,propiedadesController.findAllPropiedades);
router.route('/device/api/v1/propiedades/count').post(auth(PLATFORM.DEVICE),checkRolePermission,propiedadesController.getPropiedadesCount);
router.route('/device/api/v1/propiedades/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,propiedadesController.getPropiedades);
router.route('/device/api/v1/propiedades/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,propiedadesController.updatePropiedades);    
router.route('/device/api/v1/propiedades/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,propiedadesController.partialUpdatePropiedades);
router.route('/device/api/v1/propiedades/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,propiedadesController.softDeletePropiedades);
router.route('/device/api/v1/propiedades/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,propiedadesController.softDeleteManyPropiedades);
router.route('/device/api/v1/propiedades/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,propiedadesController.bulkInsertPropiedades);
router.route('/device/api/v1/propiedades/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,propiedadesController.bulkUpdatePropiedades);
router.route('/device/api/v1/propiedades/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,propiedadesController.deletePropiedades);
router.route('/device/api/v1/propiedades/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,propiedadesController.deleteManyPropiedades);

module.exports = router;
