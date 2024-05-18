// Definí la función que busca los íconos en PokeApi
async function fetchPokemonDataAndAddIcons2(parsed_data) {
    const responses = await Promise.all(parsed_data.map(d => {
        let pokemonName = d.Name.toLowerCase().replace(' ', '-').replace('.', '').replace("'", '').replace('♀', '-f').replace('♂', '-m');
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
        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    }));
    const pokemonData = await Promise.all(responses.map(response => response.json()));
    // Add image URLs to parsed_data
    parsed_data.forEach((d, i) => {
        let versions = pokemonData[i].sprites.versions['generation-'+intToRoman(gen)]; 
        let keys = Object.keys(versions);
        let randomKey = keys[Math.floor(Math.random() * keys.length)];
        d.imageUrl = versions[randomKey].front_default;
    });
}
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
async function fetchPokemonDataAndAddImages2(parsed_data, gen) {
    const responses = await Promise.all(parsed_data.map(d => {
        let pokemonName = d.Name.toLowerCase().replace(' ', '-').replace('.', '').replace("'", '').replace('♀', '-f').replace('♂', '-m');
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
        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    }))
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(pokemonData => {
        // Add image URLs to parsed_data
        parsed_data.forEach((d, i) => {
            let versions = pokemonData[i].sprites.other['official-artwork']; 
            d.imageUrl = versions.front_default;
        });
    });
}


window.addEventListener("pokemonClick", function(event) {
    console.log("File clicked:", event.detail.pokemon_name);
    d3.select("#vis-3").selectAll("*").remove();  //limpia el svg antes

    DATOS = 'movesets_data/' + event.detail.date + '/' + event.detail.gen + event.detail.format +'.json';
    let pokemon_name;  // Declare pokemon_name variable
    if (event.detail.pokemon_name.startsWith("Tapu")) {
        pokemon_name = event.detail.pokemon_name.replace("-", " ");
    }
    else {
        pokemon_name = event.detail.pokemon_name;
    }

    gen = event.detail.gen;

    const margins = [40, 40, 40, 60];

    const WIDTH = 800 + margins[1] + margins[3];
    const HEIGHT = 500 + margins[0] + margins[2];

    const SVG = d3
        .select("#vis-3")
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    d3.json(DATOS).then(data => {
        const margins = [20, 20, 20, 20];
        const format = d3.format(",d");

        let pokemonData = data[pokemon_name];
        let moves = pokemonData.Moves;
        let abilities = pokemonData.Abilities;
        let parsed_data = pokemonData.Teammates;

    

    pokemonName = pokemon_name.toLowerCase().replace(' ', '-').replace('.', '').replace("'", '').replace('♀', '-f').replace('♂', '-m');
    if (pokemonName.startsWith('arceus')) {
        pokemonName = 'arceus';
    }
    
    if (pokemonName.startsWith('zygarde')) {
        pokemonName = 'zygarde';
    }
    if (pokemonName.startsWith('keldeo')) {
        pokemonName = 'keldeo';
    }
    if (pokemonName.startsWith('aegislash')) {
        pokemonName = 'aegislash';
    }
    if (pokemonName.startsWith('gourgeist')) {
        pokemonName = 'gourgeist';
    }
    if (pokemonName.startsWith('pumpkaboo')) {
        pokemonName = 'pumpkaboo';
    }
    if (pokemonName.startsWith('mimikyu')) {
        pokemonName = 'mimikyu';
    }
    if (pokemonName.startsWith('toxtricity')) {
        pokemonName = 'toxtricity';
    }
    if (pokemonName.startsWith('urshifu')) {
        pokemonName = 'urshifu';
    }
    if (pokemonName.startsWith('calyrex')) {
        pokemonName = 'calyrex';
    }
    if (pokemonName.startsWith('indeedee')) {
        pokemonName = 'indeedee';
    }
    if (pokemonName.startsWith('zacian')) {
        pokemonName = 'zacian';
    }
    if (pokemonName.startsWith('zamazenta')) {
        pokemonName = 'zamazenta';
    }
    if (pokemonName.startsWith('eternatus')) {
        pokemonName = 'eternatus';
    }
    if (pokemonName.startsWith('glastrier')) {
        pokemonName = 'glastrier';
    }
    if (pokemonName.startsWith('spectrier')) {
        pokemonName = 'spectrier';
    }
    if (pokemonName.startsWith('giratina')) {
        pokemonName = 'giratina';
    }
    if (pokemonName.startsWith('darmanitan')) {
        pokemonName = 'darmanitan';
    }
    if (pokemonName.startsWith('meowstic')) {
        pokemonName = 'meowstic';
    }
    if (pokemonName.startsWith('basculin')) {
        pokemonName = 'basculin';
    }
    if (pokemonName.startsWith('thundurus')) {
        pokemonName = 'thundurus';
    }
    if (pokemonName.startsWith('landorus')) {
        pokemonName = 'landorus';
    }
    if (pokemonName.startsWith('tornadus')) {
        pokemonName = 'tornadus';
    }
    if (pokemonName.startsWith('meloetta')) {
        pokemonName = 'meloetta';
    }
    if (pokemonName.startsWith('necrozma')) {
        pokemonName = 'necrozma';
    }
    if (pokemonName.startsWith('sylvally')) {
        pokemonName = 'silvally';
    }     
    if (pokemonName.startsWith('rotom')) {
        pokemonName = 'rotom';
    }
    if (pokemonName.startsWith('deoxys')) {
        pokemonName = 'deoxys';
    }
    if (pokemonName.includes('-mega')) {
        pokemonName = pokemonName.split('-mega')[0];
    }
    if (pokemonName.endsWith('-alola')) {
        pokemonName = pokemonName.replace('-alola', '');
    }
    if (pokemonName.endsWith('-galar')) {
        pokemonName = pokemonName.replace('-galar', '');
    }
    if (pokemonName.endsWith('-totem')) {
        pokemonName = pokemonName.replace('-totem', '');
    }
    if (pokemonName.endsWith('-therian')) {
        pokemonName = pokemonName.replace('-therian', '');
    }
    if (pokemonName.endsWith('-primal')) {
        pokemonName = pokemonName.replace('-primal', '');
    }
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
    .then(response => response.json())
    .then(pokemon_data => {
        
        d3.select("#pokemon_image").selectAll("*").remove();
        let pokemonShape = pokemon_data.shape.name;
        let imageUrl = `gifs/${pokemonShape}.gif`;
        let imgHeight = 100;  // The height of the image
    
        // Create a new image object
        let img = new Image();
        img.onload = function() {
            d3.select("#pokemon_image")
                .append("image")
                .attr("href", imageUrl)
                .attr("width", 100) // adjust as needed
                .attr("height", imgHeight) // adjust as needed
                .attr("x", 0) // adjust as needed
                .attr("y", 0); // adjust as needed
    
            // Add the text below the image
            d3.select("#pokemon_image")
                .append("text")
                .text(pokemon_name)
                .style("font-size", "20px")
                .attr("x", 0)
                .attr("y", imgHeight + 20);  // Position the text 20px below the image
        };
        img.src = imageUrl;
    });
        

        let esc_h = d3
        .scaleBand()
        .domain(parsed_data.map(d => d.Name))
        .range([margins[1], WIDTH - margins[3]])
        .paddingInner(0.9);

        // Define the scale
        let sizeScale = d3.scaleLog()
        .domain(d3.extent(parsed_data, d => d.Weight))  // Use the min and max weight as the domain
        .range([10, 200]);  // Map the weights to sizes between 10 and 100

  



        const Images = SVG.append("g").attr('id', 'Images');


         //esto permite elegir si usar imagenes o iconos para los pokemon
        fetchPokemonDataAndAddImages2(parsed_data, gen)
        .then(() => {
            Images
            .selectAll("image")
            .data(parsed_data.slice(0, 6))
            .join("image")
            .attr("xlink:href", d => d.imageUrl)
            .attr("x", d => esc_h(d.Name) - 30)
            .attr("y", d => HEIGHT/2-sizeScale(d.Weight)) // imageHeight is the height of your image
            .attr('width', d => sizeScale(d.Weight))
            .attr('height', d => sizeScale(d.Weight));
        });

        // titulo
        SVG.append("text")
        .attr("x", WIDTH / 2)
        .attr("y", margins[0]+5)
        .attr("text-anchor", "middle")
        .style("font-size", "15px")
        .style("text-decoration", "underline")
        .style("font-family", "monospace")
        .text(`Compañeros de equipo de ${pokemon_name} más populares en el formato ${event.detail.format}.`);







    });
});
