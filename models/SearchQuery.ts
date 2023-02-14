import { Order, SortBy } from './enum';

export interface SearchParams {
    q: string;
    limit?: number;
    offset?: number;
    order?: Order;
    sort_by?: SortBy;
    sources?: string[]
    topics?: string[];
}

export interface LooseParams {
    [key: string]: any
}