import { useEffect, useState } from "react"
import axios from "axios"
const api_key = process.env.REACT_APP_API_KEY

const Content = ({countryToShow,api,weather,rest}) =>{

    const countryData = api.filter((country)=>
    countryToShow.toString() === country.name.common)[0]

    return(
      <div>
  
        <h1>{countryToShow}</h1>
        <p>Capital: {countryData.capital}</p>
        <p >Area: {countryData.area}</p>
        <h3>Languages:</h3>

        <ul>
    {Object.values(countryData.languages).map(language =>
      <li key = {language}> {language} </li>
    )}   
    </ul>
      <div style={{ fontSize: "1000%", }}>{countryData.flag}</div>
        <h2>Weather in {countryData.capital}</h2>
        <p>temperature: {rest.temp} fahrenheit</p> 
        <div><img src= {`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="Icon showing clouds and sun"></img></div>
        <p>feels like: {rest.feels_like} fahrenheit</p>
      </div>
    )
}


const List = ({countryToShow}) => {
  // const handleClick = (x) =>{
  //   setCountryToShow([x.country])
  // }
  // <button onClick={()=>handleClick(country)}

  return(
    countryToShow.map(country =>
      <li key = {country}> {country} 
      <button> show </button>
      </li>
      )
  )
}
const SearchResults = ({api,countryToShow,handleClick,weather,rest}) =>{

  if(countryToShow.length > 10){
return(<div>Too many matches, specify another filter</div>
)} 

  if(countryToShow.length === 1){
    return(
      <div> <Content api={api} countryToShow ={countryToShow} weather={weather} rest={rest}/> </div>
    )
  }
  else return(
    <ul>
      <List handleClick={handleClick} countryToShow={countryToShow}/>
    </ul>
    )
} 

const Filter = ({search, handleSearch}) =>{
  return(
     <p>
      find countries
      <input value ={search} onChange ={handleSearch} />
     </p>
  )
  }
function App() {
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const [api,setAPI] = useState([])
  const [countryToShow,setCountryToShow] = useState([])
  const [weather,setWeather] = useState([])
  const [rest,setRest] = useState([])

  const hook = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
       setData(response.data.map(country => country.name.common))
       setAPI(response.data.map(country=> country))
    })
  }
  useEffect(hook,[])

  const countryData = api.filter((country)=>
  countryToShow.toString() === country.name.common)[0]
  const hookWeather = () => {
    if (countryToShow.length === 1){ 
    axios
    .get(`http://api.openweathermap.org/geo/1.0/direct?q=${countryData.capital}&limit=5&appid=${api_key}`)
    .then(response => {
      setWeather(response.data[0])
    })
  }
    else return
  }

  useEffect(hookWeather,[countryToShow])


  const hookWeatherTwo = () => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${weather.lat}&lon=${weather.lon}&appid=${api_key}&units=imperial`)
    .then(response => {
      setWeather(response.data.weather[0])
      setRest(response.data.main)
    })
  }

  useEffect(hookWeatherTwo,[weather])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setCountryToShow(data.filter(country=>(country.toLowerCase()).includes(search.toLowerCase())))
  }
return(
<div>
  <h1>Country Search</h1>
    <div>
      <Filter search={search} handleSearch={handleSearch}/>
    </div>

    <div>
        <SearchResults data={data} search={search} api={api} countryToShow={countryToShow} weather={weather} rest={rest}/>
    </div>
</div>
)
}

export default App;
