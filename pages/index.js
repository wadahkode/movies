import Head from "next/head";
import Movies from "./Movies";
import styles from "../styles/Home.module.css";
import MoviesSearch from "./MoviesSearch";

const moviesList = [
  "Avengers",
  "Captain America the winter soldier",
  "Thor",
  "Spider-Man",
  "Ant man",
  "Underworld",
  "The Lord of the Rings",
  "Iron man",
  "Superman",
  "One piece",
  "Ultraman",
  "Matrix",
  "X-men",
  "twilight",
  "Doraemon",
  "Naruto",
  "DragonBall",
  "Spongebob",
  "Spider-Man No Way Home",
  "The Dark Night",
  "Inception",
  "Shershaah",
  "Star wars",
  "Gladiator",
  "Titanic",
];

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Movies</title>
        <meta name="description" content="movies" />
        <meta name="author" content="wadahkode" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.navbar}>
        <h1 className={styles.title}>Movies</h1>
        <div className="search">
          <MoviesSearch />
        </div>
      </nav>

      <main className={styles.main}>
        <Movies data={props.data} />
      </main>

      <footer className={styles.footer}>&copy;Wadahkode - 2021</footer>
    </div>
  );
}

export const getStaticProps = async () => {
  const url = "http://www.omdbapi.com/?apikey=d3f8751a";

  const getDataMovies = async (callback) => {
    for (let title of moviesList) {
      const data = await fetch(url + "&t=" + title);
      callback(await data.json());
    }
  };

  const dataMovies = [];

  await getDataMovies((movies) => dataMovies.push(movies));

  return {
    props: {
      data: dataMovies,
    },
  };
};
