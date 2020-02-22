import React, {Component} from 'react';

/**
 * @return {string}
 */
function BookAuthors (props){
    const {authors} = props;
    return (authors? authors.join(" - "):"")
}
class Book extends Component{
    handleUpdateShelf = (event) => {
        this.props.updateShelf(this.props.book,event.target.value)
    }
    render() {
    const {book} = this.props;
        console.log(book)
    return ( <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{
    width: 128,
    height: 193,
    backgroundImage: `url(${(book.imageLinks && book.imageLinks.smallThumbnail)?book.imageLinks.smallThumbnail:"https://i.imgur.com/sJ3CT4V.gif"})`
}}/>
            <div className="book-shelf-changer">
                <select onChange={this.handleUpdateShelf}>
                    <option value="move" disabled = {true}>Move to...</option>
                    <option value="currentlyReading" hidden={book.shelf === "currentlyReading"}>Currently Reading</option>
                    <option value="wantToRead" hidden={book.shelf === "wantToRead"}>Want to Read</option>
                    <option value="read" hidden={book.shelf === "read"}>Read</option>
                    <option value="none" hidden={book.shelf === "none" || !book.shelf}>None (Remove)</option>
                </select>
            </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors"> <BookAuthors authors = {book.authors}/> </div>

    </div>)
    }
}

export default Book;
