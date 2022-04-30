import { IsNotEmpty, IsString, MaxLength } from "class-validator";

class CreateDto {

  @IsNotEmpty({ message:"Tag is empty" })
  @IsString({ message:"Tag must be a string" })
  @MaxLength(30, { message:"Tag length must be shorter than 30" })
  name:string;
}

export default CreateDto;