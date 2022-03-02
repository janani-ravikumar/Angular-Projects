export interface IMoviesResult {
    results: IMovies[]
}

export interface IMovies {
    title: string,
    director: string,
    characters: string[],
    created: string
}