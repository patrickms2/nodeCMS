/**
 * failed_jobsRoutes.js
 * @description :: CRUD API routes for failed_jobs
 */

const express = require('express');
const router = express.Router();
const failed_jobsController = require('../../../controller/client/v1/failed_jobsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/failed_jobs/create').post(auth(PLATFORM.CLIENT),checkRolePermission,failed_jobsController.addFailed_jobs);
router.route('/client/api/v1/failed_jobs/list').post(auth(PLATFORM.CLIENT),checkRolePermission,failed_jobsController.findAllFailed_jobs);
router.route('/client/api/v1/failed_jobs/count').post(auth(PLATFORM.CLIENT),checkRolePermission,failed_jobsController.getFailed_jobsCount);
router.route('/client/api/v1/failed_jobs/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,failed_jobsController.getFailed_jobs);
router.route('/client/api/v1/failed_jobs/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,failed_jobsController.updateFailed_jobs);    
router.route('/client/api/v1/failed_jobs/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,failed_jobsController.partialUpdateFailed_jobs);
router.route('/client/api/v1/failed_jobs/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,failed_jobsController.softDeleteFailed_jobs);
router.route('/client/api/v1/failed_jobs/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,failed_jobsController.softDeleteManyFailed_jobs);
router.route('/client/api/v1/failed_jobs/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,failed_jobsController.bulkInsertFailed_jobs);
router.route('/client/api/v1/failed_jobs/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,failed_jobsController.bulkUpdateFailed_jobs);
router.route('/client/api/v1/failed_jobs/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,failed_jobsController.deleteFailed_jobs);
router.route('/client/api/v1/failed_jobs/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,failed_jobsController.deleteManyFailed_jobs);

module.exports = router;
