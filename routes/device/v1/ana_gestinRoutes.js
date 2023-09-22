/**
 * ana_gestinRoutes.js
 * @description :: CRUD API routes for ana_gestin
 */

const express = require('express');
const router = express.Router();
const ana_gestinController = require('../../../controller/device/v1/ana_gestinController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/ana_gestin/create').post(auth(PLATFORM.DEVICE),checkRolePermission,ana_gestinController.addAna_gestin);
router.route('/device/api/v1/ana_gestin/list').post(auth(PLATFORM.DEVICE),checkRolePermission,ana_gestinController.findAllAna_gestin);
router.route('/device/api/v1/ana_gestin/count').post(auth(PLATFORM.DEVICE),checkRolePermission,ana_gestinController.getAna_gestinCount);
router.route('/device/api/v1/ana_gestin/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,ana_gestinController.getAna_gestin);
router.route('/device/api/v1/ana_gestin/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ana_gestinController.updateAna_gestin);    
router.route('/device/api/v1/ana_gestin/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ana_gestinController.partialUpdateAna_gestin);
router.route('/device/api/v1/ana_gestin/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ana_gestinController.softDeleteAna_gestin);
router.route('/device/api/v1/ana_gestin/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,ana_gestinController.softDeleteManyAna_gestin);
router.route('/device/api/v1/ana_gestin/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,ana_gestinController.bulkInsertAna_gestin);
router.route('/device/api/v1/ana_gestin/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,ana_gestinController.bulkUpdateAna_gestin);
router.route('/device/api/v1/ana_gestin/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,ana_gestinController.deleteAna_gestin);
router.route('/device/api/v1/ana_gestin/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,ana_gestinController.deleteManyAna_gestin);

module.exports = router;
