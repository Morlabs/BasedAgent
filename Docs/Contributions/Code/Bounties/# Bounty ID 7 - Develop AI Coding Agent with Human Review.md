# Bounty ID 7 - Develop AI Coding Agent with Human Review.md

## Overview

### Bounty Title
Develop an AI Coding Agent with human review integration and Discord notifications.

### Bounty Description
Create an AI Coding Agent that semi-autonomously writes code for a project and integrates human review before submission. This solution should leverage Discord for notifications to human reviewers and clients, and use GitHub for version control and pull requests.

### Objectives
- Develop a system to handle new task creation and storage in a database.
- Implement an AI Coding Agent (using Llama 3.1 405b) to generate initial code solutions and create pull requests on GitHub.
- Design and build a human review assignment system using the BasedAgent matching algorithm.
- Integrate a review interface for human reviewers to approve tasks and log hours spent.
- Utilize Discord for notifications to human reviewers and clients.
- Ensure human reviewers authenticate with GitHub for seamless integration.

### Acceptance Criteria
- **Task Creation**:
  - Develop a form to create new tasks with fields including title, description, deliverables, requirements, and dependencies.
  - Store task details in a PostgreSQL database.
- **AI Coding**:
  - Integrate the Llama 3.1 405b model for generating code based on task details.
  - Implement functionality to create pull requests on GitHub with the generated code.
- **Human Review Assignment**:
  - Use the BasedAgent matching algorithm to assign tasks to human reviewers.
  - Notify reviewers via Discord about new tasks.
- **Review and Hours Logging**:
  - Provide an interface for reviewers to review pull requests, make changes, and log hours.
  - Implement functionality for reviewers to approve tasks.
- **Final Submission**:
  - Update task status in the database upon completion.
  - Notify the client/project team about task completion via Discord.

## Deliverables
- A fully functional system that includes task creation, AI coding, human review, and final submission.
- Source code repository (GitHub) with clear instructions on how to deploy the system.
- Documentation outlining the entire workflow, model integration, and usage instructions.
- A demo URL where the system can be tested.

## Technical Requirements
- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **AI Model**: Llama 3.1 405b for code generation
- **Version Control**: GitHub for repositories and pull requests
- **Communication**: Discord API for notifications
- **Authentication**: GitHub OAuth for reviewer authentication

## Dependencies
- **Discord Bot**: Develop or integrate a Discord bot to handle notifications for human reviewers and clients.
**Job matching system** Use the BasedAgent matching algorithm to assign tasks to human reviewers.
