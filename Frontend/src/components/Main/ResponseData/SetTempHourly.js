export default function setTempHourly(response, toCelsius, toDate, toHour) {
  const tempHourly = [
    {
      date: toDate(response.list[0].dt_txt),
      hour: toHour(response.list[0].dt_txt),
      temp: toCelsius(response.list[0].main.temp),
      weatherId: response.list[0].weather[0].id,
    },
    {
      date: toDate(response.list[1].dt_txt),
      hour: toHour(response.list[1].dt_txt),
      temp: toCelsius(response.list[1].main.temp),
      weatherId: response.list[1].weather[0].id,
    },
    {
      date: toDate(response.list[2].dt_txt),
      hour: toHour(response.list[2].dt_txt),
      temp: toCelsius(response.list[2].main.temp),
      weatherId: response.list[2].weather[0].id,
    },
    {
      date: toDate(response.list[3].dt_txt),
      hour: toHour(response.list[3].dt_txt),
      temp: toCelsius(response.list[3].main.temp),
      weatherId: response.list[3].weather[0].id,
    },
    {
      date: toDate(response.list[4].dt_txt),
      hour: toHour(response.list[4].dt_txt),
      temp: toCelsius(response.list[4].main.temp),
      weatherId: response.list[4].weather[0].id,
    },
    {
      date: toDate(response.list[5].dt_txt),
      hour: toHour(response.list[5].dt_txt),
      temp: toCelsius(response.list[5].main.temp),
      weatherId: response.list[5].weather[0].id,
    },
    {
      date: toDate(response.list[6].dt_txt),
      hour: toHour(response.list[6].dt_txt),
      temp: toCelsius(response.list[6].main.temp),
      weatherId: response.list[6].weather[0].id,
    },
    {
      date: toDate(response.list[7].dt_txt),
      hour: toHour(response.list[7].dt_txt),
      temp: toCelsius(response.list[7].main.temp),
      weatherId: response.list[7].weather[0].id,
    },
    {
      date: toDate(response.list[8].dt_txt),
      hour: toHour(response.list[8].dt_txt),
      temp: toCelsius(response.list[8].main.temp),
      weatherId: response.list[8].weather[0].id,
    },
    {
      date: toDate(response.list[9].dt_txt),
      hour: toHour(response.list[9].dt_txt),
      temp: toCelsius(response.list[9].main.temp),
      weatherId: response.list[9].weather[0].id,
    },
  ];
  return tempHourly;
}
