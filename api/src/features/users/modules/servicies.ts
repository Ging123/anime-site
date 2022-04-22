import ConfirmUserEmailService from "../services/confirm_email/confirm.email.service";
import CreateUsersService from "../services/create/create.service";
import DeleteUserService from "../services/delete/delete.service";
import LoginService from "../services/login/login.service";
import GetUserService from "../services/get/get.service";

export default [
  CreateUsersService,
  LoginService,
  GetUserService,
  ConfirmUserEmailService,
  DeleteUserService
];