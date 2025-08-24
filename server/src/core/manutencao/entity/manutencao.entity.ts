export type StatusManutencaoEnum = "SOLICITADA" | "CONCLUIDA" | "CANCELADA";
export type TipoManutencaoEnum = "PREVENTIVA" | "CORRETIVA";

export type TipoManutencao = {
  id: number;
  prazo: Date;
  status: StatusManutencaoEnum;
  tipo: TipoManutencaoEnum;
  descricaoSolicitada: string;
  descricaoAposFinalizada: string | null;
  usuarioSolicitacaoId: string;
  tecnicoResponsavelId: string;
  laboratorioId: number;
  dataSolicitada: Date;
  updatedAt: Date;
};

export type TipoUsuarioLaboratorioNaManutencao = {
  id: number | string;
  nome: string;
};

export type TipoManutencaoComComplemento = Omit<
  TipoManutencao,
  "usuarioSolicitacaoId" | "tecnicoResponsavelId" | "laboratorioId"
> & {
  UsuarioSolicitou: TipoUsuarioLaboratorioNaManutencao;
  TecnicoResponsavel: TipoUsuarioLaboratorioNaManutencao;
  LaboratorioManutencao: TipoUsuarioLaboratorioNaManutencao;
};

export type TipoCriarManutencao = Omit<
  TipoManutencao,
  "id" | "descricaoAposFinalizada" | "dataSolicitada" | "updatedAt" | "status"
>;

export type TipoEditarManutencao = Partial<
  Omit<
    TipoManutencao,
    "id" | "dataSolicitada" | "updatedAt" | "usuarioSolicitacaoId"
  >
>;

export type TipoManutencaoRecebidoNaCriacao = Omit<
  TipoCriarManutencao,
  "tecnicoResponsavelId"
>;
