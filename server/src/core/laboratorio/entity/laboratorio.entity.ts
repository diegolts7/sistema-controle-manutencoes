export type TipoLaboratorio = {
  id: number;
  nome: string;
  descricao: string | null;
  responsavelId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TipoLaboratorioPublico = Omit<TipoLaboratorio, "id">;

export type TipoCriarLaboratorio = Omit<
  TipoLaboratorio,
  "id" | "createdAt" | "updatedAt"
>;

export type TipoEditarLaboratorio = Partial<Omit<TipoCriarLaboratorio, "responsavelId">>;