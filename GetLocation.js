import React from "react";   
import axios from 'axios';
import SummerE from './SummerE';
import WinterE from './WinterE';
class GetLocation extends React.Component{
    constructor(props){
        super(props);
        this.state={CITY:''};
        this.state={keyword:''};
        this.state={images:[]}
        this.state={VRL:''};
        this.state={temp:0};
        this.state={weather_object:{weather_info:[{}]}};
        
       

    }
    
    GetCoordintes = () => {
            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };
          
            const success=(pos)=>{
                var crd = pos.coords;
                var lat = crd.latitude.toString();
                var lng = crd.longitude.toString();
                var coordinates = [lat, lng];
                console.log(`Latitude: ${lat}, Longitude: ${lng}`);
                this.GetCity(coordinates);
          
            }
          
            const error = (err) => {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }
          
            navigator.geolocation.getCurrentPosition(success, error, options);
        }
    
    
    
    GetCity = (coordinates) => {
         const processRequest = (i)=>{
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                var city = response.address.town;
                console.log(city);
                this.setState({CITY:city});
            }
        }
            var xhr = new XMLHttpRequest();
            var lat = coordinates[0];
            var lng = coordinates[1];
            xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.c7f693a43d22440ae7db56d14cfc9f57&lat=" +
            lat + "&lon=" + lng + "&format=json", true);
            xhr.send();
            xhr.onreadystatechange = processRequest;
            xhr.addEventListener("readystatechange", processRequest, false);
        }
    apiKey="087ed7513e19dc4c582d22ab8c3e1d9f"
    GetLocalWeather = () => {{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.CITY}&units=imperial&APPID=${this.apiKey}`).then(
            reponse => reponse.json()
        ).then(
            data => {
                this.setState({weather_object:data})
                this.setState({temp:this.state.weather_object.main.temp})
                console.log(this.state.weather_object)
                this.GetKeyword()
            }
        )
  }
}
    Getpic = (e) => {
     axios.get('https://api.unsplash.com/search/photos',{
        headers:{
            Authorization: 'Client-ID 4tPk10CgWJ1P_eQl18DhFXmapGgtDMUsf-aL-7ePEQ8', 
        },
        params:{ query:e }    
    }).then(res=>{
        console.log(res.data.results)
        this.setState({images:res.data.results})
        this.setState({VRL:res.data.results[Math.floor(Math.random() * 11)].urls.regular})
        console.log(this.state.VRL)
    })
    
}
    GetKeyword = () =>{
        this.setState({keyword:this.state.weather_object.weather[0].description});
        this.UseKeyword(this.state.keyword);
    }//called by GetLocalWeather function.

    UseKeyword = (e) =>{
        this.Getpic(e)
    }
    render(){ 
        const Style={}
    return <div>
    {this.GetCoordintes()}
    Your current city is {this.state.CITY}<br/>
    Current Keyword: {this.state.keyword}<br/>
    Current temp:{this.state.temp}<br/>
    <button onClick={this.GetLocalWeather}>View the local weather</button>
    <img src={this.state.VRL}/>
    {typeof this.state.weather_object.main == 'undefined' ? (
        <div>
            <p></p>
        </div>
    ):(
        <div>
            <p>{this.state.weather_object.name}</p>
            <p>{Math.round(this.state.weather_object.main.temp)}F</p>
            <p>{this.state.weather_object.weather[0].main}</p>
        </div>
    )}{this.state.temp>=65? (
        <div>
            You might wantna try these, because it's hot
        <SummerE/></div>
    ):(
        <div>
            You might wanna try these, because it's cold
        <WinterE/></div>
    )}
    </div>;  
    }
}

export default GetLocation;
//backgorund setup 
//list more infomation like exercise or something else
//css decoration