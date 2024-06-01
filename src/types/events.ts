export interface Event {
  company:    Company;
  vendors:    Vendor[];
  dates:      string[];
  id:         number;
  user_id:    number;
  name:       string;
  location:   string;
  created_at: string;
}

export interface Company {
  id:   number;
  name: string;
}

export interface Vendor {
  name:        string;
  status:      string;
  remarks?:    string;
  updated_at?: Date | null;
}

export interface UpdateEvent{
  event_id?: number;
  name?: string;
  location?: string;
  remarks?: string;
  vendors?: number[];
  dates?: string[];
}