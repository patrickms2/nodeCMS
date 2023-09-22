/**
 * portfoliosRoutes.js
 * @description :: CRUD API routes for portfolios
 */

const express = require('express');
const router = express.Router();
const portfoliosController = require('../../../controller/client/v1/portfoliosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/portfolios/create').post(auth(PLATFORM.CLIENT),checkRolePermission,portfoliosController.addPortfolios);
router.route('/client/api/v1/portfolios/list').post(auth(PLATFORM.CLIENT),checkRolePermission,portfoliosController.findAllPortfolios);
router.route('/client/api/v1/portfolios/count').post(auth(PLATFORM.CLIENT),checkRolePermission,portfoliosController.getPortfoliosCount);
router.route('/client/api/v1/portfolios/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,portfoliosController.getPortfolios);
router.route('/client/api/v1/portfolios/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,portfoliosController.updatePortfolios);    
router.route('/client/api/v1/portfolios/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,portfoliosController.partialUpdatePortfolios);
router.route('/client/api/v1/portfolios/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,portfoliosController.softDeletePortfolios);
router.route('/client/api/v1/portfolios/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,portfoliosController.softDeleteManyPortfolios);
router.route('/client/api/v1/portfolios/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,portfoliosController.bulkInsertPortfolios);
router.route('/client/api/v1/portfolios/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,portfoliosController.bulkUpdatePortfolios);
router.route('/client/api/v1/portfolios/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,portfoliosController.deletePortfolios);
router.route('/client/api/v1/portfolios/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,portfoliosController.deleteManyPortfolios);

module.exports = router;
