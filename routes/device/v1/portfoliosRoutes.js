/**
 * portfoliosRoutes.js
 * @description :: CRUD API routes for portfolios
 */

const express = require('express');
const router = express.Router();
const portfoliosController = require('../../../controller/device/v1/portfoliosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/portfolios/create').post(auth(PLATFORM.DEVICE),checkRolePermission,portfoliosController.addPortfolios);
router.route('/device/api/v1/portfolios/list').post(auth(PLATFORM.DEVICE),checkRolePermission,portfoliosController.findAllPortfolios);
router.route('/device/api/v1/portfolios/count').post(auth(PLATFORM.DEVICE),checkRolePermission,portfoliosController.getPortfoliosCount);
router.route('/device/api/v1/portfolios/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,portfoliosController.getPortfolios);
router.route('/device/api/v1/portfolios/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,portfoliosController.updatePortfolios);    
router.route('/device/api/v1/portfolios/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,portfoliosController.partialUpdatePortfolios);
router.route('/device/api/v1/portfolios/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,portfoliosController.softDeletePortfolios);
router.route('/device/api/v1/portfolios/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,portfoliosController.softDeleteManyPortfolios);
router.route('/device/api/v1/portfolios/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,portfoliosController.bulkInsertPortfolios);
router.route('/device/api/v1/portfolios/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,portfoliosController.bulkUpdatePortfolios);
router.route('/device/api/v1/portfolios/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,portfoliosController.deletePortfolios);
router.route('/device/api/v1/portfolios/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,portfoliosController.deleteManyPortfolios);

module.exports = router;
