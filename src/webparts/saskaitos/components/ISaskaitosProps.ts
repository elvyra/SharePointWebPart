export interface ISaskaitosProps {
  description: string;
  absoluteUrl: string;
  list: BillsList;
}

export interface ISaskaitaProps {
  item: Bill;
}

export interface BillsList {
  value: Bill[];
}

export interface Bill {
  Id: string;
  Title: string;
  Payed: boolean;
  Late: boolean;
  Amount: number;
  Responsible: string;
  Date: string;
}
