/**
 * index route file of device platform.
 * @description: exports all routes of device platform.
 */
const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));
router.use(require('./usersRoutes'));
router.use(require('./tipos_documentosRoutes'));
router.use(require('./tagsRoutes'));
router.use(require('./serviciosRoutes'));
router.use(require('./secciones_webRoutes'));
router.use(require('./rolesRoutes'));
router.use(require('./reservasRoutes'));
router.use(require('./propiedadesRoutes'));
router.use(require('./portfoliosRoutes'));
router.use(require('./personal_access_tokensRoutes'));
router.use(require('./patrick_tecnologaRoutes'));
router.use(require('./password_reset_tokensRoutes'));
router.use(require('./password_resetsRoutes'));
router.use(require('./panelesRoutes'));
router.use(require('./paginasRoutes'));
router.use(require('./pagesRoutes'));
router.use(require('./pagebuilder__uploadsRoutes'));
router.use(require('./pagebuilder__settingsRoutes'));
router.use(require('./pagebuilder__page_translationsRoutes'));
router.use(require('./pagebuilder__pagesRoutes'));
router.use(require('./obras_localizaciones_aRoutes'));
router.use(require('./obras_localizacionesRoutes'));
router.use(require('./obras_fotosRoutes'));
router.use(require('./obras_documentosRoutes'));
router.use(require('./obras_disciplinasRoutes'));
router.use(require('./obras_artistasRoutes'));
router.use(require('./obras_aRoutes'));
router.use(require('./obrasRoutes'));
router.use(require('./noticiasRoutes'));
router.use(require('./migrationsRoutes'));
router.use(require('./localizaciones_obrasRoutes'));
router.use(require('./localizacionesRoutes'));
router.use(require('./gestin_de_contenidos_paneRoutes'));
router.use(require('./galder_aRoutes'));
router.use(require('./fotosRoutes'));
router.use(require('./fotoobraRoutes'));
router.use(require('./faqRoutes'));
router.use(require('./failed_jobsRoutes'));
router.use(require('./eventosRoutes'));
router.use(require('./enlacesRoutes'));
router.use(require('./energiaRoutes'));
router.use(require('./edificiosRoutes'));
router.use(require('./documentosRoutes'));
router.use(require('./departamentosRoutes'));
router.use(require('./condicionesRoutes'));
router.use(require('./concejalesRoutes'));
router.use(require('./comunicacionesRoutes'));
router.use(require('./comerciosRoutes'));
router.use(require('./clientesRoutes'));
router.use(require('./categoriesRoutes'));
router.use(require('./catalogosRoutes'));
router.use(require('./artistas_obrasRoutes'));
router.use(require('./artistasRoutes'));
router.use(require('./article_tagRoutes'));
router.use(require('./articlesRoutes'));
router.use(require('./apartespaciosRoutes'));
router.use(require('./ana_gestinRoutes'));
router.use(require('./alejandroRoutes'));
router.use(require('./admin_user_tenancyRoutes'));
router.use(require('./admin_user_roleRoutes'));
router.use(require('./admin_usersRoutes'));
router.use(require('./admin_teamsRoutes'));
router.use(require('./admin_role_permissionRoutes'));
router.use(require('./admin_rolesRoutes'));
router.use(require('./admin_permissionsRoutes'));
router.use(require('./admin_auditable_logsRoutes'));
router.use(require('./obraRoutes'));
router.use(require('./userRoutes'));
router.use(require('./disciplinasRoutes'));
router.use(require('./taskRoutes'));
router.use(require('./tagRoutes'));
router.use(require('./task_tagRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));

module.exports = router;
