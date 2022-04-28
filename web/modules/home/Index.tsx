import SearchInput from "./components/search_input/Index";
import Header from "../../components/header/Index";
import Filters from "./components/filters/Index";
import Animes from "./components/animes/Index";
import Title from "./components/Title/Index";
import styles from "./styles.module.scss";

const Home = () => {
  return (
    <>
      <Header/>
      <main className={ styles.main }>
        <Title text="All"/>
        <SearchInput/>
        <Filters/>
        <Animes/>
      </main>
    </>
  );
}

export default Home;