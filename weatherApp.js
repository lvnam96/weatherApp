document.addEventListener('DOMContentLoaded', function() {
  ////////////////////////////////start function declaring
  function createDOMIn(thisDOM, propertyOfThisDOM, valueOfProperty, parentDOMOfThisDOM) {
    var newDOM = document.createElement(thisDOM);
    if(arguments[1] && arguments[2]) newDOM[propertyOfThisDOM] = valueOfProperty;
    if(arguments[3]) parentDOMOfThisDOM.appendChild(newDOM);
    return newDOM;
  }
  function checkWeather(weatherJSON) {
    switch(weatherJSON.weather[0].main) {
      case 'Drizzle':
        return 'sun-shower'
      case 'Clouds':
        return 'cloudy'
      case 'Thunderstorm':
        return 'thunder-storm';
      case 'Snow':
        return 'flurries';
      case 'Clear':
        return 'sunny';
      case 'Rain':
        return 'rainy';
    }
  }
  //'Get Days of the week' method
  Date.prototype.day = function() {
    switch(this.getDay()){
      case 0: return 'Sunday';
      case 1: return 'Monday';
      case 2: return 'Tuesday';
      case 3: return 'Wednesday';
      case 4: return 'Thursday';
      case 5: return 'Friday';
      case 6: return 'Saturday';
    }
  };
  //'Get date' method
  Date.prototype.month = function() {
    switch(this.getMonth()) {
      case 0: return 'January';
      case 1: return 'February';
      case 2: return 'March';
      case 3: return 'April';
      case 4: return 'May';
      case 5: return 'June';
      case 6: return 'July';
      case 7: return 'August';
      case 8: return 'September';
      case 9: return 'October';
      case 10: return 'November';
      case 11: return 'December';
    }
  };
  //'Get full date' method
  Date.prototype.today = function() {
    return this.day() + ', ' + this.month() + (this.getDate() < 10 ? " 0" : " ") + this.getDate() + ", " + this.getFullYear();
  };
  //'Get time' method
  Date.prototype.timeNow = function() {
    return (this.getHours() < 10 ? "0" : "") + this.getHours() + ":" + (this.getMinutes() < 10 ? "0" : "") + this.getMinutes();
  };
  ////////////////////////////////end function declaring

  (function gettingJSON() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var userGPSURL = 'https:\/\/crossorigin.me\/http:\/\/api.openweathermap.org\/data\/2.5\/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=metric&appid=b50110aef08e2abcca1b47a1932b9e13';
        var userGPSURL_nonSSL = './testAPI.json';
        var request = new XMLHttpRequest();
        request.open('GET', userGPSURL_nonSSL, true);
        request.onload = function() {
          if(request.status >= 200 && request.status < 400) {
            // Success!
            var json = JSON.parse(request.responseText);
            var bgColorCode = {
              'night': '#161616',
              'sun-shower': '#1a6ca7',
              'cloudy': '#2b99d8',
              'thunder-storm': '#212c36',
              'flurries': '#1d7ec2',
              'sunny': '#f2c431',
              'rainy': '#1a6ca7'
            };
            document.getElementsByClassName(checkWeather(json))[0].style.display = 'inline-block';
            var date = new Date();
            // if(json.main.temp_min !== json.main.temp_max) document.getElementById('temp').children[0].textContent = json.main.temp_min;
            document.getElementById('temp').children[1].textContent = json.main.temp;
            document.getElementById('weatherDescription').textContent = json.weather[0].description;
            document.getElementById('today').textContent = date.today();
            document.getElementsByTagName('body')[0].style.color = bgColorCode[date.getHours() > 18 ? 'night' : checkWeather(json)];
          }else {
            // We reached our target server, but it returned an error

          }
        };
        request.onerror = function() {
          // There was a connection error of some sort
        };
        request.send();
      });
    }else alert("Please reload the page and allow us to know your location!");
  })();
});