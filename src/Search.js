import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

// import {Link} from 'react-router-dom'

class Search extends Component {
    state = {
        query: "", showingBooks: []
    };
    updateBooks = (newBooks) => {
        this.setState({showingBooks: newBooks   })
    }
    updateQuery = (query) => {
        this.setState({query: query.trim()})
        this.props.searchBooks(query,this.updateBooks)
    };
    clearQuery = () => {
        this.updateQuery("");
    };

    render() {
        const {query, showingBooks} = this.state
        const Button = withRouter(({history}) => (
            <button className="close-search"
                    type='button'
                    onClick={() => {
                        history.push("/")
                    }}>
            </button>
        ))
        return <div className="search-books">
            <div className="search-books-bar">
                <Button/>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" value={query} onChange={(e) => {
                        this.updateQuery(e.target.value)
                    }}/>
                </div>
            </div>
            <div className="search-books-results">
                {this.props.renderBooks(showingBooks, "Result")}
            </div>
        </div>
    }
}

export default Search
