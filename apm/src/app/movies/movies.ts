export interface IMoviesResult {
    results: IMovies[]
   
}

export interface IMovies {
    title: string,
    director: string,
    releaseDate: string,
    characters: string[],
    created: string
}