import Base from "../base";

class DeleteUserService extends Base {

  public async delete(acesseToken:string) {
    const userId = this.convertToken(acesseToken);
    await this.deleteUser(userId);
  }

  private convertToken(token:string):string {
    const salt = process.env.ACCESS_TOKEN_SECRET;
    const user = this.jwt.convert(token, salt);
    return user.id;
  }

  private async deleteUser(id:string) {
    const isInDev = process.env.STATUS === "DEV";
    if(isInDev) return await this.user.deleteById(id);
  }
}

export default DeleteUserService;