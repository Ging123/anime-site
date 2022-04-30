import { IsNotEmpty, IsString, MaxLength } from "class-validator";

class GetOneDto {

  @IsNotEmpty({ message:"Name is empty" })
  @IsString({ message: "This anime doesn't exist" })
  @MaxLength(100, { message:"This anime doesn't exist" })
  name:string;
}

export default GetOneDto;