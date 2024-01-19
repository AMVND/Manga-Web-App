import ReactWeather, { useOpenWeather } from 'react-open-weather';
const customStyles = {
    fontFamily: 'Helvetica, sans-serif',
    gradientStart: '#0181C2',
    gradientMid: '#04A7F9',
    gradientEnd: '#4BC4F7',
    locationFontColor: '#FFF',
    todayTempFontColor: '#FFF',
    todayDateFontColor: '#B5DEF4',
    todayRangeFontColor: '#B5DEF4',
    todayDescFontColor: '#B5DEF4',
    todayInfoFontColor: '#B5DEF4',
    todayIconColor: '#FFF',
    forecastBackgroundColor: '#FFF',
    forecastSeparatorColor: '#DDD',
    forecastDateColor: '#777',
    forecastDescColor: '#777',
    forecastRangeColor: '#777',
    forecastIconColor: '#4BC4F7',
};

const Weather = () => {
    const { data, isLoading, errorMessage } = useOpenWeather({
        key: 'b2210c95521a86b1b3dc8bd94cfb74b3',
        lat: '21.233731',
        lon: '105.706414',
        lang: 'vi',
        unit: 'metric', // values are (metric, standard, imperial)
    });
    return (
        <ReactWeather
            isLoading={isLoading}
            errorMessage={errorMessage}
            data={data}
            lang="vi"
            locationLabel="Phúc Yên, Vĩnh Phúc"
            unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
            showForecast
        />
    );
};

export default Weather;