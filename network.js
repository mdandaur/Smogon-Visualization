

const WIDTH = 1200;
const HEIGHT = 800;
const SVG = d3
    .select('body')
    .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

const margins = [20, 20, 20, 20];
let nodes;
// Load data from a JSON file
d3.json('movesets_data/2017-07/gen1ou-1760.txt.json').then(data => {
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
    .force('link', d3.forceLink(links).id(d => d.id))
    .force("radial", d3.forceRadial(200, WIDTH/2, HEIGHT/2))
    .force("collide", d3.forceCollide().radius(5))
    /*.force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(WIDTH / 2, HEIGHT / 2))*/
    .force('x', d3.forceX().x(d => d.x))
    .force('y', d3.forceY().y(d => d.y));

    // Create the link lines
    const link = SVG.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke', '#999')
        .attr('stroke-width', d => 1);

    // Create the node circles
    const node = SVG.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('r', 5)
        .on('click', function(d) {
            console.log('You clicked on node', d.id);
        });
    
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
        });
});