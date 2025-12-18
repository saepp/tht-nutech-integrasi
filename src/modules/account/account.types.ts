export type AccountRow = {
  id: number;
  user_id: number;
  balance: string;
};

export type IdAccountRow = Pick<AccountRow, "id">;
