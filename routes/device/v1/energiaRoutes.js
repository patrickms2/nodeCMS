/**
 * energiaRoutes.js
 * @description :: CRUD API routes for energia
 */

const express = require('express');
const router = express.Router();
const energiaController = require('../../../controller/device/v1/energiaController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/energia/create').post(auth(PLATFORM.DEVICE),checkRolePermission,energiaController.addEnergia);
router.route('/device/api/v1/energia/list').post(auth(PLATFORM.DEVICE),checkRolePermission,energiaController.findAllEnergia);
router.route('/device/api/v1/energia/count').post(auth(PLATFORM.DEVICE),checkRolePermission,energiaController.getEnergiaCount);
router.route('/device/api/v1/energia/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,energiaController.getEnergia);
router.route('/device/api/v1/energia/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,energiaController.updateEnergia);    
router.route('/device/api/v1/energia/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,energiaController.partialUpdateEnergia);
router.route('/device/api/v1/energia/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,energiaController.softDeleteEnergia);
router.route('/device/api/v1/energia/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,energiaController.softDeleteManyEnergia);
router.route('/device/api/v1/energia/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,energiaController.bulkInsertEnergia);
router.route('/device/api/v1/energia/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,energiaController.bulkUpdateEnergia);
router.route('/device/api/v1/energia/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,energiaController.deleteEnergia);
router.route('/device/api/v1/energia/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,energiaController.deleteManyEnergia);

module.exports = router;
