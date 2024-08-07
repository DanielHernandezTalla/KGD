import React, { FC, ReactNode, createContext, useReducer } from 'react';
import { signOut } from 'next-auth/react';
import { IPersonal } from '@/interface/personal';

interface ContextProps {
    isLoggedIn: boolean;
    user?: IPersonal;
    errorMessage: string;
  
    loginUser: (email: string) => Promise<Boolean>;
    logout: () => void;
  }

// Auth Context
export const AuthContext = createContext({} as ContextProps);

export interface AuthState {
  isLoggedIn: boolean;
  user?: IPersonal;
  errorMessage: string,
}

const Auth_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
  errorMessage: "",
};

interface Props {
  children: ReactNode;
}

// Auth Provider
export const AuthProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);
  
    const loginUser = async (email: string): Promise<Boolean> => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ email: email.toLocaleLowerCase() })
        });
        
        const data = await res.json();
        if (data.status === '200') {
          dispatch({ type: '[Auth] - Login', payload: data.user });
          return true;
        }
        if (data.status === '400' || data.status === '404') {
          dispatch({ type: '[Auth] - Login Error', errorMessage: "Usuario no registrado." });
          return false;
        }
        
        return false;
      } catch (error) {
        dispatch({ type: '[Auth] - Login Error', errorMessage: "Hubo un error con el servidor." });
        return false;
      }
    };
  
    const logout = () => {
      dispatch({ type: '[Auth] - Logout' });
      signOut({
        callbackUrl: '/auth/signin'
      });
    };
  
    return (
      <AuthContext.Provider
        value={{
          ...state,
          loginUser,
          logout
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

type AuthActionType = { type: '[Auth] - Login'; payload: IPersonal } | { type: '[Auth] - Logout' } | { type: '[Auth] - Login Error'; errorMessage: string };

// Auth Reducer
export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
  switch (action.type) {
    case '[Auth] - Login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        errorMessage: "",
      };
    case '[Auth] - Logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
        errorMessage: "",
      };
    case '[Auth] - Login Error':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};