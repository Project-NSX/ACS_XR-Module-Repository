// LOAD JSON FILE
d3.json("data/data.json", function (d)
{
  return
  {
    areaName: d.areaName;
    temp: d.temp;
    mon: d.mon;
    tue: d.tue;
    wed: d.wed;
    thu: d.thu;
    fri: d.fri;
    sat: d.sat;
    sun: d.sun;
  };
}).then(function (data) 
{
  for (var i = 0; i < data.length; i++)
  {
    // area name, used in selectors and variable names
    var areaname = data[i].areaname;
    // current weather conditions (Sunny, cloudy etc)
    if (document.querySelector('#' + areaname))
    {
      //console.log(areaname + " Present on page. Setting data to page elements...");
      weather = data[i].weathercon;
      // Current area temperature
      var temp = data[i].temp;
      var tempstring = temp + " C";
      // past temperatures. Used for bar chart 
  
      montemp = data[i].mon;
      tuetemp = data[i].tue;
      wedtemp = data[i].wed;
      thutemp = data[i].thu;
      fritemp = data[i].fri;
      sattemp = data[i].sat;
      suntemp = data[i].sun;
  
      pasttemps = [montemp, tuetemp, wedtemp, thutemp, fritemp, sattemp, suntemp];
  
      // Variables below are used to display temperature on the bar chart
      var monselector = document.querySelector('#' + areaname + 'monselector');
      monselector.setAttribute('value', montemp);
  
      var tueselector = document.querySelector('#' + areaname + 'tueselector');
      tueselector.setAttribute('value', tuetemp);
  
      var wedselector = document.querySelector('#' + areaname + 'wedselector');
      wedselector.setAttribute('value', wedtemp);
  
      var thuselector = document.querySelector('#' + areaname + 'thuselector');
      thuselector.setAttribute('value', thutemp);
  
      var friselector = document.querySelector('#' + areaname + 'friselector');
      friselector.setAttribute('value', fritemp);
  
      var satselector = document.querySelector('#' + areaname + 'satselector');
      satselector.setAttribute('value', sattemp);
  
      var sunselector = document.querySelector('#' + areaname + 'sunselector');
      sunselector.setAttribute('value', suntemp);
  
      // Get selector from document for the temperature text
      var tempselector = document.querySelector('#' + areaname + 'tempselector');
      // Set the value of the text in the document to the saved temperature.
      tempselector.setAttribute('value', tempstring);
  
      // Save variable as different colours based on current temperature
      if (temp < 1)
      {
        //var backgroundsrc = "#99ccff";
        var backgroundsrc = new THREE.Color( 99ccff );
      }
      else if (temp < 10)
      {
        //var backgroundsrc = "#66ff66";
        var backgroundsrc = new THREE.Color( 66ff66 );
      }
      else if (temp < 20)
      {
        //var backgroundsrc = "#ffff00";
        var backgroundsrc = new THREE.Color( ffff00 );
      }
      else if (temp < 30)
      {
        //var backgroundsrc = "#ff9900";
        var backgroundsrc = new THREE.Color( ffff00 );
      }
      else
      {
        //var backgroundsrc = "#cc3300";
        var backgroundsrc = new THREE.Color( cc3300 );
      }
      // Temperature text background selector
      var tempbackgound = document.querySelector('#' + areaname + 'tempbackground');
      // Set background colour to saved colour
      tempbackgound.setAttribute('color', backgroundsrc);
  
      // Set different images based on current weather condition
      if (weather == 1)
      {
        // Icon from: https://www.flaticon.com/free-icon/snow_3026312
        // Author: https://www.flaticon.com/authors/freepik
        var weathersrc = "img/snow.png";
      }
      else if (weather == 2)
      {
        // Icon from: https://www.flaticon.com/free-icon/rain_1146858
        // Author: https://www.flaticon.com/authors/freepik
        var weathersrc = "img/rain.png";
      }
      else if (weather == 3)
      {
        // Icon from: https://www.flaticon.com/free-icon/wind_1506761
        // Author: https://www.flaticon.com/authors/smalllikeart
        var weathersrc = "img/wind.png";
      }
      else if (weather == 4)
      {
        // Icon from: https://www.flaticon.com/free-icon/cloud_1163624
        // Author: https://www.flaticon.com/authors/iconixar
        var weathersrc = "img/cloud.png";
      }
      else if (weather == 5)
      {
        // Icon from: https://www.flaticon.com/free-icon/sun_2917242?related_id=2917242&origin=search
        // Author: https://www.flaticon.com/authors/good-ware
        var weathersrc = "img/sun.png";
      }
      // Get image from page
      var image = document.querySelector('#' + areaname + 'weatherselector');
      // Set the saved image to the image on the page
      image.setAttribute('src', weathersrc);
  
      // Set grid to 1 for bar chart, grid will be 2d bar chart
      var gridMax = 1;
      var content = d3.select('#' + areaname + 'tempsselector');
  
      // Set values to cubes to determine how they're rendered.
      var x = 1;
      var y = 1;
      var z = 1;
      var m = 0;
  
      // Use d3's enter/update/exit pattern to draw and bind our dom elements
      var myBars = content.selectAll("a-box.bar")
        .data(pasttemps)
        .enter()
        .append("a-box")
        .classed("bar", true)
        .attr(
          "position", function (d, i)
        {
          x = i % gridMax;
          z = Math.floor(i / gridMax);
          y = d / 8;
          m++;
          console.log("Count: " + m + " - " + "x: " + x + " y: " + y + " z: " + z);
          return x + " " + y + " " + z;
        })
        .attr("height", function (d) { return d / 4; })
        .attr("width", function (d) { return 0.95; })
        .attr("depth", function (d) { return 0.95; })
        .attr("color", function (d)
        {
          var color = '#';
          if (d < 1)
          {
            color = "#99ccff";
          }
          else if (d < 10)
          {
            color = "#66ff66";
          }
          else if (d < 20)
          {
            color = "#ffff00";
          }
          else if (d < 30)
          {
            color = "#ff9900";
          }
          else
          {
            color = "#cc3300";
          }
          return color;
        });
    }
    else
    {
      console.log(areaname + " not found on page. Unable to place data on page elements...");
    }
  }
});











