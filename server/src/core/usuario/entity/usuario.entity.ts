export type CargoEnum = "PROFESSOR" | "TECNICO" | "COORDENADOR";

export type TipoUsuario = {
  id: number;
  nome: string;
  cargo: CargoEnum;
  email: string;
  senha: string;
  idExterno: string;
  instituicaoId: number;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TipoUsuarioPublico = Omit<TipoUsuario, "id">;

export type TipoCriarUsuario = Omit<
  TipoUsuarioPublico,
  "idExterno" | "createdAt" | "updatedAt"
> & {
  cargo?: CargoEnum;
  ativo?: boolean;
};

export type TipoEditarUsuario = Partial<TipoCriarUsuario>;
