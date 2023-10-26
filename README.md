# E-Commerce Back End

## Table of Contents
- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation)
- [Usage](#usage)
- [Walkthrough Video](#walkthrough-video)
- [Github Repository](#github-repository)
- [Licensing](#licensing)


## Description
This is a back-end application for an e-commerce website built using Express.js and Sequelize to interact with a MySQL database. The application provides a foundation for managing product categories, products, and tags, allowing you to create, read, update, and delete data within your e-commerce database.

## User Story
```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

## Acceptance Criteria
```md
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete data in my database
```


## Installation
1. To install this application, first clone the repository that can be found below. 
2. Make sure to have all dependancys installed
3. Launch mysql in your CLI.
4. type 'SOURCE schema.sql'
5. quit mysql
6. run 'npm run seed'
7. run 'npm run start'

## Usage
This application can be used to check inventory, specific products, products within categories, prices, and much more. To use the application walk through the Installation instructions and then watch the walkthrough video linked below.

## Walkthrough Video
For a complete demonstration of the application's functionality and to see all of the acceptance criteria being met, please refer to the walkthrough video provided below
https://drive.google.com/file/d/1QH_gOH18vnoDidbtgargGMZtotl6din-/view?usp=sharing


## GitHub Repository
You can access the GitHub repository for this project at https://github.com/kiedae/Ecommerce-Backend

## Licensing
This application uses the MIT licence

© 2023 Kiedae (Ernest Williams)