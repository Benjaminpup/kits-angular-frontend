// export const apin = "http://192.168.1.163:5001/api";
// export const apin = "http://122.175.43.71:5001/api";
export const apin = "/api";

// export const apin = window.location.protocol + '//' + window.location.hostname+':5001/api';

// export const apin = "http://34.100.227.119:5001/api";


export const endPointsUser = {
    // Endpoints for UserCreate
    getcros: `${apin}/cros`,
    getCroById: `${apin}/cro/`,
    getCroAddUpdate: `${apin}/cro`,
    deleteCroById: `${apin}/cro/`,
    getLocationByZipcode: `${apin}/location/`,

    // Endpoints for UserCreate
    getUser: `${apin}/user/register`,
    getUserById: `${apin}/user_actions/`,
    getUserAddUpdate: `${apin}/user/register`,
    getUserUpdate: `${apin}/user_actions/`,
    deleteUserById: `${apin}/user_actions/`,

    // Endpoints for  Login
    login: `${apin}/login`,
    // sendotp: `${apin}/login/sendotp`,
    sendotp: `${apin}/sendotp`,
    reset: `${apin}/user/register`,
    dashboard: `${apin}/dashboard`,

    // Endpoints for sponsors
    getSponsors: `${apin}/sponsors`,
    getSponsorsById: `${apin}/sponsor/`,
    getSponsorsAddUpdate: `${apin}/sponsor`,
    deleteSponsorById: `${apin}/sponsor/`,

    // Endpoints for Lab
    getLab: `${apin}/labs`,
    getLabById: `${apin}/lab/`,
    getLabAddUpdate: `${apin}/lab`,
    deleteLabById: `${apin}/lab/`,

    // Endpoints for Site
    getSites: `${apin}/sites_data`,
    getSiteById: `${apin}/site_data/`,
    getSiteAddUpdate: `${apin}/site_data`,
    deleteSiteById: `${apin}/site_data/`,

    // Endpoints for Lab Test
    getLabTest: `${apin}/lab_tests`,
    getLabTestById: `${apin}/lab_test/`,
    getLabTestAddUpdate: `${apin}/lab_test`,
    deleteLabTestById: `${apin}/lab_test/`,

    // Endpoints for Material
    meterials: `${apin}/meterials`,
    materialAddUpdate: `${apin}/meterial`,
    getmeterialById: `${apin}/meterial/`,
    deletemeterialById: `${apin}/meterial/`,


    // Endpoints for Protocol
    postProtocol: `${apin}/cro_protocol`,
    croProtocols: `${apin}/cro_protocols`,
    getProtocolId: `${apin}/cro_protocol/`,
    kitsinventory:`${apin}/kits_inventory_ns/`,
    kitsnsv:`${apin}/kits_ns/`,
    dashboardtable:`${apin}/dashboard_table/`,
    deleteprotocolById: `${apin}/cro_protocol/`,

    // Endpoints for Preparatiion
    getPreparation: `${apin}/clab_kit_preparations`,
    postPreparation: `${apin}/clab_kit_preparation`,
    getPreparationById: `${apin}/clab_kit_preparation/`,
    sampleack: `${apin}/sample_ack/`,
    sampleackput: `${apin}/sample_ack`,


}
