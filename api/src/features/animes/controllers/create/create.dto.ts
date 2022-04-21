import { IsNotEmpty, IsString, MaxLength } from "class-validator";

class CreateDto {

  @IsNotEmpty({ message:"Name is empty" })
  @IsString({ message: "Name must be a string" })
  @MaxLength(100, { message:"Name must be shorter than 100 characteres" })
  name:string;

  @MaxLength(300, { message:"Description must be shorter than 300 characteres" })
  description:string;
}

export default CreateDto;