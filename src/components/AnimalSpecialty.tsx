import React, { useState } from 'react';
import { Award, Compass, Eye, ShieldCheck, Sparkles, Heart } from 'lucide-react';

interface AnimalSpecialtyProps {
  language: 'en' | 'hi';
}

export default function AnimalSpecialty({ language }: AnimalSpecialtyProps) {
  const [selectedAnimal, setSelectedAnimal] = useState<'cow' | 'buffalo' | 'horse'>('cow');

  const animals = [
    { id: 'cow', en: 'Pujya Gaye / Cow Care', hi: 'गाय पालन (गौशाला विज्ञान)', icon: '🐄' },
    { id: 'buffalo', en: 'Bhais / Buffalo Milking', hi: 'भैंस पालन (दूध फैट सुधार)', icon: '🐃' },
    { id: 'horse', en: 'Ghoda / Horse Management', hi: 'अश्वशाला प्रबंधन (घोड़ा देखभाल)', icon: '🐎' },
  ];

  const breedDetails = {
    cow: {
      titleEn: 'Scientific Cow Husbandry',
      titleHi: 'वैज्ञानिक गोपालन पद्धति',
      breeds: [
        { nameEn: 'Sahiwal', nameHi: 'साहिवाल', origin: 'Punjab/Bihar adapted', fat: '4.5%', yield: '15-20L/day', descEn: 'Reddish-brown, docile, high heat tolerance, sweet rich milk.', descHi: 'लालिमा युक्त भूरी, शांत स्वभाव, अधिक गर्मी सहने में सक्षम, दूध में मिठास।' },
        { nameEn: 'Gir', nameHi: 'गीर', origin: 'Gujarat/Bihar adapted', fat: '4.8%', yield: '12-18L/day', descEn: 'Long curved ears, dome-shaped forehead, strong immune system.', descHi: 'लम्बे घुमावदार कान, उभरा हुआ माथा, उत्कृष्ट रोग प्रतिरोधक क्षमता।' },
        { nameEn: 'Tharparkar', nameHi: 'थारपारकर', origin: 'Rajasthan/Bihar dry region', fat: '4.4%', yield: '10-15L/day', descEn: 'White-gray coat, survives on minimal fodder, highly sturdy.', descHi: 'सफेद-धूसर रंग, कम चारे में भी बेहतरीन दूध देने में सक्षम।' }
      ],
      milkingTipEn: 'Always use the "Full Hand Milking" method. Never use the "Knuckling" (Angutha Lagana) method, as it damages the teat tissues and leads to Mastitis (Thanela disease). Wash udder with potassium permanganate water before milking.',
      milkingTipHi: 'हमेशा "पूर्ण हस्त दोहन" (Full Hand Milking) विधि का ही प्रयोग करें। कभी भी अंगूठा दबाकर (Knuckling) न दुहें, इससे थन की नलिकाएं क्षतिग्रस्त होती हैं और थनैला (Mastitis) रोग होता है। दुहने से पहले थनों को लाल दवा (पोटैशियम परमैंगनेट) मिले पानी से धोएं।',
      heatIndicatorsEn: 'Look for mucus discharge, frequent bellowing, drop in milk yield, restlessness, and standing to be mounted. Best AI timing is 12 hours after the first heat signs.',
      heatIndicatorsHi: 'योनि से पारदर्शी लार गिरना, बार-बार रंभाना, दूध अचानक कम होना, अन्य पशुओं पर चढ़ना। गर्मी (Heat) में आने के 12 घंटे बाद ही कृत्रिम गर्भाधान (AI) कराएं।'
    },
    buffalo: {
      titleEn: 'High-Fat Buffalo Management',
      titleHi: 'उच्च फैट भैंस प्रबंधन विज्ञान',
      breeds: [
        { nameEn: 'Murrah', nameHi: 'मुर्रा', origin: 'Haryana/Bihar cross', fat: '7.0% - 8.5%', yield: '15-25L/day', descEn: 'Jet black, tightly curved horns, massive size, highest fat content.', descHi: 'बिल्कुल गहरा काला रंग, जलेबी जैसे मुड़े सींग, सर्वाधिक फैट देने वाली श्रेष्ठ नस्ल।' },
        { nameEn: 'Bhadawari', nameHi: 'भदावरी', origin: 'UP/Bihar border', fat: '8.5% - 13%', yield: '8-12L/day', descEn: 'Copper colored coat, famous for unmatched high fat percentage.', descHi: 'तांबे जैसी भूरी-लाल त्वचा, दूध में सबसे अधिक वसा (फैट) प्रतिशत के लिए प्रसिद्ध।' },
        { nameEn: 'Mehsana', nameHi: 'महेसाणा', origin: 'Gujarat adapted', fat: '6.5% - 7.5%', yield: '12-18L/day', descEn: 'Long body, docile nature, very consistent lactation cycle.', descHi: 'लंबा शरीर, शांत स्वभाव, लगातार लंबे समय तक दूध देने वाली।' }
      ],
      milkingTipEn: 'Buffalo milk fat is controlled by acetic acid in digestion. Feeding high amounts of dry paddy straw and mustard cakes stimulates fat. Do not keep buffalo under direct sun; high heat lowers milk fat and yield within hours.',
      milkingTipHi: 'भैंस के दूध का फैट पाचन में बनने वाले एसिटिक एसिड से बढ़ता है। सूखा पुआल और सरसों खली का सही संतुलन फैट बढ़ाता है। भैंस को तेज धूप में न बांधें, क्योंकि गर्मी से दूध का फैट प्रतिशत और मात्रा कुछ ही घंटों में गिर जाती है।',
      heatIndicatorsEn: 'Silent Heat is very common in buffaloes. Check carefully in early morning hours. Mild discharge, frequent tail swishing, and slightly swollen vulva are primary indicators.',
      heatIndicatorsHi: 'भैंसों में "मूक गर्मी" (Silent Heat) अत्यंत सामान्य है, यानी वे रंभाती नहीं हैं। सुबह-सुबह ध्यान से देखें- योनि से बारीक लार, पूंछ बार-बार हिलाना और योनि पर हल्की सूजन इसके मुख्य लक्षण हैं।'
    },
    horse: {
      titleEn: 'Elite Horse Care & Stable Craft',
      titleHi: 'घोड़ा व अश्वशाला वैज्ञानिक प्रबंधन',
      breeds: [
        { nameEn: 'Kathiawari', nameHi: 'काठियावाड़ी', origin: 'Gujarat/Bihar adapted', fat: 'N/A', yield: 'Stamina', descEn: 'Inwardly curved ears meeting at top, highly loyal, unmatched speed.', descHi: 'कान अंदर की ओर झुके हुए जो सिर पर मिलते हैं, अत्यंत वफादार एवं फुर्तीली नस्ल।' },
        { nameEn: 'Marwari', nameHi: 'मारवाड़ी', origin: 'Rajasthan/adapted', fat: 'N/A', yield: 'Desert Strength', descEn: 'Sturdy build, beautiful coat colors, resists extreme heat easily.', descHi: 'मजबूत कद-काठी, बेहद खूबसूरत रंग, विषम परिस्थितियों में भी असीमित ऊर्जा।' },
        { nameEn: 'Manipuri Pony', nameHi: 'मणिपुरी पोनी', origin: 'Eastern / Bihar sports', fat: 'N/A', yield: 'Polo & Agility', descEn: 'Small height but highly athletic, fast reflexes, used in polo.', descHi: 'कम ऊंचाई परंतु अत्यंत फुर्तीला, तेज रफ्तार, खेलों और परेड हेतु उपयुक्त।' }
      ],
      milkingTipEn: 'Horse hoof health is the foundation of their life (No Hoof, No Horse). Clean mud from the hoof frog daily. Use hoof oil twice a week to prevent cracking. Shoeing (Naal Bandi) must be updated every 40-50 days by an expert blacksmith.',
      milkingTipHi: 'घोड़े के पैर और खुर ही उसका जीवन हैं (No Hoof, No Horse)। रोज खुर के अंदर के त्रिकोण (Frog) से गंदगी निकालें। खुरों को फटने से बचाने के लिए तेल लगाएं। कुशल लोहार से हर 40-50 दिन में नालबंदी (Shoeing) जरूर बदलवाएं।',
      heatIndicatorsEn: 'Horses require clean dust-free bedding (rice husk or wood shavings). Straw bedding can cause mold inhalation leading to severe asthma/heaves. Stable ventilation must be natural.',
      heatIndicatorsHi: 'घोड़ों के अस्तबल में धूल-रहित बिछावन (लकड़ी का बुरादा या धान की भूसी) का प्रयोग करें। फफूंदयुक्त पुआल सूंघने से घोड़े को सांस की बीमारी (Heaves) हो सकती है। हवा निकासी का उत्तम प्राकृतिक प्रबंध रखें।'
    }
  };

  const activeData = breedDetails[selectedAnimal];

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
      
      {/* Tab Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-emerald-100 pb-4 mb-6 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600 rounded-xl text-white shadow-md shadow-emerald-600/15">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-emerald-950">
              {language === 'en' ? 'Pashupalan Breed & Management Guides' : 'पशु नस्ल एवं वैज्ञानिक प्रबंधन गाइड'}
            </h2>
            <p className="text-xs text-emerald-800 font-sans mt-0.5">
              {language === 'en' ? 'In-depth breed selection, milking science, and heat indicators' : 'बिहार के किसानों के लिए पशु चयन, दूध दुहने की सही विधि एवं उत्तम नस्ल ज्ञान'}
            </p>
          </div>
        </div>

        {/* Animal Selector Cards */}
        <div className="flex gap-2 shrink-0">
          {animals.map((item) => {
            const IsSelected = selectedAnimal === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedAnimal(item.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                  IsSelected
                    ? 'bg-emerald-950 text-white border-emerald-950 scale-102 shadow-sm'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden sm:inline">{language === 'en' ? item.en.split(' ')[0] : item.hi.split(' ')[0]}</span>
                <span className="sm:hidden">{language === 'en' ? item.en.split(' ')[0] : item.hi.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Breed Showcase Section */}
      <div className="space-y-6">
        
        <div>
          <h3 className="text-xs font-black tracking-wider text-emerald-800 uppercase flex items-center gap-1.5 mb-4">
            <Compass className="h-4 w-4" />
            {language === 'en' ? `Top Breeds for Bihar Farms` : 'बिहार के लिए सर्वश्रेष्ठ संकर एवं देशी नस्लें'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeData.breeds.map((breed, index) => (
              <div key={index} className="bg-gradient-to-br from-stone-50 to-stone-100/50 rounded-xl p-4 border border-stone-200/60 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full -mr-4 -mt-4" />
                
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm text-stone-900">
                      {language === 'en' ? breed.nameEn : breed.nameHi}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9.5px] rounded-full font-bold">
                      {breed.origin}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans mt-1">
                    {language === 'en' ? breed.descEn : breed.descHi}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/50 grid grid-cols-2 gap-2 text-[10.5px]">
                  <div className="bg-white rounded p-1.5 border border-stone-200/40 text-center">
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">
                      {selectedAnimal === 'horse' ? 'Focus' : 'Avg Fat %'}
                    </span>
                    <span className="font-bold text-stone-800 font-mono">
                      {breed.fat}
                    </span>
                  </div>
                  <div className="bg-white rounded p-1.5 border border-stone-200/40 text-center">
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">
                      {selectedAnimal === 'horse' ? 'Purpose' : 'Milking Yield'}
                    </span>
                    <span className="font-bold text-stone-800 font-mono">
                      {breed.yield}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milking Science and Heat Signs Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Milking Science Card */}
          <div className="p-5 bg-gradient-to-r from-emerald-50/70 to-emerald-50/10 rounded-2xl border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                <h4 className="text-sm font-bold text-emerald-950">
                  {selectedAnimal === 'horse' ? (language === 'en' ? 'Hoof & Orthopedic Safety' : 'खुर एवं पैरों की सुरक्षा') : (language === 'en' ? 'Professional Milking Science' : 'दुग्ध दोहन का विज्ञान')}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                {language === 'en' ? activeData.milkingTipEn : activeData.milkingTipHi}
              </p>
            </div>
            
            <div className="mt-4 p-3 bg-emerald-900 text-emerald-100 rounded-xl text-[10.5px] leading-relaxed">
              <span className="font-bold text-emerald-300 block mb-0.5">
                {language === 'en' ? 'Veterinary Tip:' : 'पशु चिकित्सक सलाह:'}
              </span>
              {selectedAnimal === 'horse'
                ? (language === 'en' ? 'Apply eucalyptus oil mix to the horse hoof sole weekly to preserve water resistance.' : 'खुर के निचले हिस्से में हफ्ते में एक बार नीलगिरी का तेल लगाएं ताकि सीलन अंदर न जाए।')
                : (language === 'en' ? 'Complete milking in exactly 7 minutes. After 7 minutes, oxytocin hormone drops and animal holds back remaining milk.' : 'पशु का दूध सदैव ७ मिनट के भीतर निकाल लें। ७ मिनट के बाद ऑक्सीटोसिन हार्मोन का प्रभाव कम होने लगता है और थन सिकुड़ जाते हैं।')}
            </div>
          </div>

          {/* Breeding heat indicators */}
          <div className="p-5 bg-stone-900 text-white rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Eye className="h-5 w-5 text-emerald-400 shrink-0" />
                <h4 className="text-sm font-bold text-emerald-300">
                  {selectedAnimal === 'horse' ? (language === 'en' ? 'Grooming & Bedding Standards' : 'ग्रूमिंग एवं बिछावन की विधि') : (language === 'en' ? 'Critical Heat & Breeding Indicators' : 'गर्भाधान एवं गर्मी (Heat) की पहचान')}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                {language === 'en' ? activeData.heatIndicatorsEn : activeData.heatIndicatorsHi}
              </p>
            </div>

            <div className="mt-4 p-3 bg-stone-800 rounded-xl text-[10.5px] border border-stone-700 flex items-start gap-2 text-stone-200">
              <Sparkles className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
              <span className="font-sans leading-relaxed">
                {selectedAnimal === 'horse'
                  ? (language === 'en' ? 'Brushing skin daily removes dead hair and releases healthy natural oils for coat gloss.' : 'रोजाना कंघी करने से मृत बाल निकलते हैं और त्वचा में प्राकृतिक तेलों का स्राव होता है जिससे घोड़े के बाल चमकते हैं।')
                  : (language === 'en' ? 'Record date of heat carefully. The reproduction cycle repeats precisely every 21 days.' : 'गर्मी में आने की तारीख कैलेंडर पर नोट करें। पशु ठीक 21 दिन बाद पुनः गरम होता है।')}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
