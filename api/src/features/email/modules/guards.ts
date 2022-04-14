import CodeIsValidGuard from "../guards/code.is.valid.guard";

export default [
  {
    provide:"CODE_IS_VALID_GUARD",
    useClass: CodeIsValidGuard
  }
];