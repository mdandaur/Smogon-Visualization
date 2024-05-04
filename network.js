

const WIDTH = 1200;
const HEIGHT = 1200;
const SVG = d3
    .select('#vis-2')
    .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

const margins = [20, 20, 20, 20];
const node_radius = 7;
let nodes;
// Load data from a JSON file
d3.json('movesets_data/2017-07/gen7uu-1760.txt.json').then(data => {
    // Set the value of nodes inside the callback
    let nodes = Object.keys(data).map(key => {
        return { 
            id: key,
            // Set x and y to a random value within the SVG's dimensions
            x: Math.random() * WIDTH, 
            y: Math.random() * HEIGHT
        };
    });

    console.log(nodes);
// Create a set of node ids for quick lookup
const nodeSet = new Set(nodes.map(node => node.id));

// Create an array of links
const links = [];
Object.keys(data).forEach(key => {
    data[key].Teammates.forEach(teammate => {
        // Only create a link if the target node exists
        if (nodeSet.has(teammate.Name)) {
            links.push({
                source: key,
                target: teammate.Name,
                weight: teammate.Weight
            });
        }
    });
});

    // Create a force simulation
    const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(300))
    .force("radial", d3.forceRadial(300, WIDTH/2, HEIGHT/2).strength(1))
    .force("collide", d3.forceCollide().radius(30))
    .force("charge", d3.forceManyBody().strength(-30))
    .force('x', d3.forceX().x(d => d.x))
    .force('y', d3.forceY().y(d => d.y))
    .alphaDecay(0.13);


    // Create the arrow head
    SVG.append('defs').selectAll('marker')
        .data(['end']) // Different marker will be named 'end'
        .enter().append('marker')
        .attr('id', String)
        .attr('viewBox', '0 -5 10 10') // Position and size of the arrow head
        .attr('refX', 28) // Position of the arrow head relative to the line
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .attr('fill', 'gray')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5'); 

    // Create the link lines
    const link = SVG.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke', '#999')
        .attr('stroke-width', d => 1)
        .attr('marker-end', 'url(#end)'); // Add the arrow head to the end of the line;




    const tooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);    
    // Create the node circles
    const node = SVG.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr("fill", "gray")
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('r', node_radius)
        .on('click', function(d) {
            console.log('You clicked on node', d.id);
        })
        .on('mouseover', function(d){


            d3.selectAll('line').transition()
            .duration('50')
            .attr('opacity', function(link) {
                return link.source === d && link.target !== d ? 1 : 0.3;
            })
            .attr('stroke', function(link) {
                return link.source === d && link.target !== d ? 'red' : '#999';
            })
            .attr('stroke-width', function(link) {
                return link.source === d && link.target !== d ? '1.5' : '1';
            });
        })
        .on('mouseout', function(d) {
            // Reset the opacity of all lines
            d3.selectAll('line').transition()
                .duration('50')
                .attr('opacity', 1)
                .attr('stroke', '#999');
        });
        const pokemon_names = SVG.append('g').attr('class','pokemon_names');

        const labels = pokemon_names
            .selectAll('text')
            .data(nodes)
            .enter().append('text')
            .text(d => d.id)
            .attr('x', d => d.x)
            .attr('y', d => d.y-node_radius-5)
            .attr("fill", "black");
    
        simulation.on('tick', () => {
            // Update the positions of the nodes
            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
        
            // Update the positions of the links
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);
            
            labels
                .attr('x', d => d.x)
                .attr('y', d => d.y-node_radius-5);
        });
});