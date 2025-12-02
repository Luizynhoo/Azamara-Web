import { useContext } from 'react';
import "./Toast.css"
import ToastContext from './Context';

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de ToastProvider');
  }
  return context;
};



