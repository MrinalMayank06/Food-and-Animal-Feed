import React, { useState } from 'react';
import { 
  Sun, 
  Snowflake, 
  CloudRain, 
  ShieldAlert, 
  Heart, 
  Calendar, 
  Sparkles, 
  Utensils, 
  Droplet, 
  Shirt, 
  Paintbrush 
} from 'lucide-react';

interface SeasonalFeedingProps {
  language: 'en' | 'hi';
}

export default function SeasonalFeeding({ language }: SeasonalFeedingProps) {
  const [activeSeason, setActiveSeason] = useState<'summer' | 'winter' | 'monsoon'>('summer');
  const [selectedAnimal, setSelectedAnimal] = useState<'cow' | 'buffalo' | 'horse'>('cow');
  const [activeCategory, setActiveCategory] = useState<'diet' | 'water' | 'clothing' | 'application'>('diet');

  const seasons = [
    { id: 'summer', en: 'Garmi / Summer Care', hi: 'गर्मी (तापमान 40°C+)', icon: Sun, color: 'text-amber-500 bg-amber-50 border-amber-200' },
    { id: 'winter', en: 'Thand / Winter Care', hi: 'ठंड / सर्दी (तापमान <10°C)', icon: Snowflake, color: 'text-sky-500 bg-sky-50 border-sky-200' },
    { id: 'monsoon', en: 'Barsat / Monsoon Care', hi: 'बरसात (उमस व संक्रमण)', icon: CloudRain, color: 'text-emerald-500 bg-emerald-50 border-emerald-200' },
  ];

  const animals = [
    { id: 'cow', en: 'Gaye (Cow)', hi: 'गाय' },
    { id: 'buffalo', en: 'Bhais (Buffalo)', hi: 'भैंस' },
    { id: 'horse', en: 'Ghoda (Horse)', hi: 'घोड़ा' },
  ];

  const categories = [
    { id: 'diet', en: 'Khana / Diet', hi: 'आहार व सानी', icon: Utensils },
    { id: 'water', en: 'Paani / Water', hi: 'पानी व पिलाने का नियम', icon: Droplet },
    { id: 'clothing', en: 'Kapda / Clothing', hi: 'कपड़ा, बोरा व शेड', icon: Shirt },
    { id: 'application', en: 'Kya Lagaye / Skin & Pest Care', hi: 'बाहरी लेप व छिड़काव', icon: Paintbrush },
  ];

  const seasonalGuidelines = {
    summer: {
      cow: {
        dietEn: 'Feed early morning (before 7 AM) & late evening (after 6 PM). Provide green grass (Napier, Sudan grass, Maize) and cold water with salt. Mix 30g mineral mixture and barley chokar inside the cement Naad to cool down digestion and maintain milk fat.',
        dietHi: 'सुबह 7 बजे से पहले और शाम 6 बजे के बाद ही चारा खिलाएं। हरा चारा (नेपियर, मक्का, सूडान घास) और नमक मिला ठंडा पानी प्रचुर मात्रा में दें। पाचन ठंडा रखने के लिए सीमेंट की नाद में 30 ग्राम मिनरल मिक्सचर और जौ का चोकर मिलाएं ताकि दूध का फैट बना रहे।',
        waterEn: 'Provide fresh, cool water 4 to 5 times daily (ideal temperature 15-20°C). Mix 50g common salt and 20g baking soda in the water to prevent dehydration. Ensure water troughs are kept in a fully shaded area.',
        waterHi: 'दिन में कम से कम 4-5 बार ताजा व ठंडा पानी (तापमान 15-20°C) पिलाएं। पानी में 50 ग्राम साधारण नमक और 20 ग्राम मीठा सोडा घोलें ताकि डिहाइड्रेशन (पानी की कमी) न हो। पीने के पानी की नाद पूरी तरह छायादार जगह पर रखें।',
        clothingEn: 'Keep the cow bare-bodied during the day. Hang thick wet jute gunny bags (Patua Bora) on the doors and windows of the shed. Sprinkle cool water on these bags regularly to create a natural desert cooler effect.',
        clothingHi: 'पशु के शरीर पर गर्मी में कोई कपड़ा न ढकें। शेड के दरवाजों और खिड़कियों पर जूट के गीले बोरे (टाट) लटकाएं और उन पर पानी का छिड़काव करें ताकि शेड के अंदर प्राकृतिक ठंडी हवा मिले (कूलर जैसी ठंडक)।',
        applicationEn: 'Mix pure mustard oil with crushed camphor (kapoor) and rub it on their forehead, hump, and under-neck to cool down. Spray boiled neem water on the skin twice a week to keep blood-sucking flies, ticks, and lice away.',
        applicationHi: 'पशु के माथे, कूबड़ और गलकंबल पर सरसों का तेल कपूर मिलाकर मालिश करें, यह शरीर को ठंडा करता है। मक्खियों, जूं और चिचड़ी (Ticks) को दूर रखने के लिए सप्ताह में दो बार नीम के पत्तों का उबला पानी ठंडा करके पूरे बदन पर स्प्रे करें।',
        dietChart: [
          { itemEn: 'Green Fodder (Napier/Maize)', itemHi: 'हरा चारा (नेपियर/मक्का)', qty: '25-30 kg' },
          { itemEn: 'Wheat Straw (Bhusa)', itemHi: 'गेहूं का सूखा भूसा', qty: '4-5 kg' },
          { itemEn: 'Barley Chokar & Mustard Khali', itemHi: 'जौ चोकर + सरसों खली', qty: '3-4 kg' },
          { itemEn: 'Dehydration Salt & Mineral Powder', itemHi: 'नमक + मिनरल मिक्स', qty: '50g each' }
        ]
      },
      buffalo: {
        dietEn: 'Buffaloes absorb more heat due to black skin. Feed high-moisture green fodder like hybrid Napier or Sorghum. Soak cottonseed cake (Binaula Khali) in cool water before feeding, as it is naturally cooling and rich in fat energy.',
        dietHi: 'भैंस की त्वचा काली होने के कारण धूप अधिक सोखती है। नमी से भरपूर हरा चारा (नेपियर या ज्वार) दें। बिनौला की खल को ठंडे पानी में अच्छी तरह भिगोकर खिलाएं जो गर्मी में प्राकृतिक फैट बढ़ाने और ठंडक देने का बेहतरीन स्रोत है।',
        waterEn: 'Buffaloes need 120-150 liters of water. Bathe them in local ponds or spray cool water on them for 30 minutes during peak noon. Add rock salt (séndha namak) and mint juice (pudina) to their drinking water to soothe digestion.',
        waterHi: 'भैंस को रोजाना 120-150 लीटर पानी की जरूरत होती है। दोपहर में कम से कम 30 मिनट के लिए तालाब में नहलाएं या फव्वारे से ठंडी बौछारें दें। पीने के पानी में थोड़ा सेंधा नमक और पुदीने का रस मिलाकर पिलाएं जो पाचन को ठीक रखता है।',
        clothingEn: 'Do not put any blankets. Cover the shed ceiling or asbestos sheets with a 6-inch layer of dry straw (Khar-Buns) and sprinkle water on it twice a day. This reduces roof heat transfer by up to 5°C.',
        clothingHi: 'भैंस को बिल्कुल खुला रखें। सीमेंट या एस्बेस्टस की गर्म होने वाली छत के ऊपर सूखी घास या पुआल की मोटी परत (छप्पर) बिछाएं और दोपहर में पानी छिड़कें। इससे शेड का तापमान 5°C तक कम हो जाता है।',
        applicationEn: 'Apply a thin layer of clean river clay or wet silt on their body; it acts as a natural sunscreen and shields against stinging horseflies. Rub coconut oil mixed with neem oil around the tail and ears.',
        applicationHi: 'शरीर पर नदी की साफ गीली मिट्टी (चिकनी मिट्टी) का पतला लेप लगाएं। यह धूप से बचाता है और मक्खियों के काटने से रक्षा करता है। पूंछ और कानों के पास नारियल तेल व नीम का तेल मिलाकर लगाएं ताकि खुजली न हो।',
        dietChart: [
          { itemEn: 'Green Sorghum/Maize', itemHi: 'ज्वार या हरा मक्का', qty: '30-35 kg' },
          { itemEn: 'Wheat Straw (Bhusa)', itemHi: 'सूखा गेहूं भूसा', qty: '5-6 kg' },
          { itemEn: 'Soaked Cottonseed Cake (Binaula)', itemHi: 'भीगी बिनौला खल', qty: '4 kg' },
          { itemEn: 'Fresh Cool Water Intake', itemHi: 'पीने का ठंडा पानी', qty: '120-150 Liters' }
        ]
      },
      horse: {
        dietEn: 'Horses sweat profusely in summers. Feed barley husk (Jau chokar), soaked black gram, and bran mash. Avoid hot-nature feeds like mustard oil cake or excess millet. Add fresh sweet durva/dub grass.',
        dietHi: 'गर्मियों में घोड़ों को भारी पसीना आता है। जौ का चोकर, रात भर भीगा हुआ काला चना और चोकर की ठंडी लेई (Mash) खिलाएं। गर्म तासीर वाली सरसों की खली, बाजरा या गरम अनाज न दें। हरी कोमल दूब घास पर्याप्त खिलाएं।',
        waterEn: 'Provide fresh clean tap water immediately after they dry up from work. Never give icy cold water to a hot, sweating horse. Add glucose, electrolytes, or a pinch of pink salt to recover lost sweat minerals.',
        waterHi: 'काम से लौटने के बाद जब पसीना पूरी तरह सूख जाए, तब कुएं या नल का ताजा पानी दें। हांफते व गर्म घोड़े को तुरंत बर्फीला पानी न दें। पसीने से निकले नमक की भरपाई के लिए पानी में ग्लूकोज या थोड़ा सेंधा नमक अवश्य मिलाएं।',
        clothingEn: 'Keep the horse bare during the day. Use a highly breathable, loose-fit cotton fly sheet (Malmal sheet) at night only if the stable has heavy mosquito and stable fly infestation.',
        clothingHi: 'दिन में शरीर को खाली रखें। अगर रात में मच्छर-मक्खी बहुत अधिक काटते हों, तो बहुत हल्का और हवादार सूती (मलमल का कपड़ा) का झूल (कवर) ही ओढ़ाएं ताकि हवा पार होती रहे।',
        applicationEn: 'Sponge their coat with water mixed with a small cup of vinegar and lemon juice after work to remove dried salt sweat and relax muscles. Apply citronella or lemon grass oil to repel stable flies.',
        applicationHi: 'काम के बाद बदन पर जमे नमकीन पसीने को साफ करने और मांसपेशियों को राहत देने के लिए पानी में थोड़ा सिरका और नींबू का रस मिलाकर स्पंज (पोछा) करें। मक्खियों से बचाने के लिए सिट्रोनेला तेल या नींबू घास का तेल लगाएं।',
        dietChart: [
          { itemEn: 'Soaked Black Gram (Chana)', itemHi: 'भीगा हुआ काला चना', qty: '2-3 kg' },
          { itemEn: 'Barley Chokar & Bran Mash', itemHi: 'जौ का चोकर व चोकर मेश', qty: '2.5 kg' },
          { itemEn: 'Fresh Green Grass (Durva/Dub)', itemHi: 'हरी मुलायम दूब घास', qty: '10 kg' },
          { itemEn: 'Rock Salt Block (Lahori Namak)', itemHi: 'सेंधा नमक की डली (चाटने को)', qty: 'Ad-libitum' }
        ]
      }
    },
    winter: {
      cow: {
        dietEn: 'Feed energy-dense grains like crushed corn or barley porridge. Mix boiled cottonseed or warm mustard cake (Sarso Khali). Provide 150g jaggery (Gur) and 20g dry ginger powder (Sonth) daily to keep body temperature warm.',
        dietHi: 'ऊर्जा से भरपूर अनाज (मक्का या जौ का दलिया) पकाकर खिलाएं। सरसों की खली गर्म तासीर प्रदान करती है। रोज शाम को 150 ग्राम पुराना गुड़ और 20 ग्राम सोंठ पाउडर मिलाकर दें ताकि पशु को अंदरूनी सर्दी से सुरक्षा मिले।',
        waterEn: 'Never give ice-cold water in the morning. Provide warm lukewarm water (approx 25-30°C). Warm water encourages cows to drink sufficient amounts, maintaining milk yield and preventing digestion blocks.',
        waterHi: 'सुबह-सुबह अत्यधिक ठंडा या बर्तनों में रात भर रखा पानी बिल्कुल न दें। हल्का गुनगुना पानी (25-30°C) पिलाएं। गुनगुना पानी पीने से पशु पर्याप्त मात्रा में पानी पीता है जिससे दूध का उत्पादन बना रहता है और अकड़न नहीं होती।',
        clothingEn: 'Wrap the cow with a dry jute sack blanket (Bore ki Jhool) secured around the chest. Lay a 4 to 6-inch thick bedding of dry straw or rice husk on the floor to block cold ground drafts.',
        clothingHi: 'जूट के साफ सूखे बोरे को सिली हुई मोटी "झूल" (कंबल) पशु की पीठ और छाती पर अच्छे से बांधें। फर्श की कड़ाके की ठंडक से बचाने के लिए नीचे 4 से 6 इंच मोटा धान का पुआल या सूखी घास का मुलायम बिस्तर बिछाएं।',
        applicationEn: 'Massage the spine, legs, and udder with warm mustard oil mixed with garlic cloves twice a week. This stimulates blood circulation, prevents stiff legs, and protects udders from cracking.',
        applicationHi: 'हफ्ते में दो बार लहसुन पकाए हुए गुनगुने सरसों तेल से रीढ़ की हड्डी, जोड़ों और थनों की मालिश करें। इससे खून का दौरा बढ़ता है, पैरों की जकड़न ठीक होती है और थन फटने (Cracking) से बचते हैं।',
        dietChart: [
          { itemEn: 'Boiled Maize/Grains', itemHi: 'उबला हुआ मक्का/दलिया', qty: '3 kg' },
          { itemEn: 'Mustard Cake (Sarso Khali)', itemHi: 'सरसों की गरम खली', qty: '2 kg' },
          { itemEn: 'Dry Paddy Straw (Kutar/Bhusa)', itemHi: 'धान का पुआल / सूखा भूसा', qty: '8-10 kg' },
          { itemEn: 'Jaggery & Ginger Mix', itemHi: 'गुड़ व सोंठ का मिश्रण', qty: '150g' }
        ]
      },
      buffalo: {
        dietEn: 'Winter is peak milk fat production time. Feed high-quality mustard oil cake and chokar cooked in warm water. Mix calcium and mineral powders. Offer dry wheat straw (Bhusa) alongside green Berseem clover.',
        dietHi: 'ठंड का मौसम भैंस का मुख्य दूध काल है। पर्याप्त मात्रा में सरसों की खली, चोकर और पोषक तत्वों का गरम दलिया पकाकर दें। फैट बढ़ाने के लिए पर्याप्त सूखे भूसे के साथ हरा बरसीम चारा मिलाकर खिलाएं।',
        waterEn: 'Provide warm lukewarm water inside the barn. Do not let buffaloes enter freezing deep ponds in December and January; cold water wallowing causes severe pneumonia and a steep drop in milk fat.',
        waterHi: 'तबेले के अंदर ही गुनगुना पानी पीने को दें। दिसंबर-जनवरी की कड़ाके की ठंड में भैंस को गहरे तालाब या पोखर में नहाने न भेजें, इससे उन्हें न्यूमोनिया जकड़ लेता है और दूध का फैट अचानक गिर जाता है।',
        clothingEn: 'Cover buffaloes with double-layered jute sack blankets or canvas sheets at sunset. Install thick tarpaulin curtains on the western side of the shed to block the freezing Pachhua winds.',
        clothingHi: 'सूर्यास्त के समय मोटे कैनवास की झूल या डबल परत जूट के बोरे भैंस की पीठ पर बांधें। बर्फीली पछुआ हवाओं को रोकने के लिए शेड के खुले हिस्सों (विशेषकर पश्चिम दिशा) को मोटे प्लास्टिक तिरपाल या टाट के पर्दों से पैक करें।',
        applicationEn: 'Massage joints with warm sesame (til) oil or camphor oil to prevent stiffness. If the buffalo gets wet, dry the body immediately with dry straw bundles. Clean udders with lukewarm salt water before milking.',
        applicationHi: 'जोड़ों पर गुनगुना तिल का तेल या कपूर का तेल मालिश करें जिससे ठंड में अकड़न न हो। यदि भैंस भीग जाए तो तुरंत सूखी घास या बोरे से रगड़कर सुखाएं। थनों को हल्के गुनगुने पानी में नमक डालकर पोंछें।',
        dietChart: [
          { itemEn: 'Nutritious Chokar & Pashu Aahar', itemHi: 'संतुलित चोकर व पशुआहार', qty: '5 kg' },
          { itemEn: 'Dry Wheat Fodder (Bhusa)', itemHi: 'सूखा गेहूं भूसा (बारीक)', qty: '8 kg' },
          { itemEn: 'Green Berseem / Mustard Leaves', itemHi: 'हरा बरसीम या सरसों का साग', qty: '15-20 kg' },
          { itemEn: 'Boiled Mustard Oil (Weekly twice)', itemHi: 'गुनगुना सरसों तेल (सप्ताह में 2 बार)', qty: '100 ml' }
        ]
      },
      horse: {
        dietEn: 'Feed high-protein crushed oats (Jayi), soaked black gram, and linseed oil cake (Alsi Khali). Mix warm sweet jaggery (Gur) syrup into their morning feed to keep their energy high and body active.',
        dietHi: 'उच्च प्रोटीन युक्त कुचली हुई जई, भीगा हुआ चना और अलसी की खली खिलाएं। सुबह के चारे में गुनगुने गुड़ का सीरा मिलाकर खिलाएं जो शरीर में तुरंत गर्मी पैदा करता है और ठंड से बचाता है।',
        waterEn: 'Provide warm drinking water mixed with a pinch of salt to prevent cold colic (impaction). Never let horses drink overnight stagnant ice-cold water, which causes stomach cramps.',
        waterHi: 'गुनगुने पानी में थोड़ा नमक मिलाकर पिलाएं ताकि पेट का दर्द (Colic) व कब्ज न हो। बर्तनों या हौज में रात भर जमा हुआ बर्फीला पानी घोड़ों को कभी न पिलाएं, इससे पेट में मरोड़ होने लगती है।',
        clothingEn: 'Put on a windproof, woolen-lined canvas horse blanket (Jhool) at sunset. Keep the stable floor strictly dry with wood shavings or sawdust bedding to protect hooves from wet thrush.',
        clothingHi: 'शाम ढलते ही हवा-रोधी ऊनी या मोटे कैनवास की विशेष झूल पहनाएं। खुरों की सड़न (Thrush) रोकने के लिए जमीन पर सूखी लकड़ी का बुरादा बिछाएं ताकि पेशाब और नमी तुरंत सोख ली जाए।',
        applicationEn: 'Regularly perform dry grooming with a hard brush to stimulate natural coat oils. Massage legs and chest with warm eucalyptus or turpentine oil mixture to relieve muscle strains from cold shivering.',
        applicationHi: 'नियमित सूखा खरहरा (Brush) करें जिससे बदन का रक्त संचार बढ़े और प्राकृतिक चमक आए। कांपने से हुई मांसपेशियों की थकान दूर करने के लिए पैरों और छाती पर नीलगिरी व तारपीन के तेल की मालिश करें।',
        dietChart: [
          { itemEn: 'Crushed Oats (Jayi)', itemHi: 'कुचली हुई जई (दलिया)', qty: '3-4 kg' },
          { itemEn: 'Soaked Gram & Fenugreek (Methi)', itemHi: 'भीगा चना + मैथी दाना', qty: '2 kg' },
          { itemEn: 'Linseed Oil Cake (Alsi Khali)', itemHi: 'अलसी की पौष्टिक खली', qty: '1 kg' },
          { itemEn: 'Boiled Warm Water Intake', itemHi: 'गुनगुना पीने का पानी', qty: '40-50 Liters' }
        ]
      }
    },
    monsoon: {
      cow: {
        dietEn: 'Monsoon grass is lush but contains high moisture and larval parasites. Limit fresh grazing. Feed dry wheat straw and wheat bran (Chokar) to prevent bloating (Afara) and diarrhea.',
        dietHi: 'बरसात की हरी घास में नमी और पेट के कीड़े (परजीवी) अधिक होते हैं। सीधे चराई से बचाएं। पेट फूलना (आफ़रा) और दस्त रोकने के लिए सूखा गेहूं भूसा और सूखा चोकर मिलाकर दें।',
        waterEn: 'Provide clean tap or borewell water. Stagnant rainwater in puddles contains bacteria that cause deadly Hemorrhagic Septicemia (Galgoti). Add 10g calcium powder to water.',
        waterHi: 'चापाकल या बोरवेल का साफ ताजा पानी ही पिलाएं। गड्ढों या नालियों का जमा गंदा बारिश का पानी पीने से बचाएं, जिससे गलघोंटू (HS) बीमारी फैलती है। पानी में 10 ग्राम कैल्शियम मिलाएं।',
        clothingEn: 'Ensure high ventilation to disperse humidity. Install plastic tarpaulin sheets only during heavy blowing rain, and roll them up immediately after to prevent sweat rash and dampness.',
        clothingHi: 'शेड में उमस न बढ़ने दें। तेज मूसलाधार बौछार के समय ही प्लास्टिक के पर्दे लगाएं, बारिश थामते ही उन्हें ऊपर समेट दें ताकि अंदर गीलापन और सीलन से दाद न हो।',
        applicationEn: 'Apply thick turmeric and mustard oil paste on hooves to prevent hoof-rot. Light dry neem leaves and cow dung cake smoke daily inside the shed to repel heavy mosquitoes and flies.',
        applicationHi: 'खुरों में सड़न रोकने के लिए हल्दी और सरसों तेल का गाढ़ा लेप खुरों के बीच लगाएं। मच्छरों और मक्खियों से बचाने के लिए शेड में सूखी नीम की पत्ती और कंडे का धुआं अवश्य करें।',
        dietChart: [
          { itemEn: 'Clean Cut Berseem/Sorghum', itemHi: 'साफ कटा हुआ सूखा ज्वार/चारा', qty: '15 kg' },
          { itemEn: 'Wheat Bran (Dry Chokar)', itemHi: 'सूखा गेहूं चोकर', qty: '3 kg' },
          { itemEn: 'Mineral Mixture Powder', itemHi: 'पोषक मिनरल मिक्सर', qty: '60g' },
          { itemEn: 'Antiseptic Turmeric Powder', itemHi: 'हल्दी पाउडर (रोग प्रतिरोधक)', qty: '15-20g' }
        ]
      },
      buffalo: {
        dietEn: 'High humidity causes indigestion. Feed well-washed green grass alongside dry straw. Strictly avoid moldy or damp wheat bran. Mix 40g common salt and 30g mineral mixture.',
        dietHi: 'भारी उमस से पाचन क्रिया सुस्त होती है। अच्छी तरह धुले हुए हरे चारे के साथ सूखा भूसा मिलाकर दें। सीलन वाले या फफूंद लगे चोकर से बचाएं। चारे में 40 ग्राम नमक और 30 ग्राम मिनरल मिक्सर मिलाएं।',
        waterEn: 'Provide fresh well water. Prevent buffaloes from wallowing in highly contaminated muddy monsoon rain puddles to avoid severe udder infections (mastitis/thunaila).',
        waterHi: 'ताजा साफ पानी पीने को दें। बरसात में कीचड़युक्त गंदे गड्ढों या तालाबों में भैंसों को तैरने से रोकें, इससे थनैला (मस्टाइटिस) रोग का बैक्टीरिया थन में प्रवेश कर जाता है।',
        clothingEn: 'No rugs needed. Spread limestone powder (Chuna) or dry wood ash on the stable floor daily to absorb moisture, sanitize the floor, and keep it completely dry.',
        clothingHi: 'किसी कपड़े की आवश्यकता नहीं है। फर्श का गीलापन सोखने और मक्खी के अंडे नष्ट करने के लिए रोजाना चूना पाउडर या सूखी लकड़ी की राख का छिड़काव करें।',
        applicationEn: 'Spray home-made repellent (neem oil + camphor + little kerosene) on legs and belly to repel flies and ticks. Wash udders with light pink potassium permanganate solution before milking.',
        applicationHi: 'मक्खी-चिचड़ी भगाने के लिए पैरों व पेट पर नीम का तेल, कपूर और थोड़ा केरोसिन मिलाकर स्प्रे करें। दूध निकालने से पहले थनों को लाल दवा (पोटैशियम परमैंगनेट) के हल्के गुलाबी पानी से धोएं।',
        dietChart: [
          { itemEn: 'Dry Wheat Straw (Bhusa)', itemHi: 'सूखा गेहूं का भूसा', qty: '7-8 kg' },
          { itemEn: 'Boiled Grains + Chokar', itemHi: 'उबला दलिया + गेहूं चोकर', qty: '4 kg' },
          { itemEn: 'Liquid Calcium supplement', itemHi: 'लिक्विड कैल्शियम सिरप', qty: '100 ml' },
          { itemEn: 'Clean Well Water', itemHi: 'कुएं या चापाकल का साफ पानी', qty: '80-100 Liters' }
        ]
      },
      horse: {
        dietEn: 'High humidity in stables triggers severe colic (stomach ache). Feed thoroughly dry grass hay and clean oats. Avoid feeds exposed to dampness. Mix fenugreek seeds (Methi) in feed.',
        dietHi: 'गीलेपन और सीलन से घोड़ों में कोलिक (पेट का गंभीर दर्द) हो जाता है। बिल्कुल सूखी घास और साफ जई खिलाएं। सीलन वाले दानों से बचाएं। पाचन ठीक रखने को मुट्ठी भर मैथी दाना चारे में दें।',
        waterEn: 'Provide fresh clean water mixed with 10g baking soda once daily to neutralize gut acidity caused by damp weather. Never let horses drink from muddy rain runoff streams.',
        waterHi: 'पीने के पानी में दिन में एक बार 10 ग्राम मीठा सोडा घोलें ताकि उमस से होने वाली एसिडिटी न हो। बरसाती नालों या बहते हुए कीचड़ वाले पानी को घोड़ों को बिल्कुल न पीने दें।',
        clothingEn: 'Keep horses bare but ensure maximum ventilation. Install mosquito-proof fine mesh wire nets on windows and doors of the stable to block blood-sucking stable flies.',
        clothingHi: 'घोड़े को शेड में बिना कपड़े के रखें। भरपूर हवा आने-जाने दें। बड़ी मक्खियों और बरसाती कीड़ों को रोकने के लिए खिड़कियों पर महीन मच्छरदानी वाली जाली लगाएं।',
        applicationEn: 'Wash and pick hooves daily. Apply anti-fungal copper sulfate powder or pine tar inside the hoof cleft to prevent thrush. Sponge body with warm neem water to prevent sweet itch.',
        applicationHi: 'खुरों को रोज खोदकर साफ करें और अंदर तांबे का घोल (नीला थोथा) या कपूर का तेल लगाएं ताकि सड़न न हो। बरसात की खुजली (Sweet Itch) से बचाने को बदन पर गुनगुना नीम पानी पोंछें।',
        dietChart: [
          { itemEn: 'Dry Sweet Hay (Grass)', itemHi: 'सूखी मीठी दूब घास', qty: '6-8 kg' },
          { itemEn: 'Clean Dry Oats & Gram', itemHi: 'साफ सूखी जई और भीगा चना', qty: '3 kg' },
          { itemEn: 'Linseed oil (for digestion)', itemHi: 'अलसी का तेल (पेट साफ रखने को)', qty: '30 ml' },
          { itemEn: 'Baking Soda in water', itemHi: 'सोडा बाईकार्ब (एसिडिटी रोकने को)', qty: '10g' }
        ]
      }
    }
  };

  const activeData = seasonalGuidelines[activeSeason][selectedAnimal];
  const ActiveIcon = seasons.find((s) => s.id === activeSeason)?.icon || Sun;
  const CategoryIcon = categories.find((c) => c.id === activeCategory)?.icon || Utensils;

  // Get current text block depending on selected sub-tab
  const getCategoryText = () => {
    switch (activeCategory) {
      case 'diet':
        return language === 'en' ? activeData.dietEn : activeData.dietHi;
      case 'water':
        return language === 'en' ? activeData.waterEn : activeData.waterHi;
      case 'clothing':
        return language === 'en' ? activeData.clothingEn : activeData.clothingHi;
      case 'application':
        return language === 'en' ? activeData.applicationEn : activeData.applicationHi;
      default:
        return '';
    }
  };

  return (
    <div id="seasonal-feeding-portal" className="bg-white rounded-2xl border border-amber-100 p-6 shadow-sm">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-100 pb-4 mb-6 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-600 rounded-xl text-white shadow-md shadow-amber-600/15">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-amber-950">
              {language === 'en' ? 'Seasonal Feeding & Protective Care Portal' : 'ऋतु अनुसार पशु आहार एवं वैज्ञानिक सुरक्षा गाइड'}
            </h2>
            <p className="text-xs text-amber-800 font-sans mt-0.5">
              {language === 'en' 
                ? 'Expert diet, water, clothing, and external application guides for Bihar seasons' 
                : 'बिहार के मौसम के अनुसार आहार, पानी, कपड़ा-ओढ़न व बाहरी लेप की संपूर्ण वैज्ञानिक जानकारी'}
            </p>
          </div>
        </div>

        {/* Season selector pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
          {seasons.map((season) => {
            const IsSelected = activeSeason === season.id;
            const IconComponent = season.icon;
            return (
              <button
                key={season.id}
                id={`season-tab-${season.id}`}
                onClick={() => setActiveSeason(season.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  IsSelected 
                    ? 'bg-amber-950 text-white border-amber-950 scale-102 shadow-sm' 
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{language === 'en' ? season.en.split(' ')[0] : season.hi.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animal Selector row */}
      <div className="flex gap-2 mb-6 border-b border-amber-50 pb-3 overflow-x-auto no-scrollbar">
        {animals.map((animal) => {
          const IsSelected = selectedAnimal === animal.id;
          return (
            <button
              key={animal.id}
              id={`animal-tab-${animal.id}`}
              onClick={() => setSelectedAnimal(animal.id as any)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                IsSelected 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900'
              }`}
            >
              {language === 'en' ? animal.en : animal.hi}
            </button>
          );
        })}
      </div>

      {/* Content Area Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Category-wise Care Deep Dive Column (Col 2) */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Sub-tabs for Diet, Water, Clothing, Applications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-stone-50 p-1.5 rounded-xl border border-stone-200/60">
            {categories.map((cat) => {
              const IsActive = activeCategory === cat.id;
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.id}
                  id={`cat-tab-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`py-2.5 px-2 rounded-lg text-center flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                    IsActive 
                      ? 'bg-white text-amber-950 border border-stone-200 shadow-xs' 
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <IconComp className={`h-4 w-4 ${IsActive ? 'text-amber-600' : 'text-stone-400'}`} />
                  <span className="text-[10px] sm:text-xs leading-none">
                    {language === 'en' ? cat.en.split(' / ')[0] : cat.hi.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Content Card */}
          <div className="p-6 bg-gradient-to-r from-amber-50/45 to-amber-50/5 rounded-2xl border border-amber-100/60 shadow-xs min-h-[160px] flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-black tracking-wider text-amber-800 uppercase flex items-center gap-1.5 mb-3">
                <CategoryIcon className="h-4 w-4 text-amber-600" />
                <span>
                  {language === 'en' 
                    ? `${categories.find(c => c.id === activeCategory)?.en} Guideline` 
                    : `${categories.find(c => c.id === activeCategory)?.hi} नियम व वैज्ञानिक सलाह`}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-800 font-sans leading-relaxed whitespace-pre-line">
                {getCategoryText()}
              </p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-amber-100/40 text-[11px] text-amber-900 font-medium flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <span>
                {language === 'en' 
                  ? 'Expert Verified: This scientific treatment reduces seasonal stress by 35%.' 
                  : 'विशेषज्ञ सलाह: इस वैज्ञानिक देखरेख से मौसम का तनाव और थकावट 35% तक कम होती है।'}
              </span>
            </div>
          </div>

          {/* Seasonal Health Advisory Alert Banner */}
          <div className="p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl flex items-start gap-3 shadow-xs">
            <ShieldAlert className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold block">
                {language === 'en' ? 'Critical Season Health Advisory' : 'मौसम जनित आपातकालीन चेतावनी'}
              </span>
              <span className="font-sans mt-0.5 block leading-relaxed">
                {activeSeason === 'summer' && (
                  language === 'en' 
                    ? 'Caution: Watch for rapid panting, frothing, or tongue hanging out. This indicates severe Heat Stroke. Instantly sprinkle cool water on the animal\'s forehead, wipe the body, and move to a mud-cooled shaded barn.'
                    : 'चेतावनी: पशु का तेजी से हांफना, मुंह से फेन (झाग) निकालना या जीभ बाहर लटकाना लू की गंभीर चपेट के लक्षण हैं। तुरंत सिर पर ठंडा पानी छिड़कें, बदन पोंछें और मिट्टी से लिपे ठंडे हवादार शेड में ले जाएं।'
                )}
                {activeSeason === 'winter' && (
                  language === 'en'
                    ? 'Caution: Damp floors cause deadly Pneumonia and Mastitis. Avoid washing cows/buffaloes during freezing early mornings. Always warm up water before mixing feed.'
                    : 'चेतावनी: ठंडी और गीली फर्श से न्यूमोनिया और थनैला रोग का खतरा बहुत बढ़ जाता है। सुबह-सुबह ठंडे पानी से नहलाने से बचें। सानी (चारा मिश्रण) में गुनगुने पानी का ही प्रयोग करें।'
                )}
                {activeSeason === 'monsoon' && (
                  language === 'en'
                    ? 'Caution: High humidity spreads Galgoti (Hemorrhagic Septicemia) and Langdi (Black Quarter). Strictly sanitize muddy corners with dry lime powder. Burn dry neem leaves daily to repel vectors.'
                    : 'चेतावनी: बरसात में गलघोंटू और लंगड़ी बुखार का प्रकोप बहुत फैलता है। फर्श को सुखाने के लिए चूने का छिड़काव करें और मच्छरों-मक्खियों को दूर रखने के लिए सूखे नीम के पत्तों का धुआं नियमित करें।'
                )}
              </span>
            </div>
          </div>

        </div>

        {/* Diet Chart Table (Col 1) */}
        <div className="bg-amber-950 text-white rounded-2xl p-5 border border-amber-900 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-amber-900 pb-3 mb-4">
              <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
              <div>
                <h4 className="text-xs font-black tracking-wider text-amber-400 uppercase">
                  {language === 'en' ? 'Recommended Daily Feed Chart' : 'दैनिक अनुशंसित संतुलित राशन'}
                </h4>
                <p className="text-[10px] text-amber-200">
                  {language === 'en' ? 'Calculated per head/day' : 'प्रति पशु दैनिक खुराक (अनुमानित)'}
                </p>
              </div>
            </div>

            {/* Diet table items */}
            <div className="space-y-3">
              {activeData.dietChart.map((diet, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs py-2 border-b border-amber-900/40">
                  <span className="text-amber-100 font-medium">
                    {language === 'en' ? diet.itemEn : diet.itemHi}
                  </span>
                  <span className="font-bold text-amber-400 font-mono text-right shrink-0 pl-2">
                    {diet.qty}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3 bg-amber-900/40 rounded-xl border border-amber-800/60 text-[10.5px] text-amber-200/90 leading-relaxed font-sans">
            <Heart className="h-4 w-4 text-rose-400 inline-block mr-1 shrink-0 align-text-bottom" />
            {language === 'en' 
              ? 'Proper feeding in clean Cement Naads prevents wastage of expensive chokar & concentrates by up to 18%.' 
              : 'सीमेंट की चिकनी नाद में सानी खिलाने से महंगे चोकर और खल की बर्बादी 18% तक रुक जाती है और पोषक तत्व सुरक्षित रहते हैं।'}
          </div>

        </div>

      </div>

    </div>
  );
}
