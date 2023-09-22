/**
 * energiaRoutes.js
 * @description :: CRUD API routes for energia
 */

const express = require('express');
const router = express.Router();
const energiaController = require('../../../controller/client/v1/energiaController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/energia/create').post(auth(PLATFORM.CLIENT),checkRolePermission,energiaController.addEnergia);
router.route('/client/api/v1/energia/list').post(auth(PLATFORM.CLIENT),checkRolePermission,energiaController.findAllEnergia);
router.route('/client/api/v1/energia/count').post(auth(PLATFORM.CLIENT),checkRolePermission,energiaController.getEnergiaCount);
router.route('/client/api/v1/energia/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,energiaController.getEnergia);
router.route('/client/api/v1/energia/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,energiaController.updateEnergia);    
router.route('/client/api/v1/energia/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,energiaController.partialUpdateEnergia);
router.route('/client/api/v1/energia/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,energiaController.softDeleteEnergia);
router.route('/client/api/v1/energia/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,energiaController.softDeleteManyEnergia);
router.route('/client/api/v1/energia/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,energiaController.bulkInsertEnergia);
router.route('/client/api/v1/energia/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,energiaController.bulkUpdateEnergia);
router.route('/client/api/v1/energia/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,energiaController.deleteEnergia);
router.route('/client/api/v1/energia/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,energiaController.deleteManyEnergia);

module.exports = router;
