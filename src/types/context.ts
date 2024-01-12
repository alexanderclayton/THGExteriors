import { User } from "firebase/auth";

export interface IAuthProviderProps {
    children: React.ReactNode;
}
  
export type TAuthContext = {
    user: User | null;
    loading: boolean
};