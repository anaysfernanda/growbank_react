import InputType from "./InputType";
import PixType from "./PixType";
import ExitType from "./ExitType";
import { TransactionType } from "./TransactionType";

interface UserType {
  saldo: number;
  transactions: TransactionType[];
}

export default UserType;
