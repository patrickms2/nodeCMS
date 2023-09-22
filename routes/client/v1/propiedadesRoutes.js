/**
 * propiedadesRoutes.js
 * @description :: CRUD API routes for propiedades
 */

const express = require('express');
const router = express.Router();
const propiedadesController = require('../../../controller/client/v1/propiedadesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/propiedades/create').post(auth(PLATFORM.CLIENT),checkRolePermission,propiedadesController.addPropiedades);
router.route('/client/api/v1/propiedades/list').post(auth(PLATFORM.CLIENT),checkRolePermission,propiedadesController.findAllPropiedades);
router.route('/client/api/v1/propiedades/count').post(auth(PLATFORM.CLIENT),checkRolePermission,propiedadesController.getPropiedadesCount);
router.route('/client/api/v1/propiedades/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,propiedadesController.getPropiedades);
router.route('/client/api/v1/propiedades/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,propiedadesController.updatePropiedades);    
router.route('/client/api/v1/propiedades/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,propiedadesController.partialUpdatePropiedades);
router.route('/client/api/v1/propiedades/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,propiedadesController.softDeletePropiedades);
router.route('/client/api/v1/propiedades/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,propiedadesController.softDeleteManyPropiedades);
router.route('/client/api/v1/propiedades/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,propiedadesController.bulkInsertPropiedades);
router.route('/client/api/v1/propiedades/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,propiedadesController.bulkUpdatePropiedades);
router.route('/client/api/v1/propiedades/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,propiedadesController.deletePropiedades);
router.route('/client/api/v1/propiedades/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,propiedadesController.deleteManyPropiedades);

module.exports = router;
