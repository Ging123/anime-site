import { IsNotEmpty, IsString, MaxLength } from "class-validator";

class DeleteDto {

  @IsNotEmpty({ message:"This anime doesn't exists" })
  @IsString({ message: "This anime doesn't exists" })
  @MaxLength(100, { message:"This anime doesn't exists" })
  name:string;
}

export default DeleteDto;