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
var dataBangor = [5, 10, 13, 19, 21, 25, 22];

console.log(dataBangor.length);

// TODO: When gridMax is set to 1 the content is the wrong way around.
// I have a feeling altering it is wrong
var gridMax = Math.sqrt(dataBangor.length);
var content = d3.select("#dataBangor");

// we set attributes on our cubes to determine how they are rendered
var x = 1;
var y = 1;
var z = 1;
var m = 0;


// we use d3's enter/update/exit pattern to draw and bind our dom elements
var myBars = content.selectAll("a-box.bar")
  .data(dataBangor)
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









