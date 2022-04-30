import styles from "./styles.module.scss";

const PagesBar = () => {
  const pages = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

  return (
    <div className={ styles.container }>
      { pages.map(createPages) }
    </div> 
  );
}

function createPages(value:number) {
  const className = `${ styles.page } ${value === 1 ? styles.selected : ""}`;

  return (
    <nav className={ className } key={ value }>
      { value }
    </nav>
  );
}

export default PagesBar;