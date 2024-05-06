window.addEventListener("pokemonClick", function(event) {
    console.log("File clicked:", event.detail.pokemon_name);
    DATOS = 'movesets_data/' + event.detail.date + '/' + event.detail.gen + event.detail.format +'.json';
    let pokemon_name;  // Declare pokemon_name variable
    if (event.detail.pokemon_name.startsWith("Tapu")) {
        pokemon_name = event.detail.pokemon_name.replace("-", " ");
    }
    else {
        pokemon_name = event.detail.pokemon_name;
    }

    d3.json(DATOS).then(data => {
        const margins = [10, 10, 10, 10];
        const format = d3.format(",d");

        let pokemonData = data[pokemon_name];
        let moves = pokemonData.Moves;
        let abilities = pokemonData.Abilities;
        let teammates = pokemonData.Teammates;


        console.log(pokemonData);
        console.log(teammates);







    });
});
