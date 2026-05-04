import React, { useMemo, useState, useEffect } from 'react';
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
  Sparkles,
  Quote
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
  funnel: { contact: '', lead: '', expert: '', prep: '', complete: '' },
  goals: { initialGoal: '', actionSteps: '' },
  trust: {
    credPlus: '', credMinus: '',
    relPlus: '', relMinus: '',
    intPlus: '', intMinus: '',
    oriPlus: '', oriMinus: '',
  },
  pitch: '',
  subtasks: '',
  climb: {
    connectGood: '', connectBetter: '',
    listenGood: '', listenBetter: '',
    identifyGood: '', identifyBetter: '',
    messageGood: '', messageBetter: '',
    commitGood: '', commitBetter: '',
  },
  stoplight: { red: '', yellow: '', green: '' },
};

const stoplightStyles = {
  red: 'bg-rose-500 shadow-[0_4px_12px_rgba(244,63,94,0.3)]',
  yellow: 'bg-amber-400 shadow-[0_4px_12px_rgba(251,191,36,0.3)]',
  green: 'bg-emerald-500 shadow-[0_4px_12px_rgba(16,185,129,0.3)]',
};

function App() {
  const [activeModule, setActiveModule] = useState(1);
  const [saveStatus, setSaveStatus] = useState('idle');
  const [formData, setFormData] = useState(initialData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem('growth-workbook');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved workbook data');
      }
    }
    setIsLoaded(true);
  }, []);

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

  if (!isLoaded) return null;

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 overflow-hidden font-sans selection:bg-indigo-500/20 relative">
     
      {/* Sidebar */}
      <aside className="w-70 border-r border-slate-200 flex flex-col bg-white shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8 border-b border-slate-100 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-emerald-400" />
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-indigo-50 rounded-lg ring-1 ring-indigo-100">
              <Trophy className="text-indigo-600 w-5 h-5" />
            </div>
            <h1 className="text-sm font-black text-slate-900 tracking-tight">GROWTH PRO</h1>
          </div>
          <p className="text-[10px] text-indigo-600/70 font-bold uppercase tracking-[0.2em] ml-11">
            Mastery Workbook
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {modules.map((module) => {
            const Icon = module.icon;
            const selected = activeModule === module.id;

            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  selected
                    ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200/50 shadow-sm font-semibold'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Icon size={18} className={selected ? 'text-indigo-600' : 'text-slate-400'} />
                <span className="text-sm">{module.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse" />
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Storage</p>
              <p className="text-[11px] text-slate-400">Local browser sync</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden z-10 bg-slate-50">
        <header className="h-20 border-b border-slate-200 flex items-center justify-between px-10 bg-white shadow-sm z-20">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            {modules.find((m) => m.id === activeModule)?.name}
          </h2>

          <div className="flex items-center gap-6">
            {saveStatus === 'saved' && (
              <span className="text-sm font-medium text-emerald-600 flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
                <CheckCircle2 size={16} />
                Progress saved
              </span>
            )}

            <button
              onClick={handleSave}
              className="bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 hover:border-indigo-300 hover:text-indigo-600 px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              <Sparkles size={16} className="text-indigo-500" />
              Save Progress
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 scroll-smooth">
          <div className="max-w-5xl mx-auto space-y-12 pb-20">
           
            {/* MODULE 1: DASHBOARD */}
            {activeModule === 1 && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
               
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Goal Card */}
                  <div className="relative overflow-hidden bg-white p-6 rounded-2xl border-t-4 border-t-indigo-500 border-x border-b border-slate-200 shadow-md group hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute -right-6 -top-6 text-indigo-50 transform rotate-12 group-hover:scale-110 transition-transform">
                      <Target size={120} strokeWidth={1} />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                        <Target size={20} />
                      </div>
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">My Primary Goal</span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed italic relative z-10">
                      {formData.goals.initialGoal || 'Define your main objective in the Blueprint module to see it here.'}
                    </p>
                  </div>

                  {/* Strategies Card */}
                  <div className="relative overflow-hidden bg-white p-6 rounded-2xl border-t-4 border-t-emerald-500 border-x border-b border-slate-200 shadow-md group hover:-translate-y-1 transition-all duration-300">
                     <div className="absolute -right-6 -top-6 text-emerald-50 transform rotate-12 group-hover:scale-110 transition-transform">
                      <TrendingUp size={120} strokeWidth={1} />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                       <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                        <TrendingUp size={20} />
                      </div>
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Active Strategies</span>
                    </div>
                    <div className="relative z-10 flex items-baseline gap-2">
                      <p className="text-5xl font-black text-slate-800">
                        {funnelProgress.reduce((a, b) => a + b, 0)}
                      </p>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">
                        Total items
                      </p>
                    </div>
                  </div>

                  {/* Trust Balance Card */}
                  <div className="relative overflow-hidden bg-white p-6 rounded-2xl border-t-4 border-t-amber-500 border-x border-b border-slate-200 shadow-md group hover:-translate-y-1 transition-all duration-300">
                     <div className="absolute -right-6 -top-6 text-amber-50 transform rotate-12 group-hover:scale-110 transition-transform">
                      <ShieldCheck size={120} strokeWidth={1} />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                       <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                        <ShieldCheck size={20} />
                      </div>
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Trust Balance</span>
                    </div>
                    <div className="flex items-center gap-6 relative z-10 mt-2">
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-500 mb-1 font-medium">Builders</span>
                        <span className="text-3xl font-black text-emerald-500">+{trustScore.positive}</span>
                      </div>
                      <div className="w-px h-10 bg-slate-200"></div>
                      <div className="flex flex-col">
                         <span className="text-sm text-slate-500 mb-1 font-medium">Breakers</span>
                        <span className="text-3xl font-black text-rose-500">-{trustScore.negative}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-200" />

                {/* Funnel Strength & Stoplight Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Funnel Progress */}
                  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                      <BarChart3 size={200} />
                    </div>
                    <h3 className="text-sm font-black text-slate-800 mb-8 uppercase tracking-widest flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-2 h-6 bg-indigo-500 rounded-full" />
                      Growth Funnel Strength
                    </h3>

                    <div className="space-y-6 relative z-10">
                      {['Contact', 'Lead', 'Expert', 'Prep', 'Complete'].map((label, idx) => {
                        const count = funnelProgress[idx];
                        const percent = Math.min(100, Math.max(5, (count / 5) * 100)); // Min 5% for visual

                        return (
                          <div key={label} className="flex items-center gap-4 group">
                            <span className="w-24 text-xs font-bold text-slate-600 uppercase tracking-wider group-hover:text-indigo-600 transition-colors">
                              {label}
                            </span>
                            <div className="flex-1 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative shadow-inner">
                              <div
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-purple-400 transition-all duration-1000 ease-out"
                                style={{ width: `${percent}%` }}
                              >
                                <div className="absolute inset-0 bg-white/20 w-full h-full" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.2) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.2) 50%,rgba(255,255,255,.2) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}></div>
                              </div>
                              <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold ${percent > 85 ? 'text-white' : 'text-slate-600'}`}>
                                {count} {count === 1 ? 'item' : 'items'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Success Stoplight */}
                  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
                    <h3 className="text-sm font-black text-slate-800 mb-8 uppercase tracking-widest flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-2 h-6 bg-emerald-500 rounded-full" />
                      The Success Stoplight
                    </h3>

                    <div className="space-y-6">
                      {[
                        { color: 'green', title: 'Green Zone', desc: formData.stoplight.green, textClass: 'text-emerald-700', bgClass: 'bg-emerald-50 border-emerald-200' },
                        { color: 'yellow', title: 'Yellow Zone', desc: formData.stoplight.yellow, textClass: 'text-amber-700', bgClass: 'bg-amber-50 border-amber-200' },
                        { color: 'red', title: 'Red Zone', desc: formData.stoplight.red, textClass: 'text-rose-700', bgClass: 'bg-rose-50 border-rose-200' }
                      ].map((item) => (
                        <div key={item.color} className={`flex gap-5 p-5 rounded-xl border shadow-sm ${item.bgClass}`}>
                          <div className={`w-4 h-4 rounded-full mt-1 shrink-0 ${stoplightStyles[item.color]}`} />
                          <div>
                            <p className={`text-[11px] font-black uppercase tracking-wider mb-1 ${item.textClass}`}>
                              {item.title}
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed font-medium">
                              {item.desc || <span className="italic opacity-60">Nothing added yet. Add behaviors in Blueprint.</span>}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Core Pitch Banner */}
                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 rounded-3xl p-10 text-white shadow-lg">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                   <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20 text-white">
                     <Quote size={160} />
                   </div>
                  <div className="relative z-10 max-w-3xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20">
                         <Lightbulb size={24} className="text-white" />
                      </div>
                      <h4 className="text-xl font-black uppercase tracking-widest text-white/90">My Core Pitch</h4>
                    </div>
                    <p className="text-2xl md:text-3xl font-medium italic leading-relaxed text-white drop-shadow-sm">
                      "{formData.pitch || 'Your compelling community pitch goes here. Navigate to the Pitch module to write your story.'}"
                    </p>
                    <button
                      onClick={() => setActiveModule(4)}
                      className="mt-8 flex items-center gap-2 text-sm font-bold bg-white text-indigo-700 hover:bg-slate-50 backdrop-blur-md px-6 py-3 rounded-xl shadow-md transition-all"
                    >
                      Refine my pitch <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 2: GROWTH BLUEPRINT */}
            {activeModule === 2 && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section className="bg-white p-10 rounded-2xl border-t-4 border-t-indigo-500 border-x border-b border-slate-200 shadow-md">
                  <div className="mb-8 border-b border-slate-100 pb-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3 mb-2">
                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 border border-indigo-100">
                        <BarChart3 size={20} />
                      </div>
                      Funnel Delighters
                    </h3>
                    <p className="text-slate-500 text-sm ml-12">Identify key actions and strategies for each stage of your growth funnel.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {['contact', 'lead', 'expert', 'prep', 'complete'].map((stage, i) => (
                      <div key={stage} className="flex flex-col">
                        <div className="flex items-center justify-between mb-3 px-1">
                           <label className="text-xs font-black text-indigo-600 uppercase tracking-widest">
                            {i + 1}. {stage}
                          </label>
                          <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600 border border-indigo-100">
                            {formData.funnel[stage].split('\n').filter(l => l.trim()).length}
                          </div>
                        </div>
                        <textarea
                          value={formData.funnel[stage]}
                          onChange={(e) => updateField('funnel', stage, e.target.value)}
                          placeholder="Add one idea per line..."
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 text-sm text-slate-700 h-40 resize-none placeholder-slate-400 leading-relaxed shadow-inner transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-white p-10 rounded-2xl border-t-4 border-t-emerald-500 border-x border-b border-slate-200 shadow-md">
                   <div className="mb-8 border-b border-slate-100 pb-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3 mb-2">
                       <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
                        <ShieldCheck size={20} />
                      </div>
                      The Success Stoplight
                    </h3>
                    <p className="text-slate-500 text-sm ml-12">Define the behaviors that indicate if you are on or off track.</p>
                  </div>

                  <div className="space-y-6">
                    {[
                      { color: 'green', label: 'Optimal Behavior (Green)', placeholder: 'E.g., Consistently engaging with community, 5 calls a week...' },
                      { color: 'yellow', label: 'Warning Signs (Yellow)', placeholder: 'E.g., Skipping daily outreach, feeling rushed...' },
                      { color: 'red', label: 'Danger Zone (Red)', placeholder: 'E.g., Complete burnout, ignoring follow-ups...' }
                    ].map((item) => (
                      <div
                        key={item.color}
                        className="flex gap-6 p-6 bg-slate-50 rounded-xl border border-slate-300 shadow-inner focus-within:border-slate-400 focus-within:bg-white transition-all"
                      >
                        <div className={`w-6 h-6 rounded-full mt-1 shrink-0 ${stoplightStyles[item.color]}`} />
                        <div className="flex-1">
                          <label className="block text-xs font-black uppercase text-slate-700 mb-3 tracking-wider">
                            {item.label}
                          </label>
                          <textarea
                            value={formData.stoplight[item.color]}
                            onChange={(e) => updateField('stoplight', item.color, e.target.value)}
                            className="w-full bg-transparent border-none p-0 text-sm text-slate-700 h-20 resize-none outline-none placeholder-slate-400"
                            placeholder={item.placeholder}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* MODULE 3: TRUST ADVOCATES */}
            {activeModule === 3 && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {[
                  { key: 'cred', label: 'Credibility', desc: 'Words you speak & expertise', emoji: '🎓', borderT: 'border-t-indigo-500' },
                  { key: 'rel', label: 'Reliability', desc: 'Actions you take & consistency', emoji: '⏱️', borderT: 'border-t-blue-500' },
                  { key: 'int', label: 'Intimacy', desc: 'Safety & emotional connection', emoji: '🤝', borderT: 'border-t-emerald-500' },
                  { key: 'ori', label: 'Orientation', desc: 'Focus on them vs. you', emoji: '🎯', borderT: 'border-t-purple-500' },
                ].map((item) => (
                  <div
                    key={item.key}
                    className={`bg-white rounded-2xl border-t-4 ${item.borderT} border-x border-b border-slate-200 shadow-md flex flex-col`}
                  >
                    <div className="bg-slate-50 px-8 py-5 border-b border-slate-200 flex items-center gap-4 rounded-t-xl">
                      <div className="text-3xl">{item.emoji}</div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">{item.label}</h4>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{item.desc}</p>
                      </div>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                      <div className="flex flex-col">
                        <label className="flex items-center gap-2 text-[11px] font-black text-emerald-700 uppercase tracking-widest mb-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          Trust Builders (+)
                        </label>
                        <textarea
                          value={formData.trust[`${item.key}Plus`]}
                          onChange={(e) =>
                            updateField('trust', `${item.key}Plus`, e.target.value)
                          }
                          placeholder="What builds this?"
                          className="flex-1 w-full min-h-[140px] bg-slate-50 rounded-xl p-4 text-sm text-slate-700 outline-none border border-slate-300 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all resize-none placeholder-slate-400 shadow-inner"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="flex items-center gap-2 text-[11px] font-black text-rose-700 uppercase tracking-widest mb-3">
                          <div className="w-2 h-2 rounded-full bg-rose-500" />
                          Trust Breakers (-)
                        </label>
                        <textarea
                          value={formData.trust[`${item.key}Minus`]}
                          onChange={(e) =>
                            updateField('trust', `${item.key}Minus`, e.target.value)
                          }
                          placeholder="What destroys this?"
                          className="flex-1 w-full min-h-[140px] bg-slate-50 rounded-xl p-4 text-sm text-slate-700 outline-none border border-slate-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-50 transition-all resize-none placeholder-slate-400 shadow-inner"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* MODULE 4 & 5: SINGLE TEXTAREAS */}
            {(activeModule === 4 || activeModule === 5) && (
              <div className="bg-white p-10 rounded-2xl border-t-4 border-t-indigo-500 border-x border-b border-slate-200 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 opacity-[0.02] pointer-events-none text-indigo-900">
                  {activeModule === 4 ? <Users size={400} /> : <Clock size={400} />}
                </div>
               
                <div className="relative z-10">
                  <div className="mb-8 border-b border-slate-100 pb-6">
                    <h3 className="text-2xl font-bold mb-2 text-slate-800 flex items-center gap-3">
                       <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 border border-indigo-100">
                        {activeModule === 4 ? <Users size={24} /> : <Clock size={24} />}
                      </div>
                      {activeModule === 4 ? 'Community Engagement Pitch' : 'Workflow Subtasking'}
                    </h3>
                    <p className="text-base text-slate-500 ml-14">
                      {activeModule === 4
                        ? 'Draft your introduction. Focus on the value you provide, not just your title or features.'
                        : 'Break down your largest, most intimidating goal into small, actionable daily steps.'}
                    </p>
                  </div>

                  <textarea
                    value={activeModule === 4 ? formData.pitch : formData.subtasks}
                    onChange={(e) => updateField(activeModule === 4 ? 'pitch' : 'subtasks', null, e.target.value)}
                    placeholder={activeModule === 4
                      ? "Example: I'm [Name], and I help local business owners..."
                      : "1. Discovery call\n2. Document upload\n3. Review notes"}
                    className={`w-full h-[500px] bg-slate-50 rounded-xl p-8 text-slate-800 outline-none border border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all resize-none shadow-inner placeholder-slate-400 ${activeModule === 4 ? 'text-xl italic leading-relaxed' : 'text-base leading-loose font-mono'}`}
                  />
                </div>
              </div>
            )}

            {/* MODULE 6: CLIMB NOTES */}
            {activeModule === 6 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="mb-10 px-2 border-b border-slate-200 pb-6">
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-2">
                       <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 border border-indigo-100">
                        <MessageSquare size={24} />
                      </div>
                      CLIMB Methodology
                    </h3>
                    <p className="text-slate-500 text-sm ml-14">Reflect on your conversations. What went well, and what can be improved?</p>
                  </div>

                {[
                  { key: 'connect', label: 'C — Connect', color: 'text-blue-800', bg: 'bg-blue-500', headerBg: 'bg-blue-100' },
                  { key: 'listen', label: 'L — Listen & Question', color: 'text-indigo-800', bg: 'bg-indigo-500', headerBg: 'bg-indigo-100' },
                  { key: 'identify', label: 'I — Identify Opportunity', color: 'text-purple-800', bg: 'bg-purple-500', headerBg: 'bg-purple-100' },
                  { key: 'message', label: 'M — Message Value', color: 'text-pink-800', bg: 'bg-pink-500', headerBg: 'bg-pink-100' },
                  { key: 'commit', label: 'B — Build Commitment', color: 'text-emerald-800', bg: 'bg-emerald-500', headerBg: 'bg-emerald-100' },
                ].map((section) => (
                  <div
                    key={section.key}
                    className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden"
                  >
                    <div className={`px-8 py-4 ${section.headerBg} flex items-center gap-3 border-b border-slate-200`}>
                      <div className={`w-3 h-3 rounded-full ${section.bg} shadow-sm`} />
                      <h4 className={`font-black text-sm uppercase tracking-widest ${section.color}`}>
                        {section.label}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-2 divide-slate-100">
                      <div className="p-8 bg-white">
                        <label className="flex items-center gap-2 text-[11px] font-black text-emerald-700 uppercase tracking-widest mb-4">
                           <CheckCircle2 size={16} /> Going Well
                        </label>
                        <textarea
                          value={formData.climb[`${section.key}Good`]}
                          onChange={(e) =>
                            updateField('climb', `${section.key}Good`, e.target.value)
                          }
                          placeholder="What did you execute perfectly?"
                          className="w-full h-32 bg-slate-50 rounded-xl p-4 text-sm text-slate-700 outline-none border border-slate-300 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 shadow-inner transition-all resize-none placeholder-slate-400"
                        />
                      </div>

                      <div className="p-8 bg-white">
                         <label className="flex items-center gap-2 text-[11px] font-black text-amber-700 uppercase tracking-widest mb-4">
                           <Target size={16} /> Better Next Time
                        </label>
                        <textarea
                          value={formData.climb[`${section.key}Better`]}
                          onChange={(e) =>
                            updateField('climb', `${section.key}Better`, e.target.value)
                          }
                          placeholder="Where did you stumble? How to fix it?"
                          className="w-full h-32 bg-slate-50 rounded-xl p-4 text-sm text-slate-700 outline-none border border-slate-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-50 shadow-inner transition-all resize-none placeholder-slate-400"
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