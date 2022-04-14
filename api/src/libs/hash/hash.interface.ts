interface Hash {
  hash:(data:string, salt:string) => Promise<string>;
  compare:(value:string, hash:string, salt:string) => Promise<boolean>; 
}

export default Hash;