export interface IUserAdminRepository {
  createUser: (
    name: string,
    lastName: string,
    email: string,
    password: string,
    area: number
  ) => Promise<boolean>;

  validateUser: (email: string) => Promise<boolean>;

  updateUser: (
    email: string,
    name: string,
    lastName: string,
    area: number
  ) => Promise<boolean>;

  deleteUser: (email: string) => Promise<boolean>;
}
