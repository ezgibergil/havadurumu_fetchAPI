const apiKey = 'API_KEY';  // Buraya OpenWeatherMap'ten aldığınız API anahtarınızı yazın
const weatherResultDiv = document.getElementById('weatherResult');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');

// Hava durumu butonuna tıklanması durumunda çalışacak fonksiyon
getWeatherBtn.addEventListener('click', function() {
    const cityName = cityInput.value.trim();
    
    if (cityName) {
        fetchWeather(cityName);
    } else {
        weatherResultDiv.innerHTML = '<p class="error-message">Lütfen geçerli bir şehir adı girin.</p>';
    }
});

// OpenWeatherMap API'sine istek gönderme
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            weatherResultDiv.innerHTML = `<p class="error-message">Hava durumu verisi alınırken bir hata oluştu: ${data.message}</p>`;
        }
    } catch (error) {
        console.error('Hata oluştu:', error);
        weatherResultDiv.innerHTML = `<p class="error-message">Hava durumu alınırken bir hata oluştu.</p>`;
    }
}

// Hava durumu bilgisini ekrana yazdırma
function displayWeather(data) {
    const { main, weather, wind, name } = data;

    // Hava durumu bilgilerini düzenle
    const weatherHTML = `
        <div class="weather-info">
            <h3>${name} - Hava Durumu</h3>
            <p><strong>Sıcaklık:</strong> ${main.temp}°C</p>
            <p><strong>Durum:</strong> ${weather[0].description}</p>
            <p><strong>Nem:</strong> ${main.humidity}%</p>
            <p><strong>Rüzgar Hızı:</strong> ${wind.speed} m/s</p>
        </div>
    `;

    // Ekranda hava durumu bilgilerini göster
    weatherResultDiv.innerHTML = weatherHTML;
}
