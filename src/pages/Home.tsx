import React from "react";
import { gql, useQuery } from "@apollo/client";

type Props = {};

const myMovies = gql`
  query MyMovies($genre: String!) {
    movie {
      getMovies {
        title
        id
        genre
      }
      getMovieById(genre: $genre) {
        title
        desc
        isSeries
        genre
      }
    }
  }
`;
const Home = (props: Props) => {
  const { loading, error, data } = useQuery(myMovies, {
    variables: { genre: "documentary" },
  });
  let getMovieById;
  if (data && data.movie) {
    ({ getMovieById } = data.movie);
  }
  return (
    <div className="text-[40px] font-mont">
      <p>welcome</p>
    </div>
  );
};

export default Home;
