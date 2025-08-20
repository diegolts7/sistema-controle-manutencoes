export type TipoImagemManutencao = {
  id: number;
  manutencaoId: number;
  nome: string;
  mimetype: string;
};

export type TipoCriarImagemManutencao = Omit<TipoImagemManutencao, "id">;

export type TipoEditarImagemManutencao = Partial<TipoImagemManutencao>;
