import {
  dashboardRepositoryPrisma,
  DashboardRepositoryPrisma,
} from "../../../repositories/prismaRepository/dashboard/dashboard.repository.prisma";
import {
  TipoCargaTecnico,
  TipoContadoresGerais,
  TipoDashboard,
  TipoEvolucaoMensal,
  TipoManutencaoAtrasada,
  TipoManutencoesEmAtraso,
  TipoManutencoesPorStatus,
  TipoManutencoesPorTipo,
  TipoRankingLaboratorio,
} from "../entity/dashboard.entity";

export class DashboardUseCase {
  private readonly QUANTIDADE_MAXIMA_ATRASADAS_URGENTES = 5;
  private readonly QUANTIDADE_MAXIMA_RANKING_LABORATORIOS = 5;
  private readonly QUANTIDADE_MESES_EVOLUCAO = 6;
  private readonly MILISSEGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;

  constructor(private readonly dashboardRepository: DashboardRepositoryPrisma) {}

  private montarContadoresGerais = async (): Promise<TipoContadoresGerais> => {
    const [
      totalUsuarios,
      totalUsuariosAtivos,
      totalLaboratorios,
      totalInstituicoesEnsino,
      totalManutencoes,
    ] = await Promise.all([
      this.dashboardRepository.contarUsuarios(),
      this.dashboardRepository.contarUsuariosAtivos(),
      this.dashboardRepository.contarLaboratorios(),
      this.dashboardRepository.contarInstituicoesEnsino(),
      this.dashboardRepository.contarManutencoes(),
    ]);

    return {
      totalUsuarios,
      totalUsuariosAtivos,
      totalLaboratorios,
      totalInstituicoesEnsino,
      totalManutencoes,
    };
  };

  private montarManutencoesPorStatus = async (): Promise<TipoManutencoesPorStatus> => {
    const contagemAgrupada = await this.dashboardRepository.contarManutencoesPorStatus();

    const contagemBase: TipoManutencoesPorStatus = {
      SOLICITADA: 0,
      CONCLUIDA: 0,
      CANCELADA: 0,
    };

    contagemAgrupada.forEach((grupo) => {
      contagemBase[grupo.status] = grupo._count._all;
    });

    return contagemBase;
  };

  private montarManutencoesPorTipo = async (): Promise<TipoManutencoesPorTipo> => {
    const contagemAgrupada = await this.dashboardRepository.contarManutencoesPorTipo();

    const contagemBase: TipoManutencoesPorTipo = {
      PREVENTIVA: 0,
      CORRETIVA: 0,
    };

    contagemAgrupada.forEach((grupo) => {
      contagemBase[grupo.tipo] = grupo._count._all;
    });

    return contagemBase;
  };

  private calcularDiasEmAtraso = (prazo: Date, dataAtual: Date): number => {
    const diferencaEmMilissegundos = dataAtual.getTime() - prazo.getTime();
    return Math.floor(diferencaEmMilissegundos / this.MILISSEGUNDOS_POR_DIA);
  };

  private montarManutencoesEmAtraso = async (
    dataAtual: Date,
  ): Promise<TipoManutencoesEmAtraso> => {
    const [quantidade, manutencoesUrgentes] = await Promise.all([
      this.dashboardRepository.contarManutencoesEmAtraso(dataAtual),
      this.dashboardRepository.buscarManutencoesMaisUrgentesEmAtraso(
        dataAtual,
        this.QUANTIDADE_MAXIMA_ATRASADAS_URGENTES,
      ),
    ]);

    const maisUrgentes: TipoManutencaoAtrasada[] = manutencoesUrgentes.map((manutencao) => ({
      id: manutencao.id,
      laboratorio: manutencao.LaboratorioManutencao.nome,
      prazo: manutencao.prazo,
      diasEmAtraso: this.calcularDiasEmAtraso(manutencao.prazo, dataAtual),
    }));

    return { quantidade, maisUrgentes };
  };

  private montarCargaPorTecnico = async (): Promise<TipoCargaTecnico[]> => {
    const [tecnicos, contagemAgrupada] = await Promise.all([
      this.dashboardRepository.buscarTecnicosAtivos(),
      this.dashboardRepository.contarManutencoesPorTecnicoEStatus(),
    ]);

    return tecnicos.map((tecnico) => {
      const concluidas = contagemAgrupada.find(
        (grupo) => grupo.tecnicoResponsavelId === tecnico.id && grupo.status === "CONCLUIDA",
      );
      const pendentes = contagemAgrupada.find(
        (grupo) => grupo.tecnicoResponsavelId === tecnico.id && grupo.status === "SOLICITADA",
      );

      return {
        id: tecnico.id,
        nome: tecnico.nome,
        manutencoesConcluidas: concluidas?._count._all ?? 0,
        manutencoesPendentes: pendentes?._count._all ?? 0,
      };
    });
  };

  private formatarMes = (data: Date): string => {
    const ano = data.getUTCFullYear();
    const mes = String(data.getUTCMonth() + 1).padStart(2, "0");
    return `${ano}-${mes}`;
  };

  private montarEvolucaoMensal = async (dataAtual: Date): Promise<TipoEvolucaoMensal[]> => {
    const dataInicial = new Date(
      Date.UTC(
        dataAtual.getUTCFullYear(),
        dataAtual.getUTCMonth() - (this.QUANTIDADE_MESES_EVOLUCAO - 1),
        1,
      ),
    );

    const resultadoAgrupado = await this.dashboardRepository.buscarEvolucaoMensal(dataInicial);

    const mapaDeQuantidades = new Map<string, number>();
    resultadoAgrupado.forEach((linha) => {
      mapaDeQuantidades.set(this.formatarMes(new Date(linha.mes)), Number(linha.quantidade));
    });

    const evolucaoMensal: TipoEvolucaoMensal[] = [];
    for (let indice = this.QUANTIDADE_MESES_EVOLUCAO - 1; indice >= 0; indice--) {
      const dataDoMes = new Date(
        Date.UTC(dataAtual.getUTCFullYear(), dataAtual.getUTCMonth() - indice, 1),
      );
      const chaveDoMes = this.formatarMes(dataDoMes);

      evolucaoMensal.push({
        mes: chaveDoMes,
        quantidade: mapaDeQuantidades.get(chaveDoMes) ?? 0,
      });
    }

    return evolucaoMensal;
  };

  private montarRankingLaboratorios = async (): Promise<TipoRankingLaboratorio[]> => {
    const rankingAgrupado = await this.dashboardRepository.rankingLaboratoriosComMaisManutencoes(
      this.QUANTIDADE_MAXIMA_RANKING_LABORATORIOS,
    );

    const idsLaboratorios = rankingAgrupado.map((grupo) => grupo.laboratorioId);
    const laboratorios = await this.dashboardRepository.buscarLaboratoriosPorIds(idsLaboratorios);

    return rankingAgrupado.map((grupo) => {
      const laboratorio = laboratorios.find((lab) => lab.id === grupo.laboratorioId);

      return {
        id: grupo.laboratorioId,
        nome: laboratorio?.nome ?? "Laboratório removido",
        quantidadeManutencoes: grupo._count.laboratorioId,
      };
    });
  };

  buscarMetricas = async (): Promise<TipoDashboard> => {
    const dataAtual = new Date();

    const [
      contadoresGerais,
      manutencoesPorStatus,
      manutencoesPorTipo,
      manutencoesEmAtraso,
      cargaPorTecnico,
      evolucaoMensal,
      rankingLaboratorios,
    ] = await Promise.all([
      this.montarContadoresGerais(),
      this.montarManutencoesPorStatus(),
      this.montarManutencoesPorTipo(),
      this.montarManutencoesEmAtraso(dataAtual),
      this.montarCargaPorTecnico(),
      this.montarEvolucaoMensal(dataAtual),
      this.montarRankingLaboratorios(),
    ]);

    return {
      contadoresGerais,
      manutencoesPorStatus,
      manutencoesPorTipo,
      manutencoesEmAtraso,
      cargaPorTecnico,
      evolucaoMensal,
      rankingLaboratorios,
    };
  };
}

export const dashboardUseCase = new DashboardUseCase(dashboardRepositoryPrisma);
