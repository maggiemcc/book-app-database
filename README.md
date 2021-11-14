# book-tracker-app

## Search For Books
## Get books
## Add Books to Have Read
## Add Books to Books Wishlist
## Rate Books


# Book API: Node, Express, Mongoose, and Mongodb
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
    * PORT=8500
    * MONGO_URI=(Add your custom mongodb connection string here. EX: mongodb+srv://...)

- [Heroku link](https://aqueous-cliffs-28065.herokuapp.com/)
- links:
    Get all books:
    - https://aqueous-cliffs-28065.herokuapp.com/books

    Get Books read:
    - https://aqueous-cliffs-28065.herokuapp.com/books/readlist/true

    Get Books wishlist:
    - https://aqueous-cliffs-28065.herokuapp.com/books/wishlist/true

    Get Books liked:
    - https://aqueous-cliffs-28065.herokuapp.com/books/liked/true