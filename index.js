import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import WikiSearch from './WikiSearch';
import WikiList from './WikiList';
import DropDownList from './DropDownList';
import Route from './Route';
import Header from './Header';
import SeasonDisplay from './Detect';
import GetLocation from './GetLocation';
import GetWeather from './GetWeather';
import GetCoordintes from './GetLocation';
import GetCity from './GetCity';

const options = [{label:'Green',value:'green'},{label:'Red', value:'red'}];


class App extends React.Component{
    state = {images:[],wikis:[],selected:options[0]};
    
    onSearchSubmit = async (userinput) => {
        const walawala = await axios.get('https://api.unsplash.com/search/photos',{
            headers:{
                Authorization: 'Client-ID 4tPk10CgWJ1P_eQl18DhFXmapGgtDMUsf-aL-7ePEQ8', 
            },
            params:{ query:userinput }    
        })
        
        console.log(walawala.data.results);
        this.setState({images: walawala.data.results});
        
    }
    onWikirun = async (wikiterm) =>{
       const wikiwiki = await axios.get('https://en.wikipedia.org/w/api.php',{
           params:{
               action:'query',
               list:'search',
               origin:'*',
               format:'json',
               srsearch: wikiterm
           }
       })

       console.log(wikiwiki.data.query.search);
       this.setState({wikis:wikiwiki.data.query.search});
        
    }
    onChangeSelected = (option) =>{
        this.setState({selected:option},()=>{console.log(this.state.selected)})
    }
    
    
    

    render(){     
     return (<div>
            Simple react project
            <Header/>
            <GetCity/>
            <GetLocation/>
            <Route path="/unsplash">
                <SearchBar run={this.onSearchSubmit}/>
                Photos found: {this.state.images.length}
                <ImageList list={this.state.images}/>
            </Route>
            <Route path='/wikipedia'>
                <WikiSearch wikirun={this.onWikirun}/>
                wikis: {this.state.wikis.length}
                <WikiList wikilist={this.state.wikis}/>
            </Route>
            <Route path='/test1'>
                <DropDownList options={options} selected={this.state.selected} 
                changeSelected={(option)=>this.onChangeSelected(option)}/> 
            </Route>
        </div>);
        //{()=>this.setState({selected:option})}
         
        
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));