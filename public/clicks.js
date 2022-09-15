
const button = document.getElementById('buttonBuscar');
const buttonHardcodeado = document.getElementById('buttonHardcodeado');
const buttonRandom = document.getElementById('buttonRandom');

button.addEventListener('click', function(e) {
    // realizar la busqueda y generar la lista 
    fetch('/peliculas?title='+title(), {method: 'GET'})
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then((data) => {
        let lista = "";
        data.forEach((peli)=>
        {
            lista += movie_card(peli.poster, peli.title, peli.year, peli.plot, peli.metacritic, peli.tomatoes_rating, peli.imbd_rating);
        })
        lista += "<p>"+ data.length + " resultados</p>"
        const divRes = document.getElementById("resultados");
        divRes.innerHTML = lista;
        return;
    } )
    .catch(function(error) {
      console.log(error);
    });

   

});
const title = () => {
  return document.getElementById("input-title").value;
}



buttonHardcodeado.addEventListener('click', function(e) {
  // realizar la busqueda y generar la lista 
  fetch('/peliculas-hardcodeado', {method: 'GET'})
  .then(function(response) {
    if(response.ok) {
      return response.json();
    }
    throw new Error('Request failed.');
  })
  .then((data) => {
      let lista = "";
      data.forEach((peli)=>
      {
        lista += movie_card(peli.poster, peli.title, peli.year, peli.plot, peli.metacritic, peli.tomatoes_rating, peli.imbd_rating);
      })
      lista += "<p>"+ data.length + " resultados</p>"
      const divRes = document.getElementById("resultados");
      divRes.innerHTML = lista;
      return;
  } )
  .catch(function(error) {
    console.log(error);
});
});


buttonRandom.addEventListener('click', function(e) {
  // realizar la busqueda y generar la lista 
  fetch('/peliculas-random', {method: 'GET'})
  .then(function(response) {
    if(response.ok) {
      return response.json();
    }
    throw new Error('Request failed.');
  })
  .then((data) => {
      let lista = "";
      data.forEach((peli)=>
      {
        lista += movie_card(peli.poster, peli.title, peli.year, peli.fullplot, peli.metacritic, peli.tomatoes_rating, peli.imbd_rating);
      })
      lista += "<p>"+ data.length + " resultados</p>"
      const divRes = document.getElementById("resultados");
      divRes.innerHTML = lista;
      fetch('/peliculas', {
        method: 'POST',  
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
          {title: 'TADW Presenta: '+data[0].title,
          fullplot: data[1].fullplot,
          cast: data[2].cast,
          poster: data[3].poster,
          year: data[4].year}
        )})
      return;
  } )
  .catch(function(error) {
    console.log(error);
});
});