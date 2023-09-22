/**
 * apartespaciosRoutes.js
 * @description :: CRUD API routes for apartespacios
 */

const express = require('express');
const router = express.Router();
const apartespaciosController = require('../../../controller/client/v1/apartespaciosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/apartespacios/create').post(auth(PLATFORM.CLIENT),checkRolePermission,apartespaciosController.addApartespacios);
router.route('/client/api/v1/apartespacios/list').post(auth(PLATFORM.CLIENT),checkRolePermission,apartespaciosController.findAllApartespacios);
router.route('/client/api/v1/apartespacios/count').post(auth(PLATFORM.CLIENT),checkRolePermission,apartespaciosController.getApartespaciosCount);
router.route('/client/api/v1/apartespacios/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,apartespaciosController.getApartespacios);
router.route('/client/api/v1/apartespacios/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,apartespaciosController.updateApartespacios);    
router.route('/client/api/v1/apartespacios/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,apartespaciosController.partialUpdateApartespacios);
router.route('/client/api/v1/apartespacios/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,apartespaciosController.softDeleteApartespacios);
router.route('/client/api/v1/apartespacios/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,apartespaciosController.softDeleteManyApartespacios);
router.route('/client/api/v1/apartespacios/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,apartespaciosController.bulkInsertApartespacios);
router.route('/client/api/v1/apartespacios/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,apartespaciosController.bulkUpdateApartespacios);
router.route('/client/api/v1/apartespacios/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,apartespaciosController.deleteApartespacios);
router.route('/client/api/v1/apartespacios/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,apartespaciosController.deleteManyApartespacios);

module.exports = router;
