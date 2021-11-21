export default function setTempNextDays(response, toCelsius, toDate, toHour) {
  const tempNextDays = [
    {
      date: toDate(response.list[8].dt_txt),
      hour: toHour(response.list[8].dt_txt),
      temp: toCelsius(response.list[8].main.temp),
      weatherId: response.list[8].weather[0].id,
    },
    {
      date: toDate(response.list[16].dt_txt),
      hour: toHour(response.list[16].dt_txt),
      temp: toCelsius(response.list[16].main.temp),
      weatherId: response.list[16].weather[0].id,
    },
    {
      date: toDate(response.list[24].dt_txt),
      hour: toHour(response.list[24].dt_txt),
      temp: toCelsius(response.list[24].main.temp),
      weatherId: response.list[24].weather[0].id,
    },
    {
      date: toDate(response.list[32].dt_txt),
      hour: toHour(response.list[32].dt_txt),
      temp: toCelsius(response.list[32].main.temp),
      weatherId: response.list[32].weather[0].id,
    },
    {
      date: toDate(response.list[39].dt_txt),
      hour: toHour(response.list[39].dt_txt),
      temp: toCelsius(response.list[39].main.temp),
      weatherId: response.list[39].weather[0].id,
    },
  ];
  return tempNextDays;
}
