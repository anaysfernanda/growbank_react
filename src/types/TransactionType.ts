export interface TransactionType {
  id: number;
  valor: number;
  data: string;
  type: "C" | "D";
  destinatario?: string;
}
