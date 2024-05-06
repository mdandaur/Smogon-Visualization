window.addEventListener("pokemonClick", function(event) {
    console.log("File clicked:", event.detail.pokemon_name);
    DATOS = 'movesets_data/' + event.detail.date + '/' + event.detail.gen + event.detail.format +'.json';
    pokemon_name = event.detail.pokemon_name;

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
