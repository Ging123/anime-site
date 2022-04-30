import { BsSortAlphaDown, BsSortAlphaUpAlt } from "react-icons/bs";
import { Dispatch, SetStateAction, useState } from "react";
import { FaThList } from "react-icons/fa";
import styles from "./styles.module.scss";

type setter = Dispatch<SetStateAction<boolean>>;

interface props {
  setGenreVisibility:setter;
}

const Filters = (props:props) => {
  const [ sortByAlpha, setSortByAlpha ] = useState(true);

  return (
    <div className={ styles.container }>
      <FaThList 
        className={ styles.icone } 
        onClick={() => manipulateGenreVisibility(props.setGenreVisibility) }
        title="Genres"
      />
      { sortByAlpha ? 
      (
        <BsSortAlphaDown 
          className={ styles.icone }
          onClick={() => setSortByAlpha(false)}
          title="Alphabetical order"
        />
      ) 
      : 
      (
        <BsSortAlphaUpAlt 
          className={ styles.icone }
          onClick={() => setSortByAlpha(true)}
          title="Reverse alphabetical order"
        />
      ) 
      }
    </div>
  );
}

function manipulateGenreVisibility(genreIsVisible:setter) {
  genreIsVisible((visible) => {
    if(visible) return false;
    return true;
  });
}

export default Filters;