import { IsNotEmpty, IsString, MaxLength } from "class-validator";

class GetImageDto {

  @IsNotEmpty({ message:"Name is empty" })
  @IsString({ message: "This image doesn't exist" })
  @MaxLength(100, { message:"This image doesn't exist" })
  name:string;
}

export default GetImageDto;