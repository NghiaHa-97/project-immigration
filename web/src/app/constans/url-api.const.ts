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

  CITY_PROVINCE: {
    GET_CITY_PROVINCE: `${DOMAIN_SERVER}/public/city-province`,
  },
  DISTRICT: {
    GET_DISTRICT_BY_CITY_PROVINCE: `${DOMAIN_SERVER}/public/district/city-province/`,      //  city-province/{cityProvinceID}
  },
  COMMUNE_WARD: {
    GET_COMMUNE_WARD_BY_DISTRICT: `${DOMAIN_SERVER}/public/commune-ward/district/`,   //   district/{districtID}
  },
  DEPARTMENT: {
    GET_DEPARTMENT_BY_WORK_UNIT: `${DOMAIN_SERVER}/public/department/work-unit/`,          //   work-unit/{id}
  },
  POSITION: {
    GET_POSITION_BY_DEPARTMENT: `${DOMAIN_SERVER}/public/position/department/`,     //    department/{id}
  },
  UNIT_TYPE: {
    GET_UNIT_TYPE: `${DOMAIN_SERVER}/public/unit-type`,
  },
  WORK_UNIT: {
    GET_WORK_UNIT_BY_UNIT_TYPE: `${DOMAIN_SERVER}/public/work-unit/unit-type/`,       //  unit-type/{id}
  }
};


// api url admin
export const ADMIN_API = {
  LOGIN: `${DOMAIN_SERVER}/admin/user/login`,
  REGISTER: `${DOMAIN_SERVER}/admin/user/register`,
  LOGOUT: `${DOMAIN_SERVER}/admin/user/logout`,
  LOAD_USER: `${DOMAIN_SERVER}/admin/user/get-user-refresh-app`
};
