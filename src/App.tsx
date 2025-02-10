import React, { useState, useEffect } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

type Team = 'ABC' | 'ADVERSÁRIO';
type Stats = {
  finalizacoes: number;
  escanteios: number;
  impedimentos: number;
  chancesAposRoubadasOD: number;
  chancesAposRoubadasTD: number;
  roubadasAtaqueOD: number;
  roubadasAtaqueTD: number;
  errosAdversarioOD: number;
  errosAdversarioTD: number;
  duelosAereosOfensivo: number;
  duelosAereosDefensivo: number;
  construcaoVitoria: number;
  construcaoDerrota: number;
  bolasEntrelinhasDefensivo: number;
  cruzamentosCerto: number;
  cruzamentosErrado: number;
  escanteioOfensivoCerto: number;
  escanteioOfensivoErrado: number;
  faltaOfensivaCerta: number;
  faltaOfensivaErrada: number;
};

const initialStats: Stats = {
  finalizacoes: 0,
  escanteios: 0,
  impedimentos: 0,
  chancesAposRoubadasOD: 0,
  chancesAposRoubadasTD: 0,
  roubadasAtaqueOD: 0,
  roubadasAtaqueTD: 0,
  errosAdversarioOD: 0,
  errosAdversarioTD: 0,
  duelosAereosOfensivo: 0,
  duelosAereosDefensivo: 0,
  construcaoVitoria: 0,
  construcaoDerrota: 0,
  bolasEntrelinhasDefensivo: 0,
  cruzamentosCerto: 0,
  cruzamentosErrado: 0,
  escanteioOfensivoCerto: 0,
  escanteioOfensivoErrado: 0,
  faltaOfensivaCerta: 0,
  faltaOfensivaErrada: 0,
};

function App() {
  const [activeTeam, setActiveTeam] = useState<Team>('ABC');
  const [abcStats, setAbcStats] = useState<Stats>(() => {
    const saved = localStorage.getItem('abcStats');
    return saved ? JSON.parse(saved) : { ...initialStats };
  });
  const [adversarioStats, setAdversarioStats] = useState<Stats>(() => {
    const saved = localStorage.getItem('adversarioStats');
    return saved ? JSON.parse(saved) : { ...initialStats };
  });

  useEffect(() => {
    localStorage.setItem('abcStats', JSON.stringify(abcStats));
  }, [abcStats]);

  useEffect(() => {
    localStorage.setItem('adversarioStats', JSON.stringify(adversarioStats));
  }, [adversarioStats]);

  const currentStats = activeTeam === 'ABC' ? abcStats : adversarioStats;
  const setCurrentStats = activeTeam === 'ABC' ? setAbcStats : setAdversarioStats;

  const updateStat = (stat: keyof Stats, increment: boolean) => {
    setCurrentStats(prev => ({
      ...prev,
      [stat]: increment ? prev[stat] + 1 : Math.max(0, prev[stat] - 1)
    }));
  };

  const resetStats = () => {
    if (window.confirm(`Tem certeza que deseja zerar todas as estatísticas do ${activeTeam}?`)) {
      setCurrentStats({ ...initialStats });
    }
  };

  const StatCounter = ({ label, stat }: { label: string; stat: keyof Stats }) => (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
      <span className="text-sm font-medium text-gray-600 mb-2">{label}</span>
      <div className="flex items-center justify-between">
        <button
          onClick={() => updateStat(stat, false)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <Minus className="w-5 h-5 text-red-500" />
        </button>
        <span className="text-xl font-bold mx-3">{currentStats[stat]}</span>
        <button
          onClick={() => updateStat(stat, true)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <Plus className="w-5 h-5 text-green-500" />
        </button>
      </div>
    </div>
  );

  const DualStatCounter = ({ 
    title, 
    firstStat, 
    secondStat,
    firstLabel = "OD",
    secondLabel = "TD"
  }: { 
    title: string; 
    firstStat: keyof Stats; 
    secondStat: keyof Stats;
    firstLabel?: string;
    secondLabel?: string;
  }) => (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
      <span className="text-sm font-medium text-gray-600 mb-3">{title}</span>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">{firstLabel}</span>
          <div className="flex items-center">
            <button
              onClick={() => updateStat(firstStat, false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Minus className="w-5 h-5 text-red-500" />
            </button>
            <span className="text-xl font-bold mx-3">{currentStats[firstStat]}</span>
            <button
              onClick={() => updateStat(firstStat, true)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Plus className="w-5 h-5 text-green-500" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">{secondLabel}</span>
          <div className="flex items-center">
            <button
              onClick={() => updateStat(secondStat, false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Minus className="w-5 h-5 text-red-500" />
            </button>
            <span className="text-xl font-bold mx-3">{currentStats[secondStat]}</span>
            <button
              onClick={() => updateStat(secondStat, true)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Plus className="w-5 h-5 text-green-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Estatísticas Avançadas - ABC</h1>
        
        {/* Team Tabs and Reset Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            {(['ABC', 'ADVERSÁRIO'] as Team[]).map((team) => (
              <button
                key={team}
                onClick={() => setActiveTeam(team)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTeam === team
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {team}
              </button>
            ))}
          </div>
          <button
            onClick={resetStats}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Zerar Estatísticas
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <StatCounter label="Finalizações" stat="finalizacoes" />
          <StatCounter label="Escanteios" stat="escanteios" />
          <StatCounter label="Impedimentos" stat="impedimentos" />
          <DualStatCounter 
            title="Chances Após Roubadas" 
            firstStat="chancesAposRoubadasOD" 
            secondStat="chancesAposRoubadasTD" 
          />
          <DualStatCounter 
            title="Roubadas no Ataque" 
            firstStat="roubadasAtaqueOD" 
            secondStat="roubadasAtaqueTD" 
          />
          <DualStatCounter 
            title="Erros do Adversário" 
            firstStat="errosAdversarioOD" 
            secondStat="errosAdversarioTD" 
          />
          <DualStatCounter 
            title="Duelos Aéreos" 
            firstStat="duelosAereosOfensivo" 
            secondStat="duelosAereosDefensivo"
            firstLabel="Ofensivo"
            secondLabel="Defensivo"
          />
          <DualStatCounter 
            title="Construção" 
            firstStat="construcaoVitoria" 
            secondStat="construcaoDerrota"
            firstLabel="Vitória"
            secondLabel="Derrota"
          />
          <StatCounter label="Bolas Entrelinhas Defensivo" stat="bolasEntrelinhasDefensivo" />
          <DualStatCounter 
            title="Cruzamentos" 
            firstStat="cruzamentosCerto" 
            secondStat="cruzamentosErrado"
            firstLabel="Certo"
            secondLabel="Errado"
          />
          <DualStatCounter 
            title="Escanteio Ofensivo" 
            firstStat="escanteioOfensivoCerto" 
            secondStat="escanteioOfensivoErrado"
            firstLabel="Certo"
            secondLabel="Errado"
          />
          <DualStatCounter 
            title="Falta Ofensiva" 
            firstStat="faltaOfensivaCerta" 
            secondStat="faltaOfensivaErrada"
            firstLabel="Certa"
            secondLabel="Errada"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
