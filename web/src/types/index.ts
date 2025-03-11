// Definiciones de tipos globales para la aplicación

// Tipos para autenticación
export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  createdAt: Date;
  avatarUrl?: string;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

// Tipos para servicios
export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  subServices?: SubService[];
}

export interface SubService {
  id: string;
  title: string;
  description: string;
  features?: string[];
  badge?: string;
  status: 'Active' | 'Fixing' | 'Coming Soon';
}

// Tipos para componentes
export interface LayoutProps {
  children: React.ReactNode;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

// Tipos para respuestas API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
} 