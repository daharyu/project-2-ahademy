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
  currentPassword: string | undefined;
  newPassword: string | undefined;
};

export type UserData = {
  user: {
    id: string | number;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
  };
  token: string;
};
