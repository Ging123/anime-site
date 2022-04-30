import animesExample from "./example/animes.example";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsPlayCircle } from "react-icons/bs";
import styles from "./styles.module.scss";

interface anime {
  name:string;
  image:string;
}

const Animes = () => {
  const animes = animesExample;

  return (
    <div className={ styles.container }>
      { animes.map(createAnime) }
    </div>
  );
}

function createAnime(data:anime, index:number) {
  return (
    <div className={ styles.anime } key={ index }>
      <img
        alt="It wasn't possible to load this image"
        className={ styles.image }
        draggable={ false }
        src={ data.image }
      />
      <div className={ styles.bar }>
        <b className={ styles.name }>{ data.name }</b>
      </div>
      <div className={ styles.layer }/>
      <AiOutlinePlusCircle 
        className={ styles.plus }
        title="Add to your list"
      />
      <BsPlayCircle
        className={ styles.play }
      />
    </div>
  );
}

export default Animes;