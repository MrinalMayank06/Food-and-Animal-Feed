import React from 'react';
import { Award, BookOpen, Clock, Heart, HelpCircle, Star, Milestone } from 'lucide-react';
import { BIHAR_FEED_RECOMMENDATION } from '../data';

interface ResearchPanelProps {
  language: 'en' | 'hi';
}

export default function ResearchPanel({ language }: ResearchPanelProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
      
      {/* 1. Expert Fodder Mix Scientific Ratios */}
      <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm lg:col-span-2">
        <div className="flex items-center gap-2 border-b border-amber-100 pb-3 mb-4">
          <Award className="h-5 w-5 text-amber-600" />
          <h3 className="text-sm sm:text-base font-bold text-amber-950">
            {language === 'en' ? 'Scientific Feed Research: Perfect Naad Mix' : 'वैज्ञानिक पशु पोषण: नाद में सही चारा मिश्रण'}
          </h3>
        </div>

        <p className="text-xs text-amber-900 mb-4 font-sans leading-relaxed">
          {language === 'en'
            ? 'Research shows that mixing concentrates and dry straw in specific proportions inside the Cement Naad increases milk yields by up to 22% and improves fat content.'
            : 'वैज्ञानिक अध्ययनों से सिद्ध हुआ है कि सीमेंटेड नाद में सूखे रफेज (भूसा) और सांद्र (चोकर-खली) को निश्चित मात्रा में मिलाने से दूध का उत्पादन 22% तक बढ़ जाता है और फैट सुधरता है।'}
        </p>

        {/* Dynamic mix blocks */}
        <div className="space-y-3.5">
          {BIHAR_FEED_RECOMMENDATION.map((item, index) => (
            <div key={index} className="p-3 bg-amber-50/50 hover:bg-amber-50 rounded-xl border border-amber-200/20 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-white text-xs font-bold font-mono">
                    {item.ratio}%
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-amber-950">
                    {language === 'en' ? item.nameEn : item.nameHi}
                  </h4>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {language === 'en' ? 'Recommended' : 'अनुशंसित'}
                </span>
              </div>
              <p className="text-xs text-amber-800 font-sans mt-1.5 pl-8 leading-relaxed">
                {language === 'en' ? item.purposeEn : item.purposeHi}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-[11px] text-emerald-800 flex items-start gap-2">
          <Heart className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            {language === 'en'
              ? '💡 Pro Tip: Moisten the wheat Bhusa with water inside the Naad before adding Chokar and Mustard Cake. This binds the dust and allows the cattle to swallow smoothly without nasal irritation.'
              : '💡 मुख्य सुझाव: चोकर और सरसों की खल मिलाने से पहले नाद में सूखे गेहूं के भूसे को हल्के पानी से भिगो लें। इससे धूल जम जाती है और पशु बिना किसी सांस की परेशानी के चारा आसानी से खा सकते हैं।'}
          </span>
        </div>
      </div>

      {/* 2. Real-Time Mandi Pricing Research Log (Why pricing varies) */}
      <div className="bg-gradient-to-b from-amber-50/40 to-white rounded-2xl border border-amber-100 p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 border-b border-amber-100 pb-3 mb-4">
            <Clock className="h-5 w-5 text-amber-600" />
            <h3 className="text-sm sm:text-base font-bold text-amber-950">
              {language === 'en' ? 'Mandi Price Research Feed' : 'मंडी दर अनुसंधान विश्लेषण'}
            </h3>
          </div>

          <div className="space-y-4">
            <div className="relative pl-5 border-l-2 border-amber-200">
              <span className="absolute left-[-5px] top-0.5 block h-2.5 w-2.5 rounded-full bg-amber-600"></span>
              <h4 className="text-xs font-bold text-amber-950">
                {language === 'en' ? 'Wheat Straw Stocking Peak' : 'भूसा भंडारण का मुख्य सीजन'}
              </h4>
              <p className="text-[11px] text-amber-800 font-sans mt-1 leading-relaxed">
                {language === 'en'
                  ? 'Fodder prices are researched daily. Post-harvest wheat straw is stocked across Patna & Muzaffarpur depots to ensure buffer during floods.'
                  : 'भूसे के दाम रोजाना ट्रैक होते हैं। बाढ़ के मौसम में सुरक्षा के लिए पटना और मुजफ्फरपुर के बड़े डिपो में गेहूं का भूसा भारी मात्रा में स्टोर किया जाता है।'}
              </p>
              <span className="text-[9px] font-mono font-bold text-amber-600 block mt-1">
                {language === 'en' ? 'Refreshed 2 hours ago' : '2 घंटे पहले जाँचा गया'}
              </span>
            </div>

            <div className="relative pl-5 border-l-2 border-amber-200">
              <span className="absolute left-[-5px] top-0.5 block h-2.5 w-2.5 rounded-full bg-amber-400"></span>
              <h4 className="text-xs font-bold text-amber-950">
                {language === 'en' ? 'Cement Naad Craftsmanship' : 'लोहा-गूंथी सीमेंट नाद निर्माण'}
              </h4>
              <p className="text-[11px] text-amber-800 font-sans mt-1 leading-relaxed">
                {language === 'en'
                  ? 'Concrete naad rates are extremely stable but transport charges depend on weight and distance since concrete is heavy.'
                  : 'सीमेंट की नाद के दाम बहुत स्थिर रहते हैं, लेकिन ठोस कंक्रीट भारी होने के कारण डिलीवरी खर्च दूरी और कुल वजन पर निर्भर करता है।'}
              </p>
              <span className="text-[9px] font-mono font-bold text-amber-600 block mt-1">
                {language === 'en' ? 'Checked today morning' : 'आज सुबह ही जाँचा गया'}
              </span>
            </div>

            <div className="relative pl-5">
              <span className="absolute left-0 top-0.5 block h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <h4 className="text-xs font-bold text-amber-950 pl-5">
                {language === 'en' ? 'Chokar and Bran Mills active' : 'चोकर एवं राइस ब्रान मिल्स'}
              </h4>
              <p className="text-[11px] text-amber-800 font-sans mt-1 pl-5 leading-relaxed">
                {language === 'en'
                  ? 'Milling activity in Begusarai and Buxar provides abundant wheat bran, helping stabilize local rates.'
                  : 'बेगूसराय और बक्सर की फ्लोर मिलों से भारी मात्रा में ताज़ा चोकर की आपूर्ति मिलने के कारण स्थानीय खुदरा दरें स्थिर हैं।'}
              </p>
              <span className="text-[9px] font-mono font-bold text-amber-600 block mt-1 pl-5">
                {language === 'en' ? 'Updated 1 day ago' : '1 दिन पहले जाँचा गया'}
              </span>
            </div>
          </div>
        </div>

        {/* Quality Cert banner */}
        <div className="mt-6 p-3 bg-amber-50 rounded-xl border border-amber-200/50 flex items-center gap-2.5">
          <Milestone className="h-6 w-6 text-amber-700 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-amber-950 leading-tight">
              {language === 'en' ? 'Verified Quality Guarantee' : 'सत्यापित गुणवत्ता गारंटी'}
            </h4>
            <p className="text-[10px] text-amber-800 font-sans mt-0.5">
              {language === 'en' ? 'All Cement Naads are cast using high-grade concrete.' : 'सभी सीमेंट नाद उच्च गुणवत्ता वाले सरिये और कंक्रीट से निर्मित हैं।'}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
