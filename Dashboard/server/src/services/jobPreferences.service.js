const handleServiceResponse = require("../helper/serviceResponse");
const Models = require('../models');

const get = async (req) => {
    try {
        const user_id = req.params.id;
        const data = await Models.JobPreferences.findOne({
            where: {
                user_id
            }
        });
        if (data) {
            return handleServiceResponse(true, data, 'Data fetched successfully');
        } else {
            return handleServiceResponse(false, null, 'No job preference found for the given user');
        }
    } catch (error) {
        console.log('=== ERR IN jobPreferences/get service ===', error);
        return handleServiceResponse(false, error, 'Unexpected error at service level');
    }
};

const update = async (req) => {
    try {
        const user_id = req.params.id;

        const [data, created] = await Models.JobPreferences.upsert({
            user_id,
            ...req.body
        });

        if (created) {
            return handleServiceResponse(true, data, 'Job preference created successfully');
        } else {
            return handleServiceResponse(true, data, 'Job preference updated successfully');
        }
    } catch (error) {
        console.log('=== ERR IN jobPreferences/update service ===', error);
        if(error?.name === 'SequelizeForeignKeyConstraintError') {
            return handleServiceResponse(false, 'User Id is not exists');
        }
        
    }
};

module.exports = {
    get,
    update,
};
