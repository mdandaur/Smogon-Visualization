DATOS = 'history_data/2019-07/first_lines.json'

WIDTH = 800;
HEIGHT = 800;

const date = '2019-07';

var diameter = 20,
    format = d3.format(",d"),
    color = d3.scaleOrdinal(d3.schemeCategory10);


    console.log(d3.version);
    
var bubble = d3.pack()
    .size([diameter, diameter])
    .padding(1.5);

const SVG = d3
    .select("#vis-1")
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .attr("viewBox", `-${WIDTH / 2} -${HEIGHT / 2} ${WIDTH} ${HEIGHT}`)
    .attr("style", `max-width: 100%; height: auto; display: block;
     margin: 0 -14px; background: lightblue; cursor: pointer;`);

const margins = [10, 10, 10, 10];

d3.json('history_data/2019-07/first_lines.json').then(data => {

    const format = d3.format(",d");

    const pack = d3.pack()
    .size([WIDTH - margins[1] * 2, HEIGHT - margins[1] * 2])
    .padding(3);

    const root = pack(d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value));


    // Create nodes
    const node = SVG.append("g")
    .selectAll("circle")
    .data(root.descendants().slice(1))
    .join("circle")
    .attr("transform", d => `translate(${d.x - WIDTH / 2},${d.y - HEIGHT / 2})`)
        .attr("fill", d => d.children ?  color(d.depth):"white")
        .attr("stroke", d => d.children ? "#fff" : "#000")
        .attr("r", d => d.r)
        .attr("pointer-events", d => !d.children ? "none" : null)
        .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
        .on("mouseout", function() { d3.select(this).attr("stroke", null); })
        .on("click", (event, d) => {
            if (focus !== d) {
                event.stopPropagation();
                zoom(event, d);
            }
        });
      node.append("title")
      .text(d =>
         `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

  // Append the text labels.
    const label = SVG.append("g")
        .style("font", "10px sans-serif")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
        .style("fill-opacity", d => d.parent === root ? 1 : 0)
        .style("display", d => d.parent === root ? "inline" : "none")
        .text(d => d.data.name);

    SVG.on("click", (event) => zoom(event, root));
    let focus = root;
    let view;
    zoomTo([focus.x, focus.y, focus.r * 2]);

  // Create the zoom behavior and zoom immediately in to the initial focus node.
  SVG.call(zoom);

  function zoomTo(v) {
    const k = WIDTH / v[2];

    view = v;

    label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("r", d => d.r * k);
  }

  function zoom(event, d) {
    const focus0 = focus;

    focus = d;

    const transition = SVG.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", d => {
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return t => {
                console.log(focus);
                zoomTo(i(t));
            };
        });

    label
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
      .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

});