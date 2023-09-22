/**
 * alejandroRoutes.js
 * @description :: CRUD API routes for alejandro
 */

const express = require('express');
const router = express.Router();
const alejandroController = require('../../../controller/device/v1/alejandroController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/alejandro/create').post(auth(PLATFORM.DEVICE),checkRolePermission,alejandroController.addAlejandro);
router.route('/device/api/v1/alejandro/list').post(auth(PLATFORM.DEVICE),checkRolePermission,alejandroController.findAllAlejandro);
router.route('/device/api/v1/alejandro/count').post(auth(PLATFORM.DEVICE),checkRolePermission,alejandroController.getAlejandroCount);
router.route('/device/api/v1/alejandro/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,alejandroController.getAlejandro);
router.route('/device/api/v1/alejandro/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,alejandroController.updateAlejandro);    
router.route('/device/api/v1/alejandro/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,alejandroController.partialUpdateAlejandro);
router.route('/device/api/v1/alejandro/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,alejandroController.softDeleteAlejandro);
router.route('/device/api/v1/alejandro/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,alejandroController.softDeleteManyAlejandro);
router.route('/device/api/v1/alejandro/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,alejandroController.bulkInsertAlejandro);
router.route('/device/api/v1/alejandro/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,alejandroController.bulkUpdateAlejandro);
router.route('/device/api/v1/alejandro/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,alejandroController.deleteAlejandro);
router.route('/device/api/v1/alejandro/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,alejandroController.deleteManyAlejandro);

module.exports = router;
