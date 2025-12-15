import { UserData } from '@/entities/auth';

export const useLoginUser = (): UserData | null => {
  try {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Could not read localStorage:', error);
    return null;
  }
};
