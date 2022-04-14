import ConfirmUserEmailService from "../services/users/confirm_email/confirm.email.service";
import CreateUsersService from "../services/users/create/create.service";
import LoginService from "../services/users/login/login.service";
import GetUserService from "../services/users/get/get.service";

export default [
  CreateUsersService,
  LoginService,
  GetUserService,
  ConfirmUserEmailService
];