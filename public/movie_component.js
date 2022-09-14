function movie_card (image_link, title, year, plot, metacritic_rating, tomatoes_rating, imdb_rating ) {
    
    image_link = image_link == null ? ' Desconocido ' : image_link
    title = title == null ? ' Desconocido ' : title
    year = year == null ? ' Desconocido ' : year
    plot = plot == null ? ' Desconocido ' : plot
    metacritic_rating = metacritic_rating == null ? ' Desconocido ' : metacritic_rating
    tomatoes_rating = tomatoes_rating == null ? ' Desconocido ' : tomatoes_rating
    imdb_rating = imdb_rating == null ? ' Desconocido ' : imdb_rating
return `<figure class="movie">
    <div class="movie__price">
        <img src="` + image_link + `" alt="` + title + `" class="movie__img"></img></div>
        <div class="movie__content">
            <div class="movie__title">
                <h1 class="heading__primary">` + title + ` ( ` + year + `)
                    <i class="fas fa-fire"></i>
                </h1>
            </div>
                <p class="movie__description">
                ` + plot + `
                </p>
                <div class="movie__details">
                    <p class="movie__detail">
                        <span class="Rating">
                         Tomatoes: ` + tomatoes_rating + ` 
                         - IMDB: ` + imdb_rating + ` 
                         - METACRITIC: ` + metacritic_rating  + ` 
                        </span>
                    </p>
                </div>
        </div>
    </div>
</figure>
`
}