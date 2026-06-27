import React, { useState } from 'react';
import { Sparkles, ShieldCheck, ShieldAlert, CheckCircle, RefreshCw, Info, HelpCircle } from 'lucide-react';

interface QualityEstimatorProps {
  language: 'en' | 'hi';
}

export default function QualityEstimator({ language }: QualityEstimatorProps) {
  // Bhusa status
  const [color, setColor] = useState<'golden' | 'dark_gray' | 'brown'>('golden');
  const [moisture, setMoisture] = useState<'dry' | 'damp' | 'wet'>('dry');
  const [dust, setDust] = useState<'none' | 'medium' | 'high'>('none');
  const [smell, setSmell] = useState<'fresh' | 'musty' | 'sour'>('fresh');
  const [naadStatus, setNaadStatus] = useState<'clean' | 'unwashed' | 'moss'>('clean');

  const [diagnosticResult, setDiagnosticResult] = useState<any | null>(null);

  const colors = [
    { id: 'golden', en: 'Golden Yellow (Best)', hi: 'सुनहरा पीला (उत्तम)' },
    { id: 'brown', en: 'Light Brown (Average)', hi: 'हल्का भूरा (मध्यम)' },
    { id: 'dark_gray', en: 'Dark Gray/Black (Spoiled)', hi: 'काला/धूसर (खराब)' }
  ];

  const moistureLevels = [
    { id: 'dry', en: 'Fully Dry (<10% moisture)', hi: 'पूर्णतः सूखा (सुरक्षित)' },
    { id: 'damp', en: 'Slightly Damp (Mold hazard)', hi: 'हल्का नम (फंगस का खतरा)' },
    { id: 'wet', en: 'Wet/Soggy (Extremely high risk)', hi: 'गीला (अत्यधिक असुरक्षित)' }
  ];

  const dustLevels = [
    { id: 'none', en: 'No Dust (Clean straw)', hi: 'कोई धूल नहीं (साफ भूसा)' },
    { id: 'medium', en: 'Medium Dust (Needs shaking)', hi: 'मध्यम धूल (झाड़ना आवश्यक)' },
    { id: 'high', en: 'Heavy Flying Dust (Fungal spores)', hi: 'भारी उड़ती धूल (असुरक्षित)' }
  ];

  const smells = [
    { id: 'fresh', en: 'Fresh Wheat Aroma', hi: 'गेहूं की ताजी सोंधी खुशबू' },
    { id: 'musty', en: 'Musty / Mildew Smell', hi: 'सड़ने जैसी सीलन की बदबू' },
    { id: 'sour', en: 'Sour fermented odour', hi: 'खट्टा / बदबूदार गंध' }
  ];

  const naads = [
    { id: 'clean', en: 'Washed Daily (Dry & Odourless)', hi: 'रोज धुली सूखी एवं स्वच्छ नाद' },
    { id: 'unwashed', en: 'Unwashed (Dry feed residue left)', hi: 'बिना धुली (सूखे चारे की पपड़ी)' },
    { id: 'moss', en: 'Green Algae/Moss & Stagnant water', hi: 'हरी काई / फंगस युक्त गीली नाद' }
  ];

  const handleEvaluate = () => {
    // Quality algorithm logic
    let score = 100;
    let alerts: string[] = [];
    let alertsHi: string[] = [];

    if (color === 'brown') { score -= 15; }
    if (color === 'dark_gray') { 
      score -= 40; 
      alerts.push('Spoiled color: High risk of mycotoxins in feed.');
      alertsHi.push('काला भूसा: इसमें माइकोटॉक्सिन नामक जहर हो सकता है जो लीवर खराब करता है।');
    }

    if (moisture === 'damp') { 
      score -= 20; 
      alerts.push('Dampness: Mold will spread within 48 hours.');
      alertsHi.push('भूसे में नमी: ४८ घंटे में भयंकर फफूंद (Fungus) फैलने की संभावना।');
    }
    if (moisture === 'wet') { 
      score -= 45; 
      alerts.push('Soggy Straw: Unusable. Will cause severe diarrhea/bloating.');
      alertsHi.push('गीला भूसा: बिल्कुल अनुपयोगी। पशु को दस्त और गंभीर आफ़रा हो सकता है।');
    }

    if (dust === 'medium') { score -= 10; }
    if (dust === 'high') { 
      score -= 25; 
      alerts.push('Spore Hazard: Breathing dust causes asthma/bovine emphysema.');
      alertsHi.push('उड़ती धूल: पशु और दुहने वाले के फेफड़ों में दमा (Asthma) पैदा करती है।');
    }

    if (smell === 'musty') { 
      score -= 20; 
      alerts.push('Mold odour: Fodder is spoiled, animal will reject feed.');
      alertsHi.push('सीलन की बदबू: फंगस लग चुकी है, पशु सानी खाने से मना कर देगा।');
    }
    if (smell === 'sour') { 
      score -= 30; 
      alerts.push('Fermented feed: Acidosis threat inside the rumen.');
      alertsHi.push('खट्टी गंध: पेट में भयंकर एसिडोसिस (तेजाब बनना) हो सकता है जिससे मौत संभव है।');
    }

    if (naadStatus === 'unwashed') { 
      score -= 15; 
      alerts.push('Dirty Naad: Leftover feed ferments and attracts vectors.');
      alertsHi.push('गंदी नाद: बचा बासी चारा सड़कर मक्खियाँ और कीटाणु आकर्षित करता है।');
    }
    if (naadStatus === 'moss') { 
      score -= 35; 
      alerts.push('Moss Hazard: Blue-green algae is toxic to milking animals.');
      alertsHi.push('काई व दलदल: हरी काई अत्यंत जहरीली होती है, दूध तुरंत कड़वा व कम हो जाता है।');
    }

    score = Math.max(0, score);

    let status: 'safe' | 'warning' | 'danger' = 'safe';
    if (score < 50) status = 'danger';
    else if (score < 80) status = 'warning';

    setDiagnosticResult({ score, status, alerts, alertsHi });
  };

  const handleReset = () => {
    setColor('golden');
    setMoisture('dry');
    setDust('none');
    setSmell('fresh');
    setNaadStatus('clean');
    setDiagnosticResult(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-sky-100 pb-4 mb-6 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-600 rounded-xl text-white shadow-md shadow-sky-600/15">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-sky-950">
              {language === 'en' ? 'Fodder Purity & Naad Hygiene Estimator' : 'सूखा चारा शुद्धता एवं नाद स्वच्छता जाँच'}
            </h2>
            <p className="text-xs text-sky-800 font-sans mt-0.5">
              {language === 'en' ? 'Check mold, dust spores & cement trough cleanliness instantly' : 'भूसे की शुद्धता, फंगस स्तर और सीमेंट की नाद की स्वच्छता का त्वरित वैज्ञानिक परीक्षण'}
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1 cursor-pointer bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100 shrink-0 self-start sm:self-auto"
        >
          <RefreshCw className="h-3 w-3" />
          {language === 'en' ? 'Reset Tester' : 'पुनः जांचें'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input Panel */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Color choice */}
          <div>
            <label className="text-xs font-black text-stone-700 uppercase tracking-wider block mb-2">
              1. {language === 'en' ? 'Fodder Straw Color' : 'भूसे का रंग चुनें'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {colors.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setColor(item.id as any)}
                  className={`p-3 rounded-xl border text-xs font-medium text-left cursor-pointer transition-all ${
                    color === item.id 
                      ? 'bg-sky-950 border-sky-950 text-white font-bold' 
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  {language === 'en' ? item.en : item.hi}
                </button>
              ))}
            </div>
          </div>

          {/* Moisture choice */}
          <div>
            <label className="text-xs font-black text-stone-700 uppercase tracking-wider block mb-2">
              2. {language === 'en' ? 'Moisture Level (Dryness)' : 'नमी व गीलापन'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {moistureLevels.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setMoisture(item.id as any)}
                  className={`p-3 rounded-xl border text-xs font-medium text-left cursor-pointer transition-all ${
                    moisture === item.id 
                      ? 'bg-sky-950 border-sky-950 text-white font-bold' 
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  {language === 'en' ? item.en : item.hi}
                </button>
              ))}
            </div>
          </div>

          {/* Dust choice */}
          <div>
            <label className="text-xs font-black text-stone-700 uppercase tracking-wider block mb-2">
              3. {language === 'en' ? 'Dust and Mold Spore Levels' : 'धूल, कीचड़ व फंगस के कण'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {dustLevels.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setDust(item.id as any)}
                  className={`p-3 rounded-xl border text-xs font-medium text-left cursor-pointer transition-all ${
                    dust === item.id 
                      ? 'bg-sky-950 border-sky-950 text-white font-bold' 
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  {language === 'en' ? item.en : item.hi}
                </button>
              ))}
            </div>
          </div>

          {/* Smell choice */}
          <div>
            <label className="text-xs font-black text-stone-700 uppercase tracking-wider block mb-2">
              4. {language === 'en' ? 'Aroma / Smell of Straw' : 'भूसे की खुशबू या दुर्गंध'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {smells.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSmell(item.id as any)}
                  className={`p-3 rounded-xl border text-xs font-medium text-left cursor-pointer transition-all ${
                    smell === item.id 
                      ? 'bg-sky-950 border-sky-950 text-white font-bold' 
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  {language === 'en' ? item.en : item.hi}
                </button>
              ))}
            </div>
          </div>

          {/* Naad choice */}
          <div>
            <label className="text-xs font-black text-stone-700 uppercase tracking-wider block mb-2">
              5. {language === 'en' ? 'Cement Naad (Feeding Trough) Hygiene' : 'सीमेंट नाद/खुरली की सफाई'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {naads.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setNaadStatus(item.id as any)}
                  className={`p-3 rounded-xl border text-xs font-medium text-left cursor-pointer transition-all ${
                    naadStatus === item.id 
                      ? 'bg-sky-950 border-sky-950 text-white font-bold' 
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  {language === 'en' ? item.en : item.hi}
                </button>
              ))}
            </div>
          </div>

          {/* Evaluate Button */}
          <button
            onClick={handleEvaluate}
            className="w-full py-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-sky-600/15 text-sm"
          >
            <Sparkles className="h-5 w-5 animate-pulse" />
            {language === 'en' ? 'Evaluate Fodder & Barn Hygiene' : 'गुणवत्ता और सुरक्षा की जाँच करें'}
          </button>

        </div>

        {/* Diagnostic Output Panel */}
        <div className="lg:col-span-5">
          {diagnosticResult ? (
            <div className={`rounded-2xl p-5 border h-full flex flex-col justify-between ${
              diagnosticResult.status === 'safe' 
                ? 'bg-emerald-50/50 border-emerald-100 text-emerald-950' 
                : diagnosticResult.status === 'warning'
                ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                : 'bg-rose-50/60 border-rose-200 text-rose-950'
            }`}>
              
              <div>
                {/* Score Circle */}
                <div className="text-center py-4 border-b border-stone-100 mb-4">
                  <span className="text-[10px] uppercase font-black tracking-wider text-stone-500">
                    {language === 'en' ? 'Fodder Health Score' : 'चारा स्वास्थ्य स्कोर'}
                  </span>
                  
                  <div className="flex items-baseline justify-center gap-1 mt-1.5">
                    <span className={`text-5xl font-black font-mono ${
                      diagnosticResult.status === 'safe' 
                        ? 'text-emerald-600' 
                        : diagnosticResult.status === 'warning'
                        ? 'text-amber-600'
                        : 'text-rose-600'
                    }`}>
                      {diagnosticResult.score}
                    </span>
                    <span className="text-xs text-stone-400 font-bold">/100</span>
                  </div>

                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mt-3 ${
                    diagnosticResult.status === 'safe'
                      ? 'bg-emerald-100 text-emerald-800'
                      : diagnosticResult.status === 'warning'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {diagnosticResult.status === 'safe' && (language === 'en' ? 'Excellent & Safe' : 'अति उत्तम व सुरक्षित')}
                    {diagnosticResult.status === 'warning' && (language === 'en' ? 'Caution / Needs Care' : 'सावधानी / सुधार जरूरी')}
                    {diagnosticResult.status === 'danger' && (language === 'en' ? 'Hazardous Fodder' : 'असुरक्षित / जहर समान')}
                  </span>
                </div>

                {/* Warnings / Analysis list */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                    <Info className="h-4 w-4" />
                    {language === 'en' ? 'Analysis & Expert Diagnosis' : 'वैज्ञानिक निदान व सावधानियां'}
                  </h4>

                  {diagnosticResult.alerts.length === 0 ? (
                    <div className="p-4 bg-white/70 rounded-xl border border-emerald-100/40 text-xs flex items-center gap-2 text-emerald-800 font-sans">
                      <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>
                        {language === 'en' 
                          ? 'All inputs are green! The fodder is extremely pure and the trough is perfectly sanitized. Good for cow and buffalo milking fat!' 
                          : 'चारे और नाद में कोई दोष नहीं मिला! यह शत-प्रतिशत स्वच्छ और पशु को उच्च दूध-फैट देने के अनुकूल है।'}
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {(language === 'en' ? diagnosticResult.alerts : diagnosticResult.alertsHi).map((alert: string, idx: number) => (
                        <div key={idx} className="p-3 bg-white/80 rounded-xl border border-stone-200/50 text-[11.5px] font-sans flex items-start gap-2 text-stone-800">
                          <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                          <span>{alert}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* General Recommendation Footnote */}
              <div className="mt-6 p-3 bg-white/80 rounded-xl border border-stone-200/40 text-[10.5px] font-sans leading-relaxed text-stone-600">
                <span className="font-bold text-stone-800 block mb-0.5">
                  {language === 'en' ? 'Sanitization Standard:' : 'स्वच्छता मानक निर्देश:'}
                </span>
                {language === 'en'
                  ? 'Always dust off dry straw under direct sunlight before soaking. Scrub cement naads twice a week with bleaching powder.'
                  : 'सूखे भूसे को भिगोने से पहले खुली धूप में अच्छी तरह फटक लें। सीमेंट की नाद को हफ्ते में दो बार ब्लीचिंग पाउडर या चूने से रगड़ कर साफ करें।'}
              </div>

            </div>
          ) : (
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200/50 text-center h-full flex flex-col justify-center items-center py-12">
              <HelpCircle className="h-12 w-12 text-stone-300 animate-pulse mb-3" />
              <h3 className="text-sm font-bold text-stone-700">
                {language === 'en' ? 'No Evaluation Yet' : 'कोई जाँच रिपोर्ट नहीं'}
              </h3>
              <p className="text-xs text-stone-500 font-sans mt-1.5 max-w-xs leading-relaxed">
                {language === 'en' 
                  ? 'Select the color, moisture, dust, and trough hygiene on the left and click "Evaluate" to view veterinary suggestions.' 
                  : 'बाईं ओर दी गई स्थिति (रंग, नमी, धूल और नाद की स्थिति) को चुनकर "जाँच करें" बटन पर क्लिक करें।'}
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
