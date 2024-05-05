const files = {
    '2017-07': ['gen1ou-1760.txt', 'gen2ou-1760.txt', 'gen3ou-1760.txt', 'gen3ubers-1760.txt', 'gen4ou-1760.txt', 'gen4ubers-1760.txt', 'gen4uu-1760.txt', 'gen5nu-1760.txt', 'gen5ou-1760.txt', 'gen5ru-1760.txt', 'gen5ubers-1760.txt', 'gen5uu-1760.txt', 'gen6nu-1760.txt', 'gen6ou-1760.txt', 'gen6ru-1760.txt', 'gen6ubers-1760.txt', 'gen6uu-1760.txt', 'gen7ou-1825.txt', 'gen7ru-1760.txt', 'gen7ubers-1760.txt', 'gen7uu-1760.txt'],
    '2018-07': ['gen1ou-1760.txt', 'gen1ubers-1760.txt', 'gen2ou-1760.txt', 'gen2ubers-1760.txt', 'gen3ou-1760.txt', 'gen4ou-1760.txt', 'gen5ou-1760.txt', 'gen6ou-1760.txt', 'gen7nu-1760.txt', 'gen7ou-1825.txt', 'gen7ru-1760.txt', 'gen7ubers-1760.txt', 'gen7uu-1760.txt'],
    '2019-07': ['gen1ou-1760.txt', 'gen1ubers-1760.txt', 'gen2ou-1760.txt', 'gen2ubers-1760.txt', 'gen3ou-1760.txt', 'gen4ou-1760.txt', 'gen5ou-1760.txt', 'gen6ou-1760.txt', 'gen7nu-1760.txt', 'gen7ou-1825.txt', 'gen7ru-1760.txt', 'gen7ubers-1760.txt', 'gen7uu-1760.txt'],
    '2020-07': ['file1.txt', 'file2.txt', 'file3.txt'],
    '2021-07': ['file1.txt', 'file2.txt', 'file3.txt'],
    '2022-07': ['file4.txt', 'file5.txt', 'file6.txt'],
    '2023-07': ['file7.txt', 'file8.txt', 'file9.txt'],
};

document.getElementById('input-form-2').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the user input
    let date = document.getElementById('date').value;
    let gen = document.getElementById('gen').value;

    // Get the select element
    let select = document.getElementById('formats');

    // Remove any existing options
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }

    // Add an option for each file
    files[date].filter(file => file.startsWith("gen" + gen)).forEach(file => {
        let option = document.createElement('option');
        option.value = file;
        option.text = file;
        select.appendChild(option);
    });
});
document.getElementById('file-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    d3.select("#vis-2").selectAll("*").remove();
    // Get the user input
    let date = document.getElementById('date').value;
    let format = document.getElementById('formats').value;
    console.log(format);
    let gen = document.getElementById('gen').value;
    let DATOS = "smogon_data/"+date+"/"+format;

    let useIcons = document.getElementById('useIcons').checked;


const WIDTH = 900;
const HEIGHT = 600;

const SVG = d3
    .select("#vis-2")
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

const margins = [40, 40, 40, 40];

// para las imagenes
function intToRoman(num) {
    const lookup = {M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1};
    let roman = '';
    for (let i in lookup ) {
        while ( num >= lookup[i] ) {
            roman += i;
            num -= lookup[i];
        }
    }
    return roman.toLowerCase();
}
console.log('generation-'+intToRoman(gen))

d3.text(DATOS).then(function(data) {

    const parsed_data = d3.csvParse(data, d3.autoType).slice(0, 10);



    let max_maximo = d3.max(parsed_data, d =>  Math.max(d['Real %'], d['Usage %']));
    let min_minimo = d3.min(parsed_data, d => Math.min(d['Real %'], d['Usage %']));
  
    // Definimos las escalas
    let esc_v = d3
      .scaleLinear()
      .domain([max_maximo * 1.1, 0.9*min_minimo])
      .range([margins[0], HEIGHT - margins[1]]);
  
    let esc_h = d3
      .scaleBand()
      .domain(parsed_data.map(d => d.Pokemon))
      .range([margins[2], WIDTH - margins[3]])
      .paddingInner(0.5);

    // Definimos los ejes en relación a las escalas
    let ejeX = d3.axisBottom(esc_h);
    let ejeY = d3.axisLeft(esc_v).tickFormat(d => `${d}%`);
    SVG
        .append("g")
        .attr("id", "ejeX") // Le damos un ID
        .attr("transform", `translate(0,${HEIGHT - margins[3]})`) // Trasladamos el G
        .call(ejeX); // Usamos call para crear el eje

    SVG
        .append("g")
        .attr("id", "ejeY") // Le damos un ID
        .attr("transform", `translate(${margins[0]-5},0)`) // Trasladamos el G
        .call(ejeY); // Usamos call para crear el eje

    //Seleccionamos nuestro Eje X y luego cada línea (los ticks)
        SVG.select("#ejeX")
        .selectAll("line")
        .attr("y2", -(HEIGHT - margins[3] - margins[2])) // Definimos el punto de fin de la línea.
        .attr("stroke", "black") // Definimos el color de la línea
        .attr("stroke-width", 1.5) // Definimos en ancho de la línea
        .attr("stroke-dasharray", "5,5") // Extra: definimos que será punteada
        .attr("opacity", 0.5);
        d3.select("#ejeX")
        .selectAll("text")
        .attr("font-size", 15) // Le cambiamos su tamaño
        .attr("transform", `rotate(8)`)
        .attr("font-family", "monospace")
        .attr("font-weight", "bold");
        d3.select("#ejeY")
        .selectAll("text")
        .attr("font-size", 15) // Le cambiamos su tamaño
        .attr("font-weight", "bold") // Lo hacemos más negro
        .attr("font-family", "monospace");
    





    const UsageBars = SVG.append("g").attr('id', 'UsageBars');
    
    UsageBars
        .selectAll("rect")
        .data(parsed_data)
        .join("rect")
        .attr("x", d => esc_h(d.Pokemon))
        .attr("y", d => esc_v(d['Usage %']))
        .attr("width", esc_h.bandwidth()/2)
        .attr("height", d => HEIGHT-esc_v(d['Usage %'])-margins[2])
        .attr("fill", "yellow");

        const RealBars = SVG.append("g").attr('id', 'RealBars');
    
    RealBars
        .selectAll("rect")
        .data(parsed_data)
        .join("rect")
        .attr("x", d => esc_h(d.Pokemon)+esc_h.bandwidth()/2)
        .attr("y", d => esc_v(d['Real %']))
        .attr("width", esc_h.bandwidth()/2)
        .attr("height", d => HEIGHT-esc_v(d['Real %'])-margins[2])
        .attr("fill", "green");

        const Images = SVG.append("g").attr('id', 'Images');

        function fetchPokemonDataAndAddImages(parsed_data, gen) {
            return Promise.all(parsed_data.map(d => {
                let pokemonName = d.Pokemon.toLowerCase().replace(' ', '-').replace('.', '').replace("'", '').replace('♀', '-f').replace('♂', '-m');
                if (pokemonName.startsWith('arceus')) {
                    pokemonName = 'arceus';
                }
                if (pokemonName.startsWith('giratina')) {
                    pokemonName = 'giratina';
                }
                if (pokemonName.startsWith('zygarde')) {
                    pokemonName = 'zygarde-50';
                }
                return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            }))
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(pokemonData => {
                // Add image URLs to parsed_data
                parsed_data.forEach((d, i) => {
                    let versions = pokemonData[i].sprites.versions['generation-'+intToRoman(gen)]; 
                    let keys = Object.keys(versions);
                    let randomKey = keys[Math.floor(Math.random() * keys.length)];
                    d.imageUrl = versions[randomKey].front_default;
                });
            });
        }
        function fetchPokemonDataAndAddIcons(parsed_data, gen) {
            return Promise.all(parsed_data.map(d => {
                let pokemonName = d.Pokemon.toLowerCase().replace(' ', '-').replace('.', '').replace("'", '').replace('♀', '-f').replace('♂', '-m');
                if (pokemonName.startsWith('arceus')) {
                    pokemonName = 'arceus';
                }
                if (pokemonName.startsWith('giratina')) {
                    pokemonName = 'giratina';
                }
                if (pokemonName.startsWith('zygarde')) {
                    pokemonName = 'zygarde-50';
                }
                return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            }))
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(pokemonData => {
                    // Add image URLs to parsed_data
                    parsed_data.forEach((d, i) => {
                        let versions = pokemonData[i].sprites.versions['generation-viii']; 
                        let keys = Object.keys(versions);
                        let randomKey = keys[Math.floor(Math.random() * keys.length)];
                        d.imageUrl = versions.icons.front_default;
                    });
                });
        }
        if (useIcons) {    //esto permite elegir si usar imagenes o iconos para los pokemon
            fetchPokemonDataAndAddIcons(parsed_data, gen)
            .then(() => {
                Images
                .selectAll("image")
                .data(parsed_data)
                .join("image")
                .attr("xlink:href", d => d.imageUrl)
                .attr("x", d => esc_h(d.Pokemon)-5)
                .attr("y", d => esc_v(d3.max( d['Usage %'], d['Real %']))) // imageHeight is the height of your image
                .attr("width", 60)
                .attr("height", 60);
            });

        } else {
            fetchPokemonDataAndAddImages(parsed_data, gen)
            .then(() => {
                Images
                .selectAll("image")
                .data(parsed_data)
                .join("image")
                .attr("xlink:href", d => d.imageUrl)
                .attr("x", d => esc_h(d.Pokemon)-5)
                .attr("y", d => esc_v(d3.max( d['Usage %'], d['Real %']))) // imageHeight is the height of your image
                .attr("width", 60)
                .attr("height", 60);
            });
        }
  


});


});
