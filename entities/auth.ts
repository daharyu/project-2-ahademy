export type AuthUser = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type AuthLogin = {
  email: string;
  password: string;
};

export type UpdateProfile = {
  name: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
};

export type UserProfileData = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
};

export type UserData = {
  token: string;
  user: UserProfileData;
};
