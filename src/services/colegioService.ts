import { requestApi, setAuthToken } from './api';
import { Aluno, FaturaMensalidade, DisciplinaBoletim, Usuario } from '../types';

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

// Dados de fallback locais (sem precisar de arquivos externos)
const fallbackAlunos: Aluno[] = [
  {
    id: '1',
    ra: '2026-0042',
    nome: 'Lucas Santos de Oliveira',
    dataNascimento: '2015-04-12',
    turma: '5º Ano Fundamental I - Turma A',
    turno: 'Manhã',
    responsavelNome: 'Roberto Santos',
    responsavelTelefone: '(31) 98765-4321',
    responsavelEmail: 'roberto.santos@email.com',
    status: 'Ativo',
    tipoSanguineo: 'O+',
    alergias: 'Penicilina e Dipirona',
    observacoesMedicas: 'Uso de bombinha preventiva para asma em dias secos.',
  },
  {
    id: '2',
    ra: '2026-0089',
    nome: 'Rebeca Alencar Ferreira',
    dataNascimento: '2014-11-20',
    turma: '6º Ano Fundamental II - Turma B',
    turno: 'Manhã',
    responsavelNome: 'Priscila Alencar',
    responsavelTelefone: '(31) 99123-7788',
    responsavelEmail: 'priscila.alencar@email.com',
    status: 'Ativo',
    tipoSanguineo: 'A+',
    alergias: 'Nenhuma alergia relatada',
  },
];

const fallbackFaturas: FaturaMensalidade[] = [
  {
    id: 'fat-009',
    codigoFatura: 'VER-2026-09-0042',
    mesReferencia: 'Setembro / 2026',
    anoReferencia: 2026,
    valor: 1150.0,
    descontoPontualidade: 60.0,
    valorComDesconto: 1090.0,
    dataVencimento: '10/09/2026',
    status: 'Pago',
    dataPagamento: '08/09/2026 às 14:32',
    formaPagamento: 'PIX Instantâneo',
    codigoBarras: '34191.79001 01043.510047 91020.150008 5 91230000109000',
    pixCopiaCola: '00020126580014br.gov.bcb.pix0136colegiocristaoveredas-financeiro@pix.com.br52040000530398654071090.005802BR5925COLEGIO CRISTAO VEREDAS6009SAO PAULO62070503***6304E2D1',
    alunoNome: 'Lucas Santos de Oliveira',
  },
  {
    id: 'fat-010',
    codigoFatura: 'VER-2026-10-0042',
    mesReferencia: 'Outubro / 2026',
    anoReferencia: 2026,
    valor: 1150.0,
    descontoPontualidade: 60.0,
    valorComDesconto: 1090.0,
    dataVencimento: '10/10/2026',
    status: 'Pendente',
    codigoBarras: '34191.79001 01043.510047 91020.150008 5 91530000109000',
    pixCopiaCola: '00020126580014br.gov.bcb.pix0136colegiocristaoveredas-financeiro@pix.com.br52040000530398654071090.005802BR5925COLEGIO CRISTAO VEREDAS6009SAO PAULO62070503***6304A1B2',
    alunoNome: 'Lucas Santos de Oliveira',
  },
];

const fallbackBoletim: DisciplinaBoletim[] = [
  {
    nome: 'Língua Portuguesa & Literatura',
    professor: 'Prof.ª Helena Costa',
    b1: 9.2,
    b2: 8.8,
    b3: 9.0,
    mediaParcial: 9.0,
    totalFaltas: 2,
    situacao: 'Aprovado',
  },
  {
    nome: 'Matemática Aplicada & Lógica',
    professor: 'Prof.ª Sarah Lima',
    b1: 8.5,
    b2: 9.0,
    b3: 8.7,
    mediaParcial: 8.7,
    totalFaltas: 0,
    situacao: 'Aprovado',
  },
  {
    nome: 'História Geral & Cosmovisão Cristã',
    professor: 'Prof. Marcos Vinicius',
    b1: 9.5,
    b2: 9.5,
    b3: 9.8,
    mediaParcial: 9.6,
    totalFaltas: 1,
    situacao: 'Aprovado',
  },
];

export const colegioService = {
  // 1. Autenticação JWT real no Spring Boot
  async login(loginInput: string, senhaInput: string): Promise<{ usuario: Usuario; token: string } | null> {
    const res = await requestApi<LoginBackendResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        login: loginInput.trim(),
        senha: senhaInput.trim(),
      }),
    });

    if (res.ok && res.data) {
      setAuthToken(res.data.token);
      const perfis = res.data.perfis || [];
      let perfilFront: 'admin' | 'secretaria' | 'professor' | 'responsavel' = 'responsavel';

      if (perfis.includes('ROLE_ADMIN')) perfilFront = 'admin';
      else if (perfis.includes('ROLE_SECRETARIA')) perfilFront = 'secretaria';
      else if (perfis.includes('ROLE_PROFESSOR')) perfilFront = 'professor';

      const usuario: Usuario = {
        id: String(res.data.usuarioId),
        nome: res.data.nome,
        email: res.data.email,
        cpf: res.data.cpf,
        perfil: perfilFront,
        cargoOuParentesco: perfilFront === 'admin' ? 'Diretoria Geral' : perfilFront === 'responsavel' ? 'Responsável Legal' : 'Docente',
        alunoVinculadoId: res.data.idsAlunosDependentes?.[0] ? String(res.data.idsAlunosDependentes[0]) : undefined,
      };

      return { usuario, token: res.data.token };
    }

    return null;
  },

  // 2. Alunos (GET /alunos)
  async listarAlunos(): Promise<Aluno[]> {
    const res = await requestApi<any[]>('/alunos');
    if (res.ok && res.data && res.data.length > 0) {
      return res.data.map((item: any) => ({
        id: String(item.id),
        ra: item.ra,
        nome: item.nome,
        dataNascimento: item.dataNascimento,
        turma: '5º Ano Fundamental',
        turno: 'Manhã',
        responsavelNome: item.responsaveis?.[0]?.nome || item.contatoEmergencia || 'Responsável',
        responsavelTelefone: item.responsaveis?.[0]?.telefone || item.telefoneEmergencia || '',
        responsavelEmail: item.responsaveis?.[0]?.email || '',
        status: item.status === 'ATIVO' ? 'Ativo' : 'Trancado',
        alergias: item.alergias,
        observacoesMedicas: item.observacoesMedicas,
        tipoSanguineo: item.tipoSanguineo,
      }));
    }
    return fallbackAlunos;
  },

  // 3. Mensalidades Financeiras (GET /financeiro/mensalidades)
  async listarMensalidades(): Promise<FaturaMensalidade[]> {
    const res = await requestApi<any[]>('/financeiro/mensalidades');
    if (res.ok && res.data && res.data.length > 0) {
      return res.data.map((m: any) => ({
        id: String(m.id),
        codigoFatura: m.codigoFatura,
        mesReferencia: `Mês ${m.mesReferencia}`,
        anoReferencia: m.anoReferencia,
        valor: Number(m.valorBase),
        descontoPontualidade: Number(m.descontoPontualidade || 0),
        valorComDesconto: Number(m.valorLiquido),
        dataVencimento: m.dataVencimento,
        status: m.status === 'PAGO' ? 'Pago' : m.status === 'ATRASADO' ? 'Atrasado' : 'Pendente',
        codigoBarras: m.codigoBarras || '',
        pixCopiaCola: m.pixCopiaCola || '',
        alunoNome: m.alunoNome,
        dataPagamento: m.dataPagamento,
        formaPagamento: m.formaPagamento,
      }));
    }
    return fallbackFaturas;
  },

  // 4. Baixa e pagamento PIX (POST /portal-pais/mensalidades/{id}/pagar-pix)
  async pagarPix(faturaId: string): Promise<boolean> {
    const res = await requestApi<any>(`/portal-pais/mensalidades/${faturaId}/pagar-pix`, {
      method: 'POST',
    });
    return res.ok;
  },

  // 5. Boletim Acadêmico (GET /academico/alunos/{id}/boletim)
  async obterBoletim(alunoId: string, anoLetivo: number = 2026): Promise<DisciplinaBoletim[]> {
    const res = await requestApi<any>(`/academico/alunos/${alunoId}/boletim?anoLetivo=${anoLetivo}`);
    if (res.ok && res.data && res.data.disciplinas) {
      return res.data.disciplinas.map((d: any) => ({
        nome: d.nomeDisciplina,
        professor: 'Docente Titular',
        b1: d.notaBimestre1 != null ? Number(d.notaBimestre1) : undefined,
        b2: d.notaBimestre2 != null ? Number(d.notaBimestre2) : undefined,
        b3: d.notaBimestre3 != null ? Number(d.notaBimestre3) : undefined,
        b4: d.notaBimestre4 != null ? Number(d.notaBimestre4) : undefined,
        mediaParcial: Number(d.mediaParcial || 0),
        totalFaltas: Number(d.totalFaltas || 0),
        situacao: d.situacao === 'Satisfatório' ? 'Aprovado' : 'Atenção',
      }));
    }
    return fallbackBoletim;
  },
};