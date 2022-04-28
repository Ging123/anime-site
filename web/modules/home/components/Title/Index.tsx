import styles from "./styles.module.scss";

interface props {
  text:string;
}

const Title = (props:props) => {
  return (
    <h1 className={ styles.title }>{ props.text }</h1>
  )
}

export default Title;