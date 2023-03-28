
# Black Weather Journal App

* A program to measure the temperature with three different units of measurement.
* Among the requirements for graduation from the second level in nano-degree


## Acknowledgements

 - [Udacity](https://www.udacity.com/)
 - [EGYPT FWD](https://egfwd.com/?utm_source=googlesearch&utm_medium=ads&utm_campaign=branding&utm_adgroup=fwd&gclid=Cj0KCQiAj4ecBhD3ARIsAM4Q_jHmZXCkCy4Iy1F_Sjb2LZFvOEq9KGos0KSUszADXr0Uhx-772wwv9oaAidcEALw_wcB)
 - [ITIDA](https://itida.gov.eg/Arabic/Pages/default.aspx)
 - [وزارة الإتصالات وتكنولوجيا المعلومات](https://mcit.gov.eg/ar)


## Appendix

* I made changes to the HTML and CSS file

## Optimizations

The country options have been added, but unfortunately I think that there is a problem with the site [OpenWeatherMap](https://openweathermap.org/) there are no countries that work except the United States, so the line:
```
 region = "us"; // i make it country code "us" only because i didn't fount any other working country
```

was added to be the only choice in the API is the states.
## Demo

![Random GIF](https://media.giphy.com/media/MFmM2tWXL192oVKxUT/giphy.gif)


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd Weather-Journal-App
```

Install dependencies

```bash
  npm install express
  npm install body-parser
  npm install cors
  node init -y
```

Start the server

```bash
  node server.js
```


## Known Issues

Any issues are usually because  a bug or inconsistency. Where possible, 
we try to cover up these underlying problems in the client, 
but sometimes workarounds require higher-level intervention. 
try to restart the server, Please feel free to file an [issue][issue] if 
this client doesn't work as expected.



[issue]: https://github.com/LeaDer-E/Weather-Journal-App/issues/new


## Screenshots

![App Screenshot](https://raw.githubusercontent.com/LeaDer-E/Weather-Journal-App/main/WJA.jpg?token=GHSAT0AAAAAAB3VCNAZUDVQLBHRYEVYB2TOY4CAKDA)


## Author's name.
- [@Eslam Mustafa](https://github.com/LeaDer-E/)


## Cridit

- Copyright © Eslam Mustafa 🌹


♥ I hope you like my project, thank you ♥


![Logo](https://s3-us-west-1.amazonaws.com/udacity-content/rebrand/svg/logo.min.svg)
