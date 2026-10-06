export type PerfilUsuario = 'admin' | 'secretaria' | 'professor' | 'responsavel';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  perfil: PerfilUsuario;
  avatar?: string;
  cargoOuParentesco?: string;
  alunoVinculadoId?: string; // Para responsáveis
}

export interface Aluno {
  id: string;
  ra: string;
  nome: string;
  dataNascimento: string;
  turma: string;
  turno: 'Manhã' | 'Tarde' | 'Integral';
  responsavelNome: string;
  responsavelTelefone: string;
  responsavelEmail: string;
  status: 'Ativo' | 'Trancado' | 'Transferido';
  foto?: string;
  alergias?: string;
  observacoesMedicas?: string;
  tipoSanguineo?: string;
}

export interface NotaBimestre {
  bimestre: 1 | 2 | 3 | 4;
  nota: number;
  faltas: number;
}

export interface DisciplinaBoletim {
  nome: string;
  professor: string;
  b1?: number;
  b2?: number;
  b3?: number;
  b4?: number;
  mediaParcial?: number;
  totalFaltas: number;
  situacao: 'Aprovado' | 'Em Recuperação' | 'Atenção' | 'Cursando';
}

export interface FaturaMensalidade {
  id: string;
  codigoFatura: string;
  mesReferencia: string;
  anoReferencia: number;
  valor: number;
  descontoPontualidade: number;
  valorComDesconto: number;
  dataVencimento: string;
  status: 'Pago' | 'Pendente' | 'Atrasado';
  codigoBarras: string;
  pixCopiaCola: string;
  alunoNome?: string;
  dataPagamento?: string;
  formaPagamento?: string;
}

export interface OcorrenciaPedagogica {
  id: string;
  alunoId: string;
  data: string;
  descricao: string;
  gravidade: 'Leve' | 'Média' | 'Grave';
  professorNome: string;
}

export interface ComunicadoEscolar {
  id: string;
  titulo: string;
  mensagem: string;
  data: string;
  prioridade: 'Geral' | 'Importante' | 'Urgente';
  autor: string;
}

export interface FuncionarioColaborador {
  id: string;
  nome: string;
  cargo: string;
  departamento: 'Pedagógico' | 'Administrativo' | 'Financeiro' | 'Coordenação' | 'Apoio';
  email: string;
  telefone: string;
  admissao: string;
  salarioBase: number;
  status: 'Ativo' | 'Férias' | 'Licença';
  titulacao: string;
}

// DTOs de Integração com o Backend Spring Boot
export interface LoginBackendResponse {
  token: string;
  tipo: string;
  usuarioId: number;
  nome: string;
  email: string;
  cpf: string;
  perfis: string[];
  idsAlunosDependentes: number[];
}