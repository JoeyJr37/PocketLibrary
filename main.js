"use strict";
let myLibrary = [];
let newBookBtn = document.querySelector("#addNewBook");

function make(element){
	return document.createElement(element);
	};

// Book object constructor
function Book(title, author, pages, readStatus, summary) {
	this.author = author;
	this.title = title;
	this.pages = pages;
	this.readStatus = false;
	this.summary = summary;
};

//function that adds books to library
function addBookToLibrary(bookObj) {
	let newBook = new Book(bookObj.title, bookObj.author, bookObj.pages, bookObj.readStatus, bookObj.summary);
	myLibrary.push(newBook);
	return myLibrary;
	};

function getBookInfo() {
let title = document.querySelector("#book-title").value;
let author = document.querySelector("#book-author").value;
let pages = document.querySelector("#book-pages").value;
let summary = document.querySelector("#book-summary").value;
let readStatus = document.querySelector("#book-read-status");
let bookInfo = {
		title,
		author,
		pages,
		summary,
		readStatus};
	addBookToLibrary(bookInfo);
	};
function closeModal() {
  modal.style.display = "none";
};

function clearBookInput() {
	document.querySelector("#book-title").value = "";
	document.querySelector("#book-author").value = "";
	document.querySelector("#book-pages").value = "";
	document.querySelector("#book-summary").value = "";
	};

function createNewCell(element, objPropertyValue){
	let newCell = make(element);
	newCell.textContent = objPropertyValue;
	return newCell;
	};

Book.prototype.updateReadStatus = function() {
	this.classList.toggle("read");
	if (this.style.backgroundColor === "red") {this.textContent = "READ";}
	else {this.textContent = "NOT READ";};
		};

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
		let readStatusCell = createNewCell("td", book.readStatus);
		let readStatusBtn = make("button");
		readStatusBtn.setAttribute("class", "readStatusBtn");
		let deleteBtnCell = createNewCell("td");
		readStatusBtn.textContent = "NOT READ";
		readStatusCell.append(readStatusBtn);
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
		let readStatusBtns = document.querySelectorAll(".readStatusBtn");
		readStatusBtns.forEach(item => item.addEventListener("click", book.updateReadStatus));	
		deleteBtn.addEventListener("click", () => {
			let thisRow = document.getElementById(bookID);
			thisRow.remove();
			let idNumber = bookID - 1;
			myLibrary.splice(idNumber, 1);});
	});
	clearBookInput();
	closeModal();
};

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