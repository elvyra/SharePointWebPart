export interface ISaskaitosProps {
  description: string;
  absoluteUrl: string;
}

export interface BillsList {
  value: Bill[];
}

export interface Bill {
  Title: string;
  Id: string;
}
