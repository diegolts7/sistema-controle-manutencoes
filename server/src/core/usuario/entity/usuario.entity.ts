export type CargoEnum = "PROFESSOR" | "TECNICO" | "COORDENADOR";

export type TipoUsuario = {
  id: number;
  nome: string;
  cargo: CargoEnum;
  email: string;
  senha: string;
  idExterno: string;
  instituicaoId: number | null;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TipoUsuarioPublico = Omit<TipoUsuario, "id" | "senha">;

export type TipoCriarUsuario = Omit<
  TipoUsuario,
  "id" | "idExterno" | "createdAt" | "updatedAt" | "VinculoInstituicao"
> & {
  cargo?: CargoEnum;
  ativo?: boolean;
  instituicaoId: number | null;
};

export type TipoEditarUsuario = Partial<TipoCriarUsuario>;
