export class IDAdminChecker {
  public static checkID(id: number, email: string): boolean {
    switch (email) {
      case "mathisjoseph86@gmail.com":
        return this.decodeID(id, 1511);
      case "armanddrouet@gmail.com":
        return this.decodeID(id, 2106);
      case "gregoire.richard86@gmail.com":
        return this.decodeID(id, 2501);
      default:
        return false;
    }
  }
  private static decodeID(id: number, code: number): boolean {
    const COEF =
      typeof process.env.COEF == "string" ? parseInt(process.env.COEF) : 1;
    return id / COEF === code;
  }
}
