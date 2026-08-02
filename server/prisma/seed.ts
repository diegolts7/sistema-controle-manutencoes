import { CargoEnum, PrismaClient, StatusManutencao, TipoManutencao } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const NOME_INSTITUICAO_SEED = "IFPB - Campus Cajazeiras";
const CNPJ_INSTITUICAO_SEED = "10635962000100";
const LATITUDE_INSTITUICAO_SEED = -6.888889;
const LONGITUDE_INSTITUICAO_SEED = -38.560833;

const EMAIL_PROFESSOR_SEED = "professor.seed@ifpb.edu.br";
const NOME_PROFESSOR_SEED = "Professor Seed";

const EMAIL_TECNICO_SEED = "tecnico.seed@ifpb.edu.br";
const NOME_TECNICO_SEED = "Técnico Seed";

const NOME_LABORATORIO_SEED = "Laboratório de Redes";

const UM_DIA_EM_MILISSEGUNDOS = 24 * 60 * 60 * 1000;

async function criarCoordenador(senhaHash: string) {
  const email = process.env.EMAIL_USER_COORD;

  if (!email) {
    throw new Error("A variável EMAIL_USER_COORD deve estar definida no .env");
  }

  const coordenadorExistente = await prisma.usuario.findUnique({ where: { email } });

  if (coordenadorExistente) {
    console.log(`Usuário ${email} já existe. Pulando criação do coordenador.`);
    return coordenadorExistente;
  }

  const coordenador = await prisma.usuario.create({
    data: {
      nome: "Admin",
      email,
      senha: senhaHash,
      cargo: CargoEnum.COORDENADOR,
    },
  });

  console.log("Coordenador criado:", coordenador.email);
  return coordenador;
}

async function criarInstituicaoEnsino() {
  const instituicaoExistente = await prisma.instituicaoEnsino.findUnique({
    where: { cnpj: CNPJ_INSTITUICAO_SEED },
  });

  if (instituicaoExistente) {
    console.log(`Instituição de ensino ${instituicaoExistente.nome} já existe. Pulando criação.`);
    return instituicaoExistente;
  }

  const instituicao = await prisma.instituicaoEnsino.create({
    data: {
      nome: NOME_INSTITUICAO_SEED,
      cnpj: CNPJ_INSTITUICAO_SEED,
      latitude: LATITUDE_INSTITUICAO_SEED,
      longitude: LONGITUDE_INSTITUICAO_SEED,
    },
  });

  console.log("Instituição de ensino criada:", instituicao.nome);
  return instituicao;
}

async function criarUsuario(
  email: string,
  nome: string,
  cargo: typeof CargoEnum.TECNICO | typeof CargoEnum.PROFESSOR,
  senhaHash: string,
  instituicaoId: number,
) {
  const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });

  if (usuarioExistente) {
    console.log(`Usuário ${email} já existe. Pulando criação.`);
    return usuarioExistente;
  }

  const usuario = await prisma.usuario.create({
    data: {
      nome,
      email,
      senha: senhaHash,
      cargo,
      instituicaoId,
    },
  });

  console.log(`Usuário ${cargo} criado:`, usuario.email);
  return usuario;
}

async function criarLaboratorio(responsavelId: string) {
  const laboratorioExistente = await prisma.laboratorio.findFirst({
    where: { nome: { equals: NOME_LABORATORIO_SEED, mode: "insensitive" } },
  });

  if (laboratorioExistente) {
    console.log(`Laboratório ${laboratorioExistente.nome} já existe. Pulando criação.`);
    return laboratorioExistente;
  }

  const laboratorio = await prisma.laboratorio.create({
    data: {
      nome: NOME_LABORATORIO_SEED,
      descricao: "Laboratório utilizado para aulas e projetos de redes de computadores.",
      responsavelId,
    },
  });

  console.log("Laboratório criado:", laboratorio.nome);
  return laboratorio;
}

async function criarManutencoes(laboratorioId: number, usuarioSolicitacaoId: string, tecnicoResponsavelId: string) {
  const manutencaoExistente = await prisma.manutencao.findFirst({
    where: { laboratorioId },
  });

  if (manutencaoExistente) {
    console.log("Já existem manutenções para o laboratório seed. Pulando criação.");
    return;
  }

  const agora = Date.now();
  const prazoFuturo = new Date(agora + 15 * UM_DIA_EM_MILISSEGUNDOS);
  const prazoEmAtraso = new Date(agora - 5 * UM_DIA_EM_MILISSEGUNDOS);
  const prazoJaConcluida = new Date(agora - 10 * UM_DIA_EM_MILISSEGUNDOS);

  await prisma.manutencao.createMany({
    data: [
      {
        status: StatusManutencao.SOLICITADA,
        tipo: TipoManutencao.CORRETIVA,
        prazo: prazoFuturo,
        descricaoSolicitada: "Ar-condicionado do laboratório não está gelando.",
        usuarioSolicitacaoId,
        tecnicoResponsavelId,
        laboratorioId,
      },
      {
        status: StatusManutencao.SOLICITADA,
        tipo: TipoManutencao.PREVENTIVA,
        prazo: prazoEmAtraso,
        descricaoSolicitada: "Manutenção preventiva mensal dos computadores do laboratório.",
        usuarioSolicitacaoId,
        tecnicoResponsavelId,
        laboratorioId,
      },
      {
        status: StatusManutencao.CONCLUIDA,
        tipo: TipoManutencao.CORRETIVA,
        prazo: prazoJaConcluida,
        descricaoSolicitada: "Tomadas do laboratório estão sem energia.",
        descricaoAposFinalizada: "Disjuntor trocado e energia normalizada.",
        usuarioSolicitacaoId,
        tecnicoResponsavelId,
        laboratorioId,
      },
    ],
  });

  console.log("3 manutenções de exemplo criadas para o laboratório seed.");
}

async function main() {
  const rawPassword = process.env.SENHA_USER_COORD;

  if (!rawPassword) {
    throw new Error("A variável SENHA_USER_COORD deve estar definida no .env");
  }

  const senhaHash = await bcrypt.hash(rawPassword, 10);

  await criarCoordenador(senhaHash);

  const instituicao = await criarInstituicaoEnsino();

  const professor = await criarUsuario(
    EMAIL_PROFESSOR_SEED,
    NOME_PROFESSOR_SEED,
    CargoEnum.PROFESSOR,
    senhaHash,
    instituicao.id,
  );
  const tecnico = await criarUsuario(
    EMAIL_TECNICO_SEED,
    NOME_TECNICO_SEED,
    CargoEnum.TECNICO,
    senhaHash,
    instituicao.id,
  );

  const laboratorio = await criarLaboratorio(professor.id);

  await criarManutencoes(laboratorio.id, professor.id, tecnico.id);

  console.log("Seed executado com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro ao executar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
