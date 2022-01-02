export const DOMAIN_SERVER = 'http://localhost:8090';

// api url public
export const PUBLIC_API = {
  LOGIN: `${DOMAIN_SERVER}/public/user/login`,
  LOAD_USER: `${DOMAIN_SERVER}/public/user/get-user-refresh-app`,
  PROFILE: {
    GET_PROFILE: `${DOMAIN_SERVER}/public/profile`,
    CREATE_PROFILE: `${DOMAIN_SERVER}/public/profile/create`,
    EDIT_PROFILE: `${DOMAIN_SERVER}/public/profile/edit/`,         //    /edit/{id}
    DELETE_PROFILE: `${DOMAIN_SERVER}/public/profile/delete/`,       //    /delete/{id}
    GET_DETAIL_PROFILE: `${DOMAIN_SERVER}/public/profile/detail/`,     //     /detail/{id}
  },
  EXPERTS: {
    GET_EXPERTS: `${DOMAIN_SERVER}/public/experts`,
    CREATE_EXPERTS: `${DOMAIN_SERVER}/public/experts/create`,
    EDIT_EXPERTS: `${DOMAIN_SERVER}/public/experts/edit/`,   //    /edit/{id}
    DELETE_EXPERTS: `${DOMAIN_SERVER}/public/experts/delete/`,   //    /delete/{id}
    GET_DETAIL_EXPERTS: `${DOMAIN_SERVER}/public/experts/detail/`,    //     /detail/{id}
  },
  EMPLOYEE: {
    GET_EMPLOYEE: `${DOMAIN_SERVER}/public/employee`,
    CREATE_EMPLOYEE: `${DOMAIN_SERVER}/public/employee/create`,
    EDIT_EMPLOYEE: `${DOMAIN_SERVER}/public/employee/edit/`,    //    /edit/{id}
    DELETE_EMPLOYEE: `${DOMAIN_SERVER}/public/employee/delete/`,    //    /delete/{id}
    GET_DETAIL_EMPLOYEE: `${DOMAIN_SERVER}/public/employee/detail/`,    //     /detail/{id}
  },
};

// api url admin
export const ADMIN_API = {
  LOGIN: `${DOMAIN_SERVER}/admin/user/login`,
  REGISTER: `${DOMAIN_SERVER}/admin/user/register`,
  LOGOUT: `${DOMAIN_SERVER}/admin/user/logout`,
  LOAD_USER: `${DOMAIN_SERVER}/admin/user/get-user-refresh-app`
};
