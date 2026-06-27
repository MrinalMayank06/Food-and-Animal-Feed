import React, { useState } from 'react';
import { Phone, ShieldAlert, Heart, Activity, Info, Plus, Sparkles } from 'lucide-react';

interface EmergencyVetProps {
  language: 'en' | 'hi';
}

interface DiseaseInfo {
  nameEn: string;
  nameHi: string;
  symptomsEn: string;
  symptomsHi: string;
  treatmentEn: string;
  treatmentHi: string;
  desiEn: string;
  desiHi: string;
}

export default function EmergencyVet({ language }: EmergencyVetProps) {
  const [selectedDisease, setSelectedDisease] = useState<number>(0);

  const diseases: DiseaseInfo[] = [
    {
      nameEn: 'Lumpy Skin Disease (LSD)',
      nameHi: 'लम्पी स्किन डिजीज (त्वचा गाठ रोग)',
      symptomsEn: 'High fever, hard round nodules on the skin, watery eyes, drop in milk, swelling of legs.',
      symptomsHi: 'तेज बुखार, शरीर की त्वचा पर गोल कड़े दाने, आंखों से पानी गिरना, अचानक दूध कम होना, पैरों में सूजन।',
      treatmentEn: 'Isolate the animal immediately. Administer paracetamol under vet guidance. Keep ticks away.',
      treatmentHi: 'पशु को तुरंत झुंड से अलग करें। बुखार कम करने के लिए डॉक्टर से दर्द निवारक लें। चिचड़ी का छिड़काव करें।',
      desiEn: 'Make a paste of Neem leaves, organic turmeric powder, garlic, and coconut oil. Apply over the burst nodules to prevent fly maggots.',
      desiHi: 'नीम के पत्ते, ताजी हल्दी, लहसुन और नारियल तेल को पीसकर गाढ़ा लेप बनाएं और फूटी हुई गांठों पर लगाएं ताकि मक्खियाँ अंडा न दें।'
    },
    {
      nameEn: 'Milk Fever (Hypocalcemia)',
      nameHi: 'मिल्क फीवर (सूतिका ज्वर)',
      symptomsEn: 'Occurs after calving. Shivering, cold ears, animal sits down with neck curved back (S-shape), unable to stand.',
      symptomsHi: 'बच्चा जनने के तुरंत बाद होता है। शरीर कांपना, कान ठंडे होना, पशु गर्दन मोड़कर बैठ जाता है (S-आकृति) और उठ नहीं पाता।',
      treatmentEn: 'Emergency calcium borogluconate drip via intravenous (IV) route by a registered veterinary doctor.',
      treatmentHi: 'रजिस्टर्ड पशु चिकित्सक से तुरंत नस (IV) द्वारा कैल्शियम बोरोग्लूकोनेट की बोतल चढ़वाएं। देरी जानलेवा हो सकती है।',
      desiEn: 'Never try to force feed liquid calcium into the mouth when animal is lying down (choking hazard). Give oral calcium gels before calving.',
      desiHi: 'जब पशु बैठा हो तो मुंह में जबरन तरल न डालें, इससे सांस रुक सकती है। प्रसव से ३ दिन पहले ही ओरल कैल्शियम जेल पिलाएं।'
    },
    {
      nameEn: 'Foot and Mouth Disease (FMD / Khurha)',
      nameHi: 'खुरपका-मुंहपका रोग (खुरहा)',
      symptomsEn: 'Blisters on tongue and feet, heavy frothy saliva, severe limping, inability to walk or graze.',
      symptomsHi: 'जीभ, मसूड़ों और खुरों के बीच छाले होना, मुंह से झागदार लार टपकना, पशु का लंगड़ाना, चरने में असमर्थता।',
      treatmentEn: 'Regular foot wash with copper sulfate. Vacuum or sweep the barn floor daily. Vaccinate twice a year.',
      treatmentHi: 'लाल दवा (पोटैशियम परमैंगनेट) या २% नीले थोथे से खुरों को धोएं। साल में दो बार खुरपका का टीका जरूर लगवाएं।',
      desiEn: 'Wash mouth with lukewarm alum (Phitkari) water. Apply pure honey or ghee mixed with turmeric inside the mouth blisters.',
      desiHi: 'मुंह के छालों को गुनगुने फिटकरी के पानी से धोएं। छालों पर शहद या हल्दी मिला हुआ देसी घी लगाएं जिससे घाव तुरंत भरता है।'
    },
    {
      nameEn: 'Colic in Horses (Stomach Pain)',
      nameHi: 'घोड़े का पेट दर्द (कोलिक)',
      symptomsEn: 'Restlessness, horse frequently rolls on the floor, bites or kicks at its belly, sweating, no dung passing.',
      symptomsHi: 'अत्यधिक बेचैनी, घोड़ा बार-बार जमीन पर लेटकर करवटें बदलता है, पेट की तरफ लात मारता है, पसीना आना और लीद न करना।',
      treatmentEn: 'Contact equine vet immediately. Walk the horse slowly, do not let it roll violently which can twist intestines.',
      treatmentHi: 'तुरंत डॉक्टर बुलाएं। घोड़े को धीरे-धीरे टहलाते रहें, उसे जबरन जमीन पर लेटने या पलटने न दें, इससे आंतें उलझ सकती हैं।',
      desiEn: 'Drench 100ml warm linseed oil (Alsi oil) mixed with 10g hing (asafoetida) and ginger juice to relieve trapped gas.',
      desiHi: 'गैस और कब्ज से राहत के लिए १०० मिली गुनगुने अलसी के तेल में १० ग्राम हींग और अदरक का रस मिलाकर नाल द्वारा पिलाएं।'
    }
  ];

  const activeDisease = diseases[selectedDisease];

  return (
    <div className="bg-rose-950 text-white rounded-2xl p-6 border border-rose-900 shadow-md">
      
      {/* Emergency Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-rose-900 pb-5 mb-6 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-600 rounded-xl text-white shadow-md shadow-rose-600/15 animate-pulse">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-rose-100 flex items-center gap-1.5">
              {language === 'en' ? 'Emergency Veterinary Care & Desi Ilaaj' : 'आपातकालीन पशु चिकित्सा एवं हर्बल देशी नुस्खे'}
              <span className="hidden sm:inline px-2 py-0.5 bg-rose-500 text-white text-[9px] uppercase tracking-widest rounded-full font-black animate-bounce">
                {language === 'en' ? 'Emergency' : 'आपातकाल'}
              </span>
            </h2>
            <p className="text-xs text-rose-300 font-sans mt-0.5">
              {language === 'en' ? 'Instant herbal remedies for cows, buffaloes, and horses' : 'गाय, भैंस और घोड़ों की गंभीर बीमारियों के सटीक लक्षण, वैज्ञानिक इलाज एवं रामबाण उपचार'}
            </p>
          </div>
        </div>

        {/* Call Emergency Button */}
        <a
          href="tel:1962"
          className="flex items-center justify-center gap-2 px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all shadow-md shadow-rose-600/20 text-xs shrink-0 cursor-pointer self-start sm:self-auto"
        >
          <Phone className="h-4 w-4 animate-bounce" />
          <div>
            <span className="block text-[8px] uppercase tracking-wider text-rose-200">
              {language === 'en' ? 'Toll-Free Vet Helpline' : 'निःशुल्क पशु एम्बुलेंस'}
            </span>
            <span className="font-mono text-xs font-black">1962 (BIHAR)</span>
          </div>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Disease Selector List */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-300 block mb-1">
            {language === 'en' ? 'Select Common Disease' : 'मुख्य रोगों की सूची'}
          </span>

          <div className="space-y-2">
            {diseases.map((d, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDisease(idx)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between text-xs ${
                  selectedDisease === idx
                    ? 'bg-rose-600 border-rose-500 text-white font-bold scale-102 shadow-md shadow-rose-600/10'
                    : 'bg-rose-900/40 border-rose-900 text-rose-200 hover:bg-rose-900/60'
                }`}
              >
                <span>{language === 'en' ? d.nameEn : d.nameHi}</span>
                <Plus className="h-3.5 w-3.5 opacity-60" />
              </button>
            ))}
          </div>

          {/* Quick Helpline contacts */}
          <div className="p-4 bg-rose-900/40 rounded-xl border border-rose-900 mt-4 text-[11px] space-y-2 text-rose-200 font-sans">
            <span className="font-bold text-rose-100 block border-b border-rose-900/50 pb-1 mb-1">
              {language === 'en' ? 'Bihar Government Helplines:' : 'बिहार राज्य पशुपालन संपर्क सूत्र:'}
            </span>
            <div className="flex justify-between">
              <span>{language === 'en' ? 'Patna HQ Control:' : 'पटना मुख्यालय कंट्रोल रूम:'}</span>
              <a href="tel:06122230942" className="font-bold text-rose-400 font-mono hover:underline">0612-2230942</a>
            </div>
            <div className="flex justify-between">
              <span>{language === 'en' ? 'Vaccination Center:' : 'टीकाकरण केंद्र इंक्वायरी:'}</span>
              <a href="tel:18003456156" className="font-bold text-rose-400 font-mono hover:underline">1800-345-6156</a>
            </div>
          </div>
        </div>

        {/* Right: Detailed Symptoms & Remedies */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Active Disease Header */}
          <div className="p-4 bg-rose-900/50 rounded-xl border border-rose-800 flex items-center gap-3">
            <Activity className="h-5 w-5 text-rose-400" />
            <div>
              <span className="text-[9px] uppercase tracking-widest text-rose-300 font-bold">
                {language === 'en' ? 'Diagnostic Guide' : 'चिकित्सा मार्गदर्शिका'}
              </span>
              <h3 className="text-sm sm:text-base font-black text-white">
                {language === 'en' ? activeDisease.nameEn : activeDisease.nameHi}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Symptoms */}
            <div className="p-4 bg-rose-900/20 rounded-xl border border-rose-900/60 space-y-2">
              <span className="text-[10px] font-black uppercase text-rose-300 tracking-wider block">
                1. {language === 'en' ? 'Primary Symptoms' : 'रोग के मुख्य लक्षण'}
              </span>
              <p className="text-xs text-rose-100 leading-relaxed font-sans">
                {language === 'en' ? activeDisease.symptomsEn : activeDisease.symptomsHi}
              </p>
            </div>

            {/* Scientific Treatment */}
            <div className="p-4 bg-rose-900/20 rounded-xl border border-rose-900/60 space-y-2">
              <span className="text-[10px] font-black uppercase text-rose-300 tracking-wider block">
                2. {language === 'en' ? 'Allopathic Treatment' : 'डॉक्टर की पहली दवा'}
              </span>
              <p className="text-xs text-rose-100 leading-relaxed font-sans">
                {language === 'en' ? activeDisease.treatmentEn : activeDisease.treatmentHi}
              </p>
            </div>

            {/* Desi herbal remedy */}
            <div className="p-4 bg-rose-900/20 rounded-xl border border-rose-900/60 space-y-2">
              <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider block flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                3. {language === 'en' ? 'Desi Herbal Remedy' : 'रामबाण देशी इलाज'}
              </span>
              <p className="text-xs text-rose-100 leading-relaxed font-sans">
                {language === 'en' ? activeDisease.desiEn : activeDisease.desiHi}
              </p>
            </div>

          </div>

          {/* General Critical Warning */}
          <div className="p-4 bg-rose-900 border border-rose-800 text-rose-100 rounded-xl flex items-start gap-3">
            <Heart className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="text-[11px] font-sans leading-relaxed">
              <span className="font-bold block text-white mb-0.5">
                {language === 'en' ? 'First-Aid Golden Rule:' : 'प्राथमिक उपचार का मूल नियम:'}
              </span>
              {language === 'en'
                ? 'Never feed liquid mixtures into the mouth of a choking or laying cattle. It can enter lungs (Drenching Pneumonia) which causes instant death. Call 1962 for quick vet response.'
                : 'पशु के लेटे रहने या सांस फूलने की स्थिति में कभी भी मुंह में जबरन सरसों का तेल, काढ़ा या पानी न डालें। यह सांस की नली (फेफड़ों) में जाकर ड्रेंचिंग निमोनिया पैदा करता है जिससे तुरंत मौत संभव है।'}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
