import React, { useMemo, useState } from 'react';
import {
  LayoutDashboard,
  BarChart3,
  ShieldCheck,
  Users,
  Clock,
  MessageSquare,
  Trophy,
  Target,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';

const modules = [
  { id: 1, name: 'Dashboard', icon: LayoutDashboard },
  { id: 2, name: 'Growth Blueprint', icon: BarChart3 },
  { id: 3, name: 'Trust Advocates', icon: ShieldCheck },
  { id: 4, name: 'Community Pitch', icon: Users },
  { id: 5, name: 'Time & Workflow', icon: Clock },
  { id: 6, name: 'CLIMB Notes', icon: MessageSquare },
];

const initialData = {
  funnel: {
    contact: '',
    lead: '',
    expert: '',
    prep: '',
    complete: '',
  },
  goals: {
    initialGoal: '',
    actionSteps: '',
  },
  trust: {
    credPlus: '',
    credMinus: '',
    relPlus: '',
    relMinus: '',
    intPlus: '',
    intMinus: '',
    oriPlus: '',
    oriMinus: '',
  },
  pitch: '',
  subtasks: '',
  climb: {
    connectGood: '',
    connectBetter: '',
    listenGood: '',
    listenBetter: '',
    identifyGood: '',
    identifyBetter: '',
    messageGood: '',
    messageBetter: '',
    commitGood: '',
    commitBetter: '',
  },
  stoplight: {
    red: '',
    yellow: '',
    green: '',
  },
};

const stoplightColorClass = {
  red: 'bg-red-500',
  yellow: 'bg-amber-500',
  green: 'bg-green-500',
};

function App() {
  const [activeModule, setActiveModule] = useState(1);
  const [saveStatus, setSaveStatus] = useState('idle');
  const [formData, setFormData] = useState(initialData);

  const updateField = (section, field, value) => {
    setFormData((prev) => {
      if (field) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
      }

      return {
        ...prev,
        [section]: value,
      };
    });
  };

  const handleSave = () => {
    localStorage.setItem('growth-workbook', JSON.stringify(formData));
    setSaveStatus('saved');
    window.setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const funnelProgress = useMemo(() => {
    const stages = ['contact', 'lead', 'expert', 'prep', 'complete'];
    return stages.map(
      (stage) =>
        (formData.funnel[stage] || '')
          .split('\n')
          .filter((line) => line.trim()).length
    );
  }, [formData.funnel]);

  const trustScore = useMemo(() => {
    const keys = ['cred', 'rel', 'int', 'ori'];
    let positive = 0;
    let negative = 0;

    keys.forEach((key) => {
      if (formData.trust[`${key}Plus`]?.trim()) positive += 1;
      if (formData.trust[`${key}Minus`]?.trim()) negative += 1;
    });

    return { positive, negative };
  }, [formData.trust]);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      <aside className="w-64 border-r border-slate-800 flex flex-col bg-slate-900 shrink-0">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-1">
            <Trophy className="text-teal-400 w-6 h-6" />
            <h1 className="text-xl font-black text-white tracking-tight">GROWTH PRO</h1>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
            Mastery Workbook
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {modules.map((module) => {
            const Icon = module.icon;
            const selected = activeModule === module.id;

            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  selected
                    ? 'bg-teal-600/20 text-teal-400 ring-1 ring-teal-500/50 font-bold'
                    : 'text-slate-400 hover:bg-slate-800/60'
                }`}
              >
                <Icon size={18} className={selected ? 'text-teal-400' : 'text-slate-500'} />
                <span className="text-sm">{module.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4">
          <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
            <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Storage</p>
            <p className="text-[11px] text-slate-400">Local browser only</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10 bg-slate-950">
          <h2 className="text-xl font-bold text-white">
            {modules.find((m) => m.id === activeModule)?.name}
          </h2>

          <div className="flex items-center gap-4">
            {saveStatus === 'saved' && (
              <span className="text-xs text-teal-400 flex items-center gap-1">
                <CheckCircle2 size={14} />
                Saved locally
              </span>
            )}

            <button
              onClick={handleSave}
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-6 py-2 rounded-lg font-bold text-sm transition"
            >
              Save Progress
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10">
          <div className="max-w-5xl mx-auto space-y-10 pb-20">
            {activeModule === 1 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <Target className="text-blue-400" size={20} />
                      <span className="text-[10px] font-bold text-slate-500 uppercase">My Goal</span>
                    </div>
                    <p className="text-sm font-medium text-slate-300 italic">
                      {formData.goals.initialGoal || 'No goal defined yet.'}
                    </p>
                  </div>

                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <TrendingUp className="text-teal-400" size={20} />
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        Strategies
                      </span>
                    </div>
                    <p className="text-3xl font-black text-white">
                      {funnelProgress.reduce((a, b) => a + b, 0)}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">
                      Total items
                    </p>
                  </div>

                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <ShieldCheck className="text-amber-400" size={20} />
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        Trust Balance
                      </span>
                    </div>
                    <div className="flex items-end gap-3">
                      <span className="text-2xl font-black text-teal-500">
                        +{trustScore.positive}
                      </span>
                      <span className="text-2xl font-black text-red-500">
                        -{trustScore.negative}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
                  <h3 className="text-sm font-black text-slate-400 mb-8 uppercase tracking-widest flex items-center gap-2">
                    <BarChart3 size={16} />
                    Growth Funnel Strength
                  </h3>

                  <div className="space-y-4">
                    {['Contact', 'Lead', 'Expert', 'Prep', 'Complete'].map((label, idx) => {
                      const count = funnelProgress[idx];
                      const percent = Math.min(100, (count / 5) * 100);

                      return (
                        <div key={label} className="flex items-center gap-4">
                          <span className="w-20 text-[10px] font-black text-slate-500 uppercase">
                            {label}
                          </span>
                          <div className="flex-1 h-8 rounded-md bg-teal-500/10 border border-teal-500/20 overflow-hidden relative">
                            <div
                              className="absolute left-0 top-0 h-full bg-teal-500/40 transition-all duration-500"
                              style={{ width: `${percent}%` }}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-teal-300">
                              {count} items
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
                    <h3 className="text-sm font-black text-slate-400 mb-6 uppercase tracking-widest">
                      The Success Stoplight
                    </h3>

                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-3 h-3 rounded-full bg-red-500 mt-1 shrink-0" />
                        <div>
                          <p className="text-[10px] font-black text-red-400 uppercase">
                            Red Zone
                          </p>
                          <p className="text-sm text-slate-300">
                            {formData.stoplight.red || 'Nothing added yet.'}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mt-1 shrink-0" />
                        <div>
                          <p className="text-[10px] font-black text-amber-400 uppercase">
                            Yellow Zone
                          </p>
                          <p className="text-sm text-slate-300">
                            {formData.stoplight.yellow || 'Nothing added yet.'}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-3 h-3 rounded-full bg-green-500 mt-1 shrink-0" />
                        <div>
                          <p className="text-[10px] font-black text-green-400 uppercase">
                            Green Zone
                          </p>
                          <p className="text-sm text-slate-300">
                            {formData.stoplight.green || 'Nothing added yet.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-teal-500 rounded-3xl p-8 text-slate-950 flex flex-col justify-between">
                    <div>
                      <Lightbulb size={32} className="mb-4 opacity-60" />
                      <h4 className="text-2xl font-black leading-tight mb-4">My Core Pitch</h4>
                      <p className="text-sm font-bold opacity-80 italic leading-relaxed">
                        "{formData.pitch || 'Write your pitch in the Community Pitch module.'}"
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveModule(4)}
                      className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest"
                    >
                      Refine my pitch <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeModule === 2 && (
              <div className="space-y-8">
                <section className="bg-slate-800/30 p-8 rounded-3xl border border-slate-700">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                    <BarChart3 className="text-teal-400" />
                    Funnel Delighters
                  </h3>

                  <div className="grid gap-6">
                    {['contact', 'lead', 'expert', 'prep', 'complete'].map((stage) => (
                      <div
                        key={stage}
                        className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800"
                      >
                        <label className="block text-xs font-black text-teal-400 uppercase mb-2 tracking-widest">
                          {stage}
                        </label>
                        <textarea
                          value={formData.funnel[stage]}
                          onChange={(e) => updateField('funnel', stage, e.target.value)}
                          placeholder="Add one idea per line..."
                          className="w-full bg-transparent border-none focus:outline-none text-sm text-slate-300 h-24 resize-none"
                        />
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-slate-800/30 p-8 rounded-3xl border border-slate-700">
                  <h3 className="text-lg font-bold mb-6 text-white">The Success Stoplight</h3>

                  <div className="grid gap-6">
                    {['red', 'yellow', 'green'].map((color) => (
                      <div
                        key={color}
                        className="flex gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800"
                      >
                        <div className={`w-4 h-4 rounded-full mt-1 ${stoplightColorClass[color]}`} />
                        <div className="flex-1">
                          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
                            {color} zone behavior
                          </label>
                          <textarea
                            value={formData.stoplight[color]}
                            onChange={(e) => updateField('stoplight', color, e.target.value)}
                            className="w-full bg-transparent border-none focus:outline-none text-sm text-slate-300 h-16 resize-none"
                            placeholder="Type here..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeModule === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { key: 'cred', label: 'Credibility', emoji: '🎓' },
                  { key: 'rel', label: 'Reliability', emoji: '⏱️' },
                  { key: 'int', label: 'Intimacy', emoji: '🤝' },
                  { key: 'ori', label: 'Orientation', emoji: '🎯' },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="bg-slate-800/30 rounded-3xl border border-slate-700 overflow-hidden"
                  >
                    <div className="bg-slate-900/80 px-8 py-4 border-b border-slate-800">
                      <span className="font-black text-white text-sm uppercase tracking-widest">
                        {item.emoji} {item.label}
                      </span>
                    </div>

                    <div className="p-6 grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black text-teal-400 uppercase mb-2">
                          Builders (+)
                        </label>
                        <textarea
                          value={formData.trust[`${item.key}Plus`]}
                          onChange={(e) =>
                            updateField('trust', `${item.key}Plus`, e.target.value)
                          }
                          className="w-full h-32 bg-slate-900/50 rounded-xl p-3 text-xs text-slate-300 outline-none border border-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-red-400 uppercase mb-2">
                          Breakers (-)
                        </label>
                        <textarea
                          value={formData.trust[`${item.key}Minus`]}
                          onChange={(e) =>
                            updateField('trust', `${item.key}Minus`, e.target.value)
                          }
                          className="w-full h-32 bg-slate-900/50 rounded-xl p-3 text-xs text-slate-300 outline-none border border-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeModule === 4 && (
              <div className="bg-slate-800/30 p-10 rounded-3xl border border-slate-700">
                <h3 className="text-xl font-bold mb-2 text-white">Community Engagement Pitch</h3>
                <p className="text-sm text-slate-500 mb-8">
                  Draft your introduction. Focus on value, not features.
                </p>

                <textarea
                  value={formData.pitch}
                  onChange={(e) => updateField('pitch', null, e.target.value)}
                  placeholder="Example: I'm [Name], and I help local business owners..."
                  className="w-full h-[400px] bg-slate-900/50 rounded-2xl p-8 text-lg italic text-slate-300 outline-none border border-slate-800"
                />
              </div>
            )}

            {activeModule === 5 && (
              <div className="bg-slate-800/30 p-10 rounded-3xl border border-slate-700">
                <h3 className="text-xl font-bold mb-2 text-white">Workflow Subtasking</h3>
                <p className="text-sm text-slate-500 mb-8">
                  Break a big task into small steps.
                </p>

                <textarea
                  value={formData.subtasks}
                  onChange={(e) => updateField('subtasks', null, e.target.value)}
                  placeholder={'1. Discovery call\n2. Document upload\n3. Review notes'}
                  className="w-full h-[400px] bg-slate-900/50 rounded-2xl p-8 text-sm text-slate-300 outline-none border border-slate-800"
                />
              </div>
            )}

            {activeModule === 6 && (
              <div className="space-y-6">
                {[
                  { key: 'connect', label: 'C — Connect' },
                  { key: 'listen', label: 'L — Listen & Question' },
                  { key: 'identify', label: 'I — Identify Opportunity' },
                  { key: 'message', label: 'M — Message Value' },
                  { key: 'commit', label: 'B — Build Commitment' },
                ].map((section) => (
                  <div
                    key={section.key}
                    className="bg-slate-800/30 rounded-2xl border border-slate-700 overflow-hidden"
                  >
                    <div className="px-6 py-3 bg-slate-900 font-black text-xs text-white uppercase tracking-widest">
                      {section.label}
                    </div>

                    <div className="grid grid-cols-2 divide-x divide-slate-800">
                      <div className="p-4">
                        <label className="text-[9px] font-black text-teal-500 uppercase block mb-2">
                          Going Well
                        </label>
                        <textarea
                          value={formData.climb[`${section.key}Good`]}
                          onChange={(e) =>
                            updateField('climb', `${section.key}Good`, e.target.value)
                          }
                          className="w-full h-24 bg-transparent outline-none border-none text-sm text-slate-400"
                        />
                      </div>

                      <div className="p-4">
                        <label className="text-[9px] font-black text-amber-500 uppercase block mb-2">
                          Better Next Time
                        </label>
                        <textarea
                          value={formData.climb[`${section.key}Better`]}
                          onChange={(e) =>
                            updateField('climb', `${section.key}Better`, e.target.value)
                          }
                          className="w-full h-24 bg-transparent outline-none border-none text-sm text-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}


export default App;