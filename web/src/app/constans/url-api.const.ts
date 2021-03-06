export const DOMAIN_SERVER = 'http://localhost:8090';

// api url public
export const PUBLIC_API = {
  LOGIN: `${DOMAIN_SERVER}/api/public/auth/login`,
  LOGOUT: `${DOMAIN_SERVER}/api/public/auth/logout`,
  LOAD_USER: `${DOMAIN_SERVER}/api/public/auth/get-user-refresh-app`,
  PROFILE: {
    GET_PROFILE: `${DOMAIN_SERVER}/api/public/profile`,
    CREATE_PROFILE: `${DOMAIN_SERVER}/api/public/profile/create`,
    EDIT_PROFILE: `${DOMAIN_SERVER}/api/public/profile/edit/`,         //    /edit/{id}
    EDIT_STATUS: `${DOMAIN_SERVER}/api/public/profile/edit-status/`,         //    /edit/{id}
    DELETE_PROFILE: `${DOMAIN_SERVER}/api/public/profile/delete/`,       //    /delete/{id}
    GET_DETAIL_PROFILE: `${DOMAIN_SERVER}/api/public/profile/detail/`,     //     /detail/{id}
  },
  EXPERTS: {
    GET_EXPERTS: `${DOMAIN_SERVER}/api/public/experts`,
    CREATE_EXPERTS: `${DOMAIN_SERVER}/api/public/experts/create`,
    EDIT_EXPERTS: `${DOMAIN_SERVER}/api/public/experts/edit/`,   //    /edit/{id}
    DELETE_EXPERTS: `${DOMAIN_SERVER}/api/public/experts/delete/`,   //    /delete/{id}
    GET_DETAIL_EXPERTS: `${DOMAIN_SERVER}/api/public/experts/detail/`,    //     /detail/{id}
  },
  EMPLOYEE: {
    GET_EMPLOYEE: `${DOMAIN_SERVER}/api/public/employee`,
    CREATE_EMPLOYEE: `${DOMAIN_SERVER}/api/public/employee/create`,
    EDIT_EMPLOYEE: `${DOMAIN_SERVER}/api/public/employee/edit/`,    //    /edit/{id}
    DELETE_EMPLOYEE: `${DOMAIN_SERVER}/api/public/employee/delete/`,    //    /delete/{id}
    GET_DETAIL_EMPLOYEE: `${DOMAIN_SERVER}/api/public/employee/detail/`,    //     /detail/{id}
  },

  CITY_PROVINCE: {
    GET_CITY_PROVINCE: `${DOMAIN_SERVER}/api/public/city-province`,
  },
  COUNTRY: {
    GET_COUNTRY: `${DOMAIN_SERVER}/api/public/country`,
  },
  DISTRICT: {
    GET_DISTRICT_BY_CITY_PROVINCE: `${DOMAIN_SERVER}/api/public/district/city-province/`,      //  city-province/{cityProvinceID}
  },
  COMMUNE_WARD: {
    GET_COMMUNE_WARD_BY_DISTRICT: `${DOMAIN_SERVER}/api/public/commune-ward/district/`,   //   district/{districtID}
  },
  DEPARTMENT: {
    GET_DEPARTMENT_BY_WORK_UNIT: `${DOMAIN_SERVER}/api/public/department/work-unit/`,          //   work-unit/{id}
  },
  POSITION: {
    GET_POSITION_BY_DEPARTMENT: `${DOMAIN_SERVER}/api/public/position/department/`,     //    department/{id}
  },
  UNIT_TYPE: {
    GET_UNIT_TYPE: `${DOMAIN_SERVER}/api/public/unit-type`,
  },
  WORK_UNIT: {
    GET_WORK_UNIT_BY_UNIT_TYPE: `${DOMAIN_SERVER}/api/public/work-unit/unit-type/`,       //  unit-type/{id}
  },
  VEHICLE: {
    GET_VEHICLE: `${DOMAIN_SERVER}/api/public/vehicle`,
  },
  STATUS_PROFILE: {
    GET_STATUS_PROFILE: `${DOMAIN_SERVER}/api/public/status-profile`,
  },
  PROJECT_MISSION: {
    GET_PROJECT_MISSION: `${DOMAIN_SERVER}/api/public/project-mission`,
    CREATE_PROJECT_MISSION: `${DOMAIN_SERVER}/api/public/project-mission/create`,
    EDIT_PROJECT_MISSION: `${DOMAIN_SERVER}/api/public/project-mission/edit/`,         //    /edit/{id}
    DELETE_PROJECT_MISSION: `${DOMAIN_SERVER}/api/public/project-mission/delete/`,       //    /delete/{id}
    GET_DETAIL_PROJECT_MISSION: `${DOMAIN_SERVER}/api/public/project-mission/detail/`,     //     /detail/{id}
  },
  LOCATION: {
    GET_PAGE: `${DOMAIN_SERVER}/api/public/location`,
    VIEW: `${DOMAIN_SERVER}/api/public/location/view`,
    DETAIL: `${DOMAIN_SERVER}/api/public/location/detail/`,      // /detail/{id}
    SAVE: `${DOMAIN_SERVER}/api/public/location/save`,
    DELETE: `${DOMAIN_SERVER}/api/public/location/delete/`,    // /delete/{id}
  },
  OBJECT_TYPE: {
    GET_ALL: `${DOMAIN_SERVER}/api/public/object-type`,
    SAVE: `${DOMAIN_SERVER}/api/public/object-type/save`,
    DELETE: `${DOMAIN_SERVER}/api/public/object-type/delete/`,    // /delete/{id}
  },
  ASSIGN_TASKS: {
    GET_PAGE: `${DOMAIN_SERVER}/api/public/assign-tasks`,
    GET_DETAIL: `${DOMAIN_SERVER}/api/public/assign-tasks/detail/`,   // id
    CREATE: `${DOMAIN_SERVER}/api/public/assign-tasks/create`,
    EDIT: `${DOMAIN_SERVER}/api/public/assign-tasks/edit/`,       // id
    DELETE: `${DOMAIN_SERVER}/api/public/assign-tasks/delete/`,    // /delete/{id}
  },
  COMMENT: {
    GET_ALL_BY_PROFILE_ID: `${DOMAIN_SERVER}/api/public/comment/get-all/profile-id`,
    GET_DETAIL: `${DOMAIN_SERVER}/api/public/comment/detail/`,    // id
    GET_DETAIL_BY_PROFILE_EMPLOYEE: `${DOMAIN_SERVER}/api/public/comment/detail/by-profile-and-employee`,
    CREATE: `${DOMAIN_SERVER}/api/public/comment/create`,
  },
};


// ${DOMAIN_SERVER}/api url admin
export const ADMIN_API = {
  LOGIN: `${DOMAIN_SERVER}/api/admin/auth/login`,
  REGISTER: `${DOMAIN_SERVER}/api/admin/auth/register`,
  LOGOUT: `${DOMAIN_SERVER}/api/admin/auth/logout`,
  LOAD_USER: `${DOMAIN_SERVER}/api/admin/auth/get-user-refresh-app`,
  MODULE: {
    GET_ALL_MODULE: `${DOMAIN_SERVER}/api/admin/module`
  },
  ROLE: {
    GET_PAGE_ROLE: `${DOMAIN_SERVER}/api/admin/role`,
    GET_ALL_ROLE: `${DOMAIN_SERVER}/api/admin/role/all`,
    GET_DETAIL_ROLE: `${DOMAIN_SERVER}/api/admin/role/detail/`,   // role/detail/{id}
    CREATE_ROLE: `${DOMAIN_SERVER}/api/admin/role/create`,
    EDIT_ROLE: `${DOMAIN_SERVER}/api/admin/role/edit/`,         // delete/{id}
    DELETE_ROLE: `${DOMAIN_SERVER}/api/admin/role/delete/`       //  delete/{id}
  },
  MANAGE_USER: {
    GET_PAGE_USER_CUSTOMER: `${DOMAIN_SERVER}/api/admin/manage-user/user-customers`,
    GET_DETAIL_BY_ID: `${DOMAIN_SERVER}/api/admin/manage-user/detail/`,      // detail/{id}
    EDIT: `${DOMAIN_SERVER}/api/admin/manage-user/edit/`,            // edit/{id}
    CREATE: `${DOMAIN_SERVER}/api/admin/manage-user/create`,
    DELETE: `${DOMAIN_SERVER}/api/admin/manage-user/delete/`        // delete/{id}
  }
};
