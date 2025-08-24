export type CargoEnum = "PROFESSOR" | "TECNICO" | "COORDENADOR";

export type TipoUsuario = {
  id: string;
  nome: string;
  cargo: CargoEnum;
  email: string;
  senha: string;
  instituicaoId: number | null;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TipoUsuarioPublico = Omit<TipoUsuario, "senha">;

export type TipoCriarUsuario = Omit<
  TipoUsuario,
  "id" | "createdAt" | "updatedAt" | "cargo" | "ativo"
> & {
  cargo?: CargoEnum;
  ativo?: boolean;
  instituicaoId: number | null;
};

export type TipoEditarUsuario = Partial<TipoCriarUsuario>;
