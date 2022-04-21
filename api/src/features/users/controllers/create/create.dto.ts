import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";

class CreateUserDto {
  @IsNotEmpty({ message: "Email is empty" })
  @IsString({ message: "Email must be a string" })
  @MaxLength(100, { message: "Email must be shorter than 100 characteres" })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: "Username is empty" })
  @IsString({ message: "Username must be a string" })
  @MaxLength(30, { message: "Username must be shorter than 30 characteres" })
  username: string;

  @IsNotEmpty({ message: "Passwor is empty" })
  @IsString({ message: "Password must be a string" })
  @MaxLength(30, { message: "Password must be shorter than 30 characteres" })
  @MinLength(7, { message: "Password must be greater than 6 characteres" })
  password: string;

  adminKey:string;
}

export default CreateUserDto;
