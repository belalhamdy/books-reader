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
    return ( <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{
    width: 128,
    height: 193,
    backgroundImage: `url(${(book.imageLinks && book.imageLinks.smallThumbnail)?book.imageLinks.smallThumbnail:"https://i.imgur.com/sJ3CT4V.gif"})`
}}/>
            <div className="book-shelf-changer">
                {console.log(book)}
                <select  defaultValue={book.shelf || "none"} onChange={this.handleUpdateShelf}>
                    <option  value="move" disabled = {true}>Move to...</option>
                    <option  value="currentlyReading">{book.shelf === "currentlyReading"? String.fromCharCode(10003):""} Currently Reading</option>
                    <option  value="wantToRead">{book.shelf === "wantToRead"? String.fromCharCode(10003):""} Want to Read</option>
                    <option  value="read" >{book.shelf === "read"? String.fromCharCode(10003):""} Read</option>
                    <option value="none">{(book.shelf === "none" || !book.shelf) ? String.fromCharCode(10003):""}  None</option>
                </select>
            </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors"> <BookAuthors authors = {book.authors}/> </div>

    </div>)
    }
}

export default Book;
