const resultsContent = document.querySelector("#results");
const booksReadResults = document.querySelector(".readContent");
const wishlistResults = document.querySelector(".wishlistContent");
const searchInput = document.querySelector("input");
const getBooksBtn = document.querySelector(".getBooks");

getBooksBtn.addEventListener("click", () => {
    resultsContent.innerHTML = " ";
    fetchBooksApi();
})

searchInput.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
        resultsContent.innerHTML = " ";
        fetchBooksApi();
    }
})


// Toggling sections
document.querySelector(".section-dropdown").addEventListener("click", toggleWishlist)
function toggleWishlist() {
    let content = document.querySelector(".wishlistContent");
    if (content.style.display === "none") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}


document.querySelector(".read-section").addEventListener("click", toggleReadList)
function toggleReadList() {
    let content = document.querySelector(".readContent");
    if (content.style.display === "none") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}

document.querySelector(".results-dropdown").addEventListener("click", toggleSearch)
function toggleSearch() {
let content = document.querySelector("#results");
    if (content.style.display === "none") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}

let booksArray = [];

// fetching book api data
function fetchBooksApi() {
    document.querySelector(".total-number").innerHTML =
        "Searching for books...";
    let searchInputValue = searchInput.value;

    fetch(`https://openlibrary.org/search.json?q=${searchInputValue}&limit=30`)
        .then((res) => res.json())
        .then((data) => {
            booksArray = data.docs.map((book) => {
                return {
                    version: book._version_,
                    title: book.title,
                    author: book.author_name,
                    published: book.first_publish_year,
                    wishlist: false,
                    hasRead: false,
                    liked: false,
                }
            })
            displayBooks()

            document.querySelector(".total-number").innerHTML = `"${searchInputValue}": ${booksArray.length}`;
            console.log(`${searchInputValue} books:`, booksArray);
        })
        .catch((error) => {
            console.error(error);
        });
}


// displaying content in results
function displayBooks() {
    booksArray.forEach((book) => {
        let bookCard = `
        <div class="card" id="${book.version}">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <h6 class="card-subtitle mb-2 card-author">Author(s): ${book.author}</h6>
          <h6 class="card-subtitle mb-2 card-year">Published in: ${book.published}</h6>
  
          <div class="buttonDiv">
             <button type="button" class="wishlist" id="add-to-wishlist-section">Want to Read</button>
             <button type="button" class="have-read" id="add-to-read-section">Have Read</button>
            </div>
        </div>
        </div>
      `;

        resultsContent.insertAdjacentHTML("beforeend", bookCard);

    })
}


// adding click event for sections
document.addEventListener("click", (event) => {
    if (event.target.id === "add-to-wishlist-section") addBookToWishlist(event);
    else if (event.target.id === "add-to-read-section") addBookToRead(event);
})


// Wishlist book list
function addBookToWishlist(event) {
    let bookId = event.target.parentElement.parentElement.parentElement.id;
    let book = booksArray.find((book) => { return book.version === Number(bookId) })
    if (!book.wishlist) {book.wishlist = true; book.hasRead = false;}
    else { book.wishlist = false;};

    displayBookWishlist()

    fetch("/books/readlist", {
        method: "POST",
        body: JSON.stringify({
            version: `${book.version}`,
            title: `${book.title}`,
            author: `${book.author}`,
            published: `${book.published}`,
            wishlist: `${book.wishlist}`,
            hasRead: `${book.hasRead}`,
            liked: `${book.liked}`,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Accept": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => { console.log("added to wishlist >", data); displayBooks(data); })
}


function displayBookWishlist() {
    wishlistResults.innerHTML = "";

    booksArray.find((book) => {
        if (book.wishlist) {
            let bookCard = `
          <div class="card" id="${book.version}">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <h6 class="card-subtitle mb-2 card-author">Author(s): ${book.author}</h6>
            <h6 class="card-subtitle mb-2 card-year">Published in: ${book.published}</h6>
            <div class="buttonDiv">
               <button type="button" class="have-read" id="add-to-read-section">Have Read</button>
            </div>
          </div>
          </div>
        `;

            wishlistResults.insertAdjacentHTML("beforeend", bookCard);
        }
    })
}
fetch("/books/wishlist/true", {
    method: "GET",
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Accept": "application/json",
    },
})
    .then((res) => res.json())
    .then((data) => {
        console.log("data", data);
        data.forEach((book) => {
            console.log("display >", book)
            let bookCard = `
            <div class="card" id="${book.version}">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <h6 class="card-subtitle mb-2 card-author">Author(s): ${book.author}</h6>
              <h6 class="card-subtitle mb-2 card-year">Published in: ${book.published}</h6>
              <div class="buttonDiv">
              <button type="button" class="have-read" id="add-to-read-section">Have Read</button>
           </div>
            </div>
            </div>
            `
            wishlistResults.insertAdjacentHTML("beforeend", bookCard)
        });

    })
    .catch((err) => { console.error(err) });

// read book list
function addBookToRead(event) {
    const bookCardId = event.target.parentElement.parentElement.parentElement.id;
    let book = booksArray.find((book) => { return book.version === Number(bookCardId) })

    if (!book.hasRead) {book.hasRead = true;}
    else book.hasRead = false;
    if (book.wishlist = true) { return book.wishlist = false}

    displayBooksRead()

    fetch("/books/readlist", {
        method: "POST",
        body: JSON.stringify({
            version: `${book.version}`,
            title: `${book.title}`,
            author: `${book.author}`,
            published: `${book.published}`,
            wishlist: `${book.wishlist}`,
            hasRead: `${book.hasRead}`,
            liked: `${book.liked}`,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Accept": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => { console.log("posted to read ->", data); displayBooks(data); })
}


function displayBooksRead() {
    booksReadResults.innerHTML = "";
    booksArray.find((book) => {
        if (book.hasRead) {
            let bookCard = `
          <div class="card" id="${book.version}">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <h6 class="card-subtitle mb-2 card-author">Author(s): ${book.author}</h6>
            <h6 class="card-subtitle mb-2 card-year">Published in: ${book.published}</h6>
            <div class="ratingDiv">
               <i class="fa fa-thumbs-up liked-book"></i>
               <i class="fa fa-thumbs-down disliked-book"></i>
            </div>
          </div>
          </div>
        `;

            booksReadResults.insertAdjacentHTML("beforeend", bookCard)

        }
    })
}
fetch("/books/readlist/true", {
    method: "GET",
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Accept": "application/json",
    },
})
    .then((res) => res.json())
    .then((data) => {
        console.log("data", data);
        data.forEach((book) => {
            console.log("display >", book)
            let bookCard = `
            <div class="card" id="${book.version}">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <h6 class="card-subtitle mb-2 card-author">Author(s): ${book.author}</h6>
              <h6 class="card-subtitle mb-2 card-year">Published in: ${book.published}</h6>

            <div class="ratingDiv-data">
               <i class="fa fa-thumbs-up book-liked"></i>
               <i class="fa fa-thumbs-down book-disliked"></i>
            </div>
            </div>
            </div>
            `
            booksReadResults.insertAdjacentHTML("beforeend", bookCard)


            document.addEventListener("click", (event) => {
                let bookCardId = event.target.parentElement.parentElement.parentElement.id;
                let bookSelected = data.find((book) => book.version == bookCardId)
                let likedRating = document.querySelector(".book-liked");
                let dislikedRating = document.querySelector(".book-disliked")

                if (event.target.classList.contains("book-liked")) {
                    likedRating.setAttribute("id", "book-rated-up");
                    dislikedRating.removeAttribute("id", "book-rated-down");
                    bookSelected.liked = true;
                    
                    fetch(`/books/${bookCardId}`, {
                        method: "PUT",
                        body: JSON.stringify({ liked: `${book.liked}` }),
                        headers: {
                          "Content-type": "application/json; charset=UTF-8",
                          "Accept": "application/json",
                        },
                      })
                        .then((res) => {console.log("happend"); res.json()})
                        .catch((error) => {
                          console.log(error);
                        });
                }
                else if (event.target.classList.contains("book-disliked")) {
                    dislikedRating.setAttribute("id", "book-rated-down");
                    likedRating.removeAttribute("id", "book-rated-up");
                    bookSelected.liked = false;
                    
                    fetch(`/books/${bookCardId}`, {
                        method: "PUT",
                        body: JSON.stringify({ liked: `${book.liked}` }),
                        headers: {
                          "Content-type": "application/json; charset=UTF-8",
                          "Accept": "application/json",
                        },
                      })
                        .then((res) => {console.log("happend"); res.json()})
                        .catch((error) => {
                          console.log(error);
                        });
                }
            })

        });

    })
    .catch((err) => { console.error(err) });


// Rating books
document.addEventListener("click", (event) => {
    let bookCardId = event.target.parentElement.parentElement.parentElement.id;
    let book = booksArray.find((book) => book.version == bookCardId)
    let likedRating = document.querySelector(".liked-book");
    let dislikedRating = document.querySelector(".disliked-book")

    if (event.target.classList.contains("liked-book")) {
        likedRating.setAttribute("id", "book-rated-up");
        dislikedRating.removeAttribute("id", "book-rated-down");
        book.liked = true;
        console.log(book)

        fetch(`/books/${bookCardId}`, {
            method: "PUT",
            body: JSON.stringify({ liked: `${book.liked}` }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "Accept": "application/json",
            },
          })
            .then((res) => {console.log("happend"); res.json()})
            .catch((error) => {
              console.log(error);
            });
    }
    else if (event.target.classList.contains("disliked-book")) {
        event.target.dislikedRating.setAttribute("id", "book-rated-down");
        likedRating.removeAttribute("id", "book-rated-up");
        book.liked = false;
        console.log(book)

        fetch(`/books/${bookCardId}`, {
            method: "PUT",
            body: JSON.stringify({ liked: `${book.liked}` }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "Accept": "application/json",
            },
          })
            .then((res) => {console.log("happend"); res.json()})
            .catch((error) => {
              console.log(error);
            });
    }

})

