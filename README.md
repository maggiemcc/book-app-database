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

## Netlify
- [Netlify Link](https://book-app-3760.netlify.app/)# book-database
# book-app-database
