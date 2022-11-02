## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Built Using](#built_using)
- [Routes](#routes)
- [Running Tests](#tests)
- [Used Libraries](#libraries)

## 📖 About <a name = "about"></a>

This product was designed for the Coodesh NodeJs Challenge 20201030.

This is a REST API that uses data from the Open Food Facts project. The goal is to help a team of nutritionists that work at Fitness Foods LC so they can quickly check nutritional information from various products.

This application is live at:
[Website](https://open-food-facts-api.onrender.com)

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### ⚙️ Installing

- Clone the repository
- Instal dependencies
- Setup your env variables
- Start the project!

Install dependencies with

```
npm i
```

Setup your .env files

```
DB_CONN_STRING="mongodb://localhost:27017"
PORT=SELECTED_PORT
DATABASE="DATABASE_NAME"
CRON_TIME= "CRON_PATTERN"
```

If you're running on docker...

```
DB_CONN_STRING="mongodb://MONGO_IMAGE_TITLE:MONGO_IMAGE_PORT"
CRON_TIME= "YOUR_CRON_TIME"
PORT="YOUR_PORT"
DATABASE="YOUR_DB_NAME"
```

If you're running without docker, start MongoDB on your computer and keep it running!

### ⚙️ How to setup the CRON_TIME variable

You can set the string using the "\* \* \* \* \* \*" pattern

```
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
```

### Example

```
CRON_TIME = 0 0 2 * * *
```

This pattern makes the cron execute the function everyday at 02 A.M. The spaces between the characters are important!

## 🚀 Routes <a name = "routes"></a>

```
GET /
   - Route to get system info
   - headers: {}
   - body:{}
```

```
GET /products
   - Route to get all products registered in the database
   - headers: {}
   - body:{}
```

```
GET /products?page=1
   - Route to get the 20 first products registered in the database
   - headers: {}
   - body:{}
```

```
GET /products/:code
   - Route to get the product registered with the given code
   - headers: {}
   - body:{}
```

```
PUT /products/:code
   - Route to update the product with the given code
   - headers: {}
   - body:{
        quantity,
        brands,
        categories,
        labels,
        cities,
        purchase_places,
        stores,
        ingredients_text,
        traces,
        serving_size,
        serving_quantity,
        nutriscore_score,
        nutriscore_grade,
        main_category
    }
```

```
DELETE /products/:code
   - Route to delete product with the given code from the database
   - headers: {}
   - body:{}
```

## 🔧 Running tests <a name = "tests"></a>

The tests check if products service is functioning correctly. It checks the CRUD for the whole project. Run the command

```
npm run test
```

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## 📕 Used Libraries <a name = "libraries"></a>

- [axios](https://www.npmjs.com/package/axios)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [joi](https://www.npmjs.com/package/joi)
- [mongodb](https://www.npmjs.com/package/mongodb)
- [node-cron](https://www.npmjs.com/package/node-cron)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [ts-node](https://www.npmjs.com/package/ts-node)
- [jest](https://www.npmjs.com/package/jest)
