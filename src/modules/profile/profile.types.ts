export interface ProfileRow {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  image_url: string | null;
  created_on: Date;
  updated_on: Date;
}

export type ProfileView = {
  email: string;
  first_name: string;
  last_name: string;
  image_url: string | null;
};

export type UpdateProfileParams = {
  first_name?: string | undefined;
  last_name?: string | undefined;
};
