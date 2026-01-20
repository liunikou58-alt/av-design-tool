import React, { useState, useEffect, useRef } from 'react';
import { 
  Speaker, Mic, Server, Activity, Settings, Download, 
  Plus, Trash2, Move, Maximize, Layers, Zap, Layout, 
  Monitor, FileText, ChevronRight, Save, DollarSign,
  RotateCw, Eye, EyeOff, Grid, CheckCircle, Loader2, MousePointer2,
  Cpu, Info, FileDown
} from 'lucide-react';

// --- DATABASE (資料庫) ---
const DB = {
  speakers: [
    // --- JBL Entertainment: KP G2 Series (Passive) ---
    { brand: 'JBL', series: 'KP G2', model: 'KP2012G2', type: 'Full Range', power: 350, coverage: 70, u: 0 },
    { brand: 'JBL', series: 'KP G2', model: 'KP2015G2', type: 'Full Range', power: 400, coverage: 70, u: 0 },
    { brand: 'JBL', series: 'KP G2', model: 'KP4012G2', type: 'Premium Full Range', power: 400, coverage: 70, u: 0 },
    { brand: 'JBL', series: 'KP G2', model: 'KP4015G2', type: 'Premium Full Range', power: 450, coverage: 70, u: 0 },
    { brand: 'JBL', series: 'KP Series', model: 'KP2010', type: 'Full Range', power: 300, coverage: 80, u: 0 }, // Legacy KP2000 series generic

    // --- JBL Entertainment: MK Series (Karaoke) ---
    { brand: 'JBL', series: 'MK Series', model: 'MK10', type: 'Karaoke', power: 200, coverage: 110, u: 0 },
    { brand: 'JBL', series: 'MK Series', model: 'MK12', type: 'Karaoke', power: 250, coverage: 100, u: 0 },

    // --- JBL Entertainment: XS Series ---
    { brand: 'JBL', series: 'XS Series', model: 'XS 10', type: 'Full Range', power: 300, coverage: 100, u: 0 },
    { brand: 'JBL', series: 'XS Series', model: 'XS 12', type: 'Full Range', power: 350, coverage: 100, u: 0 },
    { brand: 'JBL', series: 'XS Series', model: 'XS 15', type: 'Full Range', power: 400, coverage: 100, u: 0 },

    // --- JBL Professional: Column & Install ---
    { brand: 'JBL', series: 'CBT Series', model: 'CBT1000', type: 'Line Array Column', power: 1000, coverage: 100, u: 0 },
    { brand: 'JBL', series: 'CBT Series', model: 'CBT1000E', type: 'Column Extension', power: 1000, coverage: 100, u: 0 },
    { brand: 'JBL', series: 'COL Series', model: 'COL600', type: 'Slim Column', power: 80, coverage: 160, u: 0 },
    { brand: 'JBL', series: 'COL Series', model: 'COL800', type: 'Slim Column', power: 150, coverage: 160, u: 0 },

    // --- JBL Portable / Tour Sound ---
    // SRX900 (Powered Line Array)
    { brand: 'JBL', series: 'SRX900', model: 'SRX906LA', type: 'Active Line Array', power: 600, coverage: 120, u: 0 },
    { brand: 'JBL', series: 'SRX900', model: 'SRX910LA', type: 'Active Line Array', power: 880, coverage: 105, u: 0 },
    { brand: 'JBL', series: 'SRX900', model: 'SRX918S', type: 'Active Sub', power: 1100, coverage: 360, u: 0 },
    { brand: 'JBL', series: 'SRX900', model: 'SRX928S', type: 'Active Dual Sub', power: 1100, coverage: 360, u: 0 },
    
    // PRX900 (Powered Point Source)
    { brand: 'JBL', series: 'PRX900', model: 'PRX908', type: 'Active Speaker', power: 1000, coverage: 105, u: 0 },
    { brand: 'JBL', series: 'PRX900', model: 'PRX912', type: 'Active Speaker', power: 1000, coverage: 90, u: 0 },
    { brand: 'JBL', series: 'PRX900', model: 'PRX915', type: 'Active Speaker', power: 1000, coverage: 90, u: 0 },
    { brand: 'JBL', series: 'PRX900', model: 'PRX915XLF', type: 'Active Sub', power: 1000, coverage: 360, u: 0 },
    { brand: 'JBL', series: 'PRX900', model: 'PRX918XLF', type: 'Active Sub', power: 1000, coverage: 360, u: 0 },

    // EON700 (Portable)
    { brand: 'JBL', series: 'EON700', model: 'EON710', type: 'Active Speaker', power: 650, coverage: 110, u: 0 },
    { brand: 'JBL', series: 'EON700', model: 'EON712', type: 'Active Speaker', power: 650, coverage: 100, u: 0 },
    { brand: 'JBL', series: 'EON700', model: 'EON715', type: 'Active Speaker', power: 650, coverage: 90, u: 0 },
    { brand: 'JBL', series: 'EON700', model: 'EON718S', type: 'Active Sub', power: 750, coverage: 360, u: 0 },

    // VTX A Series (High-End Tour)
    { brand: 'JBL', series: 'VTX A', model: 'VTX A8', type: 'Line Array', power: 1000, coverage: 110, u: 0 },
    { brand: 'JBL', series: 'VTX A', model: 'VTX A12', type: 'Line Array', power: 1500, coverage: 90, u: 0 },
    { brand: 'JBL', series: 'VTX A', model: 'VTX B18', type: 'Subwoofer', power: 2000, coverage: 360, u: 0 },
    { brand: 'JBL', series: 'VTX A', model: 'VTX B28', type: 'Dual Subwoofer', power: 4000, coverage: 360, u: 0 },
  ],
  mics: [
    { brand: 'JBL', series: 'VM Series', model: 'VM200', type: 'Wireless Handheld', power: 15, coverage: 0, u: 1 },
    { brand: 'JBL', series: 'VM Series', model: 'VM300', type: 'Wireless Handheld', power: 15, coverage: 0, u: 1 },
  ],
  amps: [
    // --- JBL Entertainment Amps ---
    { brand: 'JBL', series: 'BEYOND', model: 'BEYOND 1', type: 'Integrated Amp (2x180W)', power: 360, coverage: 0, u: 2 },
    { brand: 'JBL', series: 'BEYOND', model: 'BEYOND 3', type: 'Integrated Amp (2x360W)', power: 720, coverage: 0, u: 2 },

    // --- Crown XLi Series ---
    { brand: 'CROWN', series: 'XLi', model: 'XLi 800', type: 'Amplifier', power: 600, coverage: 0, u: 2 },
    { brand: 'CROWN', series: 'XLi', model: 'XLi 1500', type: 'Amplifier', power: 900, coverage: 0, u: 2 },
    { brand: 'CROWN', series: 'XLi', model: 'XLi 2500', type: 'Amplifier', power: 1500, coverage: 0, u: 2 },
    { brand: 'CROWN', series: 'XLi', model: 'XLi 3500', type: 'Amplifier', power: 2700, coverage: 0, u: 2 },

    // --- Crown CTD (ComTech DriveCore Dante) Series ---
    { brand: 'CROWN', series: 'CTD Series', model: 'CTD-2125', type: 'Install Amp (2ch)', power: 250, coverage: 0, u: 1 },
    { brand: 'CROWN', series: 'CTD Series', model: 'CTD-4125', type: 'Install Amp (4ch)', power: 500, coverage: 0, u: 1 },
    { brand: 'CROWN', series: 'CTD Series', model: 'CTD-8125', type: 'Install Amp (8ch)', power: 1000, coverage: 0, u: 1 },
  ],
  mixers: [
    // --- Soundcraft Ui ---
    { brand: 'Soundcraft', series: 'Ui', model: 'Ui12', type: 'Digital Mixer', power: 25, coverage: 0, u: 0 },
    { brand: 'Soundcraft', series: 'Ui', model: 'Ui16', type: 'Digital Mixer', power: 25, coverage: 0, u: 4 },
    { brand: 'Soundcraft', series: 'Ui', model: 'Ui24R', type: 'Rack Digital Mixer', power: 65, coverage: 0, u: 4 },

    // --- Soundcraft Vi ---
    { brand: 'Soundcraft', series: 'Vi', model: 'Vi1000', type: 'Digital Console', power: 200, coverage: 0, u: 0 },
    { brand: 'Soundcraft', series: 'Vi', model: 'Vi2000', type: 'Digital Console', power: 250, coverage: 0, u: 0 },
    { brand: 'Soundcraft', series: 'Vi', model: 'Vi3000', type: 'Digital Console', power: 300, coverage: 0, u: 0 },

    // --- Soundcraft Si ---
    { brand: 'Soundcraft', series: 'Si', model: 'Si Impact', type: 'Digital Console', power: 150, coverage: 0, u: 0 },
    { brand: 'Soundcraft', series: 'Si', model: 'Si Performer', type: 'Digital Console', power: 200, coverage: 0, u: 0 },
    { brand: 'Soundcraft', series: 'Si', model: 'Si Expression', type: 'Digital Console', power: 150, coverage: 0, u: 0 },
  ],
  processors: [
    // --- dbx DriveRack Series ---
    { brand: 'dbx', series: 'DriveRack', model: 'VENU360', type: 'Loudspeaker Management (3x6)', power: 25, coverage: 0, u: 1 },
    { brand: 'dbx', series: 'DriveRack', model: 'PA2', type: 'Loudspeaker Management (2x6)', power: 20, coverage: 0, u: 1 },
    { brand: 'dbx', series: 'DriveRack', model: '260', type: 'Loudspeaker Management (2x6)', power: 25, coverage: 0, u: 1 },

    // --- dbx ZonePRO Series (Install) ---
    { brand: 'dbx', series: 'ZonePRO', model: '1260m', type: 'Zone Processor (12x6)', power: 30, coverage: 0, u: 1 },
    { brand: 'dbx', series: 'ZonePRO', model: '1261m', type: 'Zone Processor (12x6, Blank)', power: 30, coverage: 0, u: 1 },
    { brand: 'dbx', series: 'ZonePRO', model: '640m', type: 'Zone Processor (6x4)', power: 25, coverage: 0, u: 1 },
    { brand: 'dbx', series: 'ZonePRO', model: '641m', type: 'Zone Processor (6x4, Blank)', power: 25, coverage: 0, u: 1 },

    // --- dbx AFS (Feedback Suppression) ---
    { brand: 'dbx', series: 'AFS', model: 'AFS2', type: 'Feedback Suppressor', power: 15, coverage: 0, u: 1 },
  ],
  control: [],
  peripherals: [
    // --- UNiKA Power Sequencers ---
    { brand: 'UNiKA', series: 'Power Sequencer', model: 'POWER-4800', type: 'Sequencer (2U, 9600W)', power: 0, coverage: 0, u: 2 },
    { brand: 'UNiKA', series: 'PD Series', model: 'PD-4VI', type: 'Sequencer (1U, 1800W)', power: 0, coverage: 0, u: 1 },
  ]
};

const CATEGORIES = [
  { id: 'speakers', name: '音響類 (Speakers)', dbKey: 'speakers' },
  { id: 'mics', name: '麥克風類 (Microphones)', dbKey: 'mics' },
  { id: 'amps', name: '擴大機類 (Amplifiers)', dbKey: 'amps' },
  { id: 'mixers', name: '調音台類 (Mixing Consoles)', dbKey: 'mixers' },
  { id: 'processors', name: '處理器/數位音頻 (Processors/DSP)', dbKey: 'processors' },
  { id: 'control', name: '環控會議類 (Control/Conference)', dbKey: 'control' },
  { id: 'peripherals', name: '周邊設備 (Peripherals)', dbKey: 'peripherals' },
];

// --- UTILS ---
const formatCurrency = (num) => new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', minimumFractionDigits: 0 }).format(num);

// --- MAIN COMPONENT ---
export default function App() {
  const [phase, setPhase] = useState(1);
  const [bom, setBom] = useState([]);
  
  // Phase 2 State
  const [roomSize, setRoomSize] = useState({ width: 20, depth: 15 }); // meters
  const [bgImage, setBgImage] = useState(null);
  const [canvasObjects, setCanvasObjects] = useState([]); // {id, type, x, y, width, height, rotation, data}
  
  // Phase 4 State
  const [costs, setCosts] = useState({ laborRate: 3000, laborDays: 2, laborPeople: 2, materials: 50000 });
  const [projectInfo, setProjectInfo] = useState({
    name: '新建多功能廳視聽工程',
    date: new Date().toISOString().split('T')[0],
    presenter: '王大明',
    company: '科技視聽有限公司',
    address: '台北市信義區信義路五段7號',
    phone: '02-1234-5678'
  });

  // Navigation
  const nextPhase = () => setPhase(p => Math.min(5, p + 1));
  const prevPhase = () => setPhase(p => Math.max(1, p - 1));

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-purple-500 selection:text-white pb-20">
      {/* Header */}
      <header className="bg-slate-800 border-b border-purple-900 sticky top-0 z-50 shadow-lg shadow-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* Logo Icon - Changed to CPU/Engine style. Replace with <img> if needed. */}
            <Cpu className="text-purple-400 w-10 h-10" />
            <div>
              <h1 className="text-xl font-bold tracking-wider text-purple-100">AV INTEGRATION <span className="text-purple-500">SI design engine v1.0 Ultra</span></h1>
              <p className="text-xs text-slate-400">Professional Audio Visual Solution Suite</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {[
              { id: 1, label: '設備選型', sub: 'Equipment' },
              { id: 2, label: '圖紙建模', sub: 'Modeling' },
              { id: 3, label: '視覺化', sub: 'Visualization' },
              { id: 4, label: '方案設定', sub: 'Settings' },
              { id: 5, label: '全案下載', sub: 'Download' }
            ].map((step) => (
              <button
                key={step.id}
                onClick={() => setPhase(step.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex flex-col items-center min-w-[100px] ${
                  phase === step.id 
                    ? 'bg-purple-700 text-white shadow-lg shadow-purple-700/30' 
                    : 'text-slate-400 hover:bg-slate-700 hover:text-purple-300'
                }`}
              >
                <span className="font-bold text-sm">{step.id}. {step.label}</span>
                <span className="text-[10px] uppercase opacity-70">{step.sub}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {phase === 1 && <Phase1Selection bom={bom} setBom={setBom} />}
        {phase === 2 && <Phase2Modeling bom={bom} roomSize={roomSize} setRoomSize={setRoomSize} bgImage={bgImage} setBgImage={setBgImage} canvasObjects={canvasObjects} setCanvasObjects={setCanvasObjects} />}
        {phase === 3 && <Phase3Visualization bom={bom} canvasObjects={canvasObjects} roomSize={roomSize} />}
        {phase === 4 && <Phase4Settings costs={costs} setCosts={setCosts} projectInfo={projectInfo} setProjectInfo={setProjectInfo} bom={bom} />}
        {phase === 5 && <Phase5Download projectInfo={projectInfo} bom={bom} costs={costs} canvasObjects={canvasObjects} roomSize={roomSize} />}

      </main>

      {/* Footer Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-purple-900 p-4 flex justify-between items-center z-40 md:hidden">
        <button onClick={prevPhase} disabled={phase === 1} className="px-4 py-2 bg-slate-700 rounded disabled:opacity-50">Previous</button>
        <span className="font-bold text-purple-400">PHASE {phase} / 5</span>
        <button onClick={nextPhase} disabled={phase === 5} className="px-4 py-2 bg-purple-600 rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// PHASE 1: EQUIPMENT SELECTION (OPTIMIZED COMPACT LAYOUT)
// ----------------------------------------------------------------------
function Phase1Selection({ bom, setBom }) {
  const [selCat, setSelCat] = useState(CATEGORIES[0]);
  const [selBrand, setSelBrand] = useState('');
  const [selSeries, setSelSeries] = useState(''); // Added Series state
  const [selModel, setSelModel] = useState(null);
  const [qty, setQty] = useState(1);
  const [customPrice, setCustomPrice] = useState(0);

  // Filter available items
  const availableItems = DB[selCat.dbKey] || [];
  
  // 1. Get Unique Brands
  const brands = [...new Set(availableItems.map(i => i.brand))];

  // 2. Get Unique Series based on Brand
  const seriesList = [...new Set(
    availableItems
      .filter(i => i.brand === selBrand)
      .map(i => i.series)
      .filter(Boolean)
  )];

  // 3. Filter Models based on Brand AND Series
  const models = availableItems.filter(i => 
    i.brand === selBrand && 
    (!selSeries || i.series === selSeries)
  );

  const addItem = () => {
    if (!selModel) return;
    const newItem = {
      id: Date.now(),
      category: selCat.name,
      ...selModel,
      qty: parseInt(qty),
      unitPrice: parseFloat(customPrice) || 0
    };
    setBom([...bom, newItem]);
  };

  const removeItem = (id) => {
    setBom(bom.filter(i => i.id !== id));
  };

  // CSV Download Handler
  const downloadCSV = () => {
    if (bom.length === 0) return;
    
    // Define headers
    const headers = ["Category", "Brand", "Series", "Model", "Type", "Power(W)", "Qty", "Unit Price", "Subtotal"];
    
    // Map data
    const rows = bom.map(item => [
      `"${item.category}"`,
      `"${item.brand}"`,
      `"${item.series || ''}"`,
      `"${item.model}"`,
      `"${item.type}"`,
      item.power,
      item.qty,
      item.unitPrice,
      item.unitPrice * item.qty
    ]);

    // Convert to CSV string with headers
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    // Create blob and download link (with BOM for UTF-8 support in Excel)
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `BOM_List_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Power Calculations
  const totalWatts = bom.reduce((acc, item) => acc + (item.power * item.qty), 0);
  const amps110 = (totalWatts / 110).toFixed(1);
  const amps220 = (totalWatts / 220).toFixed(1);

  return (
    <div className="space-y-4 animate-in fade-in zoom-in duration-300">
      <div className="bg-slate-800 p-4 rounded-xl border border-purple-800/50 shadow-xl">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center">
          <Speaker className="mr-2 text-purple-400 w-5 h-5" /> 設備選型 (Selection)
        </h2>
        
        <div className="flex flex-col gap-3">
            {/* Top Row: Selectors (Compact Grid) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div>
                    <label className="block text-[10px] text-purple-300 mb-1">品類 (Category)</label>
                    <select 
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs focus:border-purple-500 outline-none"
                      value={selCat.id}
                      onChange={(e) => {
                        setSelCat(CATEGORIES.find(c => c.id === e.target.value));
                        setSelBrand('');
                        setSelSeries('');
                        setSelModel(null);
                      }}
                    >
                      {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-[10px] text-purple-300 mb-1">品牌 (Brand)</label>
                    <select 
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs focus:border-purple-500 outline-none"
                      value={selBrand}
                      onChange={(e) => {
                        setSelBrand(e.target.value);
                        setSelSeries(''); 
                        setSelModel(null);
                      }}
                      disabled={!selCat}
                    >
                      <option value="">-- Select --</option>
                      {brands.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-[10px] text-purple-300 mb-1">系列 (Series)</label>
                    <select 
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs focus:border-purple-500 outline-none"
                      value={selSeries}
                      onChange={(e) => {
                        setSelSeries(e.target.value);
                        setSelModel(null);
                      }}
                      disabled={!selBrand}
                    >
                      <option value="">-- Select Series --</option>
                      {seriesList.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-[10px] text-purple-300 mb-1">型號 (Model)</label>
                    <select 
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs focus:border-purple-500 outline-none"
                      value={selModel ? selModel.model : ''}
                      onChange={(e) => {
                        const m = models.find(m => m.model === e.target.value);
                        setSelModel(m);
                        setCustomPrice(0); 
                      }}
                      disabled={!selBrand} 
                    >
                      <option value="">-- Select Model --</option>
                      {models.map(m => <option key={m.model} value={m.model}>{m.model}</option>)}
                    </select>
                </div>
            </div>

            {/* Bottom Row: Inputs & Action (Compact Grid) */}
            <div className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-3 md:col-span-2">
                    <label className="block text-[10px] text-purple-300 mb-1">數量 (Qty)</label>
                    <input 
                      type="number" min="1" 
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs" 
                      value={qty} onChange={e => setQty(e.target.value)} 
                    />
                </div>
                <div className="col-span-5 md:col-span-3">
                    <label className="block text-[10px] text-purple-300 mb-1 flex justify-between items-center">
                        <span>單價 (Price)</span>
                        <span className="text-yellow-500 text-[9px]">*手填</span>
                    </label>
                    <input 
                        type="number" 
                        placeholder="0"
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs focus:border-yellow-500" 
                        value={customPrice === 0 ? '' : customPrice} 
                        onChange={e => setCustomPrice(e.target.value)} 
                    />
                </div>
                
                {/* Visual calculation helper */}
                <div className="col-span-4 md:col-span-4 px-2 pb-1 text-right flex flex-col justify-end h-full">
                      <div className="text-[9px] text-slate-500 leading-tight">Item Total</div>
                      <div className="text-sm font-mono text-purple-300 leading-tight">
                        {formatCurrency((parseFloat(customPrice)||0) * qty)}
                      </div>
                </div>
                
                <div className="col-span-12 md:col-span-3">
                    <button 
                      onClick={addItem}
                      disabled={!selModel}
                      className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold rounded flex items-center justify-center py-1.5 text-xs disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add to BOM
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* BOM Table */}
      <div className="bg-slate-800 p-4 rounded-xl border border-purple-800/50 shadow-xl overflow-hidden">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
             <h3 className="text-sm font-bold text-white">設備清單 (Bill of Materials)</h3>
             <button onClick={downloadCSV} className="text-xs bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded flex items-center shadow-lg transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled={bom.length === 0}>
                <FileDown className="w-3 h-3 mr-1"/> CSV
             </button>
          </div>
          <div className="text-right text-[10px]">
             <span className="text-purple-300 flex items-center gap-2 justify-end">
               <Zap className="w-3 h-3" /> 總功率: <span className="text-white font-mono text-sm">{totalWatts}W</span>
             </span>
             <div className="text-slate-400 mt-0.5">
                110V: <span className="text-yellow-400">{amps110}A</span> | 220V: <span className="text-green-400">{amps220}A</span>
             </div>
          </div>
        </div>
        
        <div className="overflow-x-auto max-h-[300px]">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-700 text-purple-200 uppercase sticky top-0 z-10">
              <tr>
                <th className="p-2">Category</th>
                <th className="p-2">Brand/Series</th>
                <th className="p-2">Model</th>
                <th className="p-2">Specs</th>
                <th className="p-2 text-center">Qty</th>
                <th className="p-2 text-right">Price</th>
                <th className="p-2 text-right">Subtotal</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {bom.length === 0 ? (
                <tr><td colSpan="8" className="p-6 text-center text-slate-500 italic">No items selected yet.</td></tr>
              ) : (
                bom.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-700/50 transition-colors">
                    <td className="p-2">{item.category.split('(')[0]}</td>
                    <td className="p-2">
                      <div className="font-bold text-white">{item.brand}</div>
                      <div className="text-[10px] text-purple-300">{item.series}</div>
                    </td>
                    <td className="p-2 font-mono font-bold text-white">{item.model}</td>
                    <td className="p-2 text-[10px]">
                      {item.power}W {item.u > 0 ? `/ ${item.u}U` : ''} {item.coverage > 0 ? `/ ${item.coverage}°` : ''}
                    </td>
                    <td className="p-2 text-center font-mono">{item.qty}</td>
                    <td className="p-2 text-right font-mono">{formatCurrency(item.unitPrice)}</td>
                    <td className="p-2 text-right font-mono text-purple-300">{formatCurrency(item.unitPrice * item.qty)}</td>
                    <td className="p-2 text-center">
                      <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-slate-700">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// PHASE 2: BLUEPRINT MODELING
// ----------------------------------------------------------------------
function Phase2Modeling({ bom, roomSize, setRoomSize, bgImage, setBgImage, canvasObjects, setCanvasObjects }) {
  const canvasRef = useRef(null);
  
  // Phase 2 Sub-steps
  const [subPhase, setSubPhase] = useState(1);
  const [scale, setScale] = useState(20);
  
  // Multi-Selection State
  const [selectedIds, setSelectedIds] = useState([]);
  // Dragging State: Tracks starting mouse pos and last updated mouse pos
  const [dragInfo, setDragInfo] = useState({ 
    isDragging: false, 
    startX: 0, 
    startY: 0,
    lastX: 0,
    lastY: 0 
  });
  
  // Smart Guides (Alignment lines)
  const [guides, setGuides] = useState([]); // Array of {type: 'vertical'|'horizontal', pos: number}

  const [showCoverage, setShowCoverage] = useState(true);

  // Helper to get one selected object for properties panel
  const singleSelectedObject = selectedIds.length === 1 
    ? canvasObjects.find(o => o.id === selectedIds[0]) 
    : null;

  const speakersToPlace = bom.filter(i => i.category.includes('音響'));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => setBgImage(evt.target.result);
      reader.readAsDataURL(file);
    }
  };

  const addObject = (type) => {
    const newObj = {
      id: Date.now().toString(),
      type: type,
      x: roomSize.width / 2 - (type === 'stage' ? 3 : 1),
      y: roomSize.depth / 2 - (type === 'stage' ? 2 : 1),
      width: type === 'stage' ? 6 : 2,
      height: type === 'stage' ? 4 : 1,
      rotation: 0,
      color: type === 'stage' ? '#334155' : '#475569',
      data: {}
    };
    setCanvasObjects([...canvasObjects, newObj]);
    setSelectedIds([newObj.id]);
  };

  const addSpeakerInstance = (spk) => {
    let nextIndex = -1;
    for(let i=0; i < spk.qty; i++) {
        const checkId = `${spk.id}-${i}`;
        if (!canvasObjects.find(o => o.data?.bomId === checkId)) {
            nextIndex = i;
            break;
        }
    }

    if (nextIndex === -1) return;

    const uniqueId = `${spk.id}-${nextIndex}`;
    const newSpeaker = {
        id: uniqueId,
        type: 'speaker',
        x: roomSize.width / 2 - 0.5,
        y: roomSize.depth / 2 - 0.5,
        width: 1, 
        height: 1, 
        rotation: 0,
        color: '#A855F7',
        data: { bomId: uniqueId, model: spk.model, coverage: spk.coverage }
    };
    setCanvasObjects([...canvasObjects, newSpeaker]);
    setSelectedIds([uniqueId]);
  };

  const getPlacedCount = (spkId) => {
    return canvasObjects.filter(o => o.data?.bomId && o.data.bomId.startsWith(`${spkId}-`)).length;
  };

  // Update logic to handle multiple selections for Rotation
  const updateSelected = (key, value) => {
    if (selectedIds.length === 0) return;
    setCanvasObjects(prev => prev.map(o => 
      selectedIds.includes(o.id) ? { ...o, [key]: Number(value) } : o
    ));
  };

  const deleteSelected = () => {
    setCanvasObjects(prev => prev.filter(o => !selectedIds.includes(o.id)));
    setSelectedIds([]);
  };

  // --- Canvas Interaction Handlers ---

  const handleMouseDown = (e) => {
    if (subPhase === 4) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / scale;
    const my = (e.clientY - rect.top) / scale;

    // Hit Test (Reverse order for Z-index)
    const clicked = canvasObjects.slice().reverse().find(o => 
      mx >= o.x && mx <= o.x + o.width && my >= o.y && my <= o.y + o.height
    );

    if (clicked) {
      // Logic for Multi-select (Shift or Ctrl)
      if (e.shiftKey || e.ctrlKey) {
        if (selectedIds.includes(clicked.id)) {
          setSelectedIds(prev => prev.filter(id => id !== clicked.id));
        } else {
          setSelectedIds(prev => [...prev, clicked.id]);
        }
      } else {
        // If clicking on an unselected item without modifier, clear and select only this one
        // If clicking on an ALREADY selected item, keep selection (to allow group drag)
        if (!selectedIds.includes(clicked.id)) {
          setSelectedIds([clicked.id]);
        }
      }

      setDragInfo({
        isDragging: true,
        startX: mx,
        startY: my,
        lastX: mx,
        lastY: my
      });
    } else {
      // Clicked on empty space
      if (!e.shiftKey && !e.ctrlKey) {
        setSelectedIds([]);
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!dragInfo.isDragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / scale;
    const my = (e.clientY - rect.top) / scale;

    const dx = mx - dragInfo.lastX;
    const dy = my - dragInfo.lastY;

    // --- Smart Guide Logic (Alignment) ---
    // Only calculate guides if moving (and maybe limit to single selection or group leader)
    // Here we define simplified "snap" logic for the bounding box of the selection group
    // But applying snap to multiple items is complex. 
    // We will implement individual snap: check if ANY selected item aligns with ANY unselected item.
    
    const SNAP_THRESHOLD = 0.5; // meters
    const activeGuides = [];
    
    // We create a temporary array for updates to calculate snapping
    let snapDx = dx;
    let snapDy = dy;

    // To prevent chaos, let's just use the first selected object as the "leader" for snapping
    if (selectedIds.length > 0) {
        const leader = canvasObjects.find(o => o.id === selectedIds[0]);
        if (leader) {
            const newLeaderX = leader.x + dx;
            const newLeaderY = leader.y + dy;
            const leaderCenterX = newLeaderX + leader.width/2;
            const leaderCenterY = newLeaderY + leader.height/2;

            // Check against unselected objects
            const unselected = canvasObjects.filter(o => !selectedIds.includes(o.id));
            
            for (let target of unselected) {
                const targetCenterX = target.x + target.width/2;
                const targetCenterY = target.y + target.height/2;

                // Vertical Snap (align X centers)
                if (Math.abs(leaderCenterX - targetCenterX) < SNAP_THRESHOLD) {
                    snapDx = targetCenterX - (leader.x + leader.width/2); // Adjust delta to snap
                    activeGuides.push({ type: 'vertical', pos: targetCenterX });
                }
                
                // Horizontal Snap (align Y centers)
                if (Math.abs(leaderCenterY - targetCenterY) < SNAP_THRESHOLD) {
                    snapDy = targetCenterY - (leader.y + leader.height/2);
                    activeGuides.push({ type: 'horizontal', pos: targetCenterY });
                }
            }
        }
    }
    
    setGuides(activeGuides);

    // Apply movement
    setCanvasObjects(prev => prev.map(o => {
      if (selectedIds.includes(o.id)) {
        return { ...o, x: o.x + snapDx, y: o.y + snapDy };
      }
      return o;
    }));

    setDragInfo(prev => ({ ...prev, lastX: mx, lastY: my })); // Note: this logic is slightly imperfect with snapping but functional for prototype
  };

  const handleMouseUp = () => {
    setDragInfo(prev => ({ ...prev, isDragging: false }));
    setGuides([]); // Clear guides
  };

  // --- Rendering ---
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    // Background
    if (bgImage) {
      const img = new Image();
      img.src = bgImage;
      ctx.drawImage(img, 0, 0, roomSize.width * scale, roomSize.depth * scale);
    } else {
      if (subPhase !== 4) {
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 0.5;
        for(let x=0; x<=roomSize.width; x++) {
          ctx.beginPath(); ctx.moveTo(x*scale, 0); ctx.lineTo(x*scale, roomSize.depth*scale); ctx.stroke();
        }
        for(let y=0; y<=roomSize.depth; y++) {
          ctx.beginPath(); ctx.moveTo(0, y*scale); ctx.lineTo(roomSize.width*scale, y*scale); ctx.stroke();
        }
      } else {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, cvs.width, cvs.height);
      }
    }

    // Draw Objects
    canvasObjects.forEach(obj => {
      const isSelected = selectedIds.includes(obj.id);
      const px = obj.x * scale;
      const py = obj.y * scale;
      const pw = obj.width * scale;
      const ph = obj.height * scale;

      ctx.save();
      ctx.translate(px + pw/2, py + ph/2);
      ctx.rotate((obj.rotation * Math.PI) / 180);
      ctx.translate(-(px + pw/2), -(py + ph/2));

      // Coverage
      if (obj.type === 'speaker' && obj.data.coverage && showCoverage) {
        ctx.fillStyle = isSelected ? 'rgba(168, 85, 247, 0.25)' : 'rgba(168, 85, 247, 0.15)';
        ctx.beginPath();
        const centerX = px + pw/2;
        const centerY = py + ph/2;
        ctx.moveTo(centerX, centerY);
        const angleRad = (obj.data.coverage * Math.PI) / 180;
        const throwDist = 8 * scale; 
        ctx.arc(centerX, centerY, throwDist, (Math.PI/2) - (angleRad/2), (Math.PI/2) + (angleRad/2));
        ctx.lineTo(centerX, centerY);
        ctx.fill();
      }

      // Body
      ctx.fillStyle = obj.color;
      ctx.fillRect(px, py, pw, ph);
      
      // Label
      ctx.fillStyle = '#FFF';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      const label = obj.type === 'speaker' ? obj.data.model : obj.type.toUpperCase();
      ctx.fillText(label, px + pw/2, py + ph/2 + 4);

      // Selection Border
      if (subPhase !== 4) {
        ctx.lineWidth = isSelected ? 3 : 1;
        ctx.strokeStyle = isSelected ? '#FDE047' : '#94A3B8'; // Yellow for selected
        ctx.strokeRect(px, py, pw, ph);
      }

      ctx.restore();
    });

    // Draw Alignment Guides
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#FDE047'; // Yellow guides
    ctx.setLineDash([5, 5]);
    guides.forEach(g => {
        ctx.beginPath();
        if (g.type === 'vertical') {
            ctx.moveTo(g.pos * scale, 0);
            ctx.lineTo(g.pos * scale, roomSize.depth * scale);
        } else {
            ctx.moveTo(0, g.pos * scale);
            ctx.lineTo(roomSize.width * scale, g.pos * scale);
        }
        ctx.stroke();
    });
    ctx.setLineDash([]);

  }, [roomSize, scale, bgImage, canvasObjects, selectedIds, subPhase, showCoverage, guides]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Controls Panel */}
      <div className="lg:col-span-1 space-y-4">
        
        {/* Sub-phase Nav */}
        <div className="flex bg-slate-800 rounded-lg p-1">
          {[1,2,3,4].map(s => (
            <button
              key={s}
              onClick={() => setSubPhase(s)}
              className={`flex-1 py-2 text-xs font-bold rounded ${subPhase === s ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              2-{s}
            </button>
          ))}
        </div>

        {/* 2-1 Room Settings */}
        {subPhase === 1 && (
          <div className="bg-slate-800 p-5 rounded-xl border border-purple-800/50">
            <h3 className="font-bold text-white mb-3">2-1 圖面生成 (Base Map)</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400">上傳底圖 (Upload)</label>
                <input type="file" onChange={handleFileChange} className="w-full text-xs text-slate-300 mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                 <div>
                   <label className="text-xs text-slate-400">寬 (W)</label>
                   <input type="number" value={roomSize.width} onChange={e=>setRoomSize({...roomSize, width: Number(e.target.value)})} className="w-full bg-slate-900 border border-slate-700 rounded p-1" />
                 </div>
                 <div>
                   <label className="text-xs text-slate-400">深 (D)</label>
                   <input type="number" value={roomSize.depth} onChange={e=>setRoomSize({...roomSize, depth: Number(e.target.value)})} className="w-full bg-slate-900 border border-slate-700 rounded p-1" />
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* 2-2 Infrastructure */}
        {subPhase === 2 && (
          <div className="bg-slate-800 p-5 rounded-xl border border-purple-800/50">
            <h3 className="font-bold text-white mb-3">2-2 舞台與控制台 (Infrastructure)</h3>
            <div className="flex flex-col space-y-2 mb-4">
              <button onClick={() => addObject('stage')} className="p-2 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center">
                <Layers className="w-4 h-4 mr-2" /> 增加舞台 (Add Stage)
              </button>
              <button onClick={() => addObject('console')} className="p-2 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center">
                <Monitor className="w-4 h-4 mr-2" /> 增加控制台 (Add Console)
              </button>
            </div>
            
            {/* Multi-Edit for Infrastructure */}
            {selectedIds.length > 0 && !selectedIds.some(id => id.includes('-')) && (
              <div className="border-t border-slate-700 pt-4 animate-in slide-in-from-left-2">
                <h4 className="text-xs font-bold text-purple-300 mb-2">編輯 ({selectedIds.length} items)</h4>
                <div className="space-y-2">
                  <div>
                    <label className="flex justify-between text-xs text-slate-400">旋轉角度 (Rotation)</label>
                    <div className="flex items-center space-x-2">
                        <input 
                          type="number" 
                          value={singleSelectedObject?.rotation || 0} 
                          onChange={e=>updateSelected('rotation', e.target.value)} 
                          className="w-16 bg-slate-900 border border-slate-600 rounded p-1 text-xs"
                        />
                        <span className="text-xs text-slate-500">度</span>
                    </div>
                    <input type="range" min="0" max="360" step="5" value={singleSelectedObject?.rotation || 0} onChange={e=>updateSelected('rotation', e.target.value)} className="w-full mt-1" />
                  </div>
                  <div>
                    <label className="flex justify-between text-xs text-slate-400">寬度/深度</label>
                    <input type="range" min="0.5" max="20" step="0.5" value={singleSelectedObject?.width || 2} onChange={e=>updateSelected('width', e.target.value)} className="w-full" />
                    <input type="range" min="0.5" max="20" step="0.5" value={singleSelectedObject?.height || 2} onChange={e=>updateSelected('height', e.target.value)} className="w-full mt-1" />
                  </div>
                  <button onClick={deleteSelected} className="w-full text-red-400 text-xs hover:bg-slate-700 p-1 rounded mt-2 flex justify-center">刪除 (Delete)</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2-3 Equipment */}
        {subPhase === 3 && (
          <div className="bg-slate-800 p-5 rounded-xl border border-purple-800/50">
            <h3 className="font-bold text-white mb-3">2-3 設備點位 (Equipment)</h3>
            
            <div className="mb-4 bg-slate-900 p-2 rounded flex items-center justify-between">
              <span className="text-xs text-slate-300">顯示模式 (View)</span>
              <button 
                onClick={() => setShowCoverage(!showCoverage)}
                className={`flex items-center space-x-2 px-3 py-1 rounded text-xs ${showCoverage ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-400'}`}
              >
                {showCoverage ? <Eye size={14} className="mr-1"/> : <EyeOff size={14} className="mr-1"/>}
                {showCoverage ? '視圖' : '點位'}
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-2">
                Shift+點擊可多選。拖曳時自動顯示對齊線。
            </p>
            
            <div className="space-y-2 max-h-[250px] overflow-y-auto mb-4">
              {speakersToPlace.map((spk, idx) => {
                const placedCount = getPlacedCount(spk.id);
                const isFull = placedCount >= spk.qty;
                return (
                  <div key={idx} className="bg-slate-700/50 p-2 rounded text-xs border border-slate-600">
                    <div className="flex justify-between items-start mb-1">
                        <div className="font-bold text-purple-300">{spk.brand} {spk.model}</div>
                        <div className={`px-2 py-0.5 rounded text-[10px] ${isFull ? 'bg-green-600 text-white' : 'bg-slate-600 text-slate-300'}`}>
                           {placedCount} / {spk.qty}
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-slate-400">Cov: {spk.coverage}°</span>
                        <button 
                          onClick={() => addSpeakerInstance(spk)}
                          disabled={isFull}
                          className={`flex items-center space-x-1 px-3 py-1 rounded transition-colors ${isFull ? 'bg-slate-600 text-slate-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 text-white'}`}
                        >
                          {isFull ? <CheckCircle size={12} /> : <Plus size={12} />}
                          <span>{isFull ? '完成' : '添加'}</span>
                        </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
             {/* Multi-Edit for Speakers */}
             {selectedIds.length > 0 && selectedIds.some(id => id.includes('-')) && (
              <div className="border-t border-slate-700 pt-4 animate-in slide-in-from-left-2">
                <h4 className="text-xs font-bold text-purple-300 mb-2 flex items-center justify-between">
                    <span>編輯 ({selectedIds.length} 點位)</span>
                    <MousePointer2 size={12} />
                </h4>
                <div className="space-y-3">
                   <div>
                      <label className="flex justify-between text-xs text-slate-400 mb-1">精確旋轉 (Rotation)</label>
                      <div className="flex space-x-2">
                          <input 
                            type="number" 
                            className="w-full bg-slate-900 border border-slate-600 rounded p-1 text-sm text-center" 
                            placeholder="輸入角度"
                            value={singleSelectedObject?.rotation || ''}
                            onChange={e=>updateSelected('rotation', e.target.value)}
                          />
                          <button onClick={()=>updateSelected('rotation', 0)} className="bg-slate-700 px-2 rounded text-xs">0°</button>
                      </div>
                      <input type="range" min="0" max="360" step="5" value={singleSelectedObject?.rotation || 0} onChange={e=>updateSelected('rotation', e.target.value)} className="w-full mt-2" />
                   </div>
                   <div className="flex justify-end pt-2 border-t border-slate-700">
                      <button onClick={deleteSelected} className="text-red-400 text-xs hover:text-red-300 flex items-center">
                        <Trash2 size={12} className="mr-1"/> 刪除所選
                      </button>
                   </div>
                </div>
              </div>
             )}
          </div>
        )}

        {/* 2-4 Preview */}
        {subPhase === 4 && (
          <div className="bg-slate-800 p-5 rounded-xl border border-purple-800/50">
            <h3 className="font-bold text-white mb-3">2-4 總預覽</h3>
            <p className="text-xs text-slate-400 mb-4">預覽模式下無法編輯。</p>
            <div className="space-y-2">
               <div className="flex justify-between text-sm border-b border-slate-700 pb-1">
                 <span>場地</span>
                 <span className="font-mono">{roomSize.width}m x {roomSize.depth}m</span>
               </div>
               <div className="flex justify-between text-sm border-b border-slate-700 pb-1">
                 <span>音響數量</span>
                 <span className="font-mono">{canvasObjects.filter(o => o.type === 'speaker').length}</span>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Canvas Area */}
      <div className="lg:col-span-3 bg-slate-950 rounded-xl border border-slate-800 overflow-auto p-4 flex justify-center items-center relative select-none">
        <div className="relative shadow-2xl">
          <canvas 
            ref={canvasRef}
            width={roomSize.width * scale}
            height={roomSize.depth * scale}
            className={`bg-slate-900 ${subPhase === 4 ? 'cursor-default' : 'cursor-move'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          <div className="absolute top-2 right-2 bg-slate-900/80 px-2 py-1 rounded text-xs text-white pointer-events-none">
            {roomSize.width}m x {roomSize.depth}m
            {subPhase === 4 && <span className="ml-2 text-green-400 font-bold">[PREVIEW]</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// PHASE 3: VISUALIZATION
// ----------------------------------------------------------------------
function Phase3Visualization({ bom, canvasObjects, roomSize }) {
  const [activeTab, setActiveTab] = useState('spl');

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b border-slate-700 pb-2">
        <button onClick={() => setActiveTab('spl')} className={`pb-2 px-2 ${activeTab === 'spl' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-slate-400'}`}>3-1 SPL 分布 (Heatmap)</button>
        <button onClick={() => setActiveTab('sys')} className={`pb-2 px-2 ${activeTab === 'sys' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-slate-400'}`}>3-2 系統圖 (System)</button>
        <button onClick={() => setActiveTab('rack')} className={`pb-2 px-2 ${activeTab === 'rack' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-slate-400'}`}>3-3 機櫃圖 (Rack)</button>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-purple-800/50 min-h-[500px] overflow-hidden">
        {activeTab === 'spl' && <SPLHeatmap canvasObjects={canvasObjects} roomSize={roomSize} />}
        {activeTab === 'sys' && <SystemDiagram bom={bom} />}
        {activeTab === 'rack' && <RackBuilder bom={bom} />}
      </div>
    </div>
  );
}

function SPLHeatmap({ canvasObjects, roomSize }) {
  const scale = 20; 
  return (
    <div className="relative w-full h-[500px] overflow-auto bg-slate-900 border border-slate-700 rounded-lg">
      <div className="min-w-full min-h-full flex justify-center items-center p-10">
        <div 
          className="relative bg-slate-950 border border-slate-600 shadow-2xl flex-shrink-0" 
          style={{ width: roomSize.width * scale, height: roomSize.depth * scale }}
        >
          {canvasObjects.map(obj => (
            <div 
              key={obj.id}
              className="absolute border border-slate-600 z-10"
              style={{
                left: obj.x * scale, top: obj.y * scale,
                width: obj.width * scale, height: obj.height * scale,
                backgroundColor: obj.color,
                transform: `rotate(${obj.rotation}deg)`
              }}
            />
          ))}
          {canvasObjects.filter(o => o.type === 'speaker').map(spk => (
            <div 
              key={`spl-${spk.id}`}
              className="absolute rounded-full pointer-events-none mix-blend-screen opacity-60"
              style={{
                left: (spk.x * scale) - 200 + (spk.width * scale / 2), 
                top: (spk.y * scale) - 200 + (spk.height * scale / 2),
                width: 400, 
                height: 400,
                background: 'radial-gradient(circle, rgba(255,0,0,0.8) 0%, rgba(255,165,0,0.6) 30%, rgba(0,255,0,0.4) 60%, rgba(0,0,255,0) 100%)',
                clipPath: `polygon(50% 50%, 0% 100%, 100% 100%)`, 
                transform: `rotate(${spk.rotation}deg) translateY(${10}px)`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SystemDiagram({ bom }) {
  const hasMics = bom.some(i => i.category.includes('麥克風'));
  const hasMixer = bom.some(i => i.category.includes('調音台'));
  const hasProc = bom.some(i => i.category.includes('處理器'));
  const hasAmp = bom.some(i => i.category.includes('擴大機'));
  const hasSpk = bom.some(i => i.category.includes('音響'));

  const Box = ({ label, active, icon: Icon }) => (
    <div className={`w-40 h-24 border-2 rounded-xl flex flex-col items-center justify-center p-2 transition-all ${
      active ? 'border-purple-500 bg-purple-900/30 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'border-slate-700 bg-slate-800 text-slate-500 opacity-50'
    }`}>
      <Icon className="mb-2" />
      <span className="text-center text-xs font-bold">{label}</span>
    </div>
  );
  const Arrow = () => <div className="text-slate-500"><ChevronRight className="w-8 h-8" /></div>;

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 py-10">
      <h3 className="text-purple-300 mb-6">系統配線邏輯圖</h3>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Box label="1. Microphones" active={hasMics} icon={Mic} />
        <Arrow />
        <Box label="2. Mixing Console" active={hasMixer} icon={Settings} />
        <Arrow />
        <Box label="3. Processor/DSP" active={hasProc} icon={Activity} />
        <Arrow />
        <Box label="4. Amplifiers" active={hasAmp} icon={Zap} />
        <Arrow />
        <Box label="5. Speakers" active={hasSpk} icon={Speaker} />
      </div>
    </div>
  );
}

function RackBuilder({ bom, isPrint = false }) {
  const rackItems = bom.filter(i => i.u > 0);
  const MAX_U = 18;
  const U_HEIGHT = 30;
  const racks = [];
  let currentRackSlots = [];
  let currentUCount = 0;
  
  rackItems.forEach(item => {
    for (let q=0; q<item.qty; q++) {
      if (currentUCount + item.u > MAX_U) {
        racks.push({ id: racks.length + 1, items: currentRackSlots, used: currentUCount });
        currentRackSlots = [];
        currentUCount = 0;
      }
      currentRackSlots.push({ ...item, instanceId: `${item.id}-${q}` });
      currentUCount += item.u;
    }
  });
  if (currentRackSlots.length > 0 || racks.length === 0) {
    racks.push({ id: racks.length + 1, items: currentRackSlots, used: currentUCount });
  }

  return (
    <div className={`flex gap-8 justify-center items-start ${isPrint ? 'flex-wrap p-0' : 'overflow-x-auto p-8 min-h-[650px] bg-slate-900/50 rounded-lg'}`}>
      {racks.map(rack => (
        <div key={rack.id} className="flex flex-col items-center">
          <div className="font-bold text-slate-400 mb-2 tracking-widest">RACK #{rack.id} (18U)</div>
          <div className="flex bg-slate-950 p-2 rounded shadow-2xl border border-slate-700 relative">
            <div className="w-8 bg-slate-700 flex flex-col items-center border-r border-slate-900">
                {Array.from({ length: MAX_U }).map((_, i) => (
                    <div key={i} className="h-[30px] w-full flex flex-col justify-between py-1 items-center relative border-b border-slate-600/30">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div><div className="w-1.5 h-1.5 rounded-full bg-slate-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>
                        <span className="absolute -left-6 top-1.5 text-[10px] text-slate-500 font-mono w-4 text-right select-none">{i + 1}</span>
                    </div>
                ))}
            </div>
            <div className="w-72 bg-black flex flex-col relative border-l border-r border-slate-900">
                 {rack.items.map((slot) => (
                    <div key={slot.instanceId} className="w-full bg-slate-800 border-b border-slate-950 box-border flex flex-col justify-center px-3 relative group overflow-hidden transition-colors hover:bg-slate-750" style={{ height: `${slot.u * U_HEIGHT}px` }}>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                        
                        <div className="absolute left-1 top-0 bottom-0 w-2 flex flex-col justify-around py-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-600 mx-auto"></div>
                            {slot.u > 1 && <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-600 mx-auto"></div>}
                        </div>
                        <div className="absolute right-1 top-0 bottom-0 w-2 flex flex-col justify-around py-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-600 mx-auto"></div>
                            {slot.u > 1 && <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-600 mx-auto"></div>}
                        </div>

                        <div className="pl-4 pr-4 z-10">
                            <div className="flex justify-between items-center"><span className="font-bold text-slate-200 text-xs truncate group-hover:whitespace-normal group-hover:bg-slate-900/90 group-hover:absolute group-hover:z-50 group-hover:p-1 group-hover:rounded group-hover:shadow-lg group-hover:left-8 group-hover:right-8">{slot.brand} {slot.model}</span></div>
                            {slot.u >= 2 && <div className="text-[9px] text-purple-300 mt-0.5 truncate">{slot.category.split('(')[0]} | {slot.power}W</div>}
                        </div>
                        <div className="absolute bottom-1 right-3 text-[8px] text-slate-500 font-mono">{slot.u}U</div>
                    </div>
                 ))}
                 <div className="flex-1 w-full relative opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
            </div>
            <div className="w-8 bg-slate-700 flex flex-col items-center border-l border-slate-900">
                {Array.from({ length: MAX_U }).map((_, i) => (
                    <div key={i} className="h-[30px] w-full flex flex-col justify-between py-1 items-center border-b border-slate-600/30">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>
                    </div>
                ))}
            </div>
          </div>
          <div className="flex w-full justify-between px-4">
             <div className="w-4 h-3 bg-slate-800 rounded-b"></div>
             <div className="w-4 h-3 bg-slate-800 rounded-b"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Phase4Settings({ costs, setCosts, projectInfo, setProjectInfo, bom }) {
  const equipTotal = bom.reduce((acc, item) => acc + (item.unitPrice * item.qty), 0);
  const laborTotal = costs.laborRate * costs.laborDays * costs.laborPeople;
  const grandTotal = equipTotal + laborTotal + costs.materials;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-slate-800 p-6 rounded-xl border border-purple-800/50">
        <h3 className="text-xl font-bold text-white mb-4">4-1 預算設定 (Costing)</h3>
        <div className="space-y-4">
          <div className="p-3 bg-slate-700/50 rounded flex justify-between"><span>設備總價 (Equipment)</span><span className="font-mono text-white">{formatCurrency(equipTotal)}</span></div>
          <div className="border-t border-slate-700 pt-4">
            <h4 className="text-sm font-bold text-purple-300 mb-2">人工 (Labor)</h4>
            <div className="grid grid-cols-3 gap-2">
              <div><label className="text-xs text-slate-400">人數 (Ppl)</label><input type="number" value={costs.laborPeople} onChange={e=>setCosts({...costs, laborPeople: Number(e.target.value)})} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm" /></div>
              <div><label className="text-xs text-slate-400">天數 (Days)</label><input type="number" value={costs.laborDays} onChange={e=>setCosts({...costs, laborDays: Number(e.target.value)})} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm" /></div>
              <div><label className="text-xs text-slate-400">單價/日 ($)</label><input type="number" value={costs.laborRate} onChange={e=>setCosts({...costs, laborRate: Number(e.target.value)})} className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm" /></div>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-4"><label className="text-sm font-bold text-purple-300">耗材一式 (Materials)</label><input type="number" value={costs.materials} onChange={e=>setCosts({...costs, materials: Number(e.target.value)})} className="w-full bg-slate-900 border border-slate-600 rounded p-2 mt-1" /></div>
          <div className="mt-6 p-4 bg-purple-900/40 border border-purple-500 rounded-lg flex justify-between items-center"><span className="font-bold text-lg">總預算 (TOTAL)</span><span className="font-bold text-2xl text-yellow-400">{formatCurrency(grandTotal)}</span></div>
        </div>
      </div>
      <div className="bg-slate-800 p-6 rounded-xl border border-purple-800/50">
        <h3 className="text-xl font-bold text-white mb-4">4-2 專案資訊</h3>
        <div className="space-y-3">
          <div><label className="text-xs text-slate-400">案名</label><input type="text" value={projectInfo.name} onChange={e=>setProjectInfo({...projectInfo, name: e.target.value})} className="w-full bg-slate-900 border border-slate-600 rounded p-2" /></div>
          <div><label className="text-xs text-slate-400">簡報日期</label><input type="date" value={projectInfo.date} onChange={e=>setProjectInfo({...projectInfo, date: e.target.value})} className="w-full bg-slate-900 border border-slate-600 rounded p-2" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs text-slate-400">簡報人</label><input type="text" value={projectInfo.presenter} onChange={e=>setProjectInfo({...projectInfo, presenter: e.target.value})} className="w-full bg-slate-900 border border-slate-600 rounded p-2" /></div>
            <div><label className="text-xs text-slate-400">電話</label><input type="text" value={projectInfo.phone} onChange={e=>setProjectInfo({...projectInfo, phone: e.target.value})} className="w-full bg-slate-900 border border-slate-600 rounded p-2" /></div>
          </div>
          <div><label className="text-xs text-slate-400">公司/地址</label><input type="text" value={projectInfo.company} onChange={e=>setProjectInfo({...projectInfo, company: e.target.value})} className="w-full bg-slate-900 border border-slate-600 rounded p-2 mb-2" /><input type="text" value={projectInfo.address} onChange={e=>setProjectInfo({...projectInfo, address: e.target.value})} className="w-full bg-slate-900 border border-slate-600 rounded p-2" /></div>
        </div>
      </div>
    </div>
  );
}

function Phase5Download({ projectInfo, bom, costs, canvasObjects, roomSize }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const script = document.createElement('script'); script.src = src; script.onload = resolve; script.onerror = reject; document.head.appendChild(script);
      });
    };
    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
    ]).catch(err => {
        console.error("Failed to load PDF libraries", err);
        setErrorMsg("Failed to load PDF generation libraries.");
    });
  }, []);

  const handleDownloadPDF = async () => {
    setErrorMsg('');
    if (!window.html2canvas || !window.jspdf) { 
        setErrorMsg("PDF 引擎尚未加載完成，請稍候再試。(PDF Engine loading...)"); 
        return; 
    }
    setIsGenerating(true);
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4');
    const slides = Array.from(document.querySelectorAll('.pdf-slide'));
    const pdfWidth = 297; const pdfHeight = 210;

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const clone = slide.cloneNode(true);
      const originalCanvases = slide.querySelectorAll('canvas');
      const clonedCanvases = clone.querySelectorAll('canvas');
      originalCanvases.forEach((orig, index) => { if (clonedCanvases[index]) { const ctx = clonedCanvases[index].getContext('2d'); if (ctx) ctx.drawImage(orig, 0, 0); } });
      clone.style.position = 'fixed'; clone.style.top = '0'; clone.style.left = '0'; clone.style.width = '1280px'; clone.style.height = '720px'; clone.style.zIndex = '-9999'; clone.style.visibility = 'visible'; clone.style.transform = 'none';
      document.body.appendChild(clone);
      try {
        const canvas = await window.html2canvas(clone, { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff', windowWidth: 1280, windowHeight: 720 });
        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        if (i > 0) doc.addPage();
        doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      } catch (error) { 
          console.error("Error capturing slide:", error);
          setErrorMsg(`Error capturing slide ${i+1}`);
      } finally { 
          document.body.removeChild(clone); 
      }
    }
    doc.save(`AV_Proposal_${projectInfo.name.replace(/\s+/g, '_')}.pdf`);
    setIsGenerating(false);
  };

  const equipTotal = bom.reduce((acc, item) => acc + (item.unitPrice * item.qty), 0);
  const laborTotal = costs.laborRate * costs.laborDays * costs.laborPeople;
  const grandTotal = equipTotal + laborTotal + costs.materials;
  const totalWatts = bom.reduce((acc, item) => acc + (item.power * item.qty), 0);
  const amps110 = (totalWatts / 110).toFixed(1);
  const amps220 = (totalWatts / 220).toFixed(1);

  const Slide = ({ title, children, className="" }) => (
    <div className={`pdf-slide aspect-video bg-white text-slate-900 p-8 flex flex-col relative shadow-2xl mb-8 ${className}`}>
      <div className="absolute top-0 left-0 w-full h-4 bg-purple-800"></div>
      <div className="flex justify-between items-end border-b-2 border-purple-800 pb-2 mb-4"><h2 className="text-3xl font-bold text-purple-900">{title}</h2><span className="text-xs text-slate-500">{projectInfo.name} | {projectInfo.date}</span></div>
      <div className="flex-1 overflow-hidden relative">{children}</div>
      <div className="mt-4 pt-2 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500"><span>{projectInfo.company}</span><span>{projectInfo.presenter} - {projectInfo.phone}</span></div>
    </div>
  );

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="w-full max-w-4xl flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-purple-600">
        <div>
            <h3 className="text-white font-bold">預覽與輸出 (Preview & Export)</h3>
            <p className="text-xs text-slate-400">點擊右側按鈕直接生成 PDF 檔案 (共7頁)</p>
            {errorMsg && <p className="text-xs text-red-400 mt-1 flex items-center"><Info className="w-3 h-3 mr-1" /> {errorMsg}</p>}
        </div>
        <button onClick={handleDownloadPDF} disabled={isGenerating} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-bold flex items-center shadow-lg transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-wait">{isGenerating ? <Loader2 className="mr-2 animate-spin" /> : <Download className="mr-2" />}{isGenerating ? '生成中 (Generating)...' : '下載 PDF (Download)'}</button>
      </div>
      
      <div id="print-area" className="w-full max-w-5xl bg-slate-600/50 p-8 rounded-xl overflow-y-auto max-h-[800px]">
        
        {/* Page 1: Introduction */}
        <Slide title="PROJECT PROPOSAL">
           <div className="h-full flex flex-col justify-center items-center text-center space-y-6"><div className="w-32 h-32 bg-purple-900 rounded-full flex items-center justify-center text-white mb-4"><Activity size={64} /></div><h1 className="text-5xl font-bold text-slate-900">{projectInfo.name}</h1><div className="text-xl text-slate-600 space-y-2"><p>Date: {projectInfo.date}</p><p>Prepared by: {projectInfo.presenter}</p></div></div>
        </Slide>

        {/* Page 2: 2-4 General Preview (Blueprint) */}
        <Slide title="BLUEPRINT OVERVIEW (2-4)">
           <div className="flex h-full space-x-4">
             <div className="flex-1 border border-slate-300 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                   {canvasObjects.map(obj => (
                      <div key={obj.id} style={{ position: 'absolute', left: `${(obj.x / roomSize.width) * 100}%`, top: `${(obj.y / roomSize.depth) * 100}%`, width: `${(obj.width / roomSize.width) * 100}%`, height: `${(obj.height / roomSize.depth) * 100}%`, backgroundColor: obj.color, border: '1px solid #000', transform: `rotate(${obj.rotation}deg)`, transformOrigin: 'center' }} />
                   ))}
                   <div className="absolute bottom-2 right-2 text-xs bg-white/80 p-1">Scale: 1:{Math.round(20)}</div>
                </div>
             </div>
             <div className="w-1/3 flex flex-col justify-center space-y-4 text-sm text-slate-600">
               <p className="font-bold">Room Specs:</p>
               <p>{roomSize.width}m (W) x {roomSize.depth}m (D)</p>
               <p className="font-bold mt-4">Installed Items:</p>
               <p>Speakers: {canvasObjects.filter(o => o.type === 'speaker').length} units</p>
               <p>Infrastructure: {canvasObjects.filter(o => o.type !== 'speaker').length} units</p>
             </div>
           </div>
        </Slide>

        {/* Page 3: 3-1 SPL Visualization */}
        <Slide title="SPL HEATMAP ANALYSIS (3-1)">
           <div className="relative w-full h-full flex justify-center items-center overflow-hidden bg-slate-900 border border-slate-700">
              <div style={{ position: 'relative', width: '80%', height: '80%' }}>
                 {/* Re-using simplified SPL rendering logic directly for PDF slide */}
                 {canvasObjects.map(obj => (
                    <div key={obj.id} className="absolute border border-slate-600 z-10" style={{ left: `${(obj.x / roomSize.width) * 100}%`, top: `${(obj.y / roomSize.depth) * 100}%`, width: `${(obj.width / roomSize.width) * 100}%`, height: `${(obj.height / roomSize.depth) * 100}%`, backgroundColor: obj.color, transform: `rotate(${obj.rotation}deg)` }} />
                 ))}
                 {canvasObjects.filter(o => o.type === 'speaker').map(spk => (
                    <div key={`spl-${spk.id}`} className="absolute rounded-full pointer-events-none mix-blend-screen opacity-60" style={{
                        left: `calc(${(spk.x / roomSize.width) * 100}% - 200px + ${(spk.width / roomSize.width) * 50}%)`, 
                        top: `calc(${(spk.y / roomSize.depth) * 100}% - 200px + ${(spk.height / roomSize.depth) * 50}%)`,
                        width: '400px', height: '400px',
                        background: 'radial-gradient(circle, rgba(255,0,0,0.8) 0%, rgba(255,165,0,0.6) 30%, rgba(0,255,0,0.4) 60%, rgba(0,0,255,0) 100%)',
                        clipPath: `polygon(50% 50%, 0% 100%, 100% 100%)`, 
                        transform: `rotate(${spk.rotation}deg) translateY(10px)`
                    }} />
                 ))}
              </div>
              <div className="absolute top-4 left-4 text-white bg-black/50 p-2 rounded text-xs">Simulation Mode</div>
           </div>
        </Slide>

        {/* Page 4: 3-2 System Diagram */}
        <Slide title="SYSTEM DIAGRAM (3-2)">
           <div className="h-full transform scale-90 origin-top">
              <SystemDiagram bom={bom} />
           </div>
        </Slide>

        {/* Page 5: 3-3 Rack Layout */}
        <Slide title="RACK LAYOUT (3-3)">
           <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <div className="transform scale-[0.6] origin-center w-[150%] flex justify-center">
                    <RackBuilder bom={bom} isPrint={true} />
                </div>
           </div>
        </Slide>

        {/* Page 6: 4-1 Budget Overview */}
        <Slide title="BUDGET SUMMARY (4-1)">
           <div className="h-full flex flex-col justify-center items-center"><div className="w-2/3 space-y-6">
             <div className="flex justify-between border-b border-slate-300 pb-2 text-xl"><span>Equipment Subtotal</span><span>{formatCurrency(equipTotal)}</span></div>
             <div className="flex justify-between border-b border-slate-300 pb-2 text-xl"><span>Installation Labor</span><span>{formatCurrency(laborTotal)}</span></div>
             <div className="flex justify-between border-b border-slate-300 pb-2 text-xl"><span>Misc. Materials & Cabling</span><span>{formatCurrency(costs.materials)}</span></div>
             <div className="flex justify-between pt-8 text-4xl font-bold text-purple-900"><span>GRAND TOTAL</span><span>{formatCurrency(grandTotal)}</span></div>
           </div></div>
        </Slide>

        {/* Page 7: Power Analysis */}
        <Slide title="POWER ANALYSIS">
           <div className="h-full flex flex-col justify-center p-12">
              <div className="grid grid-cols-2 gap-12">
                 <div className="space-y-6">
                    <div className="bg-purple-100 p-6 rounded-xl border border-purple-200">
                       <h3 className="text-lg font-bold text-purple-800 mb-2">Total Power Consumption</h3>
                       <div className="text-5xl font-bold text-slate-800">{totalWatts} <span className="text-2xl text-slate-500">Watts</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200"><div className="text-sm text-yellow-800 mb-1">Current @ 110V</div><div className="text-3xl font-bold text-slate-800">{amps110} A</div></div>
                       <div className="bg-green-50 p-4 rounded-xl border border-green-200"><div className="text-sm text-green-800 mb-1">Current @ 220V</div><div className="text-3xl font-bold text-slate-800">{amps220} A</div></div>
                    </div>
                 </div>
                 <div className="border-l pl-12 border-slate-200">
                    <h3 className="text-lg font-bold text-slate-700 mb-4">High Power Devices</h3>
                    <ul className="space-y-3">
                       {bom.filter(i => i.power > 100).sort((a,b) => b.power - a.power).slice(0, 6).map(item => (
                          <li key={item.id} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2"><span>{item.brand} {item.model} (x{item.qty})</span><span className="font-mono font-bold">{item.power * item.qty}W</span></li>
                       ))}
                       {bom.filter(i => i.power > 100).length === 0 && <li className="text-slate-400 italic">No high power devices found.</li>}
                    </ul>
                 </div>
              </div>
           </div>
        </Slide>

      </div>
    </div>
  );
}