class GetWeather {
    async getCurrent(input){
        const myKey="1a25e4b2e87c7e5b415c51715bbeb1a3";

        const response = await GetWeather(
            `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${myKey}`
        )
        const data = await response.json();
        console.log(data);
        return data;
    }
}
export default GetWeather;