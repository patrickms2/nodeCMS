/**
 * migrationsRoutes.js
 * @description :: CRUD API routes for migrations
 */

const express = require('express');
const router = express.Router();
const migrationsController = require('../../../controller/client/v1/migrationsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/migrations/create').post(auth(PLATFORM.CLIENT),checkRolePermission,migrationsController.addMigrations);
router.route('/client/api/v1/migrations/list').post(auth(PLATFORM.CLIENT),checkRolePermission,migrationsController.findAllMigrations);
router.route('/client/api/v1/migrations/count').post(auth(PLATFORM.CLIENT),checkRolePermission,migrationsController.getMigrationsCount);
router.route('/client/api/v1/migrations/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,migrationsController.getMigrations);
router.route('/client/api/v1/migrations/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,migrationsController.updateMigrations);    
router.route('/client/api/v1/migrations/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,migrationsController.partialUpdateMigrations);
router.route('/client/api/v1/migrations/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,migrationsController.softDeleteMigrations);
router.route('/client/api/v1/migrations/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,migrationsController.softDeleteManyMigrations);
router.route('/client/api/v1/migrations/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,migrationsController.bulkInsertMigrations);
router.route('/client/api/v1/migrations/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,migrationsController.bulkUpdateMigrations);
router.route('/client/api/v1/migrations/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,migrationsController.deleteMigrations);
router.route('/client/api/v1/migrations/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,migrationsController.deleteManyMigrations);

module.exports = router;
