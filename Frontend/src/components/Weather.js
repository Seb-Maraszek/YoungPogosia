import React from 'react'
import WeatherLayout from './Main/WeatherLayout'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './Main/Navbar'
import tempHourly from './Main/ResponseData/TempHourly'
import setTempHourly from './Main/ResponseData/SetTempHourly'
import tempNextDays from './Main/ResponseData/TempNextDays'
import setTempNextDays from './Main/ResponseData/SetTempNextDays'
import {
  faCloudSun,
  faCloudRain,
  faSun,
  faCloudShowersHeavy,
  faSnowflake,
  faSmog,
  faMoon,
  faCloudMoon,
  faCloud,
  faBolt,
} from '@fortawesome/free-solid-svg-icons'
import FavoritesLayout from './Favorites/FavoritesLayout'
import SearchOverlay from './Main/SearchOverlay'
class Weather extends React.Component {
  constructor() {
    super()
    this.state = {
      date: '01.01',
      hour: '00:00',
      city: 'Warsaw',
      country: 'PL',
      temp: 0,
      navbarValue: 0,
      error: false,
      warning: false,
      weatherId: 201,
      icon: 'faCloudSun',
      openSearch: false,
      tempMin: 0,
      tempMax: 0,
      weatherType: 'clouds',
      details: [
        { humidity: 0 },
        { pressure: 0 },
        { feelsLike: 0 },
        { windDeg: 0 },
        { windSpeed: 0 },
        { visibility: 0 },
      ],
      tempHourly,
      tempNextDays,
      favList: [],
    }
    this.handleDeletion = this.handleDeletion.bind(this)
  }

  componentDidMount() {
    this.weatherLoc(this.getWeatherByLoc)
    if (window.location.href.split('/')[3] === 'favorites') {
      this.setState({ navbarValue: 'favorites' })
    }
    if (localStorage != null) {
      const list = localStorage.getItem('list')
      this.setState({ favList: list == null ? [] : JSON.parse(list) })
    }
  }

  getWeatherByLoc = async (position) => {
    const api_call = await fetch(
      `https://127.0.0.1:8000/weather/coords/?lat=${position.coords.latitude}&lon=${position.coords.longitude}&user_uuid=123123123`
    );
    const response = await api_call.json();
    this.getResults(response);
  };

  getWeather = async (e) => { 
    e.preventDefault();
    const city = e.target.elements.city.value;
    if (city !== "") {
      const api_call = await fetch(`http://localhost:8000/weather/city/?city=${city}`);
      const response = await api_call.json();
      if (response.cod === "404") {
        this.setState({
          error: true,
        });
      } else {
        this.getResults(response);
      }
    }
  };

  getResults(response) {
    this.setState({
      date: this.toDate(response.list[0].dt_txt),
      hour: this.toHour(response.list[0].dt_txt),
      city: response.city.name,
      temp: this.toCelsius(response.list[0].main.temp),
      tempMin: this.toCelsius(response.list[0].main.temp_min),
      tempMax: this.toCelsius(response.list[0].main.temp_max),
      weatherId: response.list[0].weather[0].id,
      weatherType: response.list[0].weather[0].main,
      details: [
        { humidity: response.list[0].main.humidity },
        { pressure: response.list[0].main.pressure },
        { feelsLike: this.toCelsius(response.list[0].main.feels_like) },
        { windDeg: response.list[0].wind.deg },
        { windSpeed: response.list[0].wind.speed },
        { visibility: this.toKm(response.list[0].visibility) },
      ],
      tempHourly: setTempHourly(
        response,
        this.toCelsius,
        this.toDate,
        this.toHour
      ),
      tempNextDays: setTempNextDays(
        response,
        this.toCelsius,
        this.toDate,
        this.toHour
      ),
    })
  }

  weatherIcon(weatherId, hour) {
    switch (true) {
      case weatherId >= 200 && weatherId <= 232:
        return faBolt
      case weatherId >= 300 && weatherId <= 321:
        return faCloudRain
      case weatherId >= 500 && weatherId <= 531:
        return faCloudShowersHeavy
      case weatherId >= 600 && weatherId <= 622:
        return faSnowflake
      case weatherId >= 700 && weatherId <= 781:
        return faSmog
      case weatherId === 800:
        if (parseInt(hour) <= 20 && parseInt(hour) >= 6) {
          return faSun
        }
        return faMoon
      case weatherId === 801:
        if (parseInt(hour) <= 20 && parseInt(hour) >= 6) {
          return faCloudSun
        }
        return faCloudMoon
      case weatherId === 802:
        return faCloud
      default:
        return faCloud
    }
  }
  weatherLoc(getWeatherByLoc) {
    navigator.geolocation.getCurrentPosition(getWeatherByLoc)
  }
  toCelsius(temp) {
    return Math.floor(temp - 273.15)
  }

  toDate(date) {
    let dateStr = date.split(' ')[0].slice(5)
    dateStr = dateStr.substr(3, 2) + '.' + dateStr.substr(0, 2)
    return dateStr
  }

  toHour(date) {
    return date.split(' ')[1].slice(0, 5)
  }

  toKm(range) {
    return range / 1000
  }

  handleNavClick = (val) => {
    this.setState({ navbarValue: val })
  }

  handleSearchOpen = (isOpen) => {
    this.setState({
      openSearch: isOpen,
    })
  }

  handleErrorClose = (event, reason) => {
    this.setState({
      error: false,
      warning: false,
    })
    if (reason === 'clickaway') {
      return
    }
  }

  handleDeletion(id) {
    const array = this.state.favList.filter(function (value, index, arr) {
      return index !== id
    })
    this.setState({
      favList: array,
    })
    localStorage.setItem('list', JSON.stringify(array))
  }

  render() {
    return (
      <Router>
        <Navbar
          handleSearchOpen={this.handleSearchOpen}
          navbarValue={this.state.navbarValue}
          handleNavClick={this.handleNavClick}
          textInput={this.textInput}
        />
        <Switch>
          <Route path='/' exact>
            <WeatherLayout
              loadWeather={this.getWeather}
              error={this.state.error}
              city={this.state.city}
              temp={this.state.temp}
              tempMin={this.state.tempMin}
              tempMax={this.state.tempMax}
              country={this.state.country}
              weatherId={this.state.weatherId}
              weatherIcon={this.weatherIcon}
              weatherType={this.state.weatherType}
              weatherLoc={this.weatherLoc}
              tempNextDays={this.state.tempNextDays}
              tempHourly={this.state.tempHourly}
              details={this.state.details}
              handleNavClick={this.handleNavClick}
              handleErrorClose={this.handleErrorClose}
              getWeatherByLoc={this.getWeatherByLoc}
            />
            <SearchOverlay
              loadWeather={this.getWeather}
              error={this.state.error}
              handleSearchOpen={this.handleSearchOpen}
              openSearch={this.state.openSearch}
              handleNavClick={this.handleNavClick}
              textInput={this.textInput}
            />
          </Route>
          <Route path="/favorites">
            <FavoritesLayout
              favList={this.state.favList}
              handleNavClick={this.handleNavClick}
              loadWeather={this.getWeather}
              favoritesWidget={this.state.favoritesWidget}
              weatherIcon={this.weatherIcon}
              error={this.state.error}
              handleErrorClose={this.handleErrorClose}
              warning={this.state.warning}
              handleDeletion={this.handleDeletion}
            />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default Weather
