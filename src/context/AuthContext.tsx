import React, { createContext, useContext, useState, useEffect } from 'react';
import { Usuario } from '../types';
import { mockUsuarios } from '../data/mockData';
import { colegioService } from '../services/colegioService';
import { setAuthToken } from '../services/api';

interface AuthContextType {
    usuario: Usuario | null;
    login: (loginInput: string, senhaInput: string) => Promise<boolean>;
    logout: () => void;
    estaAutenticado: boolean;
    perfilAtual: string | null;
    conectadoComBackend: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(() => {
        const salvo = localStorage.getItem('colegio_veredas_usuario');
        return salvo ? JSON.parse(salvo) : null;
    });
    const [conectadoComBackend, setConectadoComBackend] = useState<boolean>(() => {
        return !!localStorage.getItem('colegio_veredas_jwt_token');
    });

    useEffect(() => {
        if (usuario) {
            localStorage.setItem('colegio_veredas_usuario', JSON.stringify(usuario));
        } else {
            localStorage.removeItem('colegio_veredas_usuario');
        }
    }, [usuario]);

    const login = async (loginInput: string, senhaInput: string): Promise<boolean> => {
        // 1. Tenta autenticação real na API Spring Boot
        try {
            const authBackend = await colegioService.login(loginInput, senhaInput);
            if (authBackend) {
                setUsuario(authBackend.usuario);
                setConectadoComBackend(true);
                return true;
            }
        } catch {
            // Fallback em caso de erro de rede ou backend offline
        }

        // 2. Fallback gracioso para modo de demonstração local
        const limpo = loginInput.trim().toLowerCase();
        const cpfLimpo = loginInput.replace(/\D/g, '');

        const usuarioEncontrado = mockUsuarios.find(u => {
            const emailMatch = u.email.toLowerCase() === limpo;
            const cpfMatch = u.cpf.replace(/\D/g, '') === cpfLimpo;
            return (emailMatch || cpfMatch);
        });

        if (usuarioEncontrado && senhaInput === '123456') {
            setUsuario(usuarioEncontrado);
            setConectadoComBackend(false);
            return true;
        }

        return false;
    };

    const logout = () => {
        setUsuario(null);
        setAuthToken(null);
        setConectadoComBackend(false);
    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                login,
                logout,
                estaAutenticado: !!usuario,
                perfilAtual: usuario ? usuario.perfil : null,
                conectadoComBackend,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

// Aliases para compatibilidade se o projeto importar com School
export { AuthProvider as SchoolProvider, useAuth as useSchool };