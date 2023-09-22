/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Users = require('../model/users');
let Tipos_documentos = require('../model/tipos_documentos');
let Tags = require('../model/tags');
let Servicios = require('../model/servicios');
let Secciones_web = require('../model/secciones_web');
let Roles = require('../model/roles');
let Reservas = require('../model/reservas');
let Propiedades = require('../model/propiedades');
let Portfolios = require('../model/portfolios');
let Personal_access_tokens = require('../model/personal_access_tokens');
let Patrick_tecnologa = require('../model/patrick_tecnologa');
let Password_reset_tokens = require('../model/password_reset_tokens');
let Password_resets = require('../model/password_resets');
let Paneles = require('../model/paneles');
let Paginas = require('../model/paginas');
let Pages = require('../model/pages');
let Pagebuilder__uploads = require('../model/pagebuilder__uploads');
let Pagebuilder__settings = require('../model/pagebuilder__settings');
let Pagebuilder__page_translations = require('../model/pagebuilder__page_translations');
let Pagebuilder__pages = require('../model/pagebuilder__pages');
let Obras_localizaciones_a = require('../model/obras_localizaciones_a');
let Obras_localizaciones = require('../model/obras_localizaciones');
let Obras_fotos = require('../model/obras_fotos');
let Obras_documentos = require('../model/obras_documentos');
let Obras_disciplinas = require('../model/obras_disciplinas');
let Obras_artistas = require('../model/obras_artistas');
let Obras_a = require('../model/obras_a');
let Obras = require('../model/obras');
let Noticias = require('../model/noticias');
let Migrations = require('../model/migrations');
let Localizaciones_obras = require('../model/localizaciones_obras');
let Localizaciones = require('../model/localizaciones');
let Gestin_de_contenidos_pane = require('../model/gestin_de_contenidos_pane');
let Galder_a = require('../model/galder_a');
let Fotos = require('../model/fotos');
let Fotoobra = require('../model/fotoobra');
let Faq = require('../model/faq');
let Failed_jobs = require('../model/failed_jobs');
let Eventos = require('../model/eventos');
let Enlaces = require('../model/enlaces');
let Energia = require('../model/energia');
let Edificios = require('../model/edificios');
let Documentos = require('../model/documentos');
let Departamentos = require('../model/departamentos');
let Condiciones = require('../model/condiciones');
let Concejales = require('../model/concejales');
let Comunicaciones = require('../model/comunicaciones');
let Comercios = require('../model/comercios');
let Clientes = require('../model/clientes');
let Categories = require('../model/categories');
let Catalogos = require('../model/catalogos');
let Artistas_obras = require('../model/artistas_obras');
let Artistas = require('../model/artistas');
let Article_tag = require('../model/article_tag');
let Articles = require('../model/articles');
let Apartespacios = require('../model/apartespacios');
let Ana_gestin = require('../model/ana_gestin');
let Alejandro = require('../model/alejandro');
let Admin_user_tenancy = require('../model/admin_user_tenancy');
let Admin_user_role = require('../model/admin_user_role');
let Admin_users = require('../model/admin_users');
let Admin_teams = require('../model/admin_teams');
let Admin_role_permission = require('../model/admin_role_permission');
let Admin_roles = require('../model/admin_roles');
let Admin_permissions = require('../model/admin_permissions');
let Admin_auditable_logs = require('../model/admin_auditable_logs');
let Obra = require('../model/obra');
let User = require('../model/user');
let Disciplinas = require('../model/disciplinas');
let Task = require('../model/task');
let Tag = require('../model/tag');
let Task_tag = require('../model/task_tag');
let UserAuthSettings = require('../model/userAuthSettings');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteUsers = async (filter) =>{
  try {
    let response  = await dbService.destroy(Users,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTipos_documentos = async (filter) =>{
  try {
    let response  = await dbService.destroy(Tipos_documentos,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTags = async (filter) =>{
  try {
    let response  = await dbService.destroy(Tags,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteServicios = async (filter) =>{
  try {
    let response  = await dbService.destroy(Servicios,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteSecciones_web = async (filter) =>{
  try {
    let response  = await dbService.destroy(Secciones_web,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRoles = async (filter) =>{
  try {
    let response  = await dbService.destroy(Roles,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteReservas = async (filter) =>{
  try {
    let response  = await dbService.destroy(Reservas,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePropiedades = async (filter) =>{
  try {
    let response  = await dbService.destroy(Propiedades,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePortfolios = async (filter) =>{
  try {
    let response  = await dbService.destroy(Portfolios,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePersonal_access_tokens = async (filter) =>{
  try {
    let response  = await dbService.destroy(Personal_access_tokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePatrick_tecnologa = async (filter) =>{
  try {
    let response  = await dbService.destroy(Patrick_tecnologa,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePassword_reset_tokens = async (filter) =>{
  try {
    let response  = await dbService.destroy(Password_reset_tokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePassword_resets = async (filter) =>{
  try {
    let response  = await dbService.destroy(Password_resets,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePaneles = async (filter) =>{
  try {
    let response  = await dbService.destroy(Paneles,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePaginas = async (filter) =>{
  try {
    let response  = await dbService.destroy(Paginas,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePages = async (filter) =>{
  try {
    let response  = await dbService.destroy(Pages,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePagebuilder__uploads = async (filter) =>{
  try {
    let response  = await dbService.destroy(Pagebuilder__uploads,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePagebuilder__settings = async (filter) =>{
  try {
    let response  = await dbService.destroy(Pagebuilder__settings,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePagebuilder__page_translations = async (filter) =>{
  try {
    let response  = await dbService.destroy(Pagebuilder__page_translations,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePagebuilder__pages = async (filter) =>{
  try {
    let response  = await dbService.destroy(Pagebuilder__pages,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteObras_localizaciones_a = async (filter) =>{
  try {
    let response  = await dbService.destroy(Obras_localizaciones_a,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteObras_localizaciones = async (filter) =>{
  try {
    let response  = await dbService.destroy(Obras_localizaciones,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteObras_fotos = async (filter) =>{
  try {
    let response  = await dbService.destroy(Obras_fotos,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteObras_documentos = async (filter) =>{
  try {
    let response  = await dbService.destroy(Obras_documentos,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteObras_disciplinas = async (filter) =>{
  try {
    let response  = await dbService.destroy(Obras_disciplinas,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteObras_artistas = async (filter) =>{
  try {
    let response  = await dbService.destroy(Obras_artistas,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteObras_a = async (filter) =>{
  try {
    let response  = await dbService.destroy(Obras_a,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteObras = async (filter) =>{
  try {
    let response  = await dbService.destroy(Obras,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteNoticias = async (filter) =>{
  try {
    let response  = await dbService.destroy(Noticias,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMigrations = async (filter) =>{
  try {
    let response  = await dbService.destroy(Migrations,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteLocalizaciones_obras = async (filter) =>{
  try {
    let response  = await dbService.destroy(Localizaciones_obras,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteLocalizaciones = async (filter) =>{
  try {
    let response  = await dbService.destroy(Localizaciones,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteGestin_de_contenidos_pane = async (filter) =>{
  try {
    let response  = await dbService.destroy(Gestin_de_contenidos_pane,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteGalder_a = async (filter) =>{
  try {
    let response  = await dbService.destroy(Galder_a,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteFotos = async (filter) =>{
  try {
    let response  = await dbService.destroy(Fotos,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteFotoobra = async (filter) =>{
  try {
    let response  = await dbService.destroy(Fotoobra,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteFaq = async (filter) =>{
  try {
    let response  = await dbService.destroy(Faq,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteFailed_jobs = async (filter) =>{
  try {
    let response  = await dbService.destroy(Failed_jobs,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEventos = async (filter) =>{
  try {
    let response  = await dbService.destroy(Eventos,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEnlaces = async (filter) =>{
  try {
    let response  = await dbService.destroy(Enlaces,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEnergia = async (filter) =>{
  try {
    let response  = await dbService.destroy(Energia,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEdificios = async (filter) =>{
  try {
    let response  = await dbService.destroy(Edificios,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteDocumentos = async (filter) =>{
  try {
    let response  = await dbService.destroy(Documentos,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteDepartamentos = async (filter) =>{
  try {
    let response  = await dbService.destroy(Departamentos,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCondiciones = async (filter) =>{
  try {
    let response  = await dbService.destroy(Condiciones,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteConcejales = async (filter) =>{
  try {
    let response  = await dbService.destroy(Concejales,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteComunicaciones = async (filter) =>{
  try {
    let response  = await dbService.destroy(Comunicaciones,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteComercios = async (filter) =>{
  try {
    let response  = await dbService.destroy(Comercios,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteClientes = async (filter) =>{
  try {
    let response  = await dbService.destroy(Clientes,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCategories = async (filter) =>{
  try {
    let response  = await dbService.destroy(Categories,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCatalogos = async (filter) =>{
  try {
    let response  = await dbService.destroy(Catalogos,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteArtistas_obras = async (filter) =>{
  try {
    let response  = await dbService.destroy(Artistas_obras,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteArtistas = async (filter) =>{
  try {
    let response  = await dbService.destroy(Artistas,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteArticle_tag = async (filter) =>{
  try {
    let response  = await dbService.destroy(Article_tag,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteArticles = async (filter) =>{
  try {
    let response  = await dbService.destroy(Articles,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteApartespacios = async (filter) =>{
  try {
    let response  = await dbService.destroy(Apartespacios,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAna_gestin = async (filter) =>{
  try {
    let response  = await dbService.destroy(Ana_gestin,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAlejandro = async (filter) =>{
  try {
    let response  = await dbService.destroy(Alejandro,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAdmin_user_tenancy = async (filter) =>{
  try {
    let response  = await dbService.destroy(Admin_user_tenancy,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAdmin_user_role = async (filter) =>{
  try {
    let response  = await dbService.destroy(Admin_user_role,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAdmin_users = async (filter) =>{
  try {
    let response  = await dbService.destroy(Admin_users,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAdmin_teams = async (filter) =>{
  try {
    let response  = await dbService.destroy(Admin_teams,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAdmin_role_permission = async (filter) =>{
  try {
    let response  = await dbService.destroy(Admin_role_permission,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAdmin_roles = async (filter) =>{
  try {
    let response  = await dbService.destroy(Admin_roles,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAdmin_permissions = async (filter) =>{
  try {
    let response  = await dbService.destroy(Admin_permissions,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAdmin_auditable_logs = async (filter) =>{
  try {
    let response  = await dbService.destroy(Admin_auditable_logs,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteObra = async (filter) =>{
  try {
    let response  = await dbService.destroy(Obra,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const usersFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const usersCnt = await dbService.destroy(Users,usersFilter);

      const tipos_documentosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const tipos_documentosCnt = await dbService.destroy(Tipos_documentos,tipos_documentosFilter);

      const tagsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const tagsCnt = await dbService.destroy(Tags,tagsFilter);

      const serviciosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const serviciosCnt = await dbService.destroy(Servicios,serviciosFilter);

      const secciones_webFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const secciones_webCnt = await dbService.destroy(Secciones_web,secciones_webFilter);

      const rolesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const rolesCnt = await dbService.destroy(Roles,rolesFilter);

      const reservasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const reservasCnt = await dbService.destroy(Reservas,reservasFilter);

      const propiedadesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const propiedadesCnt = await dbService.destroy(Propiedades,propiedadesFilter);

      const portfoliosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const portfoliosCnt = await dbService.destroy(Portfolios,portfoliosFilter);

      const personal_access_tokensFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const personal_access_tokensCnt = await dbService.destroy(Personal_access_tokens,personal_access_tokensFilter);

      const patrick_tecnologaFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const patrick_tecnologaCnt = await dbService.destroy(Patrick_tecnologa,patrick_tecnologaFilter);

      const password_reset_tokensFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const password_reset_tokensCnt = await dbService.destroy(Password_reset_tokens,password_reset_tokensFilter);

      const password_resetsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const password_resetsCnt = await dbService.destroy(Password_resets,password_resetsFilter);

      const panelesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const panelesCnt = await dbService.destroy(Paneles,panelesFilter);

      const paginasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const paginasCnt = await dbService.destroy(Paginas,paginasFilter);

      const pagesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const pagesCnt = await dbService.destroy(Pages,pagesFilter);

      const pagebuilder__uploadsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const pagebuilder__uploadsCnt = await dbService.destroy(Pagebuilder__uploads,pagebuilder__uploadsFilter);

      const pagebuilder__settingsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const pagebuilder__settingsCnt = await dbService.destroy(Pagebuilder__settings,pagebuilder__settingsFilter);

      const pagebuilder__page_translationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const pagebuilder__page_translationsCnt = await dbService.destroy(Pagebuilder__page_translations,pagebuilder__page_translationsFilter);

      const pagebuilder__pagesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const pagebuilder__pagesCnt = await dbService.destroy(Pagebuilder__pages,pagebuilder__pagesFilter);

      const obras_localizaciones_aFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obras_localizaciones_aCnt = await dbService.destroy(Obras_localizaciones_a,obras_localizaciones_aFilter);

      const obras_localizacionesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obras_localizacionesCnt = await dbService.destroy(Obras_localizaciones,obras_localizacionesFilter);

      const obras_fotosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obras_fotosCnt = await dbService.destroy(Obras_fotos,obras_fotosFilter);

      const obras_documentosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obras_documentosCnt = await dbService.destroy(Obras_documentos,obras_documentosFilter);

      const obras_disciplinasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obras_disciplinasCnt = await dbService.destroy(Obras_disciplinas,obras_disciplinasFilter);

      const obras_artistasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obras_artistasCnt = await dbService.destroy(Obras_artistas,obras_artistasFilter);

      const obras_aFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obras_aCnt = await dbService.destroy(Obras_a,obras_aFilter);

      const obrasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obrasCnt = await dbService.destroy(Obras,obrasFilter);

      const noticiasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const noticiasCnt = await dbService.destroy(Noticias,noticiasFilter);

      const migrationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const migrationsCnt = await dbService.destroy(Migrations,migrationsFilter);

      const localizaciones_obrasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const localizaciones_obrasCnt = await dbService.destroy(Localizaciones_obras,localizaciones_obrasFilter);

      const localizacionesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const localizacionesCnt = await dbService.destroy(Localizaciones,localizacionesFilter);

      const gestin_de_contenidos_paneFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const gestin_de_contenidos_paneCnt = await dbService.destroy(Gestin_de_contenidos_pane,gestin_de_contenidos_paneFilter);

      const galder_aFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const galder_aCnt = await dbService.destroy(Galder_a,galder_aFilter);

      const fotosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const fotosCnt = await dbService.destroy(Fotos,fotosFilter);

      const fotoobraFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const fotoobraCnt = await dbService.destroy(Fotoobra,fotoobraFilter);

      const faqFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const faqCnt = await dbService.destroy(Faq,faqFilter);

      const failed_jobsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const failed_jobsCnt = await dbService.destroy(Failed_jobs,failed_jobsFilter);

      const eventosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const eventosCnt = await dbService.destroy(Eventos,eventosFilter);

      const enlacesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const enlacesCnt = await dbService.destroy(Enlaces,enlacesFilter);

      const energiaFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const energiaCnt = await dbService.destroy(Energia,energiaFilter);

      const edificiosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const edificiosCnt = await dbService.destroy(Edificios,edificiosFilter);

      const documentosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const documentosCnt = await dbService.destroy(Documentos,documentosFilter);

      const departamentosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const departamentosCnt = await dbService.destroy(Departamentos,departamentosFilter);

      const condicionesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const condicionesCnt = await dbService.destroy(Condiciones,condicionesFilter);

      const concejalesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const concejalesCnt = await dbService.destroy(Concejales,concejalesFilter);

      const comunicacionesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const comunicacionesCnt = await dbService.destroy(Comunicaciones,comunicacionesFilter);

      const comerciosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const comerciosCnt = await dbService.destroy(Comercios,comerciosFilter);

      const clientesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const clientesCnt = await dbService.destroy(Clientes,clientesFilter);

      const categoriesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const categoriesCnt = await dbService.destroy(Categories,categoriesFilter);

      const catalogosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const catalogosCnt = await dbService.destroy(Catalogos,catalogosFilter);

      const artistas_obrasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const artistas_obrasCnt = await dbService.destroy(Artistas_obras,artistas_obrasFilter);

      const artistasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const artistasCnt = await dbService.destroy(Artistas,artistasFilter);

      const article_tagFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const article_tagCnt = await dbService.destroy(Article_tag,article_tagFilter);

      const articlesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const articlesCnt = await dbService.destroy(Articles,articlesFilter);

      const apartespaciosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const apartespaciosCnt = await dbService.destroy(Apartespacios,apartespaciosFilter);

      const ana_gestinFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ana_gestinCnt = await dbService.destroy(Ana_gestin,ana_gestinFilter);

      const alejandroFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const alejandroCnt = await dbService.destroy(Alejandro,alejandroFilter);

      const admin_user_tenancyFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_user_tenancyCnt = await dbService.destroy(Admin_user_tenancy,admin_user_tenancyFilter);

      const admin_user_roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_user_roleCnt = await dbService.destroy(Admin_user_role,admin_user_roleFilter);

      const admin_usersFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_usersCnt = await dbService.destroy(Admin_users,admin_usersFilter);

      const admin_teamsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_teamsCnt = await dbService.destroy(Admin_teams,admin_teamsFilter);

      const admin_role_permissionFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_role_permissionCnt = await dbService.destroy(Admin_role_permission,admin_role_permissionFilter);

      const admin_rolesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_rolesCnt = await dbService.destroy(Admin_roles,admin_rolesFilter);

      const admin_permissionsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_permissionsCnt = await dbService.destroy(Admin_permissions,admin_permissionsFilter);

      const admin_auditable_logsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_auditable_logsCnt = await dbService.destroy(Admin_auditable_logs,admin_auditable_logsFilter);

      const obraFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obraCnt = await dbService.destroy(Obra,obraFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.destroy(User,userFilter);

      const disciplinasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const disciplinasCnt = await dbService.destroy(Disciplinas,disciplinasFilter);

      const taskFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const taskCnt = await dbService.destroy(Task,taskFilter);

      const tagFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const tagCnt = await dbService.destroy(Tag,tagFilter);

      const task_tagFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const task_tagCnt = await dbService.destroy(Task_tag,task_tagFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt = await dbService.destroy(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.destroy(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(User,filter);
      let response = {
        users :usersCnt.length,
        tipos_documentos :tipos_documentosCnt.length,
        tags :tagsCnt.length,
        servicios :serviciosCnt.length,
        secciones_web :secciones_webCnt.length,
        roles :rolesCnt.length,
        reservas :reservasCnt.length,
        propiedades :propiedadesCnt.length,
        portfolios :portfoliosCnt.length,
        personal_access_tokens :personal_access_tokensCnt.length,
        patrick_tecnologa :patrick_tecnologaCnt.length,
        password_reset_tokens :password_reset_tokensCnt.length,
        password_resets :password_resetsCnt.length,
        paneles :panelesCnt.length,
        paginas :paginasCnt.length,
        pages :pagesCnt.length,
        pagebuilder__uploads :pagebuilder__uploadsCnt.length,
        pagebuilder__settings :pagebuilder__settingsCnt.length,
        pagebuilder__page_translations :pagebuilder__page_translationsCnt.length,
        pagebuilder__pages :pagebuilder__pagesCnt.length,
        obras_localizaciones_a :obras_localizaciones_aCnt.length,
        obras_localizaciones :obras_localizacionesCnt.length,
        obras_fotos :obras_fotosCnt.length,
        obras_documentos :obras_documentosCnt.length,
        obras_disciplinas :obras_disciplinasCnt.length,
        obras_artistas :obras_artistasCnt.length,
        obras_a :obras_aCnt.length,
        obras :obrasCnt.length,
        noticias :noticiasCnt.length,
        migrations :migrationsCnt.length,
        localizaciones_obras :localizaciones_obrasCnt.length,
        localizaciones :localizacionesCnt.length,
        gestin_de_contenidos_pane :gestin_de_contenidos_paneCnt.length,
        galder_a :galder_aCnt.length,
        fotos :fotosCnt.length,
        fotoobra :fotoobraCnt.length,
        faq :faqCnt.length,
        failed_jobs :failed_jobsCnt.length,
        eventos :eventosCnt.length,
        enlaces :enlacesCnt.length,
        energia :energiaCnt.length,
        edificios :edificiosCnt.length,
        documentos :documentosCnt.length,
        departamentos :departamentosCnt.length,
        condiciones :condicionesCnt.length,
        concejales :concejalesCnt.length,
        comunicaciones :comunicacionesCnt.length,
        comercios :comerciosCnt.length,
        clientes :clientesCnt.length,
        categories :categoriesCnt.length,
        catalogos :catalogosCnt.length,
        artistas_obras :artistas_obrasCnt.length,
        artistas :artistasCnt.length,
        article_tag :article_tagCnt.length,
        articles :articlesCnt.length,
        apartespacios :apartespaciosCnt.length,
        ana_gestin :ana_gestinCnt.length,
        alejandro :alejandroCnt.length,
        admin_user_tenancy :admin_user_tenancyCnt.length,
        admin_user_role :admin_user_roleCnt.length,
        admin_users :admin_usersCnt.length,
        admin_teams :admin_teamsCnt.length,
        admin_role_permission :admin_role_permissionCnt.length,
        admin_roles :admin_rolesCnt.length,
        admin_permissions :admin_permissionsCnt.length,
        admin_auditable_logs :admin_auditable_logsCnt.length,
        obra :obraCnt.length,
        user :userCnt.length + deleted.length,
        disciplinas :disciplinasCnt.length,
        task :taskCnt.length,
        tag :tagCnt.length,
        task_tag :task_tagCnt.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteDisciplinas = async (filter) =>{
  try {
    let disciplinas = await dbService.findAll(Disciplinas,filter);
    if (disciplinas && disciplinas.length){
      disciplinas = disciplinas.map((obj) => obj.id);

      const taskFilter = { $or: [{ categoryId : { $in : disciplinas } }] };
      const taskCnt = await dbService.destroy(Task,taskFilter);

      let deleted  = await dbService.destroy(Disciplinas,filter);
      let response = { task :taskCnt.length, };
      return response; 
    } else {
      return {  disciplinas : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTask = async (filter) =>{
  try {
    let task = await dbService.findAll(Task,filter);
    if (task && task.length){
      task = task.map((obj) => obj.id);

      const taskFilter = { $or: [{ parentId : { $in : task } }] };
      const taskCnt = await dbService.destroy(Task,taskFilter);

      const task_tagFilter = { $or: [{ taskId : { $in : task } }] };
      const task_tagCnt = await dbService.destroy(Task_tag,task_tagFilter);

      let deleted  = await dbService.destroy(Task,filter);
      let response = {
        task :taskCnt.length + deleted.length,
        task_tag :task_tagCnt.length,
      };
      return response; 
    } else {
      return {  task : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTag = async (filter) =>{
  try {
    let tag = await dbService.findAll(Tag,filter);
    if (tag && tag.length){
      tag = tag.map((obj) => obj.id);

      const task_tagFilter = { $or: [{ tagId : { $in : tag } }] };
      const task_tagCnt = await dbService.destroy(Task_tag,task_tagFilter);

      let deleted  = await dbService.destroy(Tag,filter);
      let response = { task_tag :task_tagCnt.length, };
      return response; 
    } else {
      return {  tag : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTask_tag = async (filter) =>{
  try {
    let response  = await dbService.destroy(Task_tag,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserAuthSettings = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserAuthSettings,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(Role,filter);
      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      let deleted  = await dbService.destroy(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt.length, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countUsers = async (filter) =>{
  try {
    const usersCnt =  await dbService.count(Users,filter);
    return { users : usersCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTipos_documentos = async (filter) =>{
  try {
    const tipos_documentosCnt =  await dbService.count(Tipos_documentos,filter);
    return { tipos_documentos : tipos_documentosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTags = async (filter) =>{
  try {
    const tagsCnt =  await dbService.count(Tags,filter);
    return { tags : tagsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countServicios = async (filter) =>{
  try {
    const serviciosCnt =  await dbService.count(Servicios,filter);
    return { servicios : serviciosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countSecciones_web = async (filter) =>{
  try {
    const secciones_webCnt =  await dbService.count(Secciones_web,filter);
    return { secciones_web : secciones_webCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRoles = async (filter) =>{
  try {
    const rolesCnt =  await dbService.count(Roles,filter);
    return { roles : rolesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countReservas = async (filter) =>{
  try {
    const reservasCnt =  await dbService.count(Reservas,filter);
    return { reservas : reservasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPropiedades = async (filter) =>{
  try {
    const propiedadesCnt =  await dbService.count(Propiedades,filter);
    return { propiedades : propiedadesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPortfolios = async (filter) =>{
  try {
    const portfoliosCnt =  await dbService.count(Portfolios,filter);
    return { portfolios : portfoliosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPersonal_access_tokens = async (filter) =>{
  try {
    const personal_access_tokensCnt =  await dbService.count(Personal_access_tokens,filter);
    return { personal_access_tokens : personal_access_tokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPatrick_tecnologa = async (filter) =>{
  try {
    const patrick_tecnologaCnt =  await dbService.count(Patrick_tecnologa,filter);
    return { patrick_tecnologa : patrick_tecnologaCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPassword_reset_tokens = async (filter) =>{
  try {
    const password_reset_tokensCnt =  await dbService.count(Password_reset_tokens,filter);
    return { password_reset_tokens : password_reset_tokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPassword_resets = async (filter) =>{
  try {
    const password_resetsCnt =  await dbService.count(Password_resets,filter);
    return { password_resets : password_resetsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPaneles = async (filter) =>{
  try {
    const panelesCnt =  await dbService.count(Paneles,filter);
    return { paneles : panelesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPaginas = async (filter) =>{
  try {
    const paginasCnt =  await dbService.count(Paginas,filter);
    return { paginas : paginasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPages = async (filter) =>{
  try {
    const pagesCnt =  await dbService.count(Pages,filter);
    return { pages : pagesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPagebuilder__uploads = async (filter) =>{
  try {
    const pagebuilder__uploadsCnt =  await dbService.count(Pagebuilder__uploads,filter);
    return { pagebuilder__uploads : pagebuilder__uploadsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPagebuilder__settings = async (filter) =>{
  try {
    const pagebuilder__settingsCnt =  await dbService.count(Pagebuilder__settings,filter);
    return { pagebuilder__settings : pagebuilder__settingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPagebuilder__page_translations = async (filter) =>{
  try {
    const pagebuilder__page_translationsCnt =  await dbService.count(Pagebuilder__page_translations,filter);
    return { pagebuilder__page_translations : pagebuilder__page_translationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPagebuilder__pages = async (filter) =>{
  try {
    const pagebuilder__pagesCnt =  await dbService.count(Pagebuilder__pages,filter);
    return { pagebuilder__pages : pagebuilder__pagesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countObras_localizaciones_a = async (filter) =>{
  try {
    const obras_localizaciones_aCnt =  await dbService.count(Obras_localizaciones_a,filter);
    return { obras_localizaciones_a : obras_localizaciones_aCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countObras_localizaciones = async (filter) =>{
  try {
    const obras_localizacionesCnt =  await dbService.count(Obras_localizaciones,filter);
    return { obras_localizaciones : obras_localizacionesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countObras_fotos = async (filter) =>{
  try {
    const obras_fotosCnt =  await dbService.count(Obras_fotos,filter);
    return { obras_fotos : obras_fotosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countObras_documentos = async (filter) =>{
  try {
    const obras_documentosCnt =  await dbService.count(Obras_documentos,filter);
    return { obras_documentos : obras_documentosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countObras_disciplinas = async (filter) =>{
  try {
    const obras_disciplinasCnt =  await dbService.count(Obras_disciplinas,filter);
    return { obras_disciplinas : obras_disciplinasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countObras_artistas = async (filter) =>{
  try {
    const obras_artistasCnt =  await dbService.count(Obras_artistas,filter);
    return { obras_artistas : obras_artistasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countObras_a = async (filter) =>{
  try {
    const obras_aCnt =  await dbService.count(Obras_a,filter);
    return { obras_a : obras_aCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countObras = async (filter) =>{
  try {
    const obrasCnt =  await dbService.count(Obras,filter);
    return { obras : obrasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countNoticias = async (filter) =>{
  try {
    const noticiasCnt =  await dbService.count(Noticias,filter);
    return { noticias : noticiasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countMigrations = async (filter) =>{
  try {
    const migrationsCnt =  await dbService.count(Migrations,filter);
    return { migrations : migrationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countLocalizaciones_obras = async (filter) =>{
  try {
    const localizaciones_obrasCnt =  await dbService.count(Localizaciones_obras,filter);
    return { localizaciones_obras : localizaciones_obrasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countLocalizaciones = async (filter) =>{
  try {
    const localizacionesCnt =  await dbService.count(Localizaciones,filter);
    return { localizaciones : localizacionesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countGestin_de_contenidos_pane = async (filter) =>{
  try {
    const gestin_de_contenidos_paneCnt =  await dbService.count(Gestin_de_contenidos_pane,filter);
    return { gestin_de_contenidos_pane : gestin_de_contenidos_paneCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countGalder_a = async (filter) =>{
  try {
    const galder_aCnt =  await dbService.count(Galder_a,filter);
    return { galder_a : galder_aCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countFotos = async (filter) =>{
  try {
    const fotosCnt =  await dbService.count(Fotos,filter);
    return { fotos : fotosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countFotoobra = async (filter) =>{
  try {
    const fotoobraCnt =  await dbService.count(Fotoobra,filter);
    return { fotoobra : fotoobraCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countFaq = async (filter) =>{
  try {
    const faqCnt =  await dbService.count(Faq,filter);
    return { faq : faqCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countFailed_jobs = async (filter) =>{
  try {
    const failed_jobsCnt =  await dbService.count(Failed_jobs,filter);
    return { failed_jobs : failed_jobsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countEventos = async (filter) =>{
  try {
    const eventosCnt =  await dbService.count(Eventos,filter);
    return { eventos : eventosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countEnlaces = async (filter) =>{
  try {
    const enlacesCnt =  await dbService.count(Enlaces,filter);
    return { enlaces : enlacesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countEnergia = async (filter) =>{
  try {
    const energiaCnt =  await dbService.count(Energia,filter);
    return { energia : energiaCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countEdificios = async (filter) =>{
  try {
    const edificiosCnt =  await dbService.count(Edificios,filter);
    return { edificios : edificiosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countDocumentos = async (filter) =>{
  try {
    const documentosCnt =  await dbService.count(Documentos,filter);
    return { documentos : documentosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countDepartamentos = async (filter) =>{
  try {
    const departamentosCnt =  await dbService.count(Departamentos,filter);
    return { departamentos : departamentosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCondiciones = async (filter) =>{
  try {
    const condicionesCnt =  await dbService.count(Condiciones,filter);
    return { condiciones : condicionesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countConcejales = async (filter) =>{
  try {
    const concejalesCnt =  await dbService.count(Concejales,filter);
    return { concejales : concejalesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countComunicaciones = async (filter) =>{
  try {
    const comunicacionesCnt =  await dbService.count(Comunicaciones,filter);
    return { comunicaciones : comunicacionesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countComercios = async (filter) =>{
  try {
    const comerciosCnt =  await dbService.count(Comercios,filter);
    return { comercios : comerciosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countClientes = async (filter) =>{
  try {
    const clientesCnt =  await dbService.count(Clientes,filter);
    return { clientes : clientesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCategories = async (filter) =>{
  try {
    const categoriesCnt =  await dbService.count(Categories,filter);
    return { categories : categoriesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCatalogos = async (filter) =>{
  try {
    const catalogosCnt =  await dbService.count(Catalogos,filter);
    return { catalogos : catalogosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countArtistas_obras = async (filter) =>{
  try {
    const artistas_obrasCnt =  await dbService.count(Artistas_obras,filter);
    return { artistas_obras : artistas_obrasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countArtistas = async (filter) =>{
  try {
    const artistasCnt =  await dbService.count(Artistas,filter);
    return { artistas : artistasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countArticle_tag = async (filter) =>{
  try {
    const article_tagCnt =  await dbService.count(Article_tag,filter);
    return { article_tag : article_tagCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countArticles = async (filter) =>{
  try {
    const articlesCnt =  await dbService.count(Articles,filter);
    return { articles : articlesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countApartespacios = async (filter) =>{
  try {
    const apartespaciosCnt =  await dbService.count(Apartespacios,filter);
    return { apartespacios : apartespaciosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAna_gestin = async (filter) =>{
  try {
    const ana_gestinCnt =  await dbService.count(Ana_gestin,filter);
    return { ana_gestin : ana_gestinCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAlejandro = async (filter) =>{
  try {
    const alejandroCnt =  await dbService.count(Alejandro,filter);
    return { alejandro : alejandroCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAdmin_user_tenancy = async (filter) =>{
  try {
    const admin_user_tenancyCnt =  await dbService.count(Admin_user_tenancy,filter);
    return { admin_user_tenancy : admin_user_tenancyCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAdmin_user_role = async (filter) =>{
  try {
    const admin_user_roleCnt =  await dbService.count(Admin_user_role,filter);
    return { admin_user_role : admin_user_roleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAdmin_users = async (filter) =>{
  try {
    const admin_usersCnt =  await dbService.count(Admin_users,filter);
    return { admin_users : admin_usersCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAdmin_teams = async (filter) =>{
  try {
    const admin_teamsCnt =  await dbService.count(Admin_teams,filter);
    return { admin_teams : admin_teamsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAdmin_role_permission = async (filter) =>{
  try {
    const admin_role_permissionCnt =  await dbService.count(Admin_role_permission,filter);
    return { admin_role_permission : admin_role_permissionCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAdmin_roles = async (filter) =>{
  try {
    const admin_rolesCnt =  await dbService.count(Admin_roles,filter);
    return { admin_roles : admin_rolesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAdmin_permissions = async (filter) =>{
  try {
    const admin_permissionsCnt =  await dbService.count(Admin_permissions,filter);
    return { admin_permissions : admin_permissionsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAdmin_auditable_logs = async (filter) =>{
  try {
    const admin_auditable_logsCnt =  await dbService.count(Admin_auditable_logs,filter);
    return { admin_auditable_logs : admin_auditable_logsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countObra = async (filter) =>{
  try {
    const obraCnt =  await dbService.count(Obra,filter);
    return { obra : obraCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const usersFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const usersCnt =  await dbService.count(Users,usersFilter);

      const tipos_documentosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const tipos_documentosCnt =  await dbService.count(Tipos_documentos,tipos_documentosFilter);

      const tagsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const tagsCnt =  await dbService.count(Tags,tagsFilter);

      const serviciosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const serviciosCnt =  await dbService.count(Servicios,serviciosFilter);

      const secciones_webFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const secciones_webCnt =  await dbService.count(Secciones_web,secciones_webFilter);

      const rolesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const rolesCnt =  await dbService.count(Roles,rolesFilter);

      const reservasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const reservasCnt =  await dbService.count(Reservas,reservasFilter);

      const propiedadesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const propiedadesCnt =  await dbService.count(Propiedades,propiedadesFilter);

      const portfoliosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const portfoliosCnt =  await dbService.count(Portfolios,portfoliosFilter);

      const personal_access_tokensFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const personal_access_tokensCnt =  await dbService.count(Personal_access_tokens,personal_access_tokensFilter);

      const patrick_tecnologaFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const patrick_tecnologaCnt =  await dbService.count(Patrick_tecnologa,patrick_tecnologaFilter);

      const password_reset_tokensFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const password_reset_tokensCnt =  await dbService.count(Password_reset_tokens,password_reset_tokensFilter);

      const password_resetsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const password_resetsCnt =  await dbService.count(Password_resets,password_resetsFilter);

      const panelesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const panelesCnt =  await dbService.count(Paneles,panelesFilter);

      const paginasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const paginasCnt =  await dbService.count(Paginas,paginasFilter);

      const pagesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const pagesCnt =  await dbService.count(Pages,pagesFilter);

      const pagebuilder__uploadsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const pagebuilder__uploadsCnt =  await dbService.count(Pagebuilder__uploads,pagebuilder__uploadsFilter);

      const pagebuilder__settingsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const pagebuilder__settingsCnt =  await dbService.count(Pagebuilder__settings,pagebuilder__settingsFilter);

      const pagebuilder__page_translationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const pagebuilder__page_translationsCnt =  await dbService.count(Pagebuilder__page_translations,pagebuilder__page_translationsFilter);

      const pagebuilder__pagesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const pagebuilder__pagesCnt =  await dbService.count(Pagebuilder__pages,pagebuilder__pagesFilter);

      const obras_localizaciones_aFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obras_localizaciones_aCnt =  await dbService.count(Obras_localizaciones_a,obras_localizaciones_aFilter);

      const obras_localizacionesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obras_localizacionesCnt =  await dbService.count(Obras_localizaciones,obras_localizacionesFilter);

      const obras_fotosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obras_fotosCnt =  await dbService.count(Obras_fotos,obras_fotosFilter);

      const obras_documentosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obras_documentosCnt =  await dbService.count(Obras_documentos,obras_documentosFilter);

      const obras_disciplinasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obras_disciplinasCnt =  await dbService.count(Obras_disciplinas,obras_disciplinasFilter);

      const obras_artistasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obras_artistasCnt =  await dbService.count(Obras_artistas,obras_artistasFilter);

      const obras_aFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obras_aCnt =  await dbService.count(Obras_a,obras_aFilter);

      const obrasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obrasCnt =  await dbService.count(Obras,obrasFilter);

      const noticiasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const noticiasCnt =  await dbService.count(Noticias,noticiasFilter);

      const migrationsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const migrationsCnt =  await dbService.count(Migrations,migrationsFilter);

      const localizaciones_obrasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const localizaciones_obrasCnt =  await dbService.count(Localizaciones_obras,localizaciones_obrasFilter);

      const localizacionesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const localizacionesCnt =  await dbService.count(Localizaciones,localizacionesFilter);

      const gestin_de_contenidos_paneFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const gestin_de_contenidos_paneCnt =  await dbService.count(Gestin_de_contenidos_pane,gestin_de_contenidos_paneFilter);

      const galder_aFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const galder_aCnt =  await dbService.count(Galder_a,galder_aFilter);

      const fotosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const fotosCnt =  await dbService.count(Fotos,fotosFilter);

      const fotoobraFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const fotoobraCnt =  await dbService.count(Fotoobra,fotoobraFilter);

      const faqFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const faqCnt =  await dbService.count(Faq,faqFilter);

      const failed_jobsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const failed_jobsCnt =  await dbService.count(Failed_jobs,failed_jobsFilter);

      const eventosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const eventosCnt =  await dbService.count(Eventos,eventosFilter);

      const enlacesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const enlacesCnt =  await dbService.count(Enlaces,enlacesFilter);

      const energiaFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const energiaCnt =  await dbService.count(Energia,energiaFilter);

      const edificiosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const edificiosCnt =  await dbService.count(Edificios,edificiosFilter);

      const documentosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const documentosCnt =  await dbService.count(Documentos,documentosFilter);

      const departamentosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const departamentosCnt =  await dbService.count(Departamentos,departamentosFilter);

      const condicionesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const condicionesCnt =  await dbService.count(Condiciones,condicionesFilter);

      const concejalesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const concejalesCnt =  await dbService.count(Concejales,concejalesFilter);

      const comunicacionesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const comunicacionesCnt =  await dbService.count(Comunicaciones,comunicacionesFilter);

      const comerciosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const comerciosCnt =  await dbService.count(Comercios,comerciosFilter);

      const clientesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const clientesCnt =  await dbService.count(Clientes,clientesFilter);

      const categoriesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const categoriesCnt =  await dbService.count(Categories,categoriesFilter);

      const catalogosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const catalogosCnt =  await dbService.count(Catalogos,catalogosFilter);

      const artistas_obrasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const artistas_obrasCnt =  await dbService.count(Artistas_obras,artistas_obrasFilter);

      const artistasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const artistasCnt =  await dbService.count(Artistas,artistasFilter);

      const article_tagFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const article_tagCnt =  await dbService.count(Article_tag,article_tagFilter);

      const articlesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const articlesCnt =  await dbService.count(Articles,articlesFilter);

      const apartespaciosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const apartespaciosCnt =  await dbService.count(Apartespacios,apartespaciosFilter);

      const ana_gestinFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ana_gestinCnt =  await dbService.count(Ana_gestin,ana_gestinFilter);

      const alejandroFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const alejandroCnt =  await dbService.count(Alejandro,alejandroFilter);

      const admin_user_tenancyFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_user_tenancyCnt =  await dbService.count(Admin_user_tenancy,admin_user_tenancyFilter);

      const admin_user_roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_user_roleCnt =  await dbService.count(Admin_user_role,admin_user_roleFilter);

      const admin_usersFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_usersCnt =  await dbService.count(Admin_users,admin_usersFilter);

      const admin_teamsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_teamsCnt =  await dbService.count(Admin_teams,admin_teamsFilter);

      const admin_role_permissionFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_role_permissionCnt =  await dbService.count(Admin_role_permission,admin_role_permissionFilter);

      const admin_rolesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_rolesCnt =  await dbService.count(Admin_roles,admin_rolesFilter);

      const admin_permissionsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_permissionsCnt =  await dbService.count(Admin_permissions,admin_permissionsFilter);

      const admin_auditable_logsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const admin_auditable_logsCnt =  await dbService.count(Admin_auditable_logs,admin_auditable_logsFilter);

      const obraFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const obraCnt =  await dbService.count(Obra,obraFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const disciplinasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const disciplinasCnt =  await dbService.count(Disciplinas,disciplinasFilter);

      const taskFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const taskCnt =  await dbService.count(Task,taskFilter);

      const tagFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const tagCnt =  await dbService.count(Tag,tagFilter);

      const task_tagFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const task_tagCnt =  await dbService.count(Task_tag,task_tagFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        users : usersCnt,
        tipos_documentos : tipos_documentosCnt,
        tags : tagsCnt,
        servicios : serviciosCnt,
        secciones_web : secciones_webCnt,
        roles : rolesCnt,
        reservas : reservasCnt,
        propiedades : propiedadesCnt,
        portfolios : portfoliosCnt,
        personal_access_tokens : personal_access_tokensCnt,
        patrick_tecnologa : patrick_tecnologaCnt,
        password_reset_tokens : password_reset_tokensCnt,
        password_resets : password_resetsCnt,
        paneles : panelesCnt,
        paginas : paginasCnt,
        pages : pagesCnt,
        pagebuilder__uploads : pagebuilder__uploadsCnt,
        pagebuilder__settings : pagebuilder__settingsCnt,
        pagebuilder__page_translations : pagebuilder__page_translationsCnt,
        pagebuilder__pages : pagebuilder__pagesCnt,
        obras_localizaciones_a : obras_localizaciones_aCnt,
        obras_localizaciones : obras_localizacionesCnt,
        obras_fotos : obras_fotosCnt,
        obras_documentos : obras_documentosCnt,
        obras_disciplinas : obras_disciplinasCnt,
        obras_artistas : obras_artistasCnt,
        obras_a : obras_aCnt,
        obras : obrasCnt,
        noticias : noticiasCnt,
        migrations : migrationsCnt,
        localizaciones_obras : localizaciones_obrasCnt,
        localizaciones : localizacionesCnt,
        gestin_de_contenidos_pane : gestin_de_contenidos_paneCnt,
        galder_a : galder_aCnt,
        fotos : fotosCnt,
        fotoobra : fotoobraCnt,
        faq : faqCnt,
        failed_jobs : failed_jobsCnt,
        eventos : eventosCnt,
        enlaces : enlacesCnt,
        energia : energiaCnt,
        edificios : edificiosCnt,
        documentos : documentosCnt,
        departamentos : departamentosCnt,
        condiciones : condicionesCnt,
        concejales : concejalesCnt,
        comunicaciones : comunicacionesCnt,
        comercios : comerciosCnt,
        clientes : clientesCnt,
        categories : categoriesCnt,
        catalogos : catalogosCnt,
        artistas_obras : artistas_obrasCnt,
        artistas : artistasCnt,
        article_tag : article_tagCnt,
        articles : articlesCnt,
        apartespacios : apartespaciosCnt,
        ana_gestin : ana_gestinCnt,
        alejandro : alejandroCnt,
        admin_user_tenancy : admin_user_tenancyCnt,
        admin_user_role : admin_user_roleCnt,
        admin_users : admin_usersCnt,
        admin_teams : admin_teamsCnt,
        admin_role_permission : admin_role_permissionCnt,
        admin_roles : admin_rolesCnt,
        admin_permissions : admin_permissionsCnt,
        admin_auditable_logs : admin_auditable_logsCnt,
        obra : obraCnt,
        user : userCnt,
        disciplinas : disciplinasCnt,
        task : taskCnt,
        tag : tagCnt,
        task_tag : task_tagCnt,
        userAuthSettings : userAuthSettingsCnt,
        userTokens : userTokensCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countDisciplinas = async (filter) =>{
  try {
    let disciplinas = await dbService.findAll(Disciplinas,filter);
    if (disciplinas && disciplinas.length){
      disciplinas = disciplinas.map((obj) => obj.id);

      const taskFilter = { $or: [{ categoryId : { $in : disciplinas } }] };
      const taskCnt =  await dbService.count(Task,taskFilter);

      let response = { task : taskCnt, };
      return response; 
    } else {
      return {  disciplinas : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countTask = async (filter) =>{
  try {
    let task = await dbService.findAll(Task,filter);
    if (task && task.length){
      task = task.map((obj) => obj.id);

      const taskFilter = { $or: [{ parentId : { $in : task } }] };
      const taskCnt =  await dbService.count(Task,taskFilter);

      const task_tagFilter = { $or: [{ taskId : { $in : task } }] };
      const task_tagCnt =  await dbService.count(Task_tag,task_tagFilter);

      let response = {
        task : taskCnt,
        task_tag : task_tagCnt,
      };
      return response; 
    } else {
      return {  task : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countTag = async (filter) =>{
  try {
    let tag = await dbService.findAll(Tag,filter);
    if (tag && tag.length){
      tag = tag.map((obj) => obj.id);

      const task_tagFilter = { $or: [{ tagId : { $in : tag } }] };
      const task_tagCnt =  await dbService.count(Task_tag,task_tagFilter);

      let response = { task_tag : task_tagCnt, };
      return response; 
    } else {
      return {  tag : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countTask_tag = async (filter) =>{
  try {
    const task_tagCnt =  await dbService.count(Task_tag,filter);
    return { task_tag : task_tagCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserAuthSettings = async (filter) =>{
  try {
    const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUsers = async (filter,updateBody) =>{  
  try {
    const usersCnt =  await dbService.update(Users,filter);
    return { users : usersCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTipos_documentos = async (filter,updateBody) =>{  
  try {
    const tipos_documentosCnt =  await dbService.update(Tipos_documentos,filter);
    return { tipos_documentos : tipos_documentosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTags = async (filter,updateBody) =>{  
  try {
    const tagsCnt =  await dbService.update(Tags,filter);
    return { tags : tagsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteServicios = async (filter,updateBody) =>{  
  try {
    const serviciosCnt =  await dbService.update(Servicios,filter);
    return { servicios : serviciosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteSecciones_web = async (filter,updateBody) =>{  
  try {
    const secciones_webCnt =  await dbService.update(Secciones_web,filter);
    return { secciones_web : secciones_webCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRoles = async (filter,updateBody) =>{  
  try {
    const rolesCnt =  await dbService.update(Roles,filter);
    return { roles : rolesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteReservas = async (filter,updateBody) =>{  
  try {
    const reservasCnt =  await dbService.update(Reservas,filter);
    return { reservas : reservasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePropiedades = async (filter,updateBody) =>{  
  try {
    const propiedadesCnt =  await dbService.update(Propiedades,filter);
    return { propiedades : propiedadesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePortfolios = async (filter,updateBody) =>{  
  try {
    const portfoliosCnt =  await dbService.update(Portfolios,filter);
    return { portfolios : portfoliosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePersonal_access_tokens = async (filter,updateBody) =>{  
  try {
    const personal_access_tokensCnt =  await dbService.update(Personal_access_tokens,filter);
    return { personal_access_tokens : personal_access_tokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePatrick_tecnologa = async (filter,updateBody) =>{  
  try {
    const patrick_tecnologaCnt =  await dbService.update(Patrick_tecnologa,filter);
    return { patrick_tecnologa : patrick_tecnologaCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePassword_reset_tokens = async (filter,updateBody) =>{  
  try {
    const password_reset_tokensCnt =  await dbService.update(Password_reset_tokens,filter);
    return { password_reset_tokens : password_reset_tokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePassword_resets = async (filter,updateBody) =>{  
  try {
    const password_resetsCnt =  await dbService.update(Password_resets,filter);
    return { password_resets : password_resetsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePaneles = async (filter,updateBody) =>{  
  try {
    const panelesCnt =  await dbService.update(Paneles,filter);
    return { paneles : panelesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePaginas = async (filter,updateBody) =>{  
  try {
    const paginasCnt =  await dbService.update(Paginas,filter);
    return { paginas : paginasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePages = async (filter,updateBody) =>{  
  try {
    const pagesCnt =  await dbService.update(Pages,filter);
    return { pages : pagesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePagebuilder__uploads = async (filter,updateBody) =>{  
  try {
    const pagebuilder__uploadsCnt =  await dbService.update(Pagebuilder__uploads,filter);
    return { pagebuilder__uploads : pagebuilder__uploadsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePagebuilder__settings = async (filter,updateBody) =>{  
  try {
    const pagebuilder__settingsCnt =  await dbService.update(Pagebuilder__settings,filter);
    return { pagebuilder__settings : pagebuilder__settingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePagebuilder__page_translations = async (filter,updateBody) =>{  
  try {
    const pagebuilder__page_translationsCnt =  await dbService.update(Pagebuilder__page_translations,filter);
    return { pagebuilder__page_translations : pagebuilder__page_translationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePagebuilder__pages = async (filter,updateBody) =>{  
  try {
    const pagebuilder__pagesCnt =  await dbService.update(Pagebuilder__pages,filter);
    return { pagebuilder__pages : pagebuilder__pagesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteObras_localizaciones_a = async (filter,updateBody) =>{  
  try {
    const obras_localizaciones_aCnt =  await dbService.update(Obras_localizaciones_a,filter);
    return { obras_localizaciones_a : obras_localizaciones_aCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteObras_localizaciones = async (filter,updateBody) =>{  
  try {
    const obras_localizacionesCnt =  await dbService.update(Obras_localizaciones,filter);
    return { obras_localizaciones : obras_localizacionesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteObras_fotos = async (filter,updateBody) =>{  
  try {
    const obras_fotosCnt =  await dbService.update(Obras_fotos,filter);
    return { obras_fotos : obras_fotosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteObras_documentos = async (filter,updateBody) =>{  
  try {
    const obras_documentosCnt =  await dbService.update(Obras_documentos,filter);
    return { obras_documentos : obras_documentosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteObras_disciplinas = async (filter,updateBody) =>{  
  try {
    const obras_disciplinasCnt =  await dbService.update(Obras_disciplinas,filter);
    return { obras_disciplinas : obras_disciplinasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteObras_artistas = async (filter,updateBody) =>{  
  try {
    const obras_artistasCnt =  await dbService.update(Obras_artistas,filter);
    return { obras_artistas : obras_artistasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteObras_a = async (filter,updateBody) =>{  
  try {
    const obras_aCnt =  await dbService.update(Obras_a,filter);
    return { obras_a : obras_aCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteObras = async (filter,updateBody) =>{  
  try {
    const obrasCnt =  await dbService.update(Obras,filter);
    return { obras : obrasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteNoticias = async (filter,updateBody) =>{  
  try {
    const noticiasCnt =  await dbService.update(Noticias,filter);
    return { noticias : noticiasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMigrations = async (filter,updateBody) =>{  
  try {
    const migrationsCnt =  await dbService.update(Migrations,filter);
    return { migrations : migrationsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteLocalizaciones_obras = async (filter,updateBody) =>{  
  try {
    const localizaciones_obrasCnt =  await dbService.update(Localizaciones_obras,filter);
    return { localizaciones_obras : localizaciones_obrasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteLocalizaciones = async (filter,updateBody) =>{  
  try {
    const localizacionesCnt =  await dbService.update(Localizaciones,filter);
    return { localizaciones : localizacionesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteGestin_de_contenidos_pane = async (filter,updateBody) =>{  
  try {
    const gestin_de_contenidos_paneCnt =  await dbService.update(Gestin_de_contenidos_pane,filter);
    return { gestin_de_contenidos_pane : gestin_de_contenidos_paneCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteGalder_a = async (filter,updateBody) =>{  
  try {
    const galder_aCnt =  await dbService.update(Galder_a,filter);
    return { galder_a : galder_aCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteFotos = async (filter,updateBody) =>{  
  try {
    const fotosCnt =  await dbService.update(Fotos,filter);
    return { fotos : fotosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteFotoobra = async (filter,updateBody) =>{  
  try {
    const fotoobraCnt =  await dbService.update(Fotoobra,filter);
    return { fotoobra : fotoobraCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteFaq = async (filter,updateBody) =>{  
  try {
    const faqCnt =  await dbService.update(Faq,filter);
    return { faq : faqCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteFailed_jobs = async (filter,updateBody) =>{  
  try {
    const failed_jobsCnt =  await dbService.update(Failed_jobs,filter);
    return { failed_jobs : failed_jobsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEventos = async (filter,updateBody) =>{  
  try {
    const eventosCnt =  await dbService.update(Eventos,filter);
    return { eventos : eventosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEnlaces = async (filter,updateBody) =>{  
  try {
    const enlacesCnt =  await dbService.update(Enlaces,filter);
    return { enlaces : enlacesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEnergia = async (filter,updateBody) =>{  
  try {
    const energiaCnt =  await dbService.update(Energia,filter);
    return { energia : energiaCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEdificios = async (filter,updateBody) =>{  
  try {
    const edificiosCnt =  await dbService.update(Edificios,filter);
    return { edificios : edificiosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteDocumentos = async (filter,updateBody) =>{  
  try {
    const documentosCnt =  await dbService.update(Documentos,filter);
    return { documentos : documentosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteDepartamentos = async (filter,updateBody) =>{  
  try {
    const departamentosCnt =  await dbService.update(Departamentos,filter);
    return { departamentos : departamentosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCondiciones = async (filter,updateBody) =>{  
  try {
    const condicionesCnt =  await dbService.update(Condiciones,filter);
    return { condiciones : condicionesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteConcejales = async (filter,updateBody) =>{  
  try {
    const concejalesCnt =  await dbService.update(Concejales,filter);
    return { concejales : concejalesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteComunicaciones = async (filter,updateBody) =>{  
  try {
    const comunicacionesCnt =  await dbService.update(Comunicaciones,filter);
    return { comunicaciones : comunicacionesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteComercios = async (filter,updateBody) =>{  
  try {
    const comerciosCnt =  await dbService.update(Comercios,filter);
    return { comercios : comerciosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteClientes = async (filter,updateBody) =>{  
  try {
    const clientesCnt =  await dbService.update(Clientes,filter);
    return { clientes : clientesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCategories = async (filter,updateBody) =>{  
  try {
    const categoriesCnt =  await dbService.update(Categories,filter);
    return { categories : categoriesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCatalogos = async (filter,updateBody) =>{  
  try {
    const catalogosCnt =  await dbService.update(Catalogos,filter);
    return { catalogos : catalogosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteArtistas_obras = async (filter,updateBody) =>{  
  try {
    const artistas_obrasCnt =  await dbService.update(Artistas_obras,filter);
    return { artistas_obras : artistas_obrasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteArtistas = async (filter,updateBody) =>{  
  try {
    const artistasCnt =  await dbService.update(Artistas,filter);
    return { artistas : artistasCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteArticle_tag = async (filter,updateBody) =>{  
  try {
    const article_tagCnt =  await dbService.update(Article_tag,filter);
    return { article_tag : article_tagCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteArticles = async (filter,updateBody) =>{  
  try {
    const articlesCnt =  await dbService.update(Articles,filter);
    return { articles : articlesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteApartespacios = async (filter,updateBody) =>{  
  try {
    const apartespaciosCnt =  await dbService.update(Apartespacios,filter);
    return { apartespacios : apartespaciosCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAna_gestin = async (filter,updateBody) =>{  
  try {
    const ana_gestinCnt =  await dbService.update(Ana_gestin,filter);
    return { ana_gestin : ana_gestinCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAlejandro = async (filter,updateBody) =>{  
  try {
    const alejandroCnt =  await dbService.update(Alejandro,filter);
    return { alejandro : alejandroCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAdmin_user_tenancy = async (filter,updateBody) =>{  
  try {
    const admin_user_tenancyCnt =  await dbService.update(Admin_user_tenancy,filter);
    return { admin_user_tenancy : admin_user_tenancyCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAdmin_user_role = async (filter,updateBody) =>{  
  try {
    const admin_user_roleCnt =  await dbService.update(Admin_user_role,filter);
    return { admin_user_role : admin_user_roleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAdmin_users = async (filter,updateBody) =>{  
  try {
    const admin_usersCnt =  await dbService.update(Admin_users,filter);
    return { admin_users : admin_usersCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAdmin_teams = async (filter,updateBody) =>{  
  try {
    const admin_teamsCnt =  await dbService.update(Admin_teams,filter);
    return { admin_teams : admin_teamsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAdmin_role_permission = async (filter,updateBody) =>{  
  try {
    const admin_role_permissionCnt =  await dbService.update(Admin_role_permission,filter);
    return { admin_role_permission : admin_role_permissionCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAdmin_roles = async (filter,updateBody) =>{  
  try {
    const admin_rolesCnt =  await dbService.update(Admin_roles,filter);
    return { admin_roles : admin_rolesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAdmin_permissions = async (filter,updateBody) =>{  
  try {
    const admin_permissionsCnt =  await dbService.update(Admin_permissions,filter);
    return { admin_permissions : admin_permissionsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAdmin_auditable_logs = async (filter,updateBody) =>{  
  try {
    const admin_auditable_logsCnt =  await dbService.update(Admin_auditable_logs,filter);
    return { admin_auditable_logs : admin_auditable_logsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteObra = async (filter,updateBody) =>{  
  try {
    const obraCnt =  await dbService.update(Obra,filter);
    return { obra : obraCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findAll(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const usersFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const usersCnt = await dbService.update(Users,usersFilter,updateBody);

      const tipos_documentosFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const tipos_documentosCnt = await dbService.update(Tipos_documentos,tipos_documentosFilter,updateBody);

      const tagsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const tagsCnt = await dbService.update(Tags,tagsFilter,updateBody);

      const serviciosFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const serviciosCnt = await dbService.update(Servicios,serviciosFilter,updateBody);

      const secciones_webFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const secciones_webCnt = await dbService.update(Secciones_web,secciones_webFilter,updateBody);

      const rolesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const rolesCnt = await dbService.update(Roles,rolesFilter,updateBody);

      const reservasFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const reservasCnt = await dbService.update(Reservas,reservasFilter,updateBody);

      const propiedadesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const propiedadesCnt = await dbService.update(Propiedades,propiedadesFilter,updateBody);

      const portfoliosFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const portfoliosCnt = await dbService.update(Portfolios,portfoliosFilter,updateBody);

      const personal_access_tokensFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const personal_access_tokensCnt = await dbService.update(Personal_access_tokens,personal_access_tokensFilter,updateBody);

      const patrick_tecnologaFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const patrick_tecnologaCnt = await dbService.update(Patrick_tecnologa,patrick_tecnologaFilter,updateBody);

      const password_reset_tokensFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const password_reset_tokensCnt = await dbService.update(Password_reset_tokens,password_reset_tokensFilter,updateBody);

      const password_resetsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const password_resetsCnt = await dbService.update(Password_resets,password_resetsFilter,updateBody);

      const panelesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const panelesCnt = await dbService.update(Paneles,panelesFilter,updateBody);

      const paginasFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const paginasCnt = await dbService.update(Paginas,paginasFilter,updateBody);

      const pagesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const pagesCnt = await dbService.update(Pages,pagesFilter,updateBody);

      const pagebuilder__uploadsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const pagebuilder__uploadsCnt = await dbService.update(Pagebuilder__uploads,pagebuilder__uploadsFilter,updateBody);

      const pagebuilder__settingsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const pagebuilder__settingsCnt = await dbService.update(Pagebuilder__settings,pagebuilder__settingsFilter,updateBody);

      const pagebuilder__page_translationsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const pagebuilder__page_translationsCnt = await dbService.update(Pagebuilder__page_translations,pagebuilder__page_translationsFilter,updateBody);

      const pagebuilder__pagesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const pagebuilder__pagesCnt = await dbService.update(Pagebuilder__pages,pagebuilder__pagesFilter,updateBody);

      const obras_localizaciones_aFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const obras_localizaciones_aCnt = await dbService.update(Obras_localizaciones_a,obras_localizaciones_aFilter,updateBody);

      const obras_localizacionesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const obras_localizacionesCnt = await dbService.update(Obras_localizaciones,obras_localizacionesFilter,updateBody);

      const obras_fotosFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const obras_fotosCnt = await dbService.update(Obras_fotos,obras_fotosFilter,updateBody);

      const obras_documentosFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const obras_documentosCnt = await dbService.update(Obras_documentos,obras_documentosFilter,updateBody);

      const obras_disciplinasFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const obras_disciplinasCnt = await dbService.update(Obras_disciplinas,obras_disciplinasFilter,updateBody);

      const obras_artistasFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const obras_artistasCnt = await dbService.update(Obras_artistas,obras_artistasFilter,updateBody);

      const obras_aFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const obras_aCnt = await dbService.update(Obras_a,obras_aFilter,updateBody);

      const obrasFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const obrasCnt = await dbService.update(Obras,obrasFilter,updateBody);

      const noticiasFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const noticiasCnt = await dbService.update(Noticias,noticiasFilter,updateBody);

      const migrationsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const migrationsCnt = await dbService.update(Migrations,migrationsFilter,updateBody);

      const localizaciones_obrasFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const localizaciones_obrasCnt = await dbService.update(Localizaciones_obras,localizaciones_obrasFilter,updateBody);

      const localizacionesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const localizacionesCnt = await dbService.update(Localizaciones,localizacionesFilter,updateBody);

      const gestin_de_contenidos_paneFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const gestin_de_contenidos_paneCnt = await dbService.update(Gestin_de_contenidos_pane,gestin_de_contenidos_paneFilter,updateBody);

      const galder_aFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const galder_aCnt = await dbService.update(Galder_a,galder_aFilter,updateBody);

      const fotosFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const fotosCnt = await dbService.update(Fotos,fotosFilter,updateBody);

      const fotoobraFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const fotoobraCnt = await dbService.update(Fotoobra,fotoobraFilter,updateBody);

      const faqFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const faqCnt = await dbService.update(Faq,faqFilter,updateBody);

      const failed_jobsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const failed_jobsCnt = await dbService.update(Failed_jobs,failed_jobsFilter,updateBody);

      const eventosFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const eventosCnt = await dbService.update(Eventos,eventosFilter,updateBody);

      const enlacesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const enlacesCnt = await dbService.update(Enlaces,enlacesFilter,updateBody);

      const energiaFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const energiaCnt = await dbService.update(Energia,energiaFilter,updateBody);

      const edificiosFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const edificiosCnt = await dbService.update(Edificios,edificiosFilter,updateBody);

      const documentosFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const documentosCnt = await dbService.update(Documentos,documentosFilter,updateBody);

      const departamentosFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const departamentosCnt = await dbService.update(Departamentos,departamentosFilter,updateBody);

      const condicionesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const condicionesCnt = await dbService.update(Condiciones,condicionesFilter,updateBody);

      const concejalesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const concejalesCnt = await dbService.update(Concejales,concejalesFilter,updateBody);

      const comunicacionesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const comunicacionesCnt = await dbService.update(Comunicaciones,comunicacionesFilter,updateBody);

      const comerciosFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const comerciosCnt = await dbService.update(Comercios,comerciosFilter,updateBody);

      const clientesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const clientesCnt = await dbService.update(Clientes,clientesFilter,updateBody);

      const categoriesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const categoriesCnt = await dbService.update(Categories,categoriesFilter,updateBody);

      const catalogosFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const catalogosCnt = await dbService.update(Catalogos,catalogosFilter,updateBody);

      const artistas_obrasFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const artistas_obrasCnt = await dbService.update(Artistas_obras,artistas_obrasFilter,updateBody);

      const artistasFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const artistasCnt = await dbService.update(Artistas,artistasFilter,updateBody);

      const article_tagFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const article_tagCnt = await dbService.update(Article_tag,article_tagFilter,updateBody);

      const articlesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const articlesCnt = await dbService.update(Articles,articlesFilter,updateBody);

      const apartespaciosFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const apartespaciosCnt = await dbService.update(Apartespacios,apartespaciosFilter,updateBody);

      const ana_gestinFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const ana_gestinCnt = await dbService.update(Ana_gestin,ana_gestinFilter,updateBody);

      const alejandroFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const alejandroCnt = await dbService.update(Alejandro,alejandroFilter,updateBody);

      const admin_user_tenancyFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const admin_user_tenancyCnt = await dbService.update(Admin_user_tenancy,admin_user_tenancyFilter,updateBody);

      const admin_user_roleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const admin_user_roleCnt = await dbService.update(Admin_user_role,admin_user_roleFilter,updateBody);

      const admin_usersFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const admin_usersCnt = await dbService.update(Admin_users,admin_usersFilter,updateBody);

      const admin_teamsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const admin_teamsCnt = await dbService.update(Admin_teams,admin_teamsFilter,updateBody);

      const admin_role_permissionFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const admin_role_permissionCnt = await dbService.update(Admin_role_permission,admin_role_permissionFilter,updateBody);

      const admin_rolesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const admin_rolesCnt = await dbService.update(Admin_roles,admin_rolesFilter,updateBody);

      const admin_permissionsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const admin_permissionsCnt = await dbService.update(Admin_permissions,admin_permissionsFilter,updateBody);

      const admin_auditable_logsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const admin_auditable_logsCnt = await dbService.update(Admin_auditable_logs,admin_auditable_logsFilter,updateBody);

      const obraFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const obraCnt = await dbService.update(Obra,obraFilter,updateBody);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.update(User,userFilter,updateBody);

      const disciplinasFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const disciplinasCnt = await dbService.update(Disciplinas,disciplinasFilter,updateBody);

      const taskFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const taskCnt = await dbService.update(Task,taskFilter,updateBody);

      const tagFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const tagCnt = await dbService.update(Tag,tagFilter,updateBody);

      const task_tagFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const task_tagCnt = await dbService.update(Task_tag,task_tagFilter,updateBody);

      const userAuthSettingsFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userAuthSettingsCnt = await dbService.update(UserAuthSettings,userAuthSettingsFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.update(UserTokens,userTokensFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(User,filter,updateBody);

      let response = {
        users :usersCnt.length,
        tipos_documentos :tipos_documentosCnt.length,
        tags :tagsCnt.length,
        servicios :serviciosCnt.length,
        secciones_web :secciones_webCnt.length,
        roles :rolesCnt.length,
        reservas :reservasCnt.length,
        propiedades :propiedadesCnt.length,
        portfolios :portfoliosCnt.length,
        personal_access_tokens :personal_access_tokensCnt.length,
        patrick_tecnologa :patrick_tecnologaCnt.length,
        password_reset_tokens :password_reset_tokensCnt.length,
        password_resets :password_resetsCnt.length,
        paneles :panelesCnt.length,
        paginas :paginasCnt.length,
        pages :pagesCnt.length,
        pagebuilder__uploads :pagebuilder__uploadsCnt.length,
        pagebuilder__settings :pagebuilder__settingsCnt.length,
        pagebuilder__page_translations :pagebuilder__page_translationsCnt.length,
        pagebuilder__pages :pagebuilder__pagesCnt.length,
        obras_localizaciones_a :obras_localizaciones_aCnt.length,
        obras_localizaciones :obras_localizacionesCnt.length,
        obras_fotos :obras_fotosCnt.length,
        obras_documentos :obras_documentosCnt.length,
        obras_disciplinas :obras_disciplinasCnt.length,
        obras_artistas :obras_artistasCnt.length,
        obras_a :obras_aCnt.length,
        obras :obrasCnt.length,
        noticias :noticiasCnt.length,
        migrations :migrationsCnt.length,
        localizaciones_obras :localizaciones_obrasCnt.length,
        localizaciones :localizacionesCnt.length,
        gestin_de_contenidos_pane :gestin_de_contenidos_paneCnt.length,
        galder_a :galder_aCnt.length,
        fotos :fotosCnt.length,
        fotoobra :fotoobraCnt.length,
        faq :faqCnt.length,
        failed_jobs :failed_jobsCnt.length,
        eventos :eventosCnt.length,
        enlaces :enlacesCnt.length,
        energia :energiaCnt.length,
        edificios :edificiosCnt.length,
        documentos :documentosCnt.length,
        departamentos :departamentosCnt.length,
        condiciones :condicionesCnt.length,
        concejales :concejalesCnt.length,
        comunicaciones :comunicacionesCnt.length,
        comercios :comerciosCnt.length,
        clientes :clientesCnt.length,
        categories :categoriesCnt.length,
        catalogos :catalogosCnt.length,
        artistas_obras :artistas_obrasCnt.length,
        artistas :artistasCnt.length,
        article_tag :article_tagCnt.length,
        articles :articlesCnt.length,
        apartespacios :apartespaciosCnt.length,
        ana_gestin :ana_gestinCnt.length,
        alejandro :alejandroCnt.length,
        admin_user_tenancy :admin_user_tenancyCnt.length,
        admin_user_role :admin_user_roleCnt.length,
        admin_users :admin_usersCnt.length,
        admin_teams :admin_teamsCnt.length,
        admin_role_permission :admin_role_permissionCnt.length,
        admin_roles :admin_rolesCnt.length,
        admin_permissions :admin_permissionsCnt.length,
        admin_auditable_logs :admin_auditable_logsCnt.length,
        obra :obraCnt.length,
        user :userCnt.length + updated.length,
        disciplinas :disciplinasCnt.length,
        task :taskCnt.length,
        tag :tagCnt.length,
        task_tag :task_tagCnt.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteDisciplinas = async (filter,updateBody) =>{  
  try {
    let disciplinas = await dbService.findAll(Disciplinas,filter, { id:1 });
    if (disciplinas.length){
      disciplinas = disciplinas.map((obj) => obj.id);

      const taskFilter = { '$or': [{ categoryId : { '$in' : disciplinas } }] };
      const taskCnt = await dbService.update(Task,taskFilter,updateBody);
      let updated = await dbService.update(Disciplinas,filter,updateBody);

      let response = { task :taskCnt.length, };
      return response;
    } else {
      return {  disciplinas : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTask = async (filter,updateBody) =>{  
  try {
    let task = await dbService.findAll(Task,filter, { id:1 });
    if (task.length){
      task = task.map((obj) => obj.id);

      const taskFilter = { '$or': [{ parentId : { '$in' : task } }] };
      const taskCnt = await dbService.update(Task,taskFilter,updateBody);

      const task_tagFilter = { '$or': [{ taskId : { '$in' : task } }] };
      const task_tagCnt = await dbService.update(Task_tag,task_tagFilter,updateBody);
      let updated = await dbService.update(Task,filter,updateBody);

      let response = {
        task :taskCnt.length + updated.length,
        task_tag :task_tagCnt.length,
      };
      return response;
    } else {
      return {  task : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTag = async (filter,updateBody) =>{  
  try {
    let tag = await dbService.findAll(Tag,filter, { id:1 });
    if (tag.length){
      tag = tag.map((obj) => obj.id);

      const task_tagFilter = { '$or': [{ tagId : { '$in' : tag } }] };
      const task_tagCnt = await dbService.update(Task_tag,task_tagFilter,updateBody);
      let updated = await dbService.update(Tag,filter,updateBody);

      let response = { task_tag :task_tagCnt.length, };
      return response;
    } else {
      return {  tag : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTask_tag = async (filter,updateBody) =>{  
  try {
    const task_tagCnt =  await dbService.update(Task_tag,filter);
    return { task_tag : task_tagCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserAuthSettings = async (filter,updateBody) =>{  
  try {
    const userAuthSettingsCnt =  await dbService.update(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.update(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findAll(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.update(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt.length, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.update(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.update(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteUsers,
  deleteTipos_documentos,
  deleteTags,
  deleteServicios,
  deleteSecciones_web,
  deleteRoles,
  deleteReservas,
  deletePropiedades,
  deletePortfolios,
  deletePersonal_access_tokens,
  deletePatrick_tecnologa,
  deletePassword_reset_tokens,
  deletePassword_resets,
  deletePaneles,
  deletePaginas,
  deletePages,
  deletePagebuilder__uploads,
  deletePagebuilder__settings,
  deletePagebuilder__page_translations,
  deletePagebuilder__pages,
  deleteObras_localizaciones_a,
  deleteObras_localizaciones,
  deleteObras_fotos,
  deleteObras_documentos,
  deleteObras_disciplinas,
  deleteObras_artistas,
  deleteObras_a,
  deleteObras,
  deleteNoticias,
  deleteMigrations,
  deleteLocalizaciones_obras,
  deleteLocalizaciones,
  deleteGestin_de_contenidos_pane,
  deleteGalder_a,
  deleteFotos,
  deleteFotoobra,
  deleteFaq,
  deleteFailed_jobs,
  deleteEventos,
  deleteEnlaces,
  deleteEnergia,
  deleteEdificios,
  deleteDocumentos,
  deleteDepartamentos,
  deleteCondiciones,
  deleteConcejales,
  deleteComunicaciones,
  deleteComercios,
  deleteClientes,
  deleteCategories,
  deleteCatalogos,
  deleteArtistas_obras,
  deleteArtistas,
  deleteArticle_tag,
  deleteArticles,
  deleteApartespacios,
  deleteAna_gestin,
  deleteAlejandro,
  deleteAdmin_user_tenancy,
  deleteAdmin_user_role,
  deleteAdmin_users,
  deleteAdmin_teams,
  deleteAdmin_role_permission,
  deleteAdmin_roles,
  deleteAdmin_permissions,
  deleteAdmin_auditable_logs,
  deleteObra,
  deleteUser,
  deleteDisciplinas,
  deleteTask,
  deleteTag,
  deleteTask_tag,
  deleteUserAuthSettings,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countUsers,
  countTipos_documentos,
  countTags,
  countServicios,
  countSecciones_web,
  countRoles,
  countReservas,
  countPropiedades,
  countPortfolios,
  countPersonal_access_tokens,
  countPatrick_tecnologa,
  countPassword_reset_tokens,
  countPassword_resets,
  countPaneles,
  countPaginas,
  countPages,
  countPagebuilder__uploads,
  countPagebuilder__settings,
  countPagebuilder__page_translations,
  countPagebuilder__pages,
  countObras_localizaciones_a,
  countObras_localizaciones,
  countObras_fotos,
  countObras_documentos,
  countObras_disciplinas,
  countObras_artistas,
  countObras_a,
  countObras,
  countNoticias,
  countMigrations,
  countLocalizaciones_obras,
  countLocalizaciones,
  countGestin_de_contenidos_pane,
  countGalder_a,
  countFotos,
  countFotoobra,
  countFaq,
  countFailed_jobs,
  countEventos,
  countEnlaces,
  countEnergia,
  countEdificios,
  countDocumentos,
  countDepartamentos,
  countCondiciones,
  countConcejales,
  countComunicaciones,
  countComercios,
  countClientes,
  countCategories,
  countCatalogos,
  countArtistas_obras,
  countArtistas,
  countArticle_tag,
  countArticles,
  countApartespacios,
  countAna_gestin,
  countAlejandro,
  countAdmin_user_tenancy,
  countAdmin_user_role,
  countAdmin_users,
  countAdmin_teams,
  countAdmin_role_permission,
  countAdmin_roles,
  countAdmin_permissions,
  countAdmin_auditable_logs,
  countObra,
  countUser,
  countDisciplinas,
  countTask,
  countTag,
  countTask_tag,
  countUserAuthSettings,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteUsers,
  softDeleteTipos_documentos,
  softDeleteTags,
  softDeleteServicios,
  softDeleteSecciones_web,
  softDeleteRoles,
  softDeleteReservas,
  softDeletePropiedades,
  softDeletePortfolios,
  softDeletePersonal_access_tokens,
  softDeletePatrick_tecnologa,
  softDeletePassword_reset_tokens,
  softDeletePassword_resets,
  softDeletePaneles,
  softDeletePaginas,
  softDeletePages,
  softDeletePagebuilder__uploads,
  softDeletePagebuilder__settings,
  softDeletePagebuilder__page_translations,
  softDeletePagebuilder__pages,
  softDeleteObras_localizaciones_a,
  softDeleteObras_localizaciones,
  softDeleteObras_fotos,
  softDeleteObras_documentos,
  softDeleteObras_disciplinas,
  softDeleteObras_artistas,
  softDeleteObras_a,
  softDeleteObras,
  softDeleteNoticias,
  softDeleteMigrations,
  softDeleteLocalizaciones_obras,
  softDeleteLocalizaciones,
  softDeleteGestin_de_contenidos_pane,
  softDeleteGalder_a,
  softDeleteFotos,
  softDeleteFotoobra,
  softDeleteFaq,
  softDeleteFailed_jobs,
  softDeleteEventos,
  softDeleteEnlaces,
  softDeleteEnergia,
  softDeleteEdificios,
  softDeleteDocumentos,
  softDeleteDepartamentos,
  softDeleteCondiciones,
  softDeleteConcejales,
  softDeleteComunicaciones,
  softDeleteComercios,
  softDeleteClientes,
  softDeleteCategories,
  softDeleteCatalogos,
  softDeleteArtistas_obras,
  softDeleteArtistas,
  softDeleteArticle_tag,
  softDeleteArticles,
  softDeleteApartespacios,
  softDeleteAna_gestin,
  softDeleteAlejandro,
  softDeleteAdmin_user_tenancy,
  softDeleteAdmin_user_role,
  softDeleteAdmin_users,
  softDeleteAdmin_teams,
  softDeleteAdmin_role_permission,
  softDeleteAdmin_roles,
  softDeleteAdmin_permissions,
  softDeleteAdmin_auditable_logs,
  softDeleteObra,
  softDeleteUser,
  softDeleteDisciplinas,
  softDeleteTask,
  softDeleteTag,
  softDeleteTask_tag,
  softDeleteUserAuthSettings,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
