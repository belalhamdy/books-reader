import * as BooksAPI from './BooksAPI'
import Book from './Book'
import React, {Component} from 'react';
// import {Link} from 'react-router-dom'
import {Route,withRouter } from 'react-router-dom'


import './App.css'
import Search from "./Search";
function NoBooks() {
    return <div>No Books</div>
}
function ListBooks(props) {
    const display = props.display;
    return(<div className="list-books">
        <div className="list-books-title">
            <h1>Books Reader</h1>
        </div> <div className='list-books-content'>{display}</div>
         </div>)
}
class BooksApp extends Component {
    componentDidMount() {
        this.refresh()
    }
    searchBooks = (query,thenFunction) => {BooksAPI.search(query).then((books) => thenFunction(books))}
    refresh = () => {BooksAPI.getAll().then((books) => this.setState(() => ({books: books})))}
    updateShelf = (book,newShelf) => {
        BooksAPI.update(book,newShelf).then(this.refresh)
    }
    state = {
        books: [],
        shelfs:["currentlyReading","wantToRead","read"]
    }

    getBooksByShelf = (shelf) => {
        return this.state.books.filter(book => book.shelf.toLowerCase().includes(shelf.toLowerCase()) && book.shelf.length === shelf.length)
    };
    renderBooks = (booksList, shelfName) => {

        return (
            <div className="bookshelf" key = {shelfName}>
                {booksList.length > 0 ? (
                    <div>
                    <h2 className="bookshelf-title">{shelfName}</h2>
                    <div className="bookshelf-books">
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {booksList.map(book => <li key={book.id} ><Book book={book} updateShelf = {this.updateShelf}/></li>)}
                            </ol>
                        </div>
                    </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        )
    }
    renderSearchPage = () => {
        return <Search searchBooks = {this.searchBooks} renderBooks = {this.renderBooks} />}
    renderMainPage = () => {
        const {books,shelfs} = this.state
        const Button = withRouter(({ history }) => (
            <button
                type='button'
                onClick={() => { history.push('/search') }}>
            </button>
        ))
        return<div>
            <div className='open-search'>
                <Button/>
            </div>
            {books.length === 0 && <ListBooks display = {<NoBooks/>}/>}
            {books.length !== 0 && <ListBooks display = {shelfs.map(shelf => this.renderBooks(this.getBooksByShelf(shelf),shelf))}/>}
        </div>

    }
    render() {
        return <div>
            <Route exact path = "/" render = {this.renderMainPage}/>
            <Route exact path = "/search" render = {this.renderSearchPage}/>
        </div>
    }
}

export default BooksApp
