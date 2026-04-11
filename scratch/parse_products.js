
const fs = require('fs');

const rawText = `
*PLUM CAKES*

Viswas rich Plum delight--£5.99

*Daily delight*
Jackfruit cake--£6.29
Plum special 700g-£5.99
Plum special 350g--£3.79
Dates and cashew 350g--£5.99
Fruit rich plum 350g--£3.99
Fruit rich Plum 700g--£5.99

*ELITE*
Plum surprise 800grm

Ktc mango pulp--£2.39

*JAM*
Mixed fruit--£1.99
Nissan 500g--£3.59
Pineapple--£1.99

*MATTA RICES 10KG*
PERIYAR  VADI MATTA RICE 2 FOR £21.00

Gramin------£10.99
Double horse--£12.99
KT Matta-----£11.99
Granules-----£10.99
Nila Matta----£12.49
AJMI matta----£12.99
Malabar feast--£10. 99
Periyar-------£11.99
Greenvally-----£10.99

Meeval sona masoori 10kg--£14.99

*KT Thanchavur ponni rice 10kg---£14.99*
India gate sona masoori--£15.99
India gate ponni--£14.99
*Mayil surekha rice (white)--£13.99*
Farm kitchen jaya---£12.99
KT jaya--£13.99

Ajmi matta 5kg--£7.99
Pavizham matta 5kg---£7.99
Island sun cooking rice 5 kg---£6.99 

*KAIMA RICES* 
*Meeval kaima*
2 kg----£7.29

Ajmi
1kg---£3.49
5kg---£14.99

Indiagate jeerakasala rice--£14.99
 
*BASMATI RICES 5kg*
Ajmi-------£12.99
India gate---£14.99
Farm kitchen sella--£9.99
Salam

*1kG RICES*
Ajmi 1kg---'--£3.19
Tilda basmati--£4.49
Tilda long grain--£1.59

Shankar  ponni raw rice 1kg--£1.99
Shankar Thanchavur ponni Boiled 1kg--£1.99

*PACHARI*
Pachari 5kg--£9.99
Pachari 2kg--£4.39

*IDLY RICES*
2kg-------£4.49
5kg-------£9.99

*AATTA'S*
Pillsbury 5kg---£8.99
Aashirvad whole5kg--£8.99
Aashirvad Multigrain 5kg--£9.99
Aashirvad whole 2kg--£4.49
Ajmi chakki fresh aatta 5kg---£9.29
Ajmi aatta 2kg--£4.29

Nirmal matta raw rice(unakkalari)--£2.39

*PULSES&OTHERS*(prices may vary according to the brands,law prices also)
Uzhunnu------£3.49
Cherupayar----£3.49
Vanpayar------£3.49
Muthira-------£2.99
Chuvannaparippu-£2.99
Sambar parippu--£3.49
Greenpeas------£3.59
White kadala----£3.59
Split pigeon peas-£3.59
Split urid dal-----£3.59
gram dal--------£3.39
Moong dal------£3.59

*MAGGI MILK POWDER*
Maggi 1kg--£12.99
Maggi 300g--£4.59
Maggi 150g--£2.59
Shankar 1kg--£9.99

*DRIED TAPIOCA(Unakka kappa)*
Greenvally  900g--£3.39
Mayil 600g--£3.69

broken matta(podiyari)--£2.59*

*JAGGERY*
500g -----£1.69
1kg-------£3.29
Karippetti--£3.89

*RAGI* 
Ragi powder1kg--£2.59
Ragi whole 1kg--£2.99
Sri Durga foxtail millet(thina)--£2.89

*PAPPADAM*
Periyar--£1.69
Farm kitchen--£1.69
Jc pappadam(frozen )-£2.19
Shankar Madras plain pappadom200g--£1.79
Double horse --£1.69

*DESCICATED*
 Periyar 500g----£3.59

*VARUTHARA* 
Ajmi coconut varuthara 180g-£2.29
Jacme varuthara frozen 454g--£5.49
KT varuthara--£3.99
Saras varuthara--£3.29

*SARAS*All gravy mixes 2 For £3.50*
Chicken curry mix
Chicken roast mix
Sambar gravy mix
Malabar fish gravy mix
Fish mappas
Chettinad gravy mix
Fish curry gravy mix
Vindaloo gravy mix
Lamb buna
Rogan josh mix
Jackfruit cake

*SALT*
Table salt 750g--£1.19
Tata salt 1kg----£1.29
Kalluppu----£1.39
Aashirvad iodised1kg---£1.39

*Sago seed (chowari)*-----£1.79
 
*RICEFLAKES (AVAL)*
 *white*------£1.99
*Aval brown*----£1.99
Brahmins---£1.99

Double horse Soya chunks available --£2.99

*Thairu kondattam 75g--£1.69*

*AJMI*
White puttu---£2.49
Rava---------£2.79
Rice powder---£2.49
Chemba------£2.79
Palappom podi--£2.79
Idly podi------£2.79
Dosa podi-----£2.79
Idiyappom----£2.59
Pathiri-------£2.39
Wheat-------£2.79
Ajmi Ragi 500g--£1.69
*ajmi Puttupodi 5kg---£10.99*
Ricepowder 5kg--£10.99

*KITCHEN TREASURES*
White puttu---£2.69
Rice powder--£2.59
Dosapodi----£2.89
Ragi puttu----£2.89
Corn puttu----£2.89
Idly podi------£2.89
Chemba----£2.89
Appam Idiyappom-----£2.59
Rava---------£2.89

*PERIYAR*
White puttu
Instant uppuma--£3.19
Corn puttu 

*DOUBLE HORSE*
Rice powder--£2.49
Puttu-------£2.39

*GRANDMA'S*
Idly mix------£2.79
Unroasted Ricepowder--£1.99
Chemba----£2.79

*Ponkathir* 
Instant uppuma mix--£2.99
Puttu---£2.29
Mc Maida----£2.99

*FRESH GRANULES*
Wheat puttu-----£2.59
Rice powder----£2.39
White puttu---£2.29

*Shankar cracked wheat---£2.59*
*Samba broken wheat --£3.09*
India gate Rice powder--£2.59
Pavithram puttu podi--£2.39
Malabar choice Instant uppuma--£2.99
Melam Pathiri podi--£3.09

BRAHMINS 
Puttu-----£2.79
Chemba-----2.99
Ricepowder--£2.79

*GRB SWEETS*
Soan papdi butterscotch---£1.99*
*GRB BUTTER scotch soan cake--£1.99*
*GRB soan papdi---£1.99*
Haldirams  soan papdi--£1.99
Karachi's osmania biscuits--£3.89
Pineapple soan cake---£1.99

*PICKLES*
Ocean feast Prawns pickle
Sardines pickle--£4.99
Kaduku mango---£2.59
DHCut mango------£2.59
Hot lime--------£2.59
White lime------£2.59
Garlic ---------£2.39
Nellikka--------£2.49
Irumpan puli-----£2.59
Puliyinchi-------£2.49
Ginger ---------£2.29
Loobikka------£2.59
Bittergourd white-£2.39
Bittergourd red--£2.29
Dates pickle-----£2.69
Vadukapuli---£2.59

Kanthari mango chutney--£2.99
Dry chilly chutney--£2.49

Coconut chutney powder--£2.69
Prawns chutney powder--£3.99

*FARM KITCHEN PICKLES*
Chakkakkuru mango chemmeen chammanthi--£2.99
Vattal ulli chammanthi--£2.59
Garlic pickle--£2.59
Vadukapuli pickle -£2.29
Mango pickle 1kg--£3.99
Lemon pickle 1kg--£3.99

*GINGER GARLICPASTE*
Brahmins 300g--£3.49
Ajmi 1kg------£4.29
Farm kitchen 1kg--£3.49
Garlic paste only---£0.99

*TEA ,COFFEE&OILS*
Red label  250g--£2.99 
Tata tea premium 450g --£4.99
TATA tea masala chai 100g---£2.99
Tata tea gold 450g--£5.39
Tata gold coffee100g--£4.69
Tata tea agni strong leaf--£1.59

Nescafe original50g----£1.99
Gold 95g------£3.99 
Cct  nadan coffee 100g--£2.69*
Fk nadan coffee--£3.29
Wayanad Spices nadan coffee--£3.19

*COCONUT OIL*
Pavizham 1L--£7.09
Nirapara---£7.99
Khanum 500ml---£6.99
Cocopure 500ml--£3.09
Ajmi 1L--------£6.59
Parachute 500ml--£3.99
200ml--£1.99
Shankar 500ml--£3.59
Fresh Granules 1L-£6.29
Farm kitchen 2L---£11.49
Nila ---£7.29

*Shankar mustard oil 1L --£3.79*
*Shankar Gingelly OIL 500ml--£2.99*
Idhayam Gingelly 
 *shankar Gingelly OIL(nallenna)1L--£5.99*
*Oilve oil
KTC Sunflower oil 1L - £2.19
KTC vegetable oil 5L -£7.59
KTC Sunflower oil 5L--£7.59

*VINEGAR*
*meevel&Ponkathirand double horse 1L available---£2.29 each*
vinegar 500ml--£1.69

*TAMARIND*
shankar  with Seed200g ----£0.99
Swami's Kudumpuli--£1.59
Ajmi tamarind---£2.59
Farm kitchen tamarind 500g--£2.29

*KAYAM (ASAFOETIDA)*
Kyam block --£1.79
Achayans choice --£1.99
LG kayam--£2.59
Farm kitchen--£2.19

*SQUASH*
Pineapple---£1.79
Mango-------£1.79
Passion fruit--£3.99
NANNARI SARBATH--£3.79
Nellikka Kanthari--£4.99

*FROZEN VEGETABLES*
 *KAPPA*
*Jacme-----£2.79*
Daily delight--£2.99
Ponkathir----£2.59
Viswas------£2.69

*FROZEN VEGETABLES *
*JC Koorka-------£2.59*
*jc Cut mango green 400g--£2.59*
Dd Koorkka--£2.59
Padavalanga---£2.19*
*Jc Aviyal mix---£2.59*
*Jc Sambar mix-£2.59*
*Longbeans400g-£2.59*
*jc or ajmi Jackfruit green-£2.69*
Royal delicacy Jackfruit green--£2.59
*Tender Jackfruit-£2.69*
*Sliced coconut--£2.59*
*jc Drumstick---£2.59*
*Shallot 400g--£2.59*
*Viswas Jackfruit green sliced--£3.49*

*GRATED COCONUT* 
Jacme-------£2.99
Daily delight--£3.29
Loyal-----£2.79
Voswas---£2.99

*READY To Eat CURRY*(Subject to availability)
Pappaya---£2.59
Cheera-------£2.59
Vazhachund ---£2.59
Ulli Sambar---£2.69
Vendakka----£2.49
Angamaly mango curry--£2.59
Koorka mezhukkupuratti--£2.59
Ulli theeyal----£2.59

Shrimp mango curry--£2.69
 Semiya payasam--£2.59
Parippu payasam--£2.59

*TASTYNIBBLES ready to eat curry*
Kadachakka varutharachathu--£2.49 
Fish molee
Fish mango curry 
Fish Biriyani 
Koottucurry 
Soya coconut fry
Kappa puzhukku
Pavakka theeyal
Light meat Tuna
Anchovy peera
*Kadala curry--£2.19*
*Mulakitta fish curry-£2.79*
*Prawns mango curry--£2.99*
*Kerala shap fish curry--£2.79*
*Ullitheeyal--£2.19*
*Boiled Koorkka --£2.59*
*Prawns roast---£3.75*
*Pavakka theeyal--£2.29*

*Loyal ready Idiyappom 908 g--£3.99*
*Loyal ready Idly 908g--£3.99*

*READy TO EAT SNACKS
Jackfruit Kozhukatta--£2.59
Laddu
Jilebi 
Ullivada-----£2.59
Banana fry-----£2.59
 Mysore Bonda--------£2.59
Kumbalappam--£2.59
Kozhukatta----£2.59
masala Bonda-------£2.59
Elayada jaggery--£2.59
Uzhunnuvada small--£2.59
Unniyappam--£2.59
Neyyappom--£2.59
Red halwa--£3.29
Kozhikkodan halwa black---£3.49

UZHUNNUVADA FAMILY PACK--£5.99
Samosa 1kg--£5.99
Kumbalappam 1kg--£5.99
banana Fry 1kg--£6.49
 NEYYAPPOM 1KG--£5.99
UNNIYAPPAM 1KG--£5.99

*POROTTA*
Ponkathir Restaurant 2kg---£4.99
1.5KG--£3.99
DD  malabar---£1.69*
JACME FAMILY PACK 908G--£3.49
*DD family pack 908g--£3.69*
Dd restaurant--£3.79
Jacme NOOL porotta--£4.79
 *Kanthari in brine--£2.59*

*GHEE*
GRB 1KG---£14.99
GRB 500G----£8.99
Pathanjali 1kg--£14.99
Pathanjali 500g--£8.99

*PAYASAMMIX*
*Instant mix*
KT rice palada--£2.09
Palada----£2.09
Periyar instant semiya--£1.79
*Roasted vermicelli*
Periyar 200g--£1.19
Ajmi---400g--£1.69
Meeval 400g---£1.49

Farm kitchen raisins--£1.79

*greenfields CRUSHCHILLI--£1.59*
* meeval Kashmiri chilli Whole--£1.99*
Nirapara chilli whole--£1.99
*mayil kaduku--£1.69*
Mayil jeerakam 200g--£1.69
Mayil uluva 200g----£1.69
*mayil PERUMJEERAKAM200g--£1.99*
*FK (elakkaya) cardamom 50g-£2.99*
*Natures jeeraka  powder 250g-£3.59*
Black sesame seeds--£1.09

*DRIED FISH*
Seawater dry fish--£3.19
Dry solefish(maanthal)--£3.89

*SNACKS*
Nila pineapple drops 200g---£2.19
DD BOMBAY MIXTURE--£2.59
DD chilli karaseva 250g---£2.49
DD  kerala mixture 400g--£3.49
Dd kerala mixture hot 400g---£3.49
Jc Butter murukku jar--£2.59
Mc nadan Kuzhalappam--£2.69
Dd cheeda--£2.79
Greenvally ring murukku plain---£1.99
Tomato murukku PACKET --£1.89
Mayil banana chips--£3.19

*SNACKS PACKETS*
*PAVIZHAM*
 banana chips--£2.09
 Ripe banana chips--£2.09
cassava spicy--£1.49
Bombay mixture--£1.49
Kerala mixture--£1.49
Gv cheeda sweet jar--£1.99
Gv Kuzhalappam sweet jar--£1.99
Cheeda plain---£1.49
Kerala mixture hot--£1.49
Nila Pakkavada--£1.99
Nila mixture 350g---£2.59
Nila hot mixture--£2.19
Nila bombay mixture--£1.89
JC Pakkavada --£2.19
Ajmi hot kerala mixture--£2.59
Jc Butter murukku--£2.29
Ajmi banana chips--£2.79
Jacme payyoli mixture--£2.79
Mc avalosunda--£1.99
Ajmi Ripe banana chips--£2.69
Ajmi Sarkkaravaratti--£2.59
Nila Sarkkaravaratti--£1.99
Dd Sarkkaravaratti --£2.39
Mc Sarkkaravaratti--£1.59
Meeval Pottukadala--£2.59
Ajmi Jackfruit chips--£2.69
Mt  avalose podi--£2.99
Greenvally avalose podi--£2.79
Ajmi Sarkkaravaratti--£2.09
Jacme rice murukku--£2.19
Viswas achappam 170g--£2.59
Jacme bittergourd -£2.09
Nila peanut green pepper-1.69

*Parle G family pack--£2.29*
Meeval peanut candy--£1.99
Mc ellunda black--£1.59
MT peanut ball--£1.59
Mayil mixture ball--£1.49
Mayil Pakkavada--£1.89 
Moms magic family pack butter --£2.79
*Parle Monaco--4 for £1.00*

*PARLE*
*Hide and seek vanilla--£0.79*
*Dark fantasy-£0.79*
Moms magic family value pack --£2.79
Digestive cookies--£0.49
 
Meeval palm candy--£ 1.99
MT Malabar rock sugar--£1.69
Mango bite--£2.19
Kacha mango bite--£2.49
Kacha mango jar--£1.99

*RUSKS*
Milk Rusk---£2.79
Nadan rusk--£2.79
Elaichi rusk---£2.69
Ghee rusk---£2.69
Parle 200g--£1.79
Wheat rusk--£2.79

*PULI mittayi--£1.99*
KURKURE NAUGHTY TOMATO+GREEN CHUTNEY +MASALA MUNCH +CHILLI CHATKA. ALL 2 FOR £1.90*

*MASALA POWDERS*
*KASHMIRI CHILLI *
FARM KITCHEN 400G--£4.99
SREE KRISHNA 400G-£5.49
KITCHEN TREASURES 400G--£5.99
KITCHEN TREASURES 1KG---£12.99
EASTERN 400G--£5.99
MAYIL 400G---£5.99
AJMI 1KG----£10.99
Melam 500gm---£5.99

*ACHAYAN'S* 
Chicken masala 200g--£2.09
Meat masala 200g--£2.09
Sambar powder200g--£2.09
Coriander powder--£1.79

*KITCHEN TREASURES*
Meat masala 200g-£2.79  
Chicken masala200g -£2.79
Garam masala100g -£2.59
Chilly chicken100g    - £2 .29
Sambar powder200g -£ 2.79
Brahmin sambar165g-£2.39
 Turmeric powder400g-£3.49
Chilly powder 400g -£4.99
Coriander powder 400g-£3.49
Coriander powder 1kg-£6.99

 *AJMI MASALA* 
chicken masala200g-£2.69
Meat masala200g -£2.69
Sambar powder200g--£2.69
Turmeric powder200g-£1.99
Coriander 500g--£3.39
Coriander 200g--£1.99
Biriyani masala100g -£1.99
Garam masala100g -£2.09

*GRANDMA'S MASALA*
Tandoori masala200g -£2.29
Mutton masala200g -£2.29
Sambar powder200g -£2.29
Chicken madala200g -£2.29

*EASTERN MASALA*
chicken masala 160g-£2.29
Meat masala160g -£2.29
Biriyani masala100g-£2.19
Beef ularthu masala-£1.79
Rasam powder165g-£2.19
Garam masala100g-£2.29
Black pepper100g-£2.29
 Melam Chilly powder 250g--£3.19
Melam kerala Sambar podi--£1.99
Brahmins Sambar powder--£2.79
Brahmins Coriander 1kg--£6.99

*Horlicks----£5.99*
*Bournvita----£6.39*
*BOOST------£5.49*

*NOODLES*
Maggi--3 for £1.00
Yippe--3 for £1.00

*SOAPS*
Chandrika-----£1.09
Medimix------£1.29
Manjal mix----£1.09
Kerala Ayurvedic-£1.09
Thulasi mix---£1.09
Pears----£1.29
Mysore sandal150g--£1.89
Hamam----£1.09
CINTHOL---£1.09

*AGARBATHIS*
Cycle agarbathi--£1.29
Cycle small---£0.69

*HAIR OIL*
Vatika almond---£4.79
Vatika coconut---£4.79
Vatika egg protein-£4.79
Vatika olive------£4.79

*PASTE*
Colgate--£1.00
dabur----£1.69
Kp namboodiri--£1.69
 umikkari---£1.99 

*HEALTH PRODUCTS*
Thaleesapathradhi choornam--£1.99
Thalipodi--£2.99
Eladhi candy---£2.29
Dasamoola jeerakarishtam--£6.29
Jeerakarishtam--£5.99
Dhanwantharam kuzhambu--£6.49
Navarathna oil--£3.29
Murivenna---£2.69
Thengin pookkula lehyam---£8.49
Eladhi lehyam--£2.59
Vedana samhari thylam--£4.09 
Kasthoori manjal--£2.59
Baby banana powder--£5.99
Baby kannan kaya powder--£5.99

*PRE ORDERS*
CHATTY BIG---£13.99
CHATTY MEDIUM--£10.99
Chatty small--£8.99
BROOM STICK --£4.99 

*Fresh Vegetable*
Kumbalanga--£5.99/kg
Mathanga---£5.99/kg
Chena---£5.99/kg
Cherulli--£6.49/kg
Ginger--£3.99/kg
Garlic--£1.15
Bombay onion--£2.99/2kg
Nenthra pazham--£2.59/kg
`;

function parseProducts() {
    const lines = rawText.split('\n');
    let currentCategory = 'Uncategorized';
    let products = [];
    
    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        
        // Check for category
        if (line.startsWith('*') && line.endsWith('*')) {
            const cat = line.replace(/\*/g, '').trim();
            if (cat.length > 2) {
                currentCategory = cat;
                continue;
            }
        }
        
        // Check for product like "Name--£Price" or "Name---£Price"
        const priceMatch = line.match(/(.+?)[-\s]+£?\s*([\d\.]+)/);
        if (priceMatch) {
            let name = priceMatch[1].trim();
            let price = priceMatch[2].trim();
            
            // Clean up name if it contains Category-like markers
            if (name.startsWith('*')) name = name.replace(/\*/g, '').trim();
            
            // Remove lingering trailing dashes
            name = name.replace(/-+$/, '').trim();

            products.push({
                name,
                price,
                category: currentCategory
            });
        } else if (currentCategory === 'SARAS' || currentCategory.includes('gravy mixes')) {
            // Special case for SARAS mixes
            if (!line.includes('£')) {
                products.push({
                    name: 'SARAS ' + line,
                    price: '1.75', 
                    category: 'SARAS'
                });
            }
        }
    }
    
    fs.writeFileSync('scratch/parsed_products.json', JSON.stringify(products, null, 2));
    console.log('Parsed ' + products.length + ' products');
}

parseProducts();
