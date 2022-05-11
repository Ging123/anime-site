import { IsBoolean, IsNumber, IsOptional, IsUUID, Min } from "class-validator";

class GetManyDto {

  @IsOptional()
  @IsBoolean()
  asc?:boolean;

  @IsOptional()
  @IsNumber()
  @Min(1, { message:"Page invalid"} )
  page?:number;

  @IsOptional()
  @IsUUID()
  tagId?:string;
}

export default GetManyDto;