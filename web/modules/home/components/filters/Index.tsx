import { BsSortAlphaDown, BsSortAlphaUpAlt } from "react-icons/bs";
import { FaThList } from "react-icons/fa"; 
import styles from "./styles.module.scss";
import { useState } from "react";


const Filters = () => {
  const [ sortByAlpha, setSortByAlpha ] = useState(true);

  return (
    <div className={ styles.container }>
      <FaThList className={ styles.icone } title="Genres"/>
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
  )
}

export default Filters;