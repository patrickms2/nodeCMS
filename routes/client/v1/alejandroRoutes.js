/**
 * alejandroRoutes.js
 * @description :: CRUD API routes for alejandro
 */

const express = require('express');
const router = express.Router();
const alejandroController = require('../../../controller/client/v1/alejandroController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/alejandro/create').post(auth(PLATFORM.CLIENT),checkRolePermission,alejandroController.addAlejandro);
router.route('/client/api/v1/alejandro/list').post(auth(PLATFORM.CLIENT),checkRolePermission,alejandroController.findAllAlejandro);
router.route('/client/api/v1/alejandro/count').post(auth(PLATFORM.CLIENT),checkRolePermission,alejandroController.getAlejandroCount);
router.route('/client/api/v1/alejandro/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,alejandroController.getAlejandro);
router.route('/client/api/v1/alejandro/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,alejandroController.updateAlejandro);    
router.route('/client/api/v1/alejandro/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,alejandroController.partialUpdateAlejandro);
router.route('/client/api/v1/alejandro/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,alejandroController.softDeleteAlejandro);
router.route('/client/api/v1/alejandro/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,alejandroController.softDeleteManyAlejandro);
router.route('/client/api/v1/alejandro/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,alejandroController.bulkInsertAlejandro);
router.route('/client/api/v1/alejandro/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,alejandroController.bulkUpdateAlejandro);
router.route('/client/api/v1/alejandro/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,alejandroController.deleteAlejandro);
router.route('/client/api/v1/alejandro/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,alejandroController.deleteManyAlejandro);

module.exports = router;
