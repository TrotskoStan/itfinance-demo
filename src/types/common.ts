export const CATEGORY_LIST = [
  'sports',
  'finance',
  'tech',
  'health',
  'travel',
  'education',
  'automotive',
  'entertainment',
  'food',
];

export type Category = (typeof CATEGORY_LIST)[number];

export interface Payload {
  data: string;
}

export interface Lead {
  id: number;
  category: Category;
  payload: Payload;
}
