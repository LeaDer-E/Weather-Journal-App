/////////////////////////////////////////////////////////////////////////
                        /* Global Variables */
/////////////////////////////////////////////////////////////////////////

const inputElement = document.getElementById("zip");
const textAreaElement = document.querySelector("#feelings");
const generateButtonElement = document.querySelectorAll('#generate')[0];
const apiLink = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "27fb1f6e5f9c48c7640c0fac5678c2ec";
const entryHolder = document.getElementById('entryHolder');

// Dynamically New Date Instance
const todayDate = new Date();

/////////////////////////////////////////////////////////////////////////
                      /* Sending Data to the Server */
/////////////////////////////////////////////////////////////////////////

async function data2Server(ourNewData={}) {
  const reque = await fetch('/ServerData' , {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ourNewData),
  });
  try {
    const respo = await reque.json();
    return respo;
  } catch (sorry) {
    console.log(sorry);
    alert("Something Went Wrong at Sending Data to Server");
  }
}

/////////////////////////////////////////////////////////////////////////
            /* get Weather Temprature (Metric Value) */
/////////////////////////////////////////////////////////////////////////

async function metricTemperature(url, zipCode, region, apiKey) {
  const reque = await fetch(`${url}${zipCode},${region}&appid=${apiKey}&units=metric`);
  try {
    console.log(`${url}${zipCode},${region}&appid=${apiKey}&units=metric`)
    const respo = await reque.json();
    return respo;
  } catch (sorry) {
    console.log(sorry);
    alert("Something Went Wrong at Imperial Value");
  }
}

/////////////////////////////////////////////////////////////////////////
            /* get Weather Temprature (Imperial Value) */
/////////////////////////////////////////////////////////////////////////

async function imperialTemperature(url, zipCode, region, apiKey) {
  const reque = await fetch(`${url}${zipCode},${region}&appid=${apiKey}&units=imperial`);
  try {
    const respo = await reque.json();
    console.log(respo)
    return respo;
  } catch (sorry) {
    console.log(sorry);
    alert("Something Went Wrong at Imperial Value");
  }
}

/////////////////////////////////////////////////////////////////////////
                            /* Update UI */
/////////////////////////////////////////////////////////////////////////

async function sidebarUpdateUI() {
  const reque = await fetch("/ClientData");
  try {
    const respo = await reque.json();
    // console.log(respo);
    document.querySelector('#cityname').innerHTML = respo.name;
    document.querySelector('#description').innerHTML = respo.description;
    document.querySelector('#date').innerHTML = respo.date;
    document.querySelector('#temp').innerHTML = respo.temp;
    document.querySelector('#newtemp').innerHTML = respo.newTemp;
    document.querySelector('#lasttemp').innerHTML = respo.lastTemp;
    document.querySelector('#windspeed').innerHTML = respo.windSpeed;
    document.querySelector('#content').innerHTML = respo.feelings;
  } catch (sorry) {
    console.log(sorry);
    alert("Something Went Wrong at Updating UI");
  }
}

/////////////////////////////////////////////////////////////////////////
                        /* Event Listener */
/////////////////////////////////////////////////////////////////////////

generateButtonElement.addEventListener("click", async () => {
  if(inputElement.value.length <= 1) {
    alert("ZIP Code Must be Five Numbers");
    return;
  } else if (textAreaElement.value.length <= 0) {
    alert("Please Enter How Are You Feeling Today");
    return;
  }
  try {
    let region = document.querySelector("select").value.toLowerCase();
    region = "us"; // i make it country code "us" only because i didn't fount any other working country
    const metTemperature = await metricTemperature(apiLink, inputElement.value, region, apiKey);
    const impTemperature = await imperialTemperature(apiLink, inputElement.value, region, apiKey);
    const fullMetricTemperature = Math.round(metTemperature.main.temp);
    const fullImperialTemperature = Math.round(impTemperature.main.temp);
    const kelvinTemperature = metTemperature.main.temp + 273.15;
    const fullKelvinTemperature = Math.round(kelvinTemperature);
    const serverData = await data2Server({
      name: `<span> City Name:</span> ${impTemperature.name}`,
      description: `<span> Weather Description:</span> ${impTemperature.weather[0].description}`,
      // date: `<span> Date:</span> ${todayDate.getMonth()+1}-${todayDate.getDate()}-${todayDate.getFullYear()}`,
      date: `<span> Date:</span> ${todayDate.toDateString()}`,
      temp: `<span> Celsius Temprature:</span> ${fullMetricTemperature} (°C)`,
      newTemp: `<span> Fahrenheit Temprature:</span> ${fullImperialTemperature} (°F)`,
      lastTemp: `<span> Kelvin Temprature:</span> ${fullKelvinTemperature} (K)`,
      windSpeed: `<span> Wind Speed:</span> ${impTemperature.wind.speed} km/h`,
      feelings: `<span> Fellings:</span> ${textAreaElement.value}`
    })
    console.log(serverData)
    await sidebarUpdateUI();

    // Style the "Span Sections" to make them Good ♥
    let span = document.querySelectorAll("span");
    for (let i = 0; i < span.length; i++) {
      span[i].style.cssText =
        "margin:5px; padding: 3px; font-weight: 800; text-decoration: underline; color: gold;";
    }

    // Change the "entryHolder" color, background
    entryHolder.style.cssText =
      "padding: 30px;  padding-top: 60px; padding-bottom: 60px; font-size: 24px; color: rgb(0 253 239); background-color: #360d54; background-image: linear-gradient(43deg, #191f4a 0%, #5c2259 46%, #433419 100%); font-family: Cursive,'Oswald', sans-serif;";

  } catch (sorry) {
    console.log(sorry);
    // console.log(respo)
    alert("Please Enter a Valid Z!P Code")
  }
})


/////////////////////////////////////////////////////////////////////////
                            /* Extras */
/////////////////////////////////////////////////////////////////////////

// Create "Description" Section
const description = document.createElement("div");
description.setAttribute("id", "description");
entryHolder.appendChild(description);

// Create "City name" Section
const cityName = document.createElement("div");
cityName.setAttribute("id", "cityname");
entryHolder.appendChild(cityName);

// Create an another "Temp" for Metric Temprature
const newTemp = document.createElement("div");
newTemp.setAttribute("id", "newtemp");
entryHolder.appendChild(newTemp);

// Create last "Temp" Section for Kelvin Temprature
const lastTemp = document.createElement("div");
lastTemp.setAttribute("id", "lasttemp");
entryHolder.appendChild(lastTemp);

// Create last "Wind Speed" Section for Kelvin Temprature
const windSpeed = document.createElement("div");
windSpeed.setAttribute("id", "windspeed");
entryHolder.appendChild(windSpeed);

// Make "Metric Temprature:" Under "Imperial Temprature:" then making "Fellings:" the last thing
const content = document.getElementById("content");
entryHolder.removeChild(content);
entryHolder.appendChild(lastTemp);
entryHolder.appendChild(windSpeed);
entryHolder.appendChild(content);
entryHolder.prepend(description);
entryHolder.prepend(cityName);


// Add Button class to "Generate Button"
generateButtonElement.classList.add("button");

// Make the "app Section" at Center then put them at "content section"
const app = document.getElementById("app");
app.style.cssText="text-align: center";
document.body.removeChild(app);
document.body.getElementsByClassName("content")[0].appendChild(app);

// Remove the "Most Recent Entry Section" and put it at "sidebar Section"
let entry = document.getElementsByClassName("entry");
entry = entry[0];
app.removeChild(entry);
document.body.getElementsByClassName("sidebar")[0].appendChild(entry);

// Remove the "Weather Journal App Title" then put it in the "header section"
let holder = document.getElementsByClassName("holder");
holder = holder[0];
app.removeChild(holder);
document.body.getElementsByClassName("header")[0].appendChild(holder);

// Create an "div" to "Generate Button" to be free in the Center
document.getElementsByClassName("feel")[0].removeChild(generateButtonElement);
divButton = document.createElement('div');
divButton.style.cssText="text-align: center";
document.getElementsByClassName("feel")[0].appendChild(divButton);
divButton.appendChild(generateButtonElement);

/* Create an setAttribute Helper Function*/
function helperAttribute(theElement, theAttribute) {
  for(var style in theAttribute) {
    theElement.setAttribute(style, theAttribute[style]);
  }
}

/* Change "input" Attribute from "text" to "number"
 * Then make "maxlength: 5" and Finally Capitalize some letters at "Placeholder" */
helperAttribute(inputElement, {
  "maxlength": 10,
  "type": "number",
  "oninput": "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);",
  "placeholder": "Please Enter Your ZIP Code Here",
});


// Reformulate "label" Text
document.querySelector("label").textContent= "Enter Z!P Code Here";

// Resize "labels" font
document.querySelector("label").style.fontSize= "1.5em"
document.querySelectorAll("label")[1].style.fontSize= "1.5em"
document.querySelectorAll("label")[2].style.fontSize= "1.5em"
document.querySelector(".title").style.fontSize= "1.75em";

// Making "text area"  50 Char. as a Max Length
feelings.setAttribute("maxlength", "50");
