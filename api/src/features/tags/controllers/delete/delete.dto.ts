import { IsNotEmpty, IsString, MaxLength } from "class-validator";

class DeleteDto {

  @IsNotEmpty({ message:"Tag is empty" })
  @IsString({ message:"This tag doesn't exists"})
  @MaxLength(30, { message:"This tag doesn't exists" })
  name:string;
}

export default DeleteDto;