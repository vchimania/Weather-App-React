import React from 'react';
import './weather.css';
let api = {
    key: '18c9ce84016bf39727c21562ee799c1e'
}
class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            data: {},
            loading: true,
            date: {}
        };
    }
    check = (e) => {
        if (e.keyCode === 13) this.search();
    }
    search = prevState => {
        if (this.refs.myInput !== null) {
            var input = this.refs.myInput;
            let inputValue = input.value;
            inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1)
            this.setState({ city: inputValue })
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${api.key}`)
                .then(res => res.json())
                .then((result) => {
                    this.setState
                        ({
                            data: result, loading: false, date: new Date().toLocaleString()
                        });
                }).catch(() => {
                    console.log("No cities found");
                });

        }
    }
    render() {
        return (
            <div>
                <div className="app-wrap">
                    <h1>Weather App</h1>
                    <header>
                        <input onKeyDown={this.check} ref="myInput" type="text" autoComplete="off" className="search-box" placeholder="Search for a city..." />
                        <button onClick={this.search}>Search</button>
                    </header>
                    {
                        (this.state.loading || this.state.data.cod === "404")
                            ? <p>Search for a City name here!</p>
                            :
                            <main>
                                <section className="location">
                                    <div className="city">{this.state.city}</div>
                                    <div className="date">{this.state.date}</div>
                                </section>
                                <div className="current">

                                    <div className="temp">{parseInt(this.state.data.main.temp) - 273}<span>°C</span></div>
                                    <div className="weather">{this.state.data.weather[0].main}</div>
                                    <div className="hi-low">{`(${parseInt(this.state.data.main.temp_min) - 273}) °C / (${parseInt(this.state.data.main.temp_max) - 273}) °C`}</div>
                                </div>
                            </main>
                    }
                </div>
            </div>
        )
    }
}
export default Weather;