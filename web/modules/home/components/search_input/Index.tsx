import Button from "../../../../components/button/Index";
import Input from "../../../../components/input/Index";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./styles.module.scss";
import { useState } from "react";

const SearchInput = () => {
  const [ search, setSearch ] = useState("");

  return (
    <form className={ styles.form }>
      <Input 
        className={ styles.input }
        maxLength={ 100 }
        onChange={ (e) => setSearch(e.target.value) }
        placeholder="Search an anime here"
        value={ search }
      />
      <Button
        className={ styles.button }
        icone={ <AiOutlineSearch /> }
        type="submit"
      />
    </form>
  )
}

export default SearchInput;