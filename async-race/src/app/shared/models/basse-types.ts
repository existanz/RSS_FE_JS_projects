export type MyObject = Record<string, string>;
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export interface Car extends MyObject {
  id: string;
  name: string;
  color: string;
}

export interface Winner extends MyObject {
  id: string;
  wins: string;
  time: string;
}
