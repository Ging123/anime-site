import SearchInput from "./components/search_input/Index";
import PagesBar from "./components/pages_bar/Index";
import Header from "../../components/header/Index";
import Filters from "./components/filters/Index";
import Animes from "./components/animes/Index";
import Title from "./components/Title/Index";
import Genre from "./components/genre/Index";
import styles from "./styles.module.scss";
import { useState } from "react";

const Home = () => {
  const [ genreIsVisible, setGenreVisibility ] = useState(false);

  return (
    <>
      <Header/>
      <main className={ styles.main }>
        <Title text="All"/>
        <SearchInput/>
        <Filters 
          setGenreVisibility={ setGenreVisibility }
        /> 
        { genreIsVisible && <Genre/> }
        <Animes/>
      </main>
      <PagesBar/>
    </>
  );
}

export default Home;