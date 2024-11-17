export interface CreateInvoiceProps {
  name: string;
  venue_short_code: string;
  service_request_id: string | number;
  due_date: string;
  payment_terms: string;
  notes: string;
}

export interface InvoiceListResponse {
  invoices: InvoiceResponse
}


export interface GetInvoicetResponse {
  invoice: InvoiceResponse
}

export interface InvoiceResponse {
  data: any[];
  id: number;
  name: string;
  type: 'homeowner' | 'company';
  contact_person: string;
  // client?: string;
  service: string;
  amount: number;
  date: string;
  due_date: Date;
  status: string;
  number: string;
  payment_method: string;
  payment_terms: string;
  notes: string;
  payments?: [];
  dates: {
    due_date: string;
    issue_date: string;
    payment_due_date: string;
  };
  client?: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  amounts: {
    subtotal: number;
    tax: number;
    total: number;
  };
  items: [
    {
      description: string;
      quantity: number;
      rate: number;
      amount: number;
    }
  ];
  service: {
    name: string;
    description: string;
  };
}

export interface IdShortCodeProps {
  id: string | number
}