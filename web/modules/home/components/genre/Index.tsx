import styles from "./styles.module.scss";

const Genre = () => {
  const genre = ["action", "Comedy", "Fantasy", "Supernatural", "Drama", "Kids",
  "Historical", "Adventure", "Martial Arts", "Horror", "Mystery", "Police", 
  "Sci-Fi", "Magic", "Romance", "Shoujo", "Slice of Life", "Demons", "School",
  "Shounen", "Sports", "Music"];

  return (
    <div className={ styles.container }>
      { genre.map(createGenre) }
    </div>
  );
}

function createGenre(value:string, index:number) {
  return (
    <div className={ styles.genre } key={ index }>
      { value }
    </div>
  )
}

export default Genre;