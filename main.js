/* eslint-disable wrap-iife */
"use strict";

let myLibrary = [];
let newBookBtn = document.querySelector("#addNewBook");

function make(element) {
    return document.createElement(element);
};

// Book object constructor
function Book(title, author, pages, readStatus, summary) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
    this.summary = summary;
}

// function that adds books to library
function addBookToLibrary(bookObj) {
    let newBook = new Book(bookObj.title, bookObj.author, bookObj.pages, bookObj.readStatus, bookObj.summary);
    myLibrary.push(newBook);
    return myLibrary;
}

function getBookInfo() {
    let title = document.querySelector("#book-title").value;
    let author = document.querySelector("#book-author").value;
    let pages = document.querySelector("#book-pages").value;
    let summary = document.querySelector("#book-summary").value;
    let readStatus = document.querySelector("input[name = 'book-read-status']:checked").value;
    let bookInfo = {
        title,
        author,
        pages,
        summary,
        readStatus};
    addBookToLibrary(bookInfo);
}
function closeModal() {
    modal.style.display = "none";
}

function clearBookInput() {
    document.querySelector("#book-title").value = "";
    document.querySelector("#book-author").value = "";
    document.querySelector("#book-pages").value = "";
    document.querySelector("#book-summary").value = "";
    document.getElementById("YES").checked = false;
    document.getElementById("NO").checked = false;
};

function createNewCell(element, objPropertyValue) {
    let newCell = make(element);
    newCell.textContent = objPropertyValue;
    return newCell;
};

Book.prototype.updateReadStatus = function() {
    if (this.textContent === "READ") {
        this.classList.add("not-read");
        this.classList.remove("read");
        this.textContent = "NOT READ";
    } else {
        this.classList.add("read");
        this.classList.remove("not-read");
        this.textContent = "READ";
    };
};

const setReadStatus = (bookReadStatus) => {
    let readStatusCell;
    if (bookReadStatus === "YES") {
        readStatusCell = createNewCell("td", "READ");
    } else {
        readStatusCell = createNewCell("td", "NOT READ");
    };
    return readStatusCell;
};
const setReadStatusCellClass = (readStatusTableData) => {
    let readStatusClass;
    let readData = readStatusTableData.textContent;
    if (readData === "READ") {
        readStatusClass = "read";
    } else {
        readStatusClass ="not-read";
    };
    return readStatusClass;
}
function render() {
    getBookInfo();
    document.querySelector(".book_table_body").remove();
    let bookTable = make("tbody");
    bookTable.setAttribute("class", "book_table_body");
    document.querySelector(".book_table").append(bookTable);
    myLibrary.forEach((book) => {
        let bookTitle = createNewCell("td", book.title);
        let bookAuthor = createNewCell("td", book.author);
        let bookPages = createNewCell("td", book.pages);
        let bookSummary = createNewCell("td", book.summary);
        let readStatusCell = setReadStatus(book.readStatus);
        let readStatusCellClass = setReadStatusCellClass(readStatusCell);
        readStatusCell.setAttribute("class", readStatusCellClass);
        readStatusCell.addEventListener("click", book.updateReadStatus);
        let deleteBtnCell = createNewCell("td");
        let deleteBtn = make("button");
        deleteBtn.textContent = "DELETE";
        deleteBtnCell.append(deleteBtn);
        let newRow = make("tr");
        bookTable.append(newRow);
        newRow.append(bookTitle);
        bookTitle.after(bookAuthor);
        bookAuthor.after(bookPages);
        bookPages.after(bookSummary);
        bookSummary.after(readStatusCell);
        readStatusCell.after(deleteBtnCell);
        let bookID = myLibrary.indexOf(book) + 1;
        newRow.setAttribute("id", bookID);
        deleteBtn.addEventListener("click", () => {
            let thisRow = document.getElementById(bookID);
            thisRow.remove();
            let idNumber = bookID - 1;
            myLibrary.splice(idNumber, 1);});
    });
    clearBookInput();
    closeModal();
}

newBookBtn.addEventListener("click", render);
// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const newBookbtn = document.getElementById("newBookBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
newBookbtn.onclick = function() {
    modal.style.display = "block";
};

// add button on each book's display to change it's read status



// hint: add function that toggles read status on prototype
// read about localStorage and/or Firebase