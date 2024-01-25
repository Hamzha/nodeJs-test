# Node Js Interview Test

Problem 1: Asynchronous Operations
Create a function that takes in an array of URLs and downloads the contents from each URL using asynchronous methods. Once all downloads are complete, return an array with the downloaded contents in the same order as the URLs.

Problem 2: Error Handling
Design a function that fetches data from an API endpoint. Implement proper error handling to handle various HTTP status codes and network failures. Log appropriate messages for each type of error encountered.

Problem 3: File System Operations
Develop a utility that reads a directory and lists all files with a specific extension (e.g., .txt). Implement this functionality using Node.js's File System module.

Problem 4: Database Interaction
Create a simple REST API endpoint using Express.js that interacts with a database (can be any database of your choice). Implement CRUD operations (Create, Read, Update, Delete) for a specific resource (e.g., users, posts).

Problem 5: Authentication
Implement an authentication middleware using JWT (JSON Web Tokens) in a Node.js application. Create endpoints that require authentication to access specific resources. Ensure proper token validation and handling of expired or invalid tokens.

These problems cover various aspects of Node.js development, including asynchronous programming, error handling, file system operations, database interactions, and authentication. Adjust the complexity or specifics of each problem based on the experience level you want to target.

---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install

## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ npm install

## Configure app

  Replace .env.sample to .env and put the local credentials. 

## Running the project

    $ npm start
