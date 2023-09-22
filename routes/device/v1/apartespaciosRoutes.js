/**
 * apartespaciosRoutes.js
 * @description :: CRUD API routes for apartespacios
 */

const express = require('express');
const router = express.Router();
const apartespaciosController = require('../../../controller/device/v1/apartespaciosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/apartespacios/create').post(auth(PLATFORM.DEVICE),checkRolePermission,apartespaciosController.addApartespacios);
router.route('/device/api/v1/apartespacios/list').post(auth(PLATFORM.DEVICE),checkRolePermission,apartespaciosController.findAllApartespacios);
router.route('/device/api/v1/apartespacios/count').post(auth(PLATFORM.DEVICE),checkRolePermission,apartespaciosController.getApartespaciosCount);
router.route('/device/api/v1/apartespacios/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,apartespaciosController.getApartespacios);
router.route('/device/api/v1/apartespacios/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,apartespaciosController.updateApartespacios);    
router.route('/device/api/v1/apartespacios/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,apartespaciosController.partialUpdateApartespacios);
router.route('/device/api/v1/apartespacios/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,apartespaciosController.softDeleteApartespacios);
router.route('/device/api/v1/apartespacios/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,apartespaciosController.softDeleteManyApartespacios);
router.route('/device/api/v1/apartespacios/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,apartespaciosController.bulkInsertApartespacios);
router.route('/device/api/v1/apartespacios/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,apartespaciosController.bulkUpdateApartespacios);
router.route('/device/api/v1/apartespacios/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,apartespaciosController.deleteApartespacios);
router.route('/device/api/v1/apartespacios/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,apartespaciosController.deleteManyApartespacios);

module.exports = router;
