var matrix = [[-0.123, .543, .322], [-.412, -.125, .623], [-.071, .381, .291]];
var table = d3.select("#heatmap")
    .style("margin", "0 auto")
    .style("display", "block")
var rows = table.selectAll("tr")
  .data(matrix)
  .enter()
  .append("tr");

var cells = rows.selectAll("td")
  .data(function(d) { return d; })
  .enter()
  .append("td")
  .text(function(d) { return d; })
  .style("color","white")
  .style("width","50px")
  .style("height","50px")
  .style("border-width", "1px")
  .style("border-style", "solid")
  .style("border-color", "black")
  .style("text-align", "center")

cells.style("background-color", function(d) {
    if(d < 0) {
        return "red";
    } else {
        return "green";
    }
});

table.style("background-color","blue")
table.style("width","160px")
table.style("height","160px")
table.style("align","center")

d3.select("table")
