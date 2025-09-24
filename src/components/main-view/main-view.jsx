import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "The Dark Knight",
      Description:
        "Batman faces the Joker, a criminal mastermind who seeks to create chaos in Gotham City.",
      Genre: {
        Name: "Action",
        Description:
          "Action films are characterized by physical feats, fights, chases, and explosions.",
      },
      Director: {
        Name: "Christopher Nolan",
        Bio: "Updated. Christopher Edward Nolan is a British-American film director, producer, and screenwriter known for his innovative storytelling and cinematic style.",
        Birth: "1970",
      },
      Year: 2008,
      Rating: 9,
       ImagePath: "https://m.media-amazon.com/images/I/61Z+AfG7LyL._AC_UL640_QL65_.jpg",
      Featured: true,
    },
    {
      id: 2,
      Title: "Se7en",
      Description:
        "Two detectives hunt a serial killer who uses the seven deadly sins.",
      Genre: {
        Name: "Thriller",
        Description:
          "Thriller films involve suspense, excitement, and tension to keep the audience engaged.",
      },
      Director: {
        Name: "David Fincher",
        Bio: "David Andrew Leo Fincher is an American director known for his dark and stylish films.",
        Birth: "1962",
      },
      Year: 1995,
      Rating: 8.6,
      ImagePath: "https://m.media-amazon.com/images/I/51jiCveUPiL._AC_UL640_QL65_.jpg",
      Featured: false,
    },
    {
      id: 3,
      Title: "Pulp Fiction",
      Description:
        "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine in tales of violence and redemption.",
      Genre: {
        Name: "Crime",
        Description:
          "Crime films focus on criminals, their motives, and law enforcement pursuing them.",
      },
      Director: {
        Name: "Quentin Tarantino",
        Bio: "Quentin Jerome Tarantino is an American filmmaker known for his stylized films and sharp dialogue.",
        Birth: "1963",
      },
      Year: 1994,
      Rating: 8.9,
      ImagePath: "https://m.media-amazon.com/images/I/71Nhr2mGlYL._AC_UL640_QL65_.jpg",
      Featured: true,
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
