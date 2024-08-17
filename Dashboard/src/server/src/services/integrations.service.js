const handleServiceResponse = require("../helper/serviceResponse");
const Models = require('../models');

const get = async (req) => {
    try {
        const user_id = req.params.id;
        const data = await Models.Integrations.findOne({
            where: {
                user_id
            }
        });
        if (data) {
            return handleServiceResponse(true, data, 'Data fetched successfully');
        } else {
            return handleServiceResponse(false, null, 'No integrations found for the given user');
        }
    } catch (error) {
        console.log('=== ERR IN Integrations/get service ===', error);
        return handleServiceResponse(false, error, 'Unexpected error at service level');
    }
};

const update = async (req) => {
    try {
        const user_id = req.params.id;

        const [data, created] = await Models.Integrations.upsert({
            user_id,
            ...req.body
        });

        if (created) {
            return handleServiceResponse(true, data, 'Integrations created successfully');
        } else {
            return handleServiceResponse(true, data, 'Integrations updated successfully');
        }
    } catch (error) {
        console.log('=== ERR IN Integrations/update service ===', error);
        if(error?.name === 'SequelizeForeignKeyConstraintError') {
            return handleServiceResponse(false, 'User Id is not exists');
        }
        
    }
};

module.exports = {
    get,
    update,
};
