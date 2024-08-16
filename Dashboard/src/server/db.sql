-- Create the database if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_database
        WHERE datname = 'github-analytics'
    ) THEN
        PERFORM dblink_exec('dbname=postgres', 'CREATE DATABASE "github-analytics"');
    END IF;
END
$$;

-- Connect to the github-analytics database
\c "github-analytics";

-- Create job_preferences table
CREATE TABLE IF NOT EXISTS job_preferences (
    id SERIAL PRIMARY KEY,
    desired_positions TEXT[],
    target_industry TEXT[],
    open_to_remote_work BOOLEAN,
    employment_type VARCHAR(50),
    compensation_expectations VARCHAR(50),
    tech_stack_dislikes TEXT,
    ideal_company_scale VARCHAR(50)
);

-- Create integrations table
CREATE TABLE IF NOT EXISTS integrations (
    id SERIAL PRIMARY KEY,
    github_oauth BOOLEAN,
    github_personal_access_token VARCHAR(255),
    gitlab_oauth BOOLEAN,
    gitlab_self_hosted_oauth BOOLEAN,
    bitbucket_oauth BOOLEAN,
    stackoverflow_oauth BOOLEAN
);

-- Create profile table
CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender_identity VARCHAR(50),
    date_of_birth DATE,
    current_location VARCHAR(255),
    primary_email VARCHAR(255) NOT NULL,
    linkedin_url VARCHAR(255),
    portfolio_website VARCHAR(255),
    twitter_handle VARCHAR(255),
    profile_discoverability BOOLEAN
);

-- Create account table
CREATE TABLE IF NOT EXISTS account (
    id SERIAL PRIMARY KEY,
    current_password VARCHAR(255),
    new_password VARCHAR(255),
    confirm_password VARCHAR(255),
    update_settings BOOLEAN,
    deactivate_account BOOLEAN
);
