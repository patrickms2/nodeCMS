/**
 * index.js
 * @description :: exports all the models and its relationships among other models
 */

const dbConnection = require('../config/dbConnection');
const db = {};
db.sequelize = dbConnection;

db.users = require('./users');
db.tipos_documentos = require('./tipos_documentos');
db.tags = require('./tags');
db.servicios = require('./servicios');
db.secciones_web = require('./secciones_web');
db.roles = require('./roles');
db.reservas = require('./reservas');
db.propiedades = require('./propiedades');
db.portfolios = require('./portfolios');
db.personal_access_tokens = require('./personal_access_tokens');
db.patrick_tecnologa = require('./patrick_tecnologa');
db.password_reset_tokens = require('./password_reset_tokens');
db.password_resets = require('./password_resets');
db.paneles = require('./paneles');
db.paginas = require('./paginas');
db.pages = require('./pages');
db.pagebuilder__uploads = require('./pagebuilder__uploads');
db.pagebuilder__settings = require('./pagebuilder__settings');
db.pagebuilder__page_translations = require('./pagebuilder__page_translations');
db.pagebuilder__pages = require('./pagebuilder__pages');
db.obras_localizaciones_a = require('./obras_localizaciones_a');
db.obras_localizaciones = require('./obras_localizaciones');
db.obras_fotos = require('./obras_fotos');
db.obras_documentos = require('./obras_documentos');
db.obras_disciplinas = require('./obras_disciplinas');
db.obras_artistas = require('./obras_artistas');
db.obras_a = require('./obras_a');
db.obras = require('./obras');
db.noticias = require('./noticias');
db.migrations = require('./migrations');
db.localizaciones_obras = require('./localizaciones_obras');
db.localizaciones = require('./localizaciones');
db.gestin_de_contenidos_pane = require('./gestin_de_contenidos_pane');
db.galder_a = require('./galder_a');
db.fotos = require('./fotos');
db.fotoobra = require('./fotoobra');
db.faq = require('./faq');
db.failed_jobs = require('./failed_jobs');
db.eventos = require('./eventos');
db.enlaces = require('./enlaces');
db.energia = require('./energia');
db.edificios = require('./edificios');
db.documentos = require('./documentos');
db.departamentos = require('./departamentos');
db.condiciones = require('./condiciones');
db.concejales = require('./concejales');
db.comunicaciones = require('./comunicaciones');
db.comercios = require('./comercios');
db.clientes = require('./clientes');
db.categories = require('./categories');
db.catalogos = require('./catalogos');
db.artistas_obras = require('./artistas_obras');
db.artistas = require('./artistas');
db.article_tag = require('./article_tag');
db.articles = require('./articles');
db.apartespacios = require('./apartespacios');
db.ana_gestin = require('./ana_gestin');
db.alejandro = require('./alejandro');
db.admin_user_tenancy = require('./admin_user_tenancy');
db.admin_user_role = require('./admin_user_role');
db.admin_users = require('./admin_users');
db.admin_teams = require('./admin_teams');
db.admin_role_permission = require('./admin_role_permission');
db.admin_roles = require('./admin_roles');
db.admin_permissions = require('./admin_permissions');
db.admin_auditable_logs = require('./admin_auditable_logs');
db.obra = require('./obra');
db.user = require('./user');
db.disciplinas = require('./disciplinas');
db.task = require('./task');
db.tag = require('./tag');
db.task_tag = require('./task_tag');
db.userAuthSettings = require('./userAuthSettings');
db.userTokens = require('./userTokens');
db.role = require('./role');
db.projectRoute = require('./projectRoute');
db.routeRole = require('./routeRole');
db.userRole = require('./userRole');

db.users.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.users, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.users.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.users, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.tipos_documentos.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.tipos_documentos, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.tipos_documentos.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.tipos_documentos, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.tags.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.tags, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.tags.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.tags, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.servicios.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.servicios, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.servicios.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.servicios, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.secciones_web.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.secciones_web, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.secciones_web.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.secciones_web, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.roles.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.roles, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.roles.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.roles, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.reservas.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.reservas, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.reservas.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.reservas, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.propiedades.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.propiedades, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.propiedades.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.propiedades, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.portfolios.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.portfolios, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.portfolios.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.portfolios, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.personal_access_tokens.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.personal_access_tokens, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.personal_access_tokens.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.personal_access_tokens, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.patrick_tecnologa.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.patrick_tecnologa, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.patrick_tecnologa.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.patrick_tecnologa, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.password_reset_tokens.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.password_reset_tokens, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.password_reset_tokens.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.password_reset_tokens, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.password_resets.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.password_resets, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.password_resets.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.password_resets, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.paneles.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.paneles, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.paneles.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.paneles, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.paginas.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.paginas, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.paginas.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.paginas, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.pages.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.pages, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.pages.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.pages, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.pagebuilder__uploads.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.pagebuilder__uploads, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.pagebuilder__uploads.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.pagebuilder__uploads, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.pagebuilder__settings.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.pagebuilder__settings, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.pagebuilder__settings.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.pagebuilder__settings, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.pagebuilder__page_translations.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.pagebuilder__page_translations, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.pagebuilder__page_translations.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.pagebuilder__page_translations, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.pagebuilder__pages.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.pagebuilder__pages, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.pagebuilder__pages.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.pagebuilder__pages, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.obras_localizaciones_a.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obras_localizaciones_a, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.obras_localizaciones_a.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obras_localizaciones_a, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.obras_localizaciones.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obras_localizaciones, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.obras_localizaciones.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obras_localizaciones, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.obras_fotos.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obras_fotos, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.obras_fotos.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obras_fotos, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.obras_documentos.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obras_documentos, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.obras_documentos.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obras_documentos, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.obras_disciplinas.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obras_disciplinas, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.obras_disciplinas.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obras_disciplinas, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.obras_artistas.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obras_artistas, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.obras_artistas.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obras_artistas, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.obras_a.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obras_a, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.obras_a.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obras_a, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.obras.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obras, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.obras.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obras, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.noticias.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.noticias, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.noticias.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.noticias, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.migrations.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.migrations, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.migrations.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.migrations, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.localizaciones_obras.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.localizaciones_obras, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.localizaciones_obras.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.localizaciones_obras, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.localizaciones.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.localizaciones, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.localizaciones.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.localizaciones, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.gestin_de_contenidos_pane.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.gestin_de_contenidos_pane, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.gestin_de_contenidos_pane.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.gestin_de_contenidos_pane, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.galder_a.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.galder_a, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.galder_a.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.galder_a, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.fotos.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.fotos, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.fotos.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.fotos, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.fotoobra.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.fotoobra, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.fotoobra.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.fotoobra, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.faq.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.faq, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.faq.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.faq, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.failed_jobs.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.failed_jobs, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.failed_jobs.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.failed_jobs, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.eventos.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.eventos, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.eventos.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.eventos, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.enlaces.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.enlaces, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.enlaces.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.enlaces, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.energia.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.energia, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.energia.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.energia, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.edificios.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.edificios, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.edificios.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.edificios, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.documentos.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.documentos, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.documentos.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.documentos, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.departamentos.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.departamentos, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.departamentos.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.departamentos, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.condiciones.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.condiciones, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.condiciones.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.condiciones, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.concejales.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.concejales, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.concejales.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.concejales, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.comunicaciones.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.comunicaciones, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.comunicaciones.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.comunicaciones, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.comercios.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.comercios, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.comercios.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.comercios, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.clientes.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.clientes, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.clientes.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.clientes, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.categories.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.categories, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.categories.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.categories, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.catalogos.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.catalogos, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.catalogos.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.catalogos, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.artistas_obras.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.artistas_obras, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.artistas_obras.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.artistas_obras, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.artistas.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.artistas, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.artistas.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.artistas, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.article_tag.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.article_tag, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.article_tag.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.article_tag, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.articles.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.articles, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.articles.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.articles, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.apartespacios.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.apartespacios, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.apartespacios.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.apartespacios, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.ana_gestin.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.ana_gestin, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.ana_gestin.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.ana_gestin, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.alejandro.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.alejandro, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.alejandro.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.alejandro, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.admin_user_tenancy.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_user_tenancy, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.admin_user_tenancy.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_user_tenancy, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.admin_user_role.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_user_role, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.admin_user_role.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_user_role, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.admin_users.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_users, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.admin_users.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_users, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.admin_teams.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_teams, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.admin_teams.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_teams, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.admin_role_permission.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_role_permission, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.admin_role_permission.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_role_permission, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.admin_roles.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_roles, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.admin_roles.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_roles, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.admin_permissions.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_permissions, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.admin_permissions.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_permissions, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.admin_auditable_logs.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_auditable_logs, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.admin_auditable_logs.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.admin_auditable_logs, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.obra.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obra, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.obra.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.obra, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.user.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.user.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.disciplinas.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.disciplinas, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.disciplinas.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.disciplinas, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.task.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.task, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.task.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.task, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.tag.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.tag, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.tag.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.tag, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.task_tag.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.task_tag, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.task_tag.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.task_tag, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userRole, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.task.belongsTo(db.disciplinas, {
  foreignKey: 'categoryId',
  as: '_categoryId',
  targetKey: 'id' 
});
db.disciplinas.hasOne(db.task, {
  foreignKey: 'categoryId',
  sourceKey: 'id' 
});
db.task.belongsTo(db.task, {
  foreignKey: 'parentId',
  as: '_parentId',
  targetKey: 'id' 
});
db.task.hasOne(db.task, {
  foreignKey: 'parentId',
  sourceKey: 'id' 
});
db.task_tag.belongsTo(db.task, {
  foreignKey: 'taskId',
  as: '_taskId',
  targetKey: 'id' 
});
db.task.hasMany(db.task_tag, {
  foreignKey: 'taskId',
  sourceKey: 'id' 
});
db.task_tag.belongsTo(db.tag, {
  foreignKey: 'tagId',
  as: '_tagId',
  targetKey: 'id' 
});
db.tag.hasMany(db.task_tag, {
  foreignKey: 'tagId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.routeRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.userRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.projectRoute, {
  foreignKey: 'routeId',
  as: '_routeId',
  targetKey: 'id' 
});
db.projectRoute.hasMany(db.routeRole, {
  foreignKey: 'routeId',
  sourceKey: 'id' 
});

module.exports = db;