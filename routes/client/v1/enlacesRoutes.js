/**
 * enlacesRoutes.js
 * @description :: CRUD API routes for enlaces
 */

const express = require('express');
const router = express.Router();
const enlacesController = require('../../../controller/client/v1/enlacesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/enlaces/create').post(auth(PLATFORM.CLIENT),checkRolePermission,enlacesController.addEnlaces);
router.route('/client/api/v1/enlaces/list').post(auth(PLATFORM.CLIENT),checkRolePermission,enlacesController.findAllEnlaces);
router.route('/client/api/v1/enlaces/count').post(auth(PLATFORM.CLIENT),checkRolePermission,enlacesController.getEnlacesCount);
router.route('/client/api/v1/enlaces/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,enlacesController.getEnlaces);
router.route('/client/api/v1/enlaces/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,enlacesController.updateEnlaces);    
router.route('/client/api/v1/enlaces/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,enlacesController.partialUpdateEnlaces);
router.route('/client/api/v1/enlaces/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,enlacesController.softDeleteEnlaces);
router.route('/client/api/v1/enlaces/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,enlacesController.softDeleteManyEnlaces);
router.route('/client/api/v1/enlaces/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,enlacesController.bulkInsertEnlaces);
router.route('/client/api/v1/enlaces/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,enlacesController.bulkUpdateEnlaces);
router.route('/client/api/v1/enlaces/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,enlacesController.deleteEnlaces);
router.route('/client/api/v1/enlaces/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,enlacesController.deleteManyEnlaces);

module.exports = router;
