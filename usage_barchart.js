
// Definí la función que busca los íconos en PokeApi
async function fetchPokemonDataAndAddIcons(parsed_data, gen) {
    const responses = await Promise.all(parsed_data.map(d => {
        let pokemonName = d.Pokemon.toLowerCase().replace(' ', '-').replace('.', '').replace("'", '').replace('♀', '-f').replace('♂', '-m');
        if (pokemonName.startsWith('arceus')) {
            pokemonName = 'arceus';
        }

        if (pokemonName.startsWith('zygarde')) {
            pokemonName = 'zygarde-50';
        }
        if (pokemonName.startsWith('keldeo')) {
            pokemonName = 'keldeo-ordinary';
        }
        if (pokemonName.startsWith('aegislash')) {
            pokemonName = 'aegislash-shield';
        }
        if (pokemonName.startsWith('gourgeist')) {
            pokemonName = 'gourgeist-average';
        }
        if (pokemonName.startsWith('pumpkaboo')) {
            pokemonName = 'pumpkaboo-average';
        }
        if (pokemonName.startsWith('mimikyu')) {
            pokemonName = 'mimikyu-disguised';
        }
        if (pokemonName.startsWith('toxtricity')) {
            pokemonName = 'toxtricity-amped';
        }
        if (pokemonName.startsWith('urshifu')) {
            pokemonName = 'urshifu-single-strike';
        }
        if (pokemonName.startsWith('calyrex')) {
            pokemonName = 'calyrex-ice-rider';
        }
        if (pokemonName.startsWith('indeedee')) {
            pokemonName = 'indeedee-female';
        }
        if (pokemonName.startsWith('zacian')) {
            pokemonName = 'zacian-crowned';
        }
        if (pokemonName.startsWith('zamazenta')) {
            pokemonName = 'zamazenta-hero-of-many-battles';
        }
        if (pokemonName.startsWith('eternatus')) {
            pokemonName = 'eternatus-eternamax';
        }
        if (pokemonName.startsWith('glastrier')) {
            pokemonName = 'glastrier-ice-rider';
        }
        if (pokemonName.startsWith('spectrier')) {
            pokemonName = 'spectrier-glastrier';
        }
        if (pokemonName.startsWith('giratina')) {
            pokemonName = 'giratina-altered';
        }
        if (pokemonName.startsWith('darmanitan')) {
            pokemonName = 'darmanitan-standard';
        }
        if (pokemonName.startsWith('meowstic')) {
            pokemonName = 'meowstic-female';
        }
        if (pokemonName.startsWith('basculin')) {
            pokemonName = 'basculin-red-striped';
        }
        if (pokemonName.startsWith('thundurus')) {
            pokemonName = 'thundurus-incarnate';
        }
        if (pokemonName.startsWith('landorus')) {
            pokemonName = 'landorus-incarnate';
        }
        if (pokemonName.startsWith('tornadus')) {
            pokemonName = 'tornadus-incarnate';
        }
        if (pokemonName.startsWith('meloetta')) {
            pokemonName = 'meloetta-aria';
        }
        if (pokemonName.startsWith('necrozma')) {
            pokemonName = 'necrozma-dusk';
        }
        if (pokemonName.startsWith('sylvally')) {
            pokemonName = 'silvally-normal';
        }
        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) throw new Error('Not found');
            return response.json();
        })
        .catch(() => null);
    }));
    const pokemonData = await Promise.all(responses);
    // Add image URLs to parsed_data
parsed_data.forEach((d_1, i) => {
    if (pokemonData[i] === null) {
        d_1.imageUrl = 'https://ibb.co/HH083D4'; // Default image path
    } else {
        let versions = pokemonData[i].sprites.versions['generation-viii'];
        d_1.imageUrl = versions.icons.front_default || 'https://ibb.co/HH083D4'; // Use default image if front_default is not available
    }
});
}

window.addEventListener("nodeClick", function(event) {
    DATOS = 'smogon_data/' + event.detail.date + '/' + event.detail.file;
    file_json = 'movesets_data/' + event.detail.date + '/' + event.detail.gen + event.detail.format + '.json';
    d3.select("#vis-2").selectAll("*").remove();



    let useIcons = document.getElementById('useIcons').checked;


const margins = [40, 40, 40, 60];

const WIDTH = 800 + margins[1] + margins[3];
const TOTALWIDTH = WIDTH*20;
const HEIGHT = 500 + margins[0] + margins[2];

const SVG = d3
    .select("#vis-2")
    .attr('width', WIDTH)
    .attr('height', HEIGHT);


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

d3.csv(DATOS).then(function(data) {
    const parsed_data = data.slice(0, 400);
    console.log(parsed_data.length);


    let maximo = d3.max(parsed_data, d =>  Math.max(d['Real %'], d['Usage %']));
    let minimo = d3.min(parsed_data, d => Math.min(d['Real %'], d['Usage %']));
  
    // Definimos las escalas
    let esc_v = d3
      .scaleLinear()
      .domain([maximo*1.1, 0])
      .range([margins[0], HEIGHT - margins[1]]);
  
    let esc_h = d3
      .scaleBand()
      .domain(parsed_data.map(d => d.Pokemon))
      .range([margins[3], TOTALWIDTH - margins[1]])
      .paddingInner(0.5);

    // Agregamos un título

    SVG.append("text")
      .attr("x", WIDTH / 2)
      .attr("y", margins[0]*1/4)
      .attr("text-anchor", "middle")
      .style("font-size", "15px")
      .style("text-decoration", "underline")
      .style("font-family", "monospace")
      .text(`Top 10 Pokemon más usados en ${event.detail.format} en ${event.detail.date}`);

    // Definimos los ejes en relación a las escalas
    let ejeX = d3.axisBottom(esc_h);
    let ejeY = d3.axisLeft(esc_v).tickFormat(d => `${d}%`);
    contenedorEjeX = SVG
        .append("g")
        .attr("id", "ejeX") // Le damos un ID
        .attr("transform", `translate(0,${HEIGHT - margins[0]})`) // Trasladamos el G
        .call(ejeX); // Usamos call para crear el eje

    contenedorEjeY = SVG
        .append("g")
        .attr("id", "ejeY") // Le damos un ID
        .attr("transform", `translate(${margins[3]-20},0)`) // Trasladamos el G
        .call(ejeY); // Usamos call para crear el eje

    //Seleccionamos nuestro Eje X y luego cada línea (los ticks)
        SVG.select("#ejeX")
    //    .selectAll("line")
    //    .attr("y2", -(HEIGHT - margins[3] - margins[2])) // Definimos el punto de fin de la línea.
    //    .attr("stroke", "black") // Definimos el color de la línea
    //    .attr("stroke-width", 1.5) // Definimos en ancho de la línea
    //    .attr("stroke-dasharray", "5,5") // Extra: definimos que será punteada
    //    .attr("opacity", 0.5);
        d3.select("#ejeX")
        .selectAll("text")
        .attr("font-size", 10) // Le cambiamos su tamaño
        .attr("transform", `rotate(12) translate(0, 10)`) 
        .attr("font-family", "monospace")
        .attr("font-weight", "bold");
        d3.select("#ejeY")
        .selectAll("text")
        .attr("font-size", 15) // Le cambiamos su tamaño
        .attr("font-weight", "bold") // Lo hacemos más negro
        .attr("font-family", "monospace");
    //

    





    const UsageBars = SVG.append("g").attr('id', 'UsageBars');
    
    UsageBars
        .selectAll("rect")
        .data(parsed_data)
        .join("rect")
        .attr("x", d => esc_h(d.Pokemon))
        .attr("y", d => esc_v(d['Usage %']))
        .attr("width", esc_h.bandwidth()/2)
        .attr("height", d => HEIGHT-esc_v(d['Usage %'])-margins[2])
        .attr("fill", "yellow")
        .each(function(d, i) {
            d3.select(this)
                .on("mouseover", function(event) { 
                    d3.select(this).attr("stroke", "#000"); 
                    let respectiveRealBar = RealBars.selectAll("rect").filter((d, index) => index === i);
                    respectiveRealBar.attr("stroke", "#000");
                })
                .on("mouseout", function(event) { 
                    d3.select(this).attr("stroke", null);
                    let respectiveRealBar = RealBars.selectAll("rect").filter((d, index) => index === i);
                    respectiveRealBar.attr("stroke", null); 
                })
                .on("click", function(pokemon_event, d) {
                    let respectiveRealBar = RealBars.selectAll("rect").filter((d, index) => index === i);
                    let respectiveImage = Images.selectAll("image").filter((d, index) => index === i);
                    let respectiveLine = SVG.selectAll("line").filter((d, index) => index === i);
                    d3.selectAll("rect").attr("opacity", 0.4);
                    d3.selectAll("image").attr("opacity", 0.4);
                    d3.selectAll("line").attr("opacity", 0.1);
                    d3.select(this).attr("opacity", 1);
                    respectiveRealBar.attr("opacity", 1);
                    respectiveImage.attr("opacity", 1);
                    respectiveLine.attr("opacity", 0.7);
                    console.log(event.detail.date, event.detail.gen, event.detail.format, d.Pokemon, file_json);
                    let pokemonEvent = new CustomEvent("pokemonClick", {
                        detail: {
                            date: event.detail.date,
                            gen: event.detail.gen,
                            format: event.detail.format,
                            pokemon_name: d.Pokemon,
                            file: file_json
                        }
                    });
                    window.dispatchEvent(pokemonEvent);
                });
        });

    const RealBars = SVG.append("g").attr('id', 'RealBars');
    
    RealBars
        .selectAll("rect")
        .data(parsed_data)
        .join("rect")
        .attr("x", d => esc_h(d.Pokemon)+esc_h.bandwidth()/2)
        .attr("y", d => esc_v(d['Real %']))
        .attr("width", esc_h.bandwidth()/2)
        .attr("height", d => HEIGHT-esc_v(d['Real %'])-margins[2])
        .attr("fill", "red")
        .each(function(d, i) {
            d3.select(this)
                .on("mouseover", function(event) { 
                    d3.select(this).attr("stroke", "#000"); 
                    let respectiveUsageBar = UsageBars.selectAll("rect").filter((d, index) => index === i);
                    respectiveUsageBar.attr("stroke", "#000");
                })
                .on("mouseout", function(event) { 
                    d3.select(this).attr("stroke", null);
                    let respectiveUsageBar = UsageBars.selectAll("rect").filter((d, index) => index === i);
                    respectiveUsageBar.attr("stroke", null); 
                })
                .on("click", function(pokemon_event, d) {
                    let respectiveUsageBar = UsageBars.selectAll("rect").filter((d, index) => index === i);
                    let respectiveImage = Images.selectAll("image").filter((d, index) => index === i);
                    let respectiveLine = SVG.selectAll("line").filter((d, index) => index === i);
                    d3.selectAll("rect").attr("opacity", 0.4);
                    d3.selectAll("image").attr("opacity", 0.4);
                    d3.selectAll("line").attr("opacity", 0.1);
                    d3.select(this).attr("opacity", 1);
                    respectiveUsageBar.attr("opacity", 1);
                    respectiveImage.attr("opacity", 1);
                    respectiveLine.attr("opacity", 0.7);
                    let pokemonEvent = new CustomEvent("pokemonClick", {
                        detail: {
                            date: event.detail.date,
                            gen: event.detail.gen,
                            format: event.detail.format,
                            pokemon_name: d.Pokemon,
                            file: file_json
                        }
                    });
                    window.dispatchEvent(pokemonEvent);
                });
        });


        // aquí se hizo el legend muy a mano
// primera leyenda
    SVG.append("circle")
    .attr("cx",WIDTH-margins[2]*3/2-10-220)
    .attr("cy",margins[0]/2 + 120)
    .attr("r", 6).style("fill", "yellow")
    .attr("stroke", "black"); 
    SVG.append("text")
    .text("% Uso real")
    .attr("x", WIDTH-margins[2]*3/2  -220)
    .attr("y", margins[0]/2+120)
    .style("font-size", "15px")
    .attr("font-weight", "bold") 
    .attr("font-family", "monospace")
    .attr("alignment-baseline","middle")
    .attr("text-anchor","right");
    
    // segunda leyenda
    SVG.append("circle")
    .attr("cx", WIDTH-margins[2]*3/2-10 - 220)
    .attr("cy",margins[0]/2 + 30+ 120)
    .attr("r", 6)
    .style("fill", "red")
    .attr("stroke", "black");
    SVG.append("text")
    .text('% Uso mejores jugadores')
    .attr("x", WIDTH-margins[2]*3/2 -220)
    .attr("y", margins[0]/2 + 30 + 120)
    .style("font-size", "15px")
    .attr("font-weight", "bold") 
    .attr("font-family", "monospace")
    .attr("alignment-baseline","middle")
    .attr("text-anchor","right");







        const manejadorZoom = (evento) => {
            // Obtenemos nuestra transformación
        // Obtenemos nuestra transformación
        const transformacion = evento.transform;

        // Actualizamos el rango de la escala considerando la transformación en X.
        esc_h.range([margins[3], TOTALWIDTH-margins[1]].map(d => transformacion.applyX(d)));

        const newBandwidth = Math.max(1, transformacion.k * esc_h.bandwidth());

        // Update bars with new bandwidth and position
        UsageBars.selectAll("rect")
        .attr("width", newBandwidth/2)
        .attr("x", d => esc_h(d.Pokemon));

        RealBars.selectAll("rect")
        .attr("width", newBandwidth/2)
        .attr("x", d => esc_h(d.Pokemon) + newBandwidth / 2);

        Images.selectAll("image")
        .attr("x", d => esc_h(d.Pokemon)- newBandwidth);

        SVG.select("#ejeX").selectAll("line")
        .attr("y2", -(HEIGHT - margins[3] - margins[2])); // Adjust based on your chart's dimensions

        


        // Actualizamos el eje X con la escala ajustada
        contenedorEjeX.call(ejeX.scale(esc_h));


            // Actualizamos el eje X con la escala ajustada
            contenedorEjeX.call(ejeX.scale(esc_h));
          };
          
          const zoom = d3.zoom()
            .scaleExtent([1, 1]) // Desactivamos el zoom (escala) para mantener solo el panning.
            .translateExtent([[0, 0], [TOTALWIDTH, HEIGHT]]) // Limitamos la traslación al ancho total.
            .on("zoom", manejadorZoom);
          
          // Conectamos el objeto zoom con el SVG.
          SVG.call(zoom);


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
                if (pokemonName.startsWith('keldeo')) {
                    pokemonName = 'keldeo-ordinary';
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
        
        if (useIcons) {    //esto permite elegir si usar iconos o nada
            fetchPokemonDataAndAddIcons(parsed_data, gen)
            .then(() => {
                Images
                .selectAll("image")
                .data(parsed_data)
                .join("image")
                .attr("xlink:href", d => d.imageUrl)
                .attr("x", d => esc_h(d.Pokemon)-10)
                .attr("y", d => esc_v(d3.max( d['Usage %'], d['Real %']))-30) // imageHeight is the height of your image
                .attr("width", 60)
                .attr("height", 60);
            });

        } 
        


});


});
