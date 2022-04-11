import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

class LoginDto {
  @IsNotEmpty({ message: "Email or username is empty" })
  @IsString({ message: "Email or username must be a string" })
  @MaxLength(100, { message: "Email or username invalid" })
  emailOrUsername: string;

  @IsNotEmpty({ message: "Passwor is empty" })
  @IsString({ message: "Password must be a string" })
  @MaxLength(30, { message: "Password must be shorter than 30 characteres" })
  @MinLength(7, { message: "Password must be greater than 6 characteres" })
  password: string;
}

export default LoginDto;
