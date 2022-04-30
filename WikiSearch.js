import React from "react";

class WikiSearch extends React.Component{
    state={wikiterm:''}
    wikisearch = (event) => {
        event.preventDefault();

        this.props.wikirun(this.state.wikiterm);


    }

    render(){
        return<div>
            <form onSubmit={this.wikisearch}>
            <h1>This is the wikipedia api searchBar</h1>
            <input type='text'
                onChange={e=>this.setState({wikiterm:e.target.value})}
                value={this.state.wikiterm}
            />
            <input type="submit"/>
            </form>
        </div>
    }
}
export default WikiSearch;