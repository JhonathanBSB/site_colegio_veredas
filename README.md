# Colégio Cristão Veredas — Portal Web Front-end

## 1. Sobre o Projeto
O **Colégio Cristão Veredas** é uma instituição de ensino dedicada ao desenvolvimento integral dos educandos, integrando sólida formação acadêmica, pensamento crítico e valores confessionais cristãos com base no princípio bíblico de *"Ensina a criança no caminho em que deve andar..."*.

Este portal web é a interface centralizada do sistema escolar e reúne, em uma experiência responsiva e unificada:
- **Secretaria Acadêmica:** Gestão de cadastros de alunos, controle de turmas, dados médicos/alergias e censo escolar.
- **Portal do Docente:** Lançamento de notas bimestrais, controle de faltas e acompanhamento do diário de classe.
- **Portal da Família (Pais & Responsáveis):** Consulta de boletim de desempenho escolar, comunicados institucionais e emissão/baixa de mensalidades com PIX cópia-e-cola e código de barras.
- **Diretoria Executiva & Gestão Geral:** Painel de indicadores estratégicos (KPIs de matrículas, DRE simplificada, inadimplência e folha de RH).

---

## 2. Tecnologias Utilizadas
A aplicação foi construída com um ecossistema front-end moderno, priorizando desempenho, tipagem estrita e fidelidade visual:

- **React 18+ (`^18.3.1`):** Biblioteca base para componentização declarativa e gerenciamento de estado.
- **TypeScript (`~5.7.2`):** Tipagem estática para garantia de consistência de contratos e dados da API.
- **Tailwind CSS (`^4.0.7`):** Framework utilitário de estilização responsiva com tema customizado em tons de âmbar, ardósia e esmeralda.
- **Vite (`^6.1.0`):** Ferramenta de build e servidor de desenvolvimento ágil com suporte nativo a ESM.

### Dependências Principais (`package.json`)
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.475.0",
    "motion": "^12.4.7",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.0.1"
  },
  "devDependencies": {
    "vite": "^6.1.0",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "~5.7.2",
    "tailwindcss": "^4.0.7",
    "@tailwindcss/vite": "^4.0.7",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5"
  }
}