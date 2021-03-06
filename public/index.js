const resultsContent = document.querySelector("#results");
const booksReadResults = document.querySelector(".readContent");
const wishlistResults = document.querySelector(".wishlistContent");
const searchInput = document.querySelector("input");
const getBooksBtn = document.querySelector(".getBooks");

getBooksBtn.addEventListener("click", () => {
    resultsContent.innerHTML = " ";
    fetchBooksApi();
})

searchInput.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
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


// adding click event for wishlist
document.addEventListener("click", (e) => {
    if (e.target.id === "add-to-wishlist-section") addBookToWishlist(e);
})


// Wishlist book list
function addBookToWishlist(e) {
    let bookCardId = e.target.parentElement.parentElement.parentElement.id;
    let bookSelected = booksArray.find((book) => { return book.version === Number(bookCardId) })
    if (!bookSelected.wishlist) {bookSelected.wishlist = true;}
    else if (bookSelected.wishlist) {return bookSelected.wishlist = false }
    else {console.log("there was an error.")}

    displayBookWishlist()

    fetch("/books/readlist", {
        method: "POST",
        body: JSON.stringify({
            version: `${bookSelected.version}`,
            title: `${bookSelected.title}`,
            author: `${bookSelected.author}`,
            published: `${bookSelected.published}`,
            wishlist: `${bookSelected.wishlist}`,
            hasRead: `${bookSelected.hasRead}`,
            liked: `${bookSelected.liked}`,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Accept": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {displayBooks(data); })
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
               <button type="button" class="have-read" id="move-to-read-section">Have Read</button>
            </div>
          </div>
          </div>
        `;

            wishlistResults.insertAdjacentHTML("beforeend", bookCard);
            alert(`"${book.title}" was added to books your wishlist."`)
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
        console.log("wishlist array:", data);
        data.forEach((book) => {
            displayBookWishlist(book)
            let bookCard = `
            <div class="card" id="${book.version}">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <h6 class="card-subtitle mb-2 card-author">Author(s): ${book.author}</h6>
              <h6 class="card-subtitle mb-2 card-year">Published in: ${book.published}</h6>
              <div class="buttonDiv">
              <button type="button" class="have-read" id="move-to-read-section">Have Read</button>
           </div>
            </div>
            </div>
            `
            wishlistResults.insertAdjacentHTML("beforeend", bookCard);


            document.addEventListener("click", (e) => {
                let bookCardId = e.target.parentElement.parentElement.parentElement.id;
                let bookSelected = data.find((book) => book.version === Number(bookCardId));

                if (e.target.id === "move-to-read-section") {
                    bookSelected.hasRead = true;
                    bookSelected.wishlist = false;
                    alert(`"${bookSelected.title}" was move to books you have read.`)

                    fetch(`/books/${bookCardId}`, {
                        method: "PUT",
                        body: JSON.stringify({ hasRead: `${bookSelected.hasRead}`, wishlist: `${bookSelected.wishlist}` }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            "Accept": "application/json",
                        },
                    })
                        .then((res) => {
                            res.json();
                            location.reload();
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                }

            })

        });
    })
    .catch((err) => { console.error(err) });


    // adding click event for read
document.addEventListener("click", (e) => {
    if (e.target.id === "add-to-read-section") addBookToRead(e);
})
// read book list
function addBookToRead(e) {
    const bookCardId = e.target.parentElement.parentElement.parentElement.id;
    let bookSelected = booksArray.find((book) => { return book.version === Number(bookCardId) })

    if (!bookSelected.hasRead) { bookSelected.hasRead = true; }
    else if (bookSelected.hasRead) {bookSelected.hasRead = false;}
    else {console.log("there was an error.")};

    if (bookSelected.wishlist = true) { bookSelected.wishlist = false }

    displayBooksRead()

    fetch("/books/readlist", {
        method: "POST",
        body: JSON.stringify({
            version: `${bookSelected.version}`,
            title: `${bookSelected.title}`,
            author: `${bookSelected.author}`,
            published: `${bookSelected.published}`,
            wishlist: `${bookSelected.wishlist}`,
            hasRead: `${bookSelected.hasRead}`,
            liked: `${bookSelected.liked}`,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Accept": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {displayBooks(data); })
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
            <h6 class="card-subtitle mb-2 card-rating">Book Liked: ${book.liked}</h6>

            <div class="ratingDiv">
               <i class="fa fa-thumbs-up liked-book"></i>
               <i class="fa fa-thumbs-down disliked-book"></i>
            </div>
          </div>
          </div>
        `;

            booksReadResults.insertAdjacentHTML("beforeend", bookCard);
            alert(`"${book.title}" was added to books you have read."`);

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
        console.log("books read array", data);
        data.forEach((book) => {
            let bookCard = `
            <div class="card" id="${book.version}">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <h6 class="card-subtitle mb-2 card-author">Author(s): ${book.author}</h6>
              <h6 class="card-subtitle mb-2 card-year">Published in: ${book.published}</h6>
            <h6 class="card-subtitle mb-2 card-rating">Book Liked: ${book.liked}</h6>


            <div class="ratingDiv-data">
               <i class="fa fa-thumbs-up book-liked"></i>
               <i class="fa fa-thumbs-down book-disliked"></i>
            </div>
            </div>
            </div>
            `
            booksReadResults.insertAdjacentHTML("beforeend", bookCard)

        });

        document.addEventListener("click", (e) => {
            let bookCardId = e.target.parentElement.parentElement.parentElement.id;
            let bookSelected = data.find((book) => book.version === Number(bookCardId))

            if (e.target.classList.contains("book-liked")) {
                bookSelected.liked = true;
                alert(`"${bookSelected.title}" has been liked`);


                fetch(`/books/${bookCardId}`, {
                    method: "PUT",
                    body: JSON.stringify({ liked: `${bookSelected.liked}` }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Accept": "application/json",
                    },
                })
                    .then((res) => { console.log("changed rating"); res.json();
                    location.reload();

                 })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            else if (e.target.classList.contains("book-disliked")) {
                bookSelected.liked = false;
                alert(`"${bookSelected.title}" has been disliked`);


                fetch(`/books/${bookCardId}`, {
                    method: "PUT",
                    body: JSON.stringify({ liked: `${bookSelected.liked}` }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Accept": "application/json",
                    },
                })
                    .then((res) => {
                        console.log("changed rating"); res.json();
                        location.reload();

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        })
    })
    .catch((err) => { console.error(err) });

document.addEventListener("click", (e) => {
    let bookCardId = e.target.parentElement.parentElement.parentElement.id;
    let bookSelected = booksArray.find((book) => book.version === Number(bookCardId));

    if (e.target.id === "move-to-read-section") {
        bookSelected.hasRead = true;
        bookSelected.wishlist = false;
        alert(`"${bookSelected.title} was moved to books you have read.`)


        fetch(`/books/${bookCardId}`, {
            method: "PUT",
            body: JSON.stringify({ hasRead: `${bookSelected.hasRead}`, wishlist: `${bookSelected.wishlist}` }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json",
            },
        })
            .then((res) => {
                res.json();
                location.reload();
            })
            .catch((error) => {
                console.log(error);
            });

    }

})


// Rating books
document.addEventListener("click", (e) => {
    let bookCardId = e.target.parentElement.parentElement.parentElement.id;
    let bookSelected = booksArray.find((book) => book.version === Number(bookCardId))

    if (e.target.classList.contains("liked-book")) {
        bookSelected.liked = true;
        alert(`"${bookSelected.title}" has been liked`);

        fetch(`/books/${bookCardId}`, {
            method: "PUT",
            body: JSON.stringify({ liked: `${bookSelected.liked}` }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json",
            },
        })
            .then((res) => { res.json(); 
                location.reload();

            })
            .catch((error) => {
                console.log(error);
            });
    }
    else if (e.target.classList.contains("disliked-book")) {
        bookSelected.liked = false;
        alert(`"${bookSelected.title}" has been disliked`);


        fetch(`/books/${bookCardId}`, {
            method: "PUT",
            body: JSON.stringify({ liked: `${bookSelected.liked}` }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json",
            },
        })
            .then((res) => {res.json(); 
                        location.reload();

        })
            .catch((error) => {
                console.log(error);
            });
    }

})
