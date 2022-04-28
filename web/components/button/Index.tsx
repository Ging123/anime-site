import styles from "./styles.module.scss";

interface props {
  background?:string;
  className?:string;
  color?:string;
  content?:string;
  icone?:JSX.Element;
  onClick?:() => void;
  type?:"button"|"submit"|"reset";
}

const Button = (props:props) => {
  const style = {
    color:props.color,
    background:props.background
  }

  const className = `${styles.button} ${ props.className || "" }`;
  
  return (
    <button className={ className } style={ style } onClick={ props.onClick }>
      { props.content }
      { props.icone }
    </button>
  );
}

export default Button;