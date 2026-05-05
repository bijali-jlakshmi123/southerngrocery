
const axios = require('axios');
const consumerKey = 'ck_1a60b11d9b356f93a64d72272e98dddb21e99165';
const consumerSecret = 'cs_c5ed0b12182942d75f389c3714fcf3ff0e8c64fe';
const baseUrl = 'https://srv1565389.hstgr.cloud/wp-json/wc/v3';

async function generateMapping() {
    try {
        const response = await axios.get(baseUrl + '/products/categories', {
            params: {
                consumer_key: consumerKey,
                consumer_secret: consumerSecret,
                per_page: 100
            }
        });
        const categories = response.data;
        
        const mainCategories = {
            "rice-and-rice-products": ["RICE", "KAIMA", "PONNI", "MASOORI", "BASMATI", "AVAL", "PUTTU", "IDLY", "PACHARI", "RICES", "IDIYAPPOM", "PALADA"],
            "atta-flour-grains": ["ATTA", "AATTA", "POWDER", "WHEAT", "MAIDA", "RAGI", "GRAM", "PILLSBURY", "AASHIRVAD", "SEMOLINA", "RAVA"],
            "pulses-and-lentils": ["PULSES", "UZHUNNU", "CHERUPAYAR", "VANPAYAR", "MUTHIRA", "PARIPPU", "KADALA", "MOONG", "PEAS", "DAL", "LENTIL", "PIGEON"],
            "oil-and-ghee": ["OIL", "GHEE", "SUNFLOWER", "MUSTARD", "GINGELLY", "KTC", "PARACHUTE", "COCONUT OIL"],
            "spices-and-masala": ["MASALA", "POWDER", "CHILLI", "TURMERIC", "CORIANDER", "SPICES", "JEERA", "FENUGREEK", "CARDAMOM", "TAMARIND", "KAYAM", "ASAFOETIDA"],
            "pickles-and-chutneys": ["PICKLE", "CHUTNEY", "CHAMMANTHI"],
            "ready-to-eat": ["READY TO EAT", "READY MIX", "INSTANT", "CURRY", "PAYASAM", "UPPUMA", "IDIYAPPOM", "PALADA"],
            "frozen-foods": ["FROZEN", "KAPPA", "JACKFRUIT", "DRUMSTICK", "AVIAL", "POROTTA", "COCONUT", "GRATED", "TAPIOCA"],
            "snacks-and-sweets": ["SNACK", "CHIPS", "MIXTURE", "BISCUIT", "SARKARAVARATTI", "HALWA", "LADDU", "SOAN", "CAKE", "JAM", "JAGGERY", "KURKURE", "PARLE", "COOKIES", "RUSK", "PULI MITTAYI"],
            "beverages": ["TEA", "COFFEE", "SQUASH", "HORLICKS", "BOOST", "FROOTI", "RED LABEL", "TATA", "NESCAFE"],
            "dairy-and-milk-powder": ["MILK POWDER", "MAGGI", "DAIRY"],
            "household-and-personal-care": ["SOAP", "PASTE", "HAIR OIL", "AGARBATHI", "CHANDRIKA", "MEDIMIX", "CINTHOL", "COLGATE", "DABUR", "PEARS", "HAMAM"],
            "fresh-vegetables": ["FRESH VEGETABLE", "BANANA", "ONION", "GINGER", "GARLIC", "CHENA", "MATHANGA", "KUMBALANGA", "TRAY"],
            "kitchenware": ["KITCHEN", "MAKER", "COOKER", "MIXIE", "CHATTY", "PRESSURE", "BROOM", "BHARANI"]
        };

        const resultMapping = {};
        for (const [mainSlug, keywords] of Object.entries(mainCategories)) {
            const matchedIds = categories
                .filter(c => keywords.some(k => c.name.toUpperCase().includes(k)))
                .map(c => c.id);
            resultMapping[mainSlug] = matchedIds;
        }

        console.log(JSON.stringify(resultMapping, null, 2));
    } catch (error) {
        console.error(error.message);
    }
}
generateMapping();
