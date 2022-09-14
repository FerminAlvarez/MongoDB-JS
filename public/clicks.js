
const button = document.getElementById('buttonBuscar');
const buttonSorpresa = document.getElementById('buttonSorpresa');
import movie_card  from "./movie_card";

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
            lista += "<p>" + peli.title + " ("+ peli.year + ")" +  "</p>";
            lista += "<p> <span>" + peli.plot + "</span> </p>";
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



buttonSorpresa.addEventListener('click', function(e) {
  // realizar la busqueda y generar la lista 
  fetch('/peliculas-sorpresa', {method: 'GET'})
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
          lista += "<img src=" + peli.poster + ">";
          lista += "<p>" + peli.title + " ("+ peli.year + ")" +  "</p>";
      })
      lista += "<p>"+ data.length + " resultados</p>"
      const divRes = document.getElementById("resultado-sorpresa");
      divRes.innerHTML = lista;
      return;
  } )
  .catch(function(error) {
    console.log(error);
});
});