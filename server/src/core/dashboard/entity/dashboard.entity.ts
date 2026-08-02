export type TipoContadoresGerais = {
  totalUsuarios: number;
  totalUsuariosAtivos: number;
  totalLaboratorios: number;
  totalInstituicoesEnsino: number;
  totalManutencoes: number;
};

export type TipoManutencoesPorStatus = {
  SOLICITADA: number;
  CONCLUIDA: number;
  CANCELADA: number;
};

export type TipoManutencoesPorTipo = {
  PREVENTIVA: number;
  CORRETIVA: number;
};

export type TipoManutencaoAtrasada = {
  id: number;
  laboratorio: string;
  prazo: Date;
  diasEmAtraso: number;
};

export type TipoManutencoesEmAtraso = {
  quantidade: number;
  maisUrgentes: TipoManutencaoAtrasada[];
};

export type TipoCargaTecnico = {
  id: string;
  nome: string;
  manutencoesConcluidas: number;
  manutencoesPendentes: number;
};

export type TipoEvolucaoMensal = {
  mes: string;
  quantidade: number;
};

export type TipoRankingLaboratorio = {
  id: number;
  nome: string;
  quantidadeManutencoes: number;
};

export type TipoDashboard = {
  contadoresGerais: TipoContadoresGerais;
  manutencoesPorStatus: TipoManutencoesPorStatus;
  manutencoesPorTipo: TipoManutencoesPorTipo;
  manutencoesEmAtraso: TipoManutencoesEmAtraso;
  cargaPorTecnico: TipoCargaTecnico[];
  evolucaoMensal: TipoEvolucaoMensal[];
  rankingLaboratorios: TipoRankingLaboratorio[];
};
