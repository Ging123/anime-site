import styles from "./styles.module.scss";

type changeEvt = React.ChangeEvent<HTMLInputElement>;

interface props {
  background?:string;
  border?:string;
  className?:string;
  icone?:JSX.Element;
  maxLength?:number;
  minLength?:number;
  onChange:(e:changeEvt) => void;
  placeholder?:string;
  value:string|number;
  type?:"email"|"number"|"password"|"text";
}

const Input = (props:props) => {
  const className = `${styles.container} ${ props.className || "" }`;
  const style = {
    background:props.background,
    border:props.border
  }

  return (
    <div className={ className } style={ style }>
      <input 
        className={ styles.input }
        maxLength={ props.maxLength }
        minLength={ props.minLength }
        onChange={ props.onChange }
        placeholder={ props.placeholder }
        type={ props.type || "text" }
        value={ props.value }
      />
      { props.icone }
    </div>
  )
}

export default Input;