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
// console.log(data)
var data =
  [
    ["bangor", 1, 25, [5, 10, 15, 20, 25, 30, 35]]//,
    //["pwllheli", 1, 25, [5, 10, 15, 20, 25, 30, 35]]
  ];

for (var i = 0; i < data.length; ++i)
{
  // save current area in the loop to a variable
  var area = data[i];
  // area name, used in selectors and variable names
  var areaname = area[0];
  // current weather - "areanameweather"
  window[areaname + "weather"] = area[1];
  // area temperature - "areanametemp"
  // TODO: Add this to map
  window[areaname + "temp"] = area[2];
  // past temps. Used for bar chart - "areanamepasttemps"
  window[areaname + "pasttemps"] = area[3];

  if (window[area[0] + "weather"] == 1)
  {
    var weathersrc = "/img/sunny.png";
    var image = document.querySelector('#' + areaname + 'weatherselector');
    image.setAttribute('src', weathersrc);
  }
  else if (window[area[0] + "weather"] == 2)
  {
    //TODO: add the rest here  
  }

  var gridMax = 1; //Math.sqrt(pastTempsBangor.length);
  var content = d3.select('#' + areaname + 'tempsselector');

  // we set attributes on our cubes to determine how they are rendered
  var x = 1;
  var y = 1;
  var z = 1;
  var m = 0;

  // we use d3's enter/update/exit pattern to draw and bind our dom elements
  var myBars = content.selectAll("a-box.bar")
    .data(window[areaname + "pasttemps"])
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
    .attr("width", function (d) { return 0.9; })
    .attr("depth", function (d) { return 0.9; })
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











