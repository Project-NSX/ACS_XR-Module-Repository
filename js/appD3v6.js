//TODO: Can't access data after it's entered. fix this
// LOAD JSON FILE
// data = d3.json("/data/data.json", function (error, data)
// d3.json("/data/data.json", function (error, data)
// {
//   data.forEach(function (d)
//   {
//     d.AreaName = d.AreaName;
//     d.Temp = +d.Temp;
//     d.Mon = +d.Mon;
//     d.Tue = +d.Tue;
//     d.Wed = +d.Wed;
//     d.Thur = +d.Thur;
//     d.Fri = +d.Fri;
//     d.Sat = +d.Sat;
//     d.Sun = +d.Sun;
//   });
// });

var data =
  [
    ["bangor", 5, 25, [5, 10, 15, 20, 25, 30, 35]],
    ["pwllheli", 5, 25, [5, 10, 15, 20, 25, 30, 35]]
  ];

for (var i = 0; i < data.length; ++i)
{
  // save current area in the loop to a variable
  var area = data[i];
  // area name, used in selectors and variable names
  var areaname = area[0];
  // current weather conditions (Sunny, cloudy etc)
  weather = area[1];
  // Current area temperature
  var temp = area[2];
  // past temperatures. Used for bar chart 
  pasttemps = area[3];

  // Get selector from document for the temperature text
  var tempselector = document.querySelector('#' + areaname + 'tempselector');
  // Set the value of the text in the document to the saved temperature.
  tempselector.setAttribute('value', temp);

  // Save variable as different colours based on current temperature
  if (temp < 1)
  {
    var backgroundsrc = "#99ccff";
  }
  else if (temp < 10)
  {
    var backgroundsrc = "#66ff66";
  }
  else if (temp < 20)
  {
    var backgroundsrc = "#ffff00";
  }
  else if (temp < 30)
  {
    var backgroundsrc = "#ff9900";
  }
  else
  {
    var backgroundsrc = "#cc3300";
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
    var weathersrc = "/img/snow.png";
  }
  else if (weather == 2)
  {
    // Icon from: https://www.flaticon.com/free-icon/rain_1146858
    // Author: https://www.flaticon.com/authors/freepik
    var weathersrc = "/img/rain.png";
  }
  else if (weather == 3)
  {
    // Icon from: https://www.flaticon.com/free-icon/wind_1506761
    // Author: https://www.flaticon.com/authors/smalllikeart
    var weathersrc = "/img/wind.png";
  }
  else if (weather == 4)
  {
    // Icon from: https://www.flaticon.com/free-icon/cloud_1163624
    // Author: https://www.flaticon.com/authors/iconixar
    var weathersrc = "/img/cloud.png";
  }
  else if (weather == 5)
  {
    // Icon from: https://www.flaticon.com/free-icon/sun_2917242?related_id=2917242&origin=search
    // Author: https://www.flaticon.com/authors/good-ware
    var weathersrc = "/img/sun.png";
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
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++)
      {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    });
}











