CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,  -- Unique username for each user
    email VARCHAR(255) UNIQUE NOT NULL,  -- Unique email for each user
    password VARCHAR(255) NOT NULL,  -- Password hash
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp when the user was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp when the user was last updated
);


CREATE TABLE job_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),  -- Foreign key referencing users table
    desired_positions TEXT[],  -- Tags: stored as an array of text
    target_industry TEXT[],  -- Tags: stored as an array of text
    open_to_remote_work BOOLEAN,  -- Checkbox or Toggle
    employment_type VARCHAR(50),  -- Dropdown (Part-time, Full-time, etc.)
    compensation_expectations VARCHAR(50),  -- Text input (Yearly gross salary)
    tech_stack_dislikes TEXT[],  -- Textarea
    ideal_company_scale VARCHAR(50)  -- Dropdown (small, medium, large)
);


CREATE TABLE integrations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),  -- Foreign key referencing users table
    github_oauth BOOLEAN,  -- OAuth Connection: Indicates if GitHub is connected
    github_personal_access_token VARCHAR(255),  -- Token Input for personal access tokens
    gitlab_oauth BOOLEAN,  -- OAuth Connection for GitLab
    gitlab_oauth_access_token VARCHAR(255),
    gitlab_self_hosted_oauth BOOLEAN,  -- OAuth Connection for GitLab Self-Hosted
    gitlab_self_hosted_oauth_access_token  VARCHAR(255),
    bitbucket_oauth BOOLEAN,  -- OAuth Connection for Bitbucket
    bitbucket_oauth_access_token VARCHAR(255),
    stackoverflow_oauth BOOLEAN, -- OAuth Connection for StackOverflow
    stackoverflow_oauth_access_token VARCHAR(255)
);


CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),  -- Foreign key referencing users table
    first_name VARCHAR(100) NOT NULL,  -- Required field
    last_name VARCHAR(100) NOT NULL,  -- Required field
    gender_identity VARCHAR(50),  -- Dropdown (Male, Female, Other)
    date_of_birth VARCHAR(50),   -- Date Picker (Day, Month, Year)
    current_location VARCHAR(255),  -- Text input (City, Country format)
    primary_email VARCHAR(255),  -- Email input
    linkedin_url VARCHAR(255),  -- URL input
    portfolio_website VARCHAR(255),  -- URL input
    twitter_handle VARCHAR(255),  -- URL input
    profile_discoverability BOOLEAN  -- Toggle visibility of profile
);


CREATE TABLE account (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    current_password VARCHAR(255),  -- Password input
    new_password VARCHAR(255),  -- Password input
    confirm_password VARCHAR(255),  -- Password input
    update_settings BOOLEAN,  -- Button action (e.g., true when settings are updated)
    deactivate_account BOOLEAN  -- Button (Danger Zone): true when account is deactivated
);


CREATE TABLE reviewers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    github VARCHAR(255),
    skills VARCHAR(255),
    availability VARCHAR(50),
    email VARCHAR(255),
    discord_handle VARCHAR(255),
    created_at TIMESTAMP,
    github_username VARCHAR(255),
    github_url VARCHAR(255),
    top_languages TEXT[],
    total_contributions INTEGER,
    public_repositories INTEGER
);