// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    // return moviesArray.map((movie) => movie.director);
    const directors = moviesArray.map((movie) => movie.director);
    const uniqueDirectors = directors.filter((director, index) => directors.indexOf(director) === index);
    return uniqueDirectors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    const spielbergDramaMovies = moviesArray.filter( movie =>
        movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')
    );
    return spielbergDramaMovies.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    return moviesArray.length === 0 ? 0 : parseFloat((moviesArray.reduce((acc, curr) => 
                curr.score ? acc + curr.score : acc, 0) / moviesArray.length).toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    const dramaMovies = moviesArray.filter(movie => movie.genre.includes('Drama'));
    return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    const moviesCopy = [...moviesArray];
    return moviesCopy.sort((a, b) => a.year !== b.year ? a.year - b.year : a.title.localeCompare(b.title));
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    const titles = moviesArray.map(movie => movie.title);
    titles.sort((a, b) => a.localeCompare(b));
    return titles.slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    const moviesCopy = moviesArray.map(movie => ({...movie})); // Deep copy to avoid mutating original array
    return moviesCopy.map(movie => {
        const duration  = movie.duration;
        const durationSplit = duration.split(' ');
        // one liner solution:
        // let totalDuration = parseInt(durationSplit[0]) * 60 + (durationSplit[1] ? parseInt(durationSplit[1]) : 0 );
        
        // expanded solution:
        let totalDuration = 0;
        durationSplit.forEach(element => {
            if (element.includes('h')) {
                totalDuration += parseInt(element) * 60;
            } else if (element.includes('min')) {
                totalDuration += parseInt(element);
            } else {
                totalDuration += 0; // in case of unexpected format
            }
        });
        movie.duration = totalDuration;
        return movie;
    });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    
    if (moviesArray.length === 0) return null;

    if (moviesArray.length === 1) 
        return `The best year was ${moviesArray[0].year} with an average score of ${moviesArray[0].score}`;
    
    const yearScores = {};
    moviesArray.forEach(movie => {
        yearScores[movie.year] = yearScores[movie.year] || [];
        yearScores[movie.year].push(movie.score);
    });
    let bestYear = null;
    let bestAvg = 0;
    for (const year in yearScores) {
        const averageScore = 
        yearScores[year].reduce((acc, curr) => acc + curr, 0) / yearScores[year].length;

        if (averageScore > bestAvg) {
            bestAvg = averageScore;
            bestYear = year;
        }
    }

    return `The best year was ${bestYear} with an average score of ${bestAvg.toFixed(1)}`;
}
