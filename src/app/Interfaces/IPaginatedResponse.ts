export interface IPaginatedResponse {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  items: IUser[];
}

export interface IUser {
  id: number;
  nombre: string;
  email: string;
  estado: boolean;
  isAdmin: boolean;
}
