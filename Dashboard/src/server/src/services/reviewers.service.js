const handleServiceResponse = require("../helper/serviceResponse");
const Models = require('../models');

const signup = async (req) => {
    try {
        const {
            name,
            github_username,
            top_languages,
            availability,
            email,
            discordHandle,
            github_url,
            total_contributions,
            public_repositories
        } = req.body;

        const topLanguagesArray = req.body.top_languages ? req.body.top_languages.split(',') : [];

        const data = await Models.Reviewers.create({
            name,
            github_username,
            top_languages,
            availability,
            email,
            discordHandle,
            github_username,
            github_url,
            top_languages: topLanguagesArray,
            total_contributions,
            public_repositories
        });
        return handleServiceResponse(true, data, 'Signup successful');
    } catch (error) {
        console.log('=== ERR IN reviewers/signup service ===', error)
        return handleServiceResponse(false, error);
    }
}


module.exports = {
    signup,
};
