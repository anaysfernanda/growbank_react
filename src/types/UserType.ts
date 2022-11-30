import InputType from "./InputType";
import PixType from "./PixType";
import ExitType from "./ExitType";

interface UserType {
  saldo: number;
  saque: ExitType[];
  deposito: InputType[];
  pix: PixType[];
}

export default UserType;
