/**
 * obraRoutes.js
 * @description :: CRUD API routes for obra
 */

const express = require('express');
const router = express.Router();
const obraController = require('../../../controller/client/v1/obraController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/obra/create').post(auth(PLATFORM.CLIENT),checkRolePermission,obraController.addObra);
router.route('/client/api/v1/obra/list').post(auth(PLATFORM.CLIENT),checkRolePermission,obraController.findAllObra);
router.route('/client/api/v1/obra/count').post(auth(PLATFORM.CLIENT),checkRolePermission,obraController.getObraCount);
router.route('/client/api/v1/obra/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,obraController.getObra);
router.route('/client/api/v1/obra/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obraController.updateObra);    
router.route('/client/api/v1/obra/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obraController.partialUpdateObra);
router.route('/client/api/v1/obra/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obraController.softDeleteObra);
router.route('/client/api/v1/obra/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,obraController.softDeleteManyObra);
router.route('/client/api/v1/obra/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,obraController.bulkInsertObra);
router.route('/client/api/v1/obra/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,obraController.bulkUpdateObra);
router.route('/client/api/v1/obra/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,obraController.deleteObra);
router.route('/client/api/v1/obra/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,obraController.deleteManyObra);

module.exports = router;
