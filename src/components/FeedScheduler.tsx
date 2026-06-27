import React, { useState } from 'react';
import { Calculator, Printer, CheckCircle, RefreshCw, Sparkles, Droplet, ShoppingBag } from 'lucide-react';

interface FeedSchedulerProps {
  language: 'en' | 'hi';
}

export default function FeedScheduler({ language }: FeedSchedulerProps) {
  const [milkingCows, setMilkingCows] = useState<number>(2);
  const [dryCows, setDryCows] = useState<number>(1);
  const [milkingBuffaloes, setMilkingBuffaloes] = useState<number>(1);
  const [dryBuffaloes, setDryBuffaloes] = useState<number>(0);
  const [horses, setHorses] = useState<number>(1);
  const [season, setSeason] = useState<'summer' | 'winter' | 'monsoon'>('summer');

  const [rationReport, setRationReport] = useState<any | null>(null);

  const calculateRation = () => {
    // Scientific constants (kg per animal per day)
    const cowMilkingGreen = 25;
    const cowMilkingDryStraw = 5;
    const cowMilkingConcentrate = 4; // Including 1kg base + milk yield adjustment
    
    const cowDryGreen = 15;
    const cowDryStraw = 6;
    const cowDryConcentrate = 2;

    const buffMilkingGreen = 30;
    const buffMilkingDryStraw = 6;
    const buffMilkingConcentrate = 5;

    const buffDryGreen = 20;
    const buffDryStraw = 7;
    const buffDryConcentrate = 2.5;

    const horseGreen = 10;
    const horseOatsGram = 5;
    const horseStraw = 4;

    // Season multipliers
    let waterMultiplier = 1;
    let greenMultiplier = 1;
    if (season === 'summer') {
      waterMultiplier = 1.4;
      greenMultiplier = 1.2;
    } else if (season === 'winter') {
      waterMultiplier = 0.8;
      greenMultiplier = 0.9;
    } else if (season === 'monsoon') {
      waterMultiplier = 1.0;
      greenMultiplier = 1.0; // Fresh grass high moisture
    }

    // Totals
    const totalGreen = (
      (milkingCows * cowMilkingGreen + dryCows * cowDryGreen) +
      (milkingBuffaloes * buffMilkingGreen + dryBuffaloes * buffDryGreen) +
      (horses * horseGreen)
    ) * greenMultiplier;

    const totalStraw = (
      (milkingCows * cowMilkingDryStraw + dryCows * cowDryStraw) +
      (milkingBuffaloes * buffMilkingDryStraw + dryBuffaloes * buffDryStraw) +
      (horses * horseStraw)
    );

    const totalConcentrate = (
      (milkingCows * cowMilkingConcentrate + dryCows * cowDryConcentrate) +
      (milkingBuffaloes * buffMilkingConcentrate + dryBuffaloes * buffDryConcentrate) +
      (horses * horseOatsGram)
    );

    const totalSalt = (milkingCows + dryCows + milkingBuffaloes + dryBuffaloes + horses) * 0.05; // 50g each
    const totalMinerals = (milkingCows + dryCows + milkingBuffaloes + dryBuffaloes + horses) * 0.04; // 40g each

    // Water (Liters)
    const baseWaterCow = 80;
    const baseWaterBuff = 110;
    const baseWaterHorse = 45;

    const totalWater = (
      ((milkingCows + dryCows) * baseWaterCow) +
      ((milkingBuffaloes + dryBuffaloes) * baseWaterBuff) +
      (horses * baseWaterHorse)
    ) * waterMultiplier;

    setRationReport({
      green: Math.round(totalGreen),
      straw: Math.round(totalStraw),
      concentrate: Math.round(totalConcentrate),
      salt: Number(totalSalt.toFixed(2)),
      minerals: Number(totalMinerals.toFixed(2)),
      water: Math.round(totalWater)
    });
  };

  const handleClear = () => {
    setMilkingCows(0);
    setDryCows(0);
    setMilkingBuffaloes(0);
    setDryBuffaloes(0);
    setHorses(0);
    setRationReport(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-amber-100 p-6 shadow-sm">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-100 pb-4 mb-6 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-600 rounded-xl text-white shadow-md shadow-amber-600/15">
            <Calculator className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-amber-950">
              {language === 'en' ? 'Pashu Ration Calculator & Daily Scheduler' : 'पशु राशन कैलकुलेटर एवं संतुलित सानी चार्ट'}
            </h2>
            <p className="text-xs text-amber-800 font-sans mt-0.5">
              {language === 'en' ? 'Input your livestock headcount to calculate customized feed distribution' : 'अपनी डेयरी और घोड़ों की संख्या दर्ज करें, ऋतु अनुसार पानी और संतुलित आहार की मात्रा जानें'}
            </p>
          </div>
        </div>
        <button
          onClick={handleClear}
          className="text-xs text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1 cursor-pointer bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100 shrink-0 self-start sm:self-auto"
        >
          <RefreshCw className="h-3 w-3" />
          {language === 'en' ? 'Clear Values' : 'साफ करें'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input fields */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-xs font-black tracking-wider text-amber-800 uppercase mb-2">
            {language === 'en' ? 'Enter Livestock Headcount' : 'अपने पशुओं की कुल संख्या दर्ज करें'}
          </h3>

          <div className="space-y-3.5">
            {/* Milking Cows */}
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200/50">
              <div>
                <span className="font-bold text-xs text-stone-800 block">
                  {language === 'en' ? 'Milking Cows (Gaye)' : 'दूध देने वाली गायें'}
                </span>
                <span className="text-[10px] text-stone-500 font-sans">
                  {language === 'en' ? 'Requires high nutrition for lactation' : 'इन्हें संतुलित खली व चोकर अधिक चाहिए'}
                </span>
              </div>
              <input
                type="number"
                min="0"
                value={milkingCows}
                onChange={(e) => setMilkingCows(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 px-2.5 py-1.5 text-center text-stone-800 font-bold font-mono bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>

            {/* Dry/Preg Cows */}
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200/50">
              <div>
                <span className="font-bold text-xs text-stone-800 block">
                  {language === 'en' ? 'Dry / Pregnant Cows' : 'गाभिन या सूखी गायें'}
                </span>
                <span className="text-[10px] text-stone-500 font-sans">
                  {language === 'en' ? 'Ration for healthy calf development' : 'भ्रूण और बच्चे की वृद्धि के लिए उत्तम सानी'}
                </span>
              </div>
              <input
                type="number"
                min="0"
                value={dryCows}
                onChange={(e) => setDryCows(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 px-2.5 py-1.5 text-center text-stone-800 font-bold font-mono bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>

            {/* Milking Buffaloes */}
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200/50">
              <div>
                <span className="font-bold text-xs text-stone-800 block">
                  {language === 'en' ? 'Milking Buffaloes (Bhais)' : 'दूध देने वाली भैंसें'}
                </span>
                <span className="text-[10px] text-stone-500 font-sans">
                  {language === 'en' ? 'Requires high fiber and fat-inducing ingredients' : 'फैट बढ़ाने हेतु विशेष पुआल व बिनौला खल'}
                </span>
              </div>
              <input
                type="number"
                min="0"
                value={milkingBuffaloes}
                onChange={(e) => setMilkingBuffaloes(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 px-2.5 py-1.5 text-center text-stone-800 font-bold font-mono bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>

            {/* Dry Buffaloes */}
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200/50">
              <div>
                <span className="font-bold text-xs text-stone-800 block">
                  {language === 'en' ? 'Dry / Pregnant Buffaloes' : 'गाभिन या सूखी भैंसें'}
                </span>
                <span className="text-[10px] text-stone-500 font-sans">
                  {language === 'en' ? 'Preserves body index before calving' : 'बच्चा देने से पहले सेहत बनाए रखने हेतु'}
                </span>
              </div>
              <input
                type="number"
                min="0"
                value={dryBuffaloes}
                onChange={(e) => setDryBuffaloes(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 px-2.5 py-1.5 text-center text-stone-800 font-bold font-mono bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>

            {/* Horses */}
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200/50">
              <div>
                <span className="font-bold text-xs text-stone-800 block">
                  {language === 'en' ? 'Horses (Ghoda)' : 'घोड़े'}
                </span>
                <span className="text-[10px] text-stone-500 font-sans">
                  {language === 'en' ? 'Energy based on high work/loading rate' : 'ताकत और फुर्ती बनाए रखने के लिए जई-चना'}
                </span>
              </div>
              <input
                type="number"
                min="0"
                value={horses}
                onChange={(e) => setHorses(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 px-2.5 py-1.5 text-center text-stone-800 font-bold font-mono bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>

            {/* Active Season */}
            <div className="pt-2">
              <span className="text-xs font-bold text-stone-700 block mb-2">
                {language === 'en' ? 'Select Active Feeding Season' : 'वर्तमान ऋतु का चयन करें'}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['summer', 'winter', 'monsoon'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSeason(s)}
                    className={`py-2 px-1 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center ${
                      season === s
                        ? 'bg-amber-950 border-amber-950 text-white shadow-sm'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    {s === 'summer' ? (language === 'en' ? 'Summer' : 'गर्मी') : s === 'winter' ? (language === 'en' ? 'Winter' : 'ठंड') : (language === 'en' ? 'Monsoon' : 'बरसात')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={calculateRation}
            className="w-full mt-4 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-600/15 text-sm"
          >
            <Sparkles className="h-4 w-4" />
            {language === 'en' ? 'Generate 7-Day Ration Plan' : 'संतुलित राशन चार्ट तैयार करें'}
          </button>
        </div>

        {/* Report Output Panel */}
        <div className="lg:col-span-6">
          {rationReport ? (
            <div className="bg-amber-950 text-white rounded-2xl p-5 border border-amber-900 shadow-inner flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-amber-900 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Droplet className="h-5 w-5 text-sky-400 animate-bounce" />
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
                        {language === 'en' ? 'Calculated Daily Ration Requirement' : 'प्रतिदिन कुल आवश्यक चारा राशन'}
                      </h4>
                      <p className="text-[10px] text-amber-200">
                        {language === 'en' ? `For ${milkingCows + dryCows + milkingBuffaloes + dryBuffaloes + horses} animal heads in ${season}` : `कुल ${milkingCows + dryCows + milkingBuffaloes + dryBuffaloes + horses} पशुओं के लिए ${season === 'summer' ? 'गर्मी' : season === 'winter' ? 'ठंड' : 'बरसात'} का राशन`}
                      </p>
                    </div>
                  </div>
                  
                  {/* Print Simulation trigger */}
                  <button
                    onClick={() => window.print()}
                    className="p-1.5 bg-amber-900/50 hover:bg-amber-900 rounded text-amber-300 transition-all cursor-pointer"
                    title="Print Chart"
                  >
                    <Printer className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3 font-sans">
                  {/* Green Fodder */}
                  <div className="flex justify-between items-center py-2 border-b border-amber-900/50">
                    <div>
                      <span className="font-bold text-xs block">
                        {language === 'en' ? 'Green Fodder (Grass/Napier)' : 'हरा चारा (नेपियर/मक्का/ज्वार)'}
                      </span>
                      <span className="text-[9.5px] text-amber-300">
                        {language === 'en' ? 'Provides natural vitamins & water weight' : 'प्राकृतिक विटामिन्स और पानी की मात्रा'}
                      </span>
                    </div>
                    <span className="font-black font-mono text-amber-400 text-sm">
                      {rationReport.green} kg
                    </span>
                  </div>

                  {/* Dry Straw */}
                  <div className="flex justify-between items-center py-2 border-b border-amber-900/50">
                    <div>
                      <span className="font-bold text-xs block">
                        {language === 'en' ? 'Dry Wheat Straw (Bhusa)' : 'सूखा गेहूं भूसा / धान पुआल'}
                      </span>
                      <span className="text-[9.5px] text-amber-300">
                        {language === 'en' ? 'Provides primary dry matter and fiber' : 'फाइबर और सूखा पदार्थ'}
                      </span>
                    </div>
                    <span className="font-black font-mono text-amber-400 text-sm">
                      {rationReport.straw} kg
                    </span>
                  </div>

                  {/* Concentrates */}
                  <div className="flex justify-between items-center py-2 border-b border-amber-900/50">
                    <div>
                      <span className="font-bold text-xs block">
                        {language === 'en' ? 'Concentrated Feed (Chokar/Oats)' : 'संतुलित दाना / चोकर / जई'}
                      </span>
                      <span className="text-[9.5px] text-amber-300">
                        {language === 'en' ? 'Increases milk fats & daily protein' : 'दूध फैट व शारीरिक शक्ति बढ़ाने हेतु'}
                      </span>
                    </div>
                    <span className="font-black font-mono text-amber-400 text-sm">
                      {rationReport.concentrate} kg
                    </span>
                  </div>

                  {/* Minerals & Salts */}
                  <div className="flex justify-between items-center py-2 border-b border-amber-900/50">
                    <div>
                      <span className="font-bold text-xs block">
                        {language === 'en' ? 'Salt & Mineral Mixture Powder' : 'नमक एवं मिनरल मिक्सर'}
                      </span>
                      <span className="text-[9.5px] text-amber-300">
                        {language === 'en' ? 'Prevents repeat breeding and calcium drops' : 'रिपीट ब्रीडिंग व कमजोरी रोकने हेतु'}
                      </span>
                    </div>
                    <span className="font-black font-mono text-amber-400 text-sm">
                      {rationReport.salt} kg + {rationReport.minerals} kg
                    </span>
                  </div>

                  {/* Clean Water */}
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <span className="font-bold text-xs block text-sky-300">
                        {language === 'en' ? 'Clean Safe Drinking Water' : 'स्वच्छ पानी की न्यूनतम मात्रा'}
                      </span>
                      <span className="text-[9.5px] text-amber-300">
                        {language === 'en' ? 'Divide into 3 distinct sessions' : 'दिनभर में कम से कम ३ बार पिलाएं'}
                      </span>
                    </div>
                    <span className="font-black font-mono text-sky-400 text-sm">
                      {rationReport.water} Liters
                    </span>
                  </div>
                </div>
              </div>

              {/* Advice */}
              <div className="mt-5 p-3.5 bg-amber-900/50 rounded-xl border border-amber-800/60 text-[10.5px] leading-relaxed text-amber-100 flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {language === 'en'
                    ? 'Always soak the concentrate (Chokar & Khali) for 4-6 hours to release natural enzymes before mixing into the dry straw.'
                    : 'सूखा चोकर और सरसों की खल को खिलाने से ४-६ घंटे पहले पानी में अवश्य भिगोएं ताकि उसके पोषक तत्व पशु आसानी से पचा सके।'}
                </span>
              </div>

            </div>
          ) : (
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200/50 text-center h-full flex flex-col justify-center items-center py-12">
              <ShoppingBag className="h-12 w-12 text-stone-300 mb-3 animate-pulse" />
              <h3 className="text-sm font-bold text-stone-700">
                {language === 'en' ? 'No Schedule Generated' : 'अभी कोई चार्ट नहीं बना है'}
              </h3>
              <p className="text-xs text-stone-500 font-sans mt-1.5 max-w-xs leading-relaxed">
                {language === 'en' 
                  ? 'Input your cattle headcounts in the form and click "Generate Ration Plan" to view custom nutrition distributions.' 
                  : 'बाईं ओर अपने पशुओं की संख्या लिखें और "संतुलित राशन चार्ट" बटन दबाएं। कुछ ही सेकंडों में सटीक चार्ट तैयार हो जाएगा।'}
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
