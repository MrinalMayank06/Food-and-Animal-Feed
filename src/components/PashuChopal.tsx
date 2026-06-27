import React, { useState } from 'react';
import { MessageSquare, Search, Sparkles, Send, User, HelpCircle, CheckCircle } from 'lucide-react';

interface PashuChopalProps {
  language: 'en' | 'hi';
}

interface ForumPost {
  id: number;
  user: string;
  userTitleEn: string;
  userTitleHi: string;
  questionEn: string;
  questionHi: string;
  answerEn: string;
  answerHi: string;
  likes: number;
  category: string;
}

export default function PashuChopal({ language }: PashuChopalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: 1,
      user: 'Ramdev Yadav (Begusarai)',
      userTitleEn: 'Progressive Dairy Farmer',
      userTitleHi: 'प्रगतिशील डेयरी किसान',
      questionEn: 'How can I increase milk fat in my Murrah buffalo during summer?',
      questionHi: 'गर्मी के मौसम में अपनी मुर्रा भैंस के दूध का फैट कैसे बढ़ाएं?',
      answerEn: 'Feed soaked cotton-seed cake (Binaula) and avoid bathing immediately before milking. Keep dry wheat straw (Bhusa) constant in the diet to stimulate saliva which maintains acetic acid for high fat.',
      answerHi: 'बिनौले की खल को भिगोकर सानी में खिलाएं। दुहने से तुरंत पहले न नहलाएं। सूखे भूसे का अनुपात सानी में ३०% बनाए रखें ताकि लार बने, जो पेट में एसिटिक एसिड का निर्माण कर फैट बढ़ाता है।',
      likes: 42,
      category: 'Fat'
    },
    {
      id: 2,
      user: 'Shivesh Singh (Patna)',
      userTitleEn: 'Stud Farm Owner',
      userTitleHi: 'अश्वशाला संचालक',
      questionEn: 'My horse hooves are getting soft and smelly during monsoon. What to do?',
      questionHi: 'बरसात में घोड़े के खुर गीले और बदबूदार हो गए हैं, क्या करें?',
      answerEn: 'This is likely Thrush (bacterial infection). Clean the hoof frog daily. Wash with copper sulfate (Nila Thotha) 2% solution and keep the stable floor completely dry with rice husk bedding.',
      answerHi: 'यह थ्रश (Thrush) नामक खुर सड़न संक्रमण है। रोज खुर की गहराई (Frog) साफ करें। २% नीला थोथा (कॉपर सल्फेट) के पानी से धोएं और अस्तबल की फर्श पर सूखी धान की भूसी का बिछावन बिछाएं।',
      likes: 29,
      category: 'Horse'
    },
    {
      id: 3,
      user: 'Bindeshwar Mahto (Samastipur)',
      userTitleEn: 'Cattle Breeder',
      userTitleHi: 'पशुपालक',
      questionEn: 'My cow is repeating again and again after AI. How to solve this?',
      questionHi: 'मेरी गाय कृत्रिम गर्भाधान (AI) कराने के बाद भी रुक नहीं रही (बार-बार फिर रही है), क्या इलाज है?',
      answerEn: 'Ensure you do AI exactly 12-18 hours after first heat signs. Feed 50g high-quality mineral mixture containing Zinc and Copper daily. Consult a vet to check for silent uterine infections.',
      answerHi: 'गाय के गर्म (Heat) होने के ठीक १२-१८ घंटे बाद ही कृत्रिम गर्भाधान कराएं। रोजाना ५० ग्राम खनिज लवण (मिनरल मिक्सचर) दें जिसमें जिंक व तांबा हो। गर्भाशय में हल्के संक्रमण की जांच पशु चिकित्सक से कराएं।',
      likes: 56,
      category: 'Breeding'
    }
  ]);

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    // Simulate instant AI vet response
    let simulatedAnsEn = "Thank you for posting! Based on Bihar veterinary science: Keep the livestock well-shaded, check for tick infestations, feed rich mineral powder, and consult our nearest toll-free government hospital.";
    let simulatedAnsHi = "चौपाल पर पूछने के लिए धन्यवाद! आपकी समस्या का वैज्ञानिक समाधान: पशु को छांव में रखें, चिचड़ी (Ticks) की जांच करें, संतुलित मिनरल मिक्सर दें और नजदीकी राजकीय पशु चिकित्सालय से संपर्क करें।";

    if (customQuestion.toLowerCase().includes('fat') || customQuestion.includes('फैट') || customQuestion.includes('दूध')) {
      simulatedAnsEn = "To increase milk fat: Feed good quality dry paddy straw, limit excessive water inside the sani mix, and add 30g sodium bicarbonate (baking soda) daily to prevent stomach acidosis.";
      simulatedAnsHi = "फैट व दूध बढ़ाने के लिए: सानी में सूखे भूसे की मात्रा बढ़ाएं, पानी को सानी के साथ मिलाने के बजाय पीने के लिए अलग से दें, और रोजाना ३० ग्राम मीठा सोडा खिलाएं।";
    } else if (customQuestion.toLowerCase().includes('cough') || customQuestion.includes('सर्दी') || customQuestion.includes('बुखार')) {
      simulatedAnsEn = "For mild cough/fever: Give lukewarm water. Mix 10g ginger powder (Sonth), 5g black pepper, and 50g jaggery. Boil and give as a warm decoction (Kaadha) twice daily.";
      simulatedAnsHi = "हल्की सर्दी/बुखार में: गुनगुना पानी पिलाएं। १० ग्राम सोंठ, ५ ग्राम काली मिर्च और ५० ग्राम पुराना गुड़ मिलाकर काढ़ा बनाएं और दिन में दो बार गुनगुना ही पिलाएं।";
    }

    setCustomAnswer(language === 'en' ? simulatedAnsEn : simulatedAnsHi);

    const newPost: ForumPost = {
      id: posts.length + 1,
      user: language === 'en' ? 'You (Pashupalak)' : 'आप (पशुपालक)',
      userTitleEn: 'Active Member',
      userTitleHi: 'सक्रिय चौपाल सदस्य',
      questionEn: customQuestion,
      questionHi: customQuestion,
      answerEn: simulatedAnsEn,
      answerHi: simulatedAnsHi,
      likes: 1,
      category: 'General'
    };

    setPosts([newPost, ...posts]);
    setCustomQuestion('');
  };

  const filteredPosts = posts.filter(post => {
    const q = searchQuery.toLowerCase();
    return (
      post.questionEn.toLowerCase().includes(q) ||
      post.questionHi.toLowerCase().includes(q) ||
      post.answerEn.toLowerCase().includes(q) ||
      post.answerHi.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-emerald-100 pb-4 mb-6 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600 rounded-xl text-white shadow-md shadow-emerald-600/15">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-emerald-950">
              {language === 'en' ? 'Pashu Chopal - Livestock Q&A Forum' : 'पशुपालक चौपाल - वैज्ञानिक प्रश्नोत्तरी मंच'}
            </h2>
            <p className="text-xs text-emerald-800 font-sans mt-0.5">
              {language === 'en' ? 'Ask livestock questions and get immediate verified veterinary answers' : 'बिहार के अनुभवी पशुपालकों व डॉक्टरों से सीखें, अपनी शंकाएं पूछें और समाधान पाएं'}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative shrink-0 w-full sm:w-64">
          <input
            type="text"
            placeholder={language === 'en' ? 'Search questions...' : 'प्रश्न खोजें...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-600 font-sans text-stone-800"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Ask Question Box */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-50/20 rounded-2xl p-5 border border-emerald-100">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-emerald-600 animate-pulse" />
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800">
                {language === 'en' ? 'Ask Our AI Vet Expert' : 'डॉक्टर से सवाल पूछें'}
              </h3>
            </div>

            <form onSubmit={handlePostQuestion} className="space-y-3">
              <textarea
                placeholder={language === 'en' ? "Example: How to protect cow from heat stroke? Or how to increase milk fat..." : "जैसे: भैंस का दूध और फैट कैसे बढ़ाएं? या घोड़े के पेट दर्द का इलाज..."}
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                rows={4}
                className="w-full p-3 text-xs sm:text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-600 font-sans text-stone-800 shadow-inner"
              />
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/10"
              >
                <Send className="h-3.5 w-3.5" />
                {language === 'en' ? 'Post to Chopal Forum' : 'चौपाल पर सवाल भेजें'}
              </button>
            </form>

            {customAnswer && (
              <div className="mt-4 p-3.5 bg-white rounded-xl border border-emerald-100 text-[11px] leading-relaxed text-stone-700 font-sans shadow-sm">
                <span className="font-bold text-emerald-800 flex items-center gap-1 mb-1">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                  {language === 'en' ? 'Instant Expert Answer:' : 'त्वरित विशेषज्ञ उत्तर:'}
                </span>
                {customAnswer}
              </div>
            )}
          </div>

          {/* Guidelines */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-600">
            <h4 className="text-xs font-bold text-stone-800 flex items-center gap-1 mb-1">
              <HelpCircle className="h-4 w-4 text-emerald-600" />
              {language === 'en' ? 'Chopal Rules' : 'चौपाल नियम निर्देश'}
            </h4>
            <p className="text-[10.5px] leading-relaxed font-sans">
              {language === 'en'
                ? 'Keep questions focused on cattle, buffaloes, and horse health, feeding, and Bihar Mandi rates. Avoid non-farm discussions.'
                : 'सभी सवाल पशुओं के स्वास्थ्य, सानी-चारा और मंडी भाव से जुड़े ही पूछें। अभद्र भाषा का प्रयोग न करें।'}
            </p>
          </div>
        </div>

        {/* Existing Forum List */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-xs font-black uppercase text-stone-500 tracking-wider">
            {language === 'en' ? 'Recent Chopal Discussions' : 'सक्रिय चौपाल चर्चाएं'}
          </h3>

          <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1 no-scrollbar">
            {filteredPosts.map((post) => (
              <div key={post.id} className="p-4 bg-white rounded-xl border border-stone-200/60 shadow-sm space-y-3">
                {/* Author Info */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-stone-100 rounded-full text-stone-600">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-stone-900 block leading-none">
                        {post.user}
                      </span>
                      <span className="text-[9px] text-stone-400 font-sans">
                        {language === 'en' ? post.userTitleEn : post.userTitleHi}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9.5px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    {post.category}
                  </span>
                </div>

                {/* Question */}
                <div className="bg-stone-50 rounded-lg p-3 border border-stone-100">
                  <span className="text-stone-900 font-bold text-xs sm:text-sm block">
                    Q: {language === 'en' ? post.questionEn : post.questionHi}
                  </span>
                </div>

                {/* Answer */}
                <div className="text-stone-700 text-xs font-sans leading-relaxed pl-2 border-l-2 border-emerald-500">
                  <span className="font-bold text-emerald-800 block text-[10px] uppercase tracking-wider mb-0.5">
                    {language === 'en' ? 'Veterinary Answer' : 'डॉक्टर का वैज्ञानिक उत्तर'}
                  </span>
                  {language === 'en' ? post.answerEn : post.answerHi}
                </div>

                {/* Likes action */}
                <div className="flex justify-between items-center text-[10px] text-stone-400 font-sans pt-1 border-t border-stone-50">
                  <span>{language === 'en' ? 'Verified Expert Approved' : 'पशु चिकित्सक द्वारा प्रमाणित'}</span>
                  <button className="flex items-center gap-1 hover:text-rose-600 cursor-pointer">
                    <span>❤️</span>
                    <span>{post.likes} {language === 'en' ? 'Likes' : 'पसंद'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
