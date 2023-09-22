/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */
const model = require('../model');
const dbService = require('../utils/dbService');
const bcrypt = require('bcrypt');
const authConstant = require('../constants/authConstant');
const { replaceAll } = require('../utils/common');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = await dbService.findOne(model.user,{ 'username':'Neva.Parisian' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'password':'Tv13D1DJPuuIiDl',
        'isDeleted':false,
        'username':'Neva.Parisian',
        'email':'Althea97@yahoo.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      await dbService.createOne(model.user,userToBeInserted);
    } else {
      userToBeInserted = {
        'password':'Tv13D1DJPuuIiDl',
        'isDeleted':false,
        'username':'Neva.Parisian',
        'email':'Althea97@yahoo.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.user, { 'username':'Neva.Parisian' }, userToBeInserted);
    }
    console.info('User model seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
  
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'User', 'System_User' ];
    const insertedRoles = await dbService.findAll(model.role, { code: { $in: roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.createMany(model.role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes) {
      let routeName = '';
      const dbRoutes = await dbService.findAll(model.projectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.createMany(model.projectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/device/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/users/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/users/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tipos_documentos/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tipos_documentos/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tipos_documentos/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tipos_documentos/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/tipos_documentos/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tipos_documentos/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tipos_documentos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tipos_documentos/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tipos_documentos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tipos_documentos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tipos_documentos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/tipos_documentos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tags/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tags/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tags/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tags/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/tags/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tags/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tags/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tags/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tags/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tags/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tags/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/tags/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/servicios/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/servicios/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/servicios/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/servicios/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/servicios/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/servicios/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/servicios/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/servicios/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/servicios/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/servicios/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/servicios/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/servicios/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/secciones_web/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/secciones_web/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/secciones_web/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/secciones_web/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/secciones_web/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/secciones_web/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/secciones_web/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/secciones_web/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/secciones_web/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/secciones_web/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/secciones_web/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/secciones_web/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/roles/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/roles/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/roles/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/roles/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/roles/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/roles/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/roles/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/roles/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/roles/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/roles/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/roles/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/roles/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/reservas/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/reservas/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/reservas/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/reservas/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/reservas/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/reservas/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/reservas/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/reservas/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/reservas/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/reservas/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/reservas/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/reservas/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/propiedades/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/propiedades/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/propiedades/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/propiedades/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/propiedades/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/propiedades/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/propiedades/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/propiedades/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/propiedades/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/propiedades/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/propiedades/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/propiedades/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolios/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolios/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolios/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolios/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/portfolios/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portfolios/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolios/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolios/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolios/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolios/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portfolios/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/portfolios/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/personal_access_tokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/personal_access_tokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/personal_access_tokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/personal_access_tokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/personal_access_tokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/personal_access_tokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/personal_access_tokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/personal_access_tokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/personal_access_tokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/personal_access_tokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/personal_access_tokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/personal_access_tokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patrick_tecnologa/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patrick_tecnologa/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patrick_tecnologa/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patrick_tecnologa/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/patrick_tecnologa/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/patrick_tecnologa/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patrick_tecnologa/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patrick_tecnologa/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patrick_tecnologa/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patrick_tecnologa/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/patrick_tecnologa/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/patrick_tecnologa/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_reset_tokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_reset_tokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_reset_tokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_reset_tokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/password_reset_tokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_reset_tokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_reset_tokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_reset_tokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_reset_tokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_reset_tokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_reset_tokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/password_reset_tokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_resets/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_resets/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_resets/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_resets/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/password_resets/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_resets/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_resets/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_resets/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_resets/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_resets/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_resets/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/password_resets/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/paneles/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/paneles/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/paneles/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/paneles/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/paneles/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/paneles/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/paneles/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/paneles/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/paneles/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/paneles/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/paneles/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/paneles/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/paginas/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/paginas/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/paginas/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/paginas/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/paginas/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/paginas/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/paginas/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/paginas/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/paginas/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/paginas/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/paginas/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/paginas/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pages/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pages/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pages/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pages/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/pages/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pages/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pages/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pages/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pages/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pages/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pages/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/pages/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__uploads/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__uploads/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__uploads/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__uploads/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/pagebuilder__uploads/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__uploads/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__uploads/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__uploads/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__uploads/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__uploads/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__uploads/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/pagebuilder__uploads/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__settings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__settings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__settings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__settings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/pagebuilder__settings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__settings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__settings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__settings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__settings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__settings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__settings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/pagebuilder__settings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__page_translations/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__page_translations/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__page_translations/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__page_translations/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/pagebuilder__page_translations/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__page_translations/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__page_translations/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__page_translations/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__page_translations/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__page_translations/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__page_translations/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/pagebuilder__page_translations/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__pages/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__pages/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__pages/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__pages/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/pagebuilder__pages/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pagebuilder__pages/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__pages/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__pages/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__pages/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__pages/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pagebuilder__pages/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/pagebuilder__pages/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_localizaciones_a/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_localizaciones_a/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_localizaciones_a/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_localizaciones_a/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/obras_localizaciones_a/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_localizaciones_a/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_localizaciones_a/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_localizaciones_a/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_localizaciones_a/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_localizaciones_a/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_localizaciones_a/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/obras_localizaciones_a/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_localizaciones/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_localizaciones/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_localizaciones/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_localizaciones/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/obras_localizaciones/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_localizaciones/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_localizaciones/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_localizaciones/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_localizaciones/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_localizaciones/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_localizaciones/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/obras_localizaciones/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_fotos/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_fotos/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_fotos/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_fotos/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/obras_fotos/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_fotos/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_fotos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_fotos/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_fotos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_fotos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_fotos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/obras_fotos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_documentos/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_documentos/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_documentos/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_documentos/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/obras_documentos/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_documentos/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_documentos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_documentos/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_documentos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_documentos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_documentos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/obras_documentos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_disciplinas/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_disciplinas/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_disciplinas/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_disciplinas/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/obras_disciplinas/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_disciplinas/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_disciplinas/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_disciplinas/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_disciplinas/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_disciplinas/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_disciplinas/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/obras_disciplinas/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_artistas/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_artistas/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_artistas/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_artistas/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/obras_artistas/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_artistas/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_artistas/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_artistas/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_artistas/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_artistas/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_artistas/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/obras_artistas/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_a/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_a/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_a/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_a/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/obras_a/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras_a/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_a/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_a/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_a/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_a/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras_a/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/obras_a/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/obras/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obras/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obras/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/obras/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/noticias/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/noticias/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/noticias/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/noticias/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/noticias/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/noticias/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/noticias/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/noticias/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/noticias/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/noticias/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/noticias/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/noticias/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/migrations/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/migrations/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/migrations/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/migrations/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/migrations/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/migrations/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/migrations/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/migrations/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/migrations/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/migrations/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/migrations/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/migrations/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/localizaciones_obras/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/localizaciones_obras/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/localizaciones_obras/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/localizaciones_obras/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/localizaciones_obras/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/localizaciones_obras/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/localizaciones_obras/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/localizaciones_obras/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/localizaciones_obras/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/localizaciones_obras/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/localizaciones_obras/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/localizaciones_obras/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/localizaciones/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/localizaciones/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/localizaciones/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/localizaciones/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/localizaciones/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/localizaciones/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/localizaciones/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/localizaciones/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/localizaciones/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/localizaciones/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/localizaciones/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/localizaciones/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/gestin_de_contenidos_pane/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/gestin_de_contenidos_pane/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/gestin_de_contenidos_pane/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/gestin_de_contenidos_pane/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/gestin_de_contenidos_pane/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/gestin_de_contenidos_pane/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/gestin_de_contenidos_pane/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/gestin_de_contenidos_pane/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/gestin_de_contenidos_pane/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/gestin_de_contenidos_pane/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/gestin_de_contenidos_pane/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/gestin_de_contenidos_pane/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/galder_a/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/galder_a/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/galder_a/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/galder_a/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/galder_a/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/galder_a/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/galder_a/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/galder_a/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/galder_a/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/galder_a/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/galder_a/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/galder_a/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/fotos/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/fotos/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/fotos/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/fotos/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/fotos/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/fotos/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/fotos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/fotos/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/fotos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/fotos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/fotos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/fotos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/fotoobra/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/fotoobra/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/fotoobra/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/fotoobra/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/fotoobra/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/fotoobra/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/fotoobra/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/fotoobra/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/fotoobra/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/fotoobra/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/fotoobra/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/fotoobra/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/faq/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/faq/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/faq/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/faq/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/faq/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/faq/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/faq/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/faq/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/faq/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/faq/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/faq/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/faq/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/failed_jobs/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/failed_jobs/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/failed_jobs/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/failed_jobs/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/failed_jobs/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/failed_jobs/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/failed_jobs/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/failed_jobs/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/failed_jobs/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/failed_jobs/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/failed_jobs/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/failed_jobs/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventos/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventos/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventos/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventos/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/eventos/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventos/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/eventos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/eventos/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/eventos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/eventos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/eventos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/eventos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enlaces/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enlaces/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enlaces/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enlaces/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/enlaces/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enlaces/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enlaces/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enlaces/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enlaces/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enlaces/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enlaces/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/enlaces/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/energia/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/energia/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/energia/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/energia/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/energia/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/energia/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/energia/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/energia/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/energia/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/energia/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/energia/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/energia/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/edificios/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/edificios/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/edificios/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/edificios/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/edificios/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/edificios/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/edificios/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/edificios/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/edificios/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/edificios/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/edificios/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/edificios/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/documentos/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/documentos/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/documentos/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/documentos/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/documentos/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/documentos/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/documentos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/documentos/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/documentos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/documentos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/documentos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/documentos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departamentos/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departamentos/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departamentos/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departamentos/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/departamentos/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departamentos/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departamentos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departamentos/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departamentos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departamentos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departamentos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/departamentos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/condiciones/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/condiciones/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/condiciones/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/condiciones/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/condiciones/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/condiciones/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/condiciones/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/condiciones/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/condiciones/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/condiciones/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/condiciones/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/condiciones/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/concejales/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/concejales/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/concejales/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/concejales/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/concejales/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/concejales/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/concejales/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/concejales/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/concejales/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/concejales/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/concejales/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/concejales/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comunicaciones/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comunicaciones/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comunicaciones/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comunicaciones/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/comunicaciones/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comunicaciones/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comunicaciones/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comunicaciones/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comunicaciones/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comunicaciones/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comunicaciones/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/comunicaciones/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comercios/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comercios/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comercios/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comercios/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/comercios/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comercios/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comercios/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comercios/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comercios/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comercios/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comercios/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/comercios/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/clientes/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/clientes/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/clientes/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/clientes/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/clientes/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/clientes/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/clientes/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/clientes/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/clientes/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/clientes/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/clientes/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/clientes/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/categories/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/categories/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/categories/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/categories/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/categories/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/categories/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/categories/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/categories/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/categories/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/categories/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/categories/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/categories/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/catalogos/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/catalogos/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/catalogos/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/catalogos/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/catalogos/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/catalogos/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/catalogos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/catalogos/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/catalogos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/catalogos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/catalogos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/catalogos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/artistas_obras/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/artistas_obras/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/artistas_obras/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/artistas_obras/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/artistas_obras/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/artistas_obras/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/artistas_obras/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/artistas_obras/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/artistas_obras/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/artistas_obras/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/artistas_obras/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/artistas_obras/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/artistas/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/artistas/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/artistas/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/artistas/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/artistas/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/artistas/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/artistas/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/artistas/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/artistas/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/artistas/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/artistas/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/artistas/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/article_tag/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/article_tag/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/article_tag/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/article_tag/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/article_tag/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/article_tag/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/article_tag/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/article_tag/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/article_tag/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/article_tag/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/article_tag/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/article_tag/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/articles/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/articles/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/articles/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/articles/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/articles/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/articles/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/articles/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/articles/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/articles/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/articles/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/articles/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/articles/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/apartespacios/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/apartespacios/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/apartespacios/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/apartespacios/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/apartespacios/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/apartespacios/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/apartespacios/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/apartespacios/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/apartespacios/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/apartespacios/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/apartespacios/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/apartespacios/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/ana_gestin/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/ana_gestin/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/ana_gestin/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/ana_gestin/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/ana_gestin/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/ana_gestin/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/ana_gestin/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/ana_gestin/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/ana_gestin/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/ana_gestin/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/ana_gestin/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/ana_gestin/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/alejandro/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/alejandro/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/alejandro/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/alejandro/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/alejandro/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/alejandro/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/alejandro/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/alejandro/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/alejandro/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/alejandro/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/alejandro/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/alejandro/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_user_tenancy/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_user_tenancy/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_user_tenancy/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_user_tenancy/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/admin_user_tenancy/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_user_tenancy/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_user_tenancy/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_user_tenancy/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_user_tenancy/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_user_tenancy/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_user_tenancy/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admin_user_tenancy/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_user_role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_user_role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_user_role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_user_role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/admin_user_role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_user_role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_user_role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_user_role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_user_role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_user_role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_user_role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admin_user_role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_users/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_users/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_users/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_users/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/admin_users/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_users/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_users/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_users/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_users/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_users/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_users/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admin_users/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_teams/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_teams/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_teams/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_teams/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/admin_teams/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_teams/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_teams/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_teams/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_teams/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_teams/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_teams/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admin_teams/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_role_permission/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_role_permission/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_role_permission/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_role_permission/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/admin_role_permission/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_role_permission/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_role_permission/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_role_permission/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_role_permission/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_role_permission/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_role_permission/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admin_role_permission/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_roles/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_roles/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_roles/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_roles/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/admin_roles/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_roles/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_roles/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_roles/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_roles/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_roles/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_roles/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admin_roles/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_permissions/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_permissions/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_permissions/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_permissions/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/admin_permissions/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_permissions/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_permissions/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_permissions/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_permissions/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_permissions/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_permissions/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admin_permissions/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_auditable_logs/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_auditable_logs/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_auditable_logs/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_auditable_logs/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/admin_auditable_logs/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_auditable_logs/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_auditable_logs/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_auditable_logs/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_auditable_logs/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_auditable_logs/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_auditable_logs/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admin_auditable_logs/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obra/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obra/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obra/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obra/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/obra/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/obra/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obra/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obra/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obra/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obra/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/obra/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/obra/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/disciplinas/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/disciplinas/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/disciplinas/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/disciplinas/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/disciplinas/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/disciplinas/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/disciplinas/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/disciplinas/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/disciplinas/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/disciplinas/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/disciplinas/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/disciplinas/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/task/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/task/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tag/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tag/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tag/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tag/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/tag/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tag/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tag/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tag/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tag/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tag/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tag/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/tag/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/task_tag/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/task_tag/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task_tag/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task_tag/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task_tag/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task_tag/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/task_tag/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/task_tag/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/users/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/users/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tipos_documentos/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tipos_documentos/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tipos_documentos/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tipos_documentos/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/tipos_documentos/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tipos_documentos/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tipos_documentos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tipos_documentos/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tipos_documentos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tipos_documentos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tipos_documentos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/tipos_documentos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tags/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tags/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tags/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tags/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/tags/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tags/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tags/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tags/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tags/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tags/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tags/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/tags/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/servicios/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/servicios/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/servicios/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/servicios/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/servicios/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/servicios/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/servicios/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/servicios/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/servicios/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/servicios/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/servicios/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/servicios/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/secciones_web/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/secciones_web/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/secciones_web/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/secciones_web/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/secciones_web/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/secciones_web/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/secciones_web/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/secciones_web/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/secciones_web/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/secciones_web/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/secciones_web/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/secciones_web/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/roles/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/roles/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/roles/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/roles/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/roles/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/roles/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/roles/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/roles/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/roles/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/roles/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/roles/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/roles/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/reservas/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/reservas/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/reservas/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/reservas/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/reservas/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/reservas/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/reservas/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/reservas/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/reservas/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/reservas/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/reservas/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/reservas/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/propiedades/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/propiedades/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/propiedades/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/propiedades/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/propiedades/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/propiedades/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/propiedades/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/propiedades/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/propiedades/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/propiedades/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/propiedades/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/propiedades/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portfolios/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portfolios/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portfolios/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portfolios/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/portfolios/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portfolios/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/portfolios/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/portfolios/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/portfolios/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/portfolios/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/portfolios/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/portfolios/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/personal_access_tokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/personal_access_tokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/personal_access_tokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/personal_access_tokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/personal_access_tokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/personal_access_tokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/personal_access_tokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/personal_access_tokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/personal_access_tokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/personal_access_tokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/personal_access_tokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/personal_access_tokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patrick_tecnologa/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patrick_tecnologa/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patrick_tecnologa/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patrick_tecnologa/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/patrick_tecnologa/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/patrick_tecnologa/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patrick_tecnologa/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patrick_tecnologa/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patrick_tecnologa/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patrick_tecnologa/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/patrick_tecnologa/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/patrick_tecnologa/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/password_reset_tokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/password_reset_tokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/password_reset_tokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/password_reset_tokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/password_reset_tokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/password_reset_tokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/password_reset_tokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/password_reset_tokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/password_reset_tokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/password_reset_tokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/password_reset_tokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/password_reset_tokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/password_resets/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/password_resets/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/password_resets/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/password_resets/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/password_resets/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/password_resets/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/password_resets/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/password_resets/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/password_resets/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/password_resets/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/password_resets/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/password_resets/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/paneles/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/paneles/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/paneles/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/paneles/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/paneles/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/paneles/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/paneles/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/paneles/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/paneles/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/paneles/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/paneles/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/paneles/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/paginas/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/paginas/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/paginas/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/paginas/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/paginas/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/paginas/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/paginas/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/paginas/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/paginas/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/paginas/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/paginas/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/paginas/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pages/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pages/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pages/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pages/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/pages/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pages/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pages/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pages/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pages/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pages/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pages/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/pages/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__uploads/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__uploads/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__uploads/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__uploads/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/pagebuilder__uploads/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__uploads/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__uploads/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__uploads/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__uploads/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__uploads/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__uploads/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/pagebuilder__uploads/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__settings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__settings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__settings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__settings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/pagebuilder__settings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__settings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__settings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__settings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__settings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__settings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__settings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/pagebuilder__settings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__page_translations/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__page_translations/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__page_translations/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__page_translations/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/pagebuilder__page_translations/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__page_translations/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__page_translations/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__page_translations/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__page_translations/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__page_translations/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__page_translations/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/pagebuilder__page_translations/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__pages/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__pages/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__pages/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__pages/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/pagebuilder__pages/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pagebuilder__pages/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__pages/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__pages/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__pages/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__pages/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pagebuilder__pages/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/pagebuilder__pages/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_localizaciones_a/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_localizaciones_a/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_localizaciones_a/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_localizaciones_a/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/obras_localizaciones_a/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_localizaciones_a/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_localizaciones_a/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_localizaciones_a/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_localizaciones_a/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_localizaciones_a/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_localizaciones_a/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/obras_localizaciones_a/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_localizaciones/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_localizaciones/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_localizaciones/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_localizaciones/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/obras_localizaciones/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_localizaciones/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_localizaciones/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_localizaciones/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_localizaciones/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_localizaciones/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_localizaciones/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/obras_localizaciones/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_fotos/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_fotos/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_fotos/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_fotos/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/obras_fotos/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_fotos/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_fotos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_fotos/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_fotos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_fotos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_fotos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/obras_fotos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_documentos/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_documentos/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_documentos/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_documentos/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/obras_documentos/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_documentos/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_documentos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_documentos/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_documentos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_documentos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_documentos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/obras_documentos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_disciplinas/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_disciplinas/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_disciplinas/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_disciplinas/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/obras_disciplinas/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_disciplinas/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_disciplinas/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_disciplinas/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_disciplinas/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_disciplinas/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_disciplinas/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/obras_disciplinas/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_artistas/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_artistas/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_artistas/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_artistas/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/obras_artistas/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_artistas/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_artistas/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_artistas/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_artistas/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_artistas/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_artistas/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/obras_artistas/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_a/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_a/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_a/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_a/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/obras_a/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras_a/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_a/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_a/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_a/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_a/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras_a/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/obras_a/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/obras/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obras/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obras/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/obras/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/noticias/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/noticias/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/noticias/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/noticias/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/noticias/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/noticias/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/noticias/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/noticias/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/noticias/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/noticias/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/noticias/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/noticias/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/migrations/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/migrations/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/migrations/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/migrations/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/migrations/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/migrations/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/migrations/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/migrations/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/migrations/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/migrations/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/migrations/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/migrations/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/localizaciones_obras/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/localizaciones_obras/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/localizaciones_obras/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/localizaciones_obras/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/localizaciones_obras/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/localizaciones_obras/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/localizaciones_obras/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/localizaciones_obras/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/localizaciones_obras/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/localizaciones_obras/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/localizaciones_obras/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/localizaciones_obras/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/localizaciones/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/localizaciones/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/localizaciones/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/localizaciones/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/localizaciones/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/localizaciones/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/localizaciones/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/localizaciones/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/localizaciones/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/localizaciones/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/localizaciones/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/localizaciones/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/gestin_de_contenidos_pane/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/gestin_de_contenidos_pane/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/gestin_de_contenidos_pane/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/gestin_de_contenidos_pane/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/gestin_de_contenidos_pane/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/gestin_de_contenidos_pane/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/gestin_de_contenidos_pane/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/gestin_de_contenidos_pane/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/gestin_de_contenidos_pane/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/gestin_de_contenidos_pane/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/gestin_de_contenidos_pane/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/gestin_de_contenidos_pane/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/galder_a/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/galder_a/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/galder_a/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/galder_a/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/galder_a/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/galder_a/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/galder_a/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/galder_a/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/galder_a/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/galder_a/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/galder_a/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/galder_a/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/fotos/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/fotos/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/fotos/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/fotos/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/fotos/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/fotos/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/fotos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/fotos/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/fotos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/fotos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/fotos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/fotos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/fotoobra/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/fotoobra/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/fotoobra/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/fotoobra/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/fotoobra/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/fotoobra/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/fotoobra/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/fotoobra/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/fotoobra/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/fotoobra/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/fotoobra/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/fotoobra/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/faq/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/faq/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/faq/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/faq/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/faq/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/faq/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/faq/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/faq/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/faq/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/faq/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/faq/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/faq/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/failed_jobs/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/failed_jobs/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/failed_jobs/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/failed_jobs/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/failed_jobs/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/failed_jobs/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/failed_jobs/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/failed_jobs/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/failed_jobs/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/failed_jobs/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/failed_jobs/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/failed_jobs/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/eventos/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/eventos/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/eventos/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/eventos/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/eventos/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/eventos/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/eventos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/eventos/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/eventos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/eventos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/eventos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/eventos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enlaces/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enlaces/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enlaces/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enlaces/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/enlaces/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enlaces/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enlaces/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enlaces/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enlaces/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enlaces/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enlaces/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/enlaces/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/energia/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/energia/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/energia/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/energia/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/energia/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/energia/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/energia/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/energia/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/energia/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/energia/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/energia/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/energia/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/edificios/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/edificios/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/edificios/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/edificios/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/edificios/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/edificios/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/edificios/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/edificios/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/edificios/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/edificios/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/edificios/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/edificios/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/documentos/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/documentos/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/documentos/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/documentos/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/documentos/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/documentos/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/documentos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/documentos/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/documentos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/documentos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/documentos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/documentos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departamentos/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departamentos/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departamentos/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departamentos/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/departamentos/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departamentos/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departamentos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departamentos/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departamentos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departamentos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departamentos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/departamentos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/condiciones/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/condiciones/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/condiciones/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/condiciones/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/condiciones/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/condiciones/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/condiciones/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/condiciones/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/condiciones/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/condiciones/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/condiciones/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/condiciones/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/concejales/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/concejales/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/concejales/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/concejales/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/concejales/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/concejales/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/concejales/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/concejales/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/concejales/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/concejales/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/concejales/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/concejales/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comunicaciones/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comunicaciones/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comunicaciones/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comunicaciones/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/comunicaciones/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comunicaciones/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comunicaciones/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comunicaciones/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comunicaciones/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comunicaciones/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comunicaciones/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/comunicaciones/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comercios/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comercios/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comercios/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comercios/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/comercios/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comercios/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comercios/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comercios/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comercios/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comercios/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comercios/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/comercios/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/clientes/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/clientes/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/clientes/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/clientes/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/clientes/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/clientes/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/clientes/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/clientes/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/clientes/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/clientes/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/clientes/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/clientes/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/categories/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/categories/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/categories/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/categories/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/categories/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/categories/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/categories/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/categories/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/categories/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/categories/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/categories/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/categories/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/catalogos/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/catalogos/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/catalogos/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/catalogos/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/catalogos/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/catalogos/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/catalogos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/catalogos/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/catalogos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/catalogos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/catalogos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/catalogos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/artistas_obras/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/artistas_obras/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/artistas_obras/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/artistas_obras/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/artistas_obras/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/artistas_obras/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/artistas_obras/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/artistas_obras/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/artistas_obras/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/artistas_obras/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/artistas_obras/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/artistas_obras/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/artistas/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/artistas/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/artistas/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/artistas/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/artistas/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/artistas/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/artistas/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/artistas/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/artistas/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/artistas/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/artistas/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/artistas/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/article_tag/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/article_tag/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/article_tag/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/article_tag/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/article_tag/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/article_tag/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/article_tag/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/article_tag/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/article_tag/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/article_tag/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/article_tag/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/article_tag/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/articles/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/articles/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/articles/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/articles/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/articles/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/articles/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/articles/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/articles/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/articles/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/articles/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/articles/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/articles/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/apartespacios/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/apartespacios/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/apartespacios/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/apartespacios/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/apartespacios/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/apartespacios/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/apartespacios/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/apartespacios/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/apartespacios/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/apartespacios/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/apartespacios/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/apartespacios/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/ana_gestin/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/ana_gestin/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/ana_gestin/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/ana_gestin/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/ana_gestin/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/ana_gestin/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/ana_gestin/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/ana_gestin/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/ana_gestin/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/ana_gestin/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/ana_gestin/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/ana_gestin/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/alejandro/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/alejandro/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/alejandro/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/alejandro/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/alejandro/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/alejandro/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/alejandro/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/alejandro/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/alejandro/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/alejandro/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/alejandro/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/alejandro/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_user_tenancy/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_user_tenancy/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_user_tenancy/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_user_tenancy/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/admin_user_tenancy/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_user_tenancy/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_user_tenancy/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_user_tenancy/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_user_tenancy/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_user_tenancy/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_user_tenancy/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/admin_user_tenancy/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_user_role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_user_role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_user_role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_user_role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/admin_user_role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_user_role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_user_role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_user_role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_user_role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_user_role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_user_role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/admin_user_role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_users/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_users/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_users/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_users/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/admin_users/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_users/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_users/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_users/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_users/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_users/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_users/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/admin_users/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_teams/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_teams/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_teams/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_teams/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/admin_teams/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_teams/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_teams/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_teams/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_teams/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_teams/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_teams/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/admin_teams/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_role_permission/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_role_permission/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_role_permission/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_role_permission/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/admin_role_permission/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_role_permission/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_role_permission/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_role_permission/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_role_permission/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_role_permission/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_role_permission/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/admin_role_permission/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_roles/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_roles/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_roles/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_roles/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/admin_roles/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_roles/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_roles/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_roles/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_roles/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_roles/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_roles/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/admin_roles/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_permissions/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_permissions/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_permissions/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_permissions/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/admin_permissions/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_permissions/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_permissions/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_permissions/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_permissions/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_permissions/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_permissions/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/admin_permissions/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_auditable_logs/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_auditable_logs/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_auditable_logs/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_auditable_logs/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/admin_auditable_logs/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/admin_auditable_logs/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_auditable_logs/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_auditable_logs/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_auditable_logs/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_auditable_logs/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/admin_auditable_logs/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/admin_auditable_logs/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obra/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obra/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obra/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obra/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/obra/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/obra/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obra/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obra/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obra/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obra/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/obra/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/obra/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/disciplinas/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/disciplinas/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/disciplinas/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/disciplinas/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/disciplinas/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/disciplinas/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/disciplinas/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/disciplinas/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/disciplinas/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/disciplinas/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/disciplinas/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/disciplinas/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/task/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/task/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tag/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tag/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tag/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tag/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/tag/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tag/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tag/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tag/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tag/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tag/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tag/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/tag/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/task_tag/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/task_tag/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task_tag/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task_tag/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task_tag/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task_tag/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/task_tag/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/task_tag/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'User', 'System_User' ];
      const insertedProjectRoute = await dbService.findAll(model.projectRoute, {
        uri: { $in: routes },
        method: { $in: routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findAll(model.role, {
        code: { $in: roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};
    
      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(model.routeRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.createMany(model.routeRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'username':'Neva.Parisian',
      'password':'Tv13D1DJPuuIiDl'
    }];
    const defaultRoles = await dbService.findAll(model.role);
    const insertedUsers = await dbService.findAll(model.user, { username: { $in: userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN').id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER').id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER').id
          });
        }  
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(model.userRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.createMany(model.userRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('UserRole seeder failed due to ', error.message);
  }
}

/* calls of functions to seed mock data into multiple collections */
async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
};
module.exports = seedData;