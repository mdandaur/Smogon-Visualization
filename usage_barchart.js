DATOS = "smogon_data/2017-07/gen7uu-1760.txt"

const WIDTH = 1200;
const HEIGHT = 800;

const SVG = d3
    .select('body')
    .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

const margins = [20, 20, 20, 20];

d3.text(DATOS).then(function(data) {

    const datos = d3.csvParse(data, d3.autoType);

    const xScale = d3.scaleBand()
    .domain(datos.map(d => d.Pokemon))
    .range([0, WIDTH])
    .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(datos, d => d['Usage %'])])
        .range([HEIGHT, 0]);

        const xAxis = d3.axisBottom(xScale);
    SVG.append("g")
        .attr("transform", `translate(0,${HEIGHT - margins[2]})`)
        .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    SVG.append("g")
        .call(yAxis);

        SVG.selectAll(".bar")
        .data(datos)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.Pokemon))
        .attr("y", d => yScale(d['Usage %']))
        .attr("width", xScale.bandwidth())
        .attr("height", d => HEIGHT)
        .selectAll(".bar")
        .data(datos)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.Pokemon))
        .attr("y", d => yScale(d['Usage %']))
        .attr("width", xScale.bandwidth())
        .attr("height", d => HEIGHT - yScale(d['Usage %']));
}
);


