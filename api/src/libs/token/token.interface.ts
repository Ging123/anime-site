export default interface Token {
  convert:(token:string, secret:string) => any;
  createToken:(payload:object|string, secret:string) => string;
}