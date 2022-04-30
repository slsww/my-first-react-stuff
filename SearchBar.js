import React from 'react';

class SearchBar extends React.Component{
    state = {userinput:''};

    searchbarsearch=(event)=>{
        event.preventDefault();
        
        this.props.run(this.state.userinput);
    };

    render(){
        return (
            <div>
                <form onSubmit={this.searchbarsearch}>
                Image search engine<br/> with unsplash api
                <div>
                <input type='text'
                 onChange={e=>this.setState({userinput : e.target.value})}
                 value = {this.state.userinput} 
                 />
                 </div>
                 
                </form>
            </div>
        )
    }
}
export default SearchBar;