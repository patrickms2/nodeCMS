/**
 * migrationsRoutes.js
 * @description :: CRUD API routes for migrations
 */

const express = require('express');
const router = express.Router();
const migrationsController = require('../../../controller/device/v1/migrationsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/migrations/create').post(auth(PLATFORM.DEVICE),checkRolePermission,migrationsController.addMigrations);
router.route('/device/api/v1/migrations/list').post(auth(PLATFORM.DEVICE),checkRolePermission,migrationsController.findAllMigrations);
router.route('/device/api/v1/migrations/count').post(auth(PLATFORM.DEVICE),checkRolePermission,migrationsController.getMigrationsCount);
router.route('/device/api/v1/migrations/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,migrationsController.getMigrations);
router.route('/device/api/v1/migrations/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,migrationsController.updateMigrations);    
router.route('/device/api/v1/migrations/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,migrationsController.partialUpdateMigrations);
router.route('/device/api/v1/migrations/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,migrationsController.softDeleteMigrations);
router.route('/device/api/v1/migrations/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,migrationsController.softDeleteManyMigrations);
router.route('/device/api/v1/migrations/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,migrationsController.bulkInsertMigrations);
router.route('/device/api/v1/migrations/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,migrationsController.bulkUpdateMigrations);
router.route('/device/api/v1/migrations/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,migrationsController.deleteMigrations);
router.route('/device/api/v1/migrations/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,migrationsController.deleteManyMigrations);

module.exports = router;
