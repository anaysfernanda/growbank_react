export interface TransactionType {
  id: number;
  valor: number;
  data: string;
  type: string;
  destinatario?: string;
}
