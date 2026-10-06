// Cliente HTTP configurado para se conectar à API Spring Boot (backend)
// Com fallback automático para dados locais quando a API não estiver respondendo.

const API_BASE_URL = ((import.meta as any).env?.VITE_API_URL) || 'http://localhost:8080/api/v1';

export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    isFallback: boolean;
}

export const getAuthToken = (): string | null => {
    return localStorage.getItem('colegio_veredas_jwt_token');
};

export const setAuthToken = (token: string | null) => {
    if (token) {
        localStorage.setItem('colegio_veredas_jwt_token', token);
    } else {
        localStorage.removeItem('colegio_veredas_jwt_token');
    }
};

export async function requestApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<{ data: T | null; status: number; ok: boolean; error?: string }> {
    const token = getAuthToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (response.status === 401) {
            // Token expirou ou inválido
            setAuthToken(null);
        }

        if (!response.ok) {
            const errorJson = await response.json().catch(() => null);
            return {
                data: null,
                status: response.status,
                ok: false,
                error: errorJson?.message || `Erro na requisição (Status: ${response.status})`,
            };
        }

        const data = await response.json();
        return { data, status: response.status, ok: true };
    } catch (err: any) {
        // Backend offline / modo local
        return {
            data: null,
            status: 0,
            ok: false,
            error: 'Backend inacessível ou offline. Executando em modo de demonstração local.',
        };
    }
}