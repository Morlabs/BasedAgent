const handleServiceResponse = require("../helper/serviceResponse");
const Models = require('../models');

const get = async (req) => {
    try {
        const user_id = req.params.id;
        const data = await Models.Profile.findOne({
            where: {
                user_id
            }
        });
        if (data) {
            return handleServiceResponse(true, data, 'Data fetched successfully');
        } else {
            return handleServiceResponse(false, null, 'No profile found for the given user');
        }
    } catch (error) {
        console.log('=== ERR IN ProfileService/get service ===', error);
        return handleServiceResponse(false, error, 'Unexpected error at service level');
    }
};

const update = async (req) => {
    try {
        const user_id = req.params.id;

        const [data, created] = await Models.Profile.upsert({
            user_id,
            ...req.body
        });

        if (created) {
            return handleServiceResponse(true, data, 'Profile created successfully');
        } else {
            return handleServiceResponse(true, data, 'Profile updated successfully');
        }
    } catch (error) {
        console.log('=== ERR IN ProfileService/update service ===', error);
        if(error?.name === 'SequelizeForeignKeyConstraintError') {
            return handleServiceResponse(false, 'User Id is not exists');
        }
        
    }
};

module.exports = {
    get,
    update,
};
