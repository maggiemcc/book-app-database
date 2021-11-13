# book-tracker-app
## Search For Books
- Begins at line 1: [search/fetch data](https://github.com/maggiemcc/book-app/blob/master/books.js)
- Uses the api url and search input.value locate books.
    - Example search: "harry potter", returns: "HARRY POTTER AND THE PHILOSOPHER'S STONE", "HARRY POTTER AND THE CHAMBER OF SECRETS", "HARRY POTTER AND THE PRISONER OF AZKABAN", etc.

## Add Books to Have Read
- Begins at line 89: [adding books to read](https://github.com/maggiemcc/book-app/blob/master/books.js)
- "Have Read" button uses clickEvent to append the book from the search results to the "Books I've Read" category list.


## Add Books to Books to Read
- Begins at line 106: [adding books to want to read](https://github.com/maggiemcc/book-app/blob/master/books.js)
- "Want to Read" button uses clickEvent to append the book from the search results to the "Books to Read" category list.

- Begins at line 123: [removing books](https://github.com/maggiemcc/book-app/blob/master/books.js)
- a "Remove" button is also appended to the book once it move to a category list. It has a clickEvent to remove it from the list and append it back to the search result list.

## Rate Books
- Begins at line 140: [rating books](https://github.com/maggiemcc/book-app/blob/master/books.js)
- Uses querySelectorAll and array.forEach to give a book a rating out of 5 stars. When a star is clicked it is assigned a class of "active" and the other four stars will be given either a class of "active" or "disabled" depending on which star is clicked.

# TODOS API: Node, Express, Mongoose, and Mongodb
## Project setup 1: npm install
- npm intall
- npm install mongoose
- npm install dotenv
- npm install express
- npm install node-fetch
- npm install body-parser

## Project setup 2: file creation
- create .env file with:
    * NODE_ENV=development
    * PORT=8000
    * MONGO_URI=(Add your custom mongodb connection string here. EX: mongodb+srv://...)

[Heroku](https://aqueous-cliffs-28065.herokuapp.com/)
links:
Get all books:
- https://aqueous-cliffs-28065.herokuapp.com/books

Get Books read:
- https://aqueous-cliffs-28065.herokuapp.com/books/readlist/true

Get Books wishlist:
- https://aqueous-cliffs-28065.herokuapp.com/books/wishlist/true

Get Books liked:
- https://aqueous-cliffs-28065.herokuapp.com/books/liked/true
<!-- ## 1- GET TODOS:
- run on http://localhost:8000
- [Static public folder](https://github.com/maggiemcc/todo-api-mongodb/blob/master/public)
- [Server File](https://github.com/maggiemcc/todo-api-mongodb/blob/master/server.js)

- GET all todos: line 14
[Todos GET Route](https://github.com/maggiemcc/todo-api-mongodb/blob/master/routes/todos.js)

- GET todos: on line 1
[Todos GET index.js](https://github.com/maggiemcc/todo-api-mongodb/blob/master/public/index.js)


## 1.2- GET TODOS by ID:
- run on http://localhost:8000/todos/todo/:id

- GET all todos: line 22
[Todos GET Route](https://github.com/maggiemcc/todo-api-mongodb/blob/master/routes/todos.js)
    - POSTMAN or Local Browser EX: 
        - to get the task "go to the gym" with an id of: 618752112fd136b3f16b1cd4
        - "GET": http:localhost:8000/todos/todo/618752112fd136b3f16b1cd4


## 2- POST TODOS:
- POST/Add new todos: line 31
[Todos POST Route](https://github.com/maggiemcc/todo-api-mongodb/blob/master/routes/todos.js)
    - POSTMAN EX: "POST": http:localhost:8000/todos/todo/
        - x-www-form-urlencoded: key: task, value: "finish laundry"
        
    - Browser EX: type "finish laundry" into "create new to do" input and press "Add" button. The task will be added to the bottom of the list.

- POST todos: on line 33
[Todos POST index.js](https://github.com/maggiemcc/todo-api-mongodb/blob/master/public/index.js)



## 3- PUT TODOS:
- PUT/update todos: line 46
[Todos Route](https://github.com/maggiemcc/todo-api-mongodb/blob/master/routes/todos.js)

    - POSTMAN EX: "PUT": http:localhost:8000/todos/todo/id
        - To update "complete homework" task name
        - Get task id, EX: 6187521f2fd136b3f16b1cda
        - "PUT": http:localhost:8000/todos/todo/6187521f2fd136b3f16b1cda
        - x-www-form-urlencoded: key: task, value: "finish homework"
        
    - Browser EX: 
        - Click a task "edit" button.
        - type updated task name into the input field.
        - hit enter on keyboard once finished.

- PUT todos: on line 82
[Todos PUT index.js](https://github.com/maggiemcc/todo-api-mongodb/blob/master/public/index.js)



## 4- DELETE TODOS:
- DELETE todos: on line 57
[Delete route/todos](https://github.com/maggiemcc/todo-api-mongodb/blob/master/routes/todos.js)

    - POSTMAN EX: "DELETE": http:localhost:8000/todos/todo/id
        - To delete "complete homework" task width an id of:6187521f2fd136b3f16b1cda
        - "DELETE": http:localhost:8000/todos/todo/6187521f2fd136b3f16b1cda
        
    - Browser EX: Find the "delete" button for "complete homework". Click to delete the task.

- DELETE todos: on line 60
[Delete Todo index.js](https://github.com/maggiemcc/todo-api-mongodb/blob/master/public/index.js) -->


