import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handlePointerDown = this.handlePointerDown.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.state = {filler: 'Enter A Song, Album, or Artist'}
    }

    search() {
        this.props.onSearch(this.state.term)
    }

    handleTermChange(event) {
        this.setState({term: event.target.value})
    }

    handlePointerDown() {
        this.setState({filler: ''})
    }

    handleBlur() {
        this.setState({filler: 'Enter A Song, Album, or Artist'})
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder={this.state.filler} onChange={this.handleTermChange} onPointerDown={this.handlePointerDown} onBlur={this.handleBlur}/>
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}

export default SearchBar;