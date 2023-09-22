/**
 * gestin_de_contenidos_paneRoutes.js
 * @description :: CRUD API routes for gestin_de_contenidos_pane
 */

const express = require('express');
const router = express.Router();
const gestin_de_contenidos_paneController = require('../../../controller/client/v1/gestin_de_contenidos_paneController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/gestin_de_contenidos_pane/create').post(auth(PLATFORM.CLIENT),checkRolePermission,gestin_de_contenidos_paneController.addGestin_de_contenidos_pane);
router.route('/client/api/v1/gestin_de_contenidos_pane/list').post(auth(PLATFORM.CLIENT),checkRolePermission,gestin_de_contenidos_paneController.findAllGestin_de_contenidos_pane);
router.route('/client/api/v1/gestin_de_contenidos_pane/count').post(auth(PLATFORM.CLIENT),checkRolePermission,gestin_de_contenidos_paneController.getGestin_de_contenidos_paneCount);
router.route('/client/api/v1/gestin_de_contenidos_pane/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,gestin_de_contenidos_paneController.getGestin_de_contenidos_pane);
router.route('/client/api/v1/gestin_de_contenidos_pane/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,gestin_de_contenidos_paneController.updateGestin_de_contenidos_pane);    
router.route('/client/api/v1/gestin_de_contenidos_pane/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,gestin_de_contenidos_paneController.partialUpdateGestin_de_contenidos_pane);
router.route('/client/api/v1/gestin_de_contenidos_pane/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,gestin_de_contenidos_paneController.softDeleteGestin_de_contenidos_pane);
router.route('/client/api/v1/gestin_de_contenidos_pane/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,gestin_de_contenidos_paneController.softDeleteManyGestin_de_contenidos_pane);
router.route('/client/api/v1/gestin_de_contenidos_pane/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,gestin_de_contenidos_paneController.bulkInsertGestin_de_contenidos_pane);
router.route('/client/api/v1/gestin_de_contenidos_pane/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,gestin_de_contenidos_paneController.bulkUpdateGestin_de_contenidos_pane);
router.route('/client/api/v1/gestin_de_contenidos_pane/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,gestin_de_contenidos_paneController.deleteGestin_de_contenidos_pane);
router.route('/client/api/v1/gestin_de_contenidos_pane/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,gestin_de_contenidos_paneController.deleteManyGestin_de_contenidos_pane);

module.exports = router;
