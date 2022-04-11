import * as bcrypt from "bcrypt";

class Bcrypt {
  public async hash(data: string, salt: string) {
    data += salt;
    const hash = await bcrypt.hash(data, 10);
    return hash;
  }

  public async compare(value: string, hash: string, salt: string) {
    value += salt;
    const match = await bcrypt.compare(value, hash);
    return match;
  }
}

export default Bcrypt;
