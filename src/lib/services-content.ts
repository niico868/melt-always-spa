// Long-form content for each treatment page.
// Fill in the fields per service. Any field left as an empty string / empty
// array will be hidden on the page — no need to delete sections you don't use.

export type ServiceFaq = { question: string; answer: string };

export type ServiceContent = {
  slug: string;              // must match SERVICES slug in src/lib/site.ts
  tagline: string;           // 1 short sentence under the H1
  overview: string;          // 1–3 paragraphs, plain prose
  howItWorks: string;        // 1–3 paragraphs
  benefits: string[];        // bullet points
  idealFor: string[];        // bullet points
  whatToExpect: string;      // 1–2 paragraphs (session flow, feel, downtime)
  aftercare: string;         // 1–2 paragraphs
  duration: string;          // e.g. "45–60 minutes per session"
  sessions: string;          // e.g. "6–10 sessions recommended"
  faqs: ServiceFaq[];        // shown in an accordion
  disclaimer?: string;       // optional safety / results-vary note
};

export const SERVICES_CONTENT: Record<string, ServiceContent> = {
  "fat-melting": {
    slug: "fat-melting",
    tagline: "Target small areas of resistant fat and improve body contour",
    overview: "Fat melting is a broad term for non surgical and minimally invasive treatments designed to reduce or reshape selected pockets of fat. Depending on the treatment area, skin condition and your suitability, Melt Aways may recommend ultrasonic cavitation, radiofrequency body contouring, Endolift or a combination of appropriate techniques. These treatments are intended to refine body contours rather than produce major weight loss. A consultation is required to determine which option may be suitable and what level of change would be realistic.",
    howItWorks: "Fat reduction treatments use different forms of controlled energy or tissue treatment to target localised fat. Some methods may disrupt or damage selected fat cells so their contents can be gradually processed by the body. Others primarily tighten the surrounding tissue, encourage collagen activity or improve the visible shape of the area. Your treatment begins with a body assessment, followed by a personalised recommendation based on the location and depth of the fat, skin firmness, medical history and desired outcome.",
    benefits: ["May reduce the appearance of small pockets of resistant fat",
    "Refines the contour of selected areas",
    "May improve definition around the waist, abdomen or jawline",
    "Supports a smoother and more balanced body shape",
    "May improve skin firmness when combined with a tightening treatment",
    "Can complement a wider body contouring programme",
    "May support visible contour improvements after weight loss"],
    idealFor: ["Lower or upper abdominal fullness",
    "Fat around the waist and love handles",
    "Small areas of back or bra line fullness",
    "Upper arm fullness",
    "Inner or outer thigh fullness",
    "Small pockets of fat around the hips",
    "Fullness beneath the chin",
    "Reduced jawline definition",
    "Localised fat remaining after weight loss",
    "Uneven contours following changes in body weight"],
    whatToExpect: "The treatment experience depends on the method selected. External body contouring may involve a handheld applicator being moved across the skin while your comfort and the treatment area are monitored. You may experience warmth, pressure, vibration, tingling, pulling or temporary tenderness. Ultrasonic cavitation may also produce a ringing sound during treatment. Endolift follows a different clinical process because a fine laser fibre is introduced beneath the skin and may require local anaesthetic. Results generally develop gradually, and temporary swelling or fluid changes may initially affect the appearance of the treated area.",
    aftercare: "Aftercare will depend on the treatment performed. You may be advised to keep the area clean, maintain normal hydration unless medically restricted, resume light movement, avoid excessive heat and avoid rubbing sensitive skin. Compression garments, temporary exercise restrictions or additional recovery instructions may apply after minimally invasive treatment. Continue balanced eating and regular physical activity to help maintain your results. Contact Melt Aways if you develop severe pain, blistering, unusual discolouration, worsening swelling, fever or another unexpected reaction. The instructions provided by your practitioner should always take priority.",
    duration: "Treatment time varies according to the method selected, the size and number of areas being treated and whether techniques are being combined. Your expected appointment length will be confirmed during consultation.",
    sessions: "The number of sessions depends on the treatment, area and intended result. External treatments such as ultrasonic cavitation may be recommended as a spaced series, while some minimally invasive procedures may involve one treatment followed by a review. Additional sessions should be based on reassessment and how your body responds rather than a fixed package alone.",
    faqs: [{
      question: "When may I notice a difference?",
      answer: "Some clients may notice temporary changes in the shape or feel of the area shortly after treatment. Meaningful fat reduction generally develops gradually as the body responds. Timing may be influenced by the selected treatment, amount and depth of fat, skin firmness, weight stability, lifestyle and the number of sessions completed."
    },
    {
      question: "How long may the results last?",
      answer: "Results may be maintained for an extended period, but the remaining fat cells can still enlarge if body weight increases. Stable weight, balanced nutrition, regular physical activity, adequate sleep and suitable maintenance treatments may help preserve the outcome."
    },
    {
      question: "Does fat reduction hurt?",
      answer: "Many external treatments produce manageable sensations such as warmth, pressure, vibration or tenderness. Endolift may involve local anaesthetic and can cause temporary swelling, tenderness or bruising. Tell your practitioner immediately if you experience burning, sharp pain or anything unusual."
    },
    {
      question: "Is there downtime?",
      answer: "External treatments often require little interruption to normal activities. Temporary redness, warmth, tenderness, swelling, bruising, tingling, numbness or skin sensitivity may occur. Minimally invasive treatments such as Endolift may require more recovery time and specific aftercare."
    },
    {
      question: "Is fat melting a weight-loss treatment?",
      answer: "No. Fat melting is intended to refine selected areas of localised fat rather than treat general weight gain or produce major weight loss. It does not replace exercise, balanced nutrition or medically supervised weight management."
    },
    {
      question: "Are fat reduction treatments safe?",
      answer: "Non surgical fat reduction may be performed safely when the client is appropriately assessed and suitable equipment is used by a properly trained practitioner. However, every treatment carries possible risks. The risks associated with the specific method should be explained before consent."
    },
    {
      question: "Who may require medical clearance or postponed treatment?",
      answer: "Treatment may need to be postponed or medically cleared if you are pregnant or breastfeeding, have an active infection, unexplained lump, hernia, bleeding disorder, uncontrolled diabetes, reduced sensation, liver or kidney disease, implanted electronic device, recent surgery, significant circulatory condition or another condition that could affect treatment or recovery."
    }],
  },
  "skin-tightening": {
    slug: "skin-tightening",
    tagline: "Advanced skin tightening and fat reduction from beneath the skin",
    overview: "Endolift is a minimally invasive laser treatment designed to tighten loose tissue, stimulate collagen production and reduce small pockets of localised fat. A fine optical fibre delivers controlled laser energy beneath the skin, allowing selected facial and body areas to be treated without traditional surgical incisions. Endolift is intended for contour refinement and modest fat reduction rather than major weight loss or surgical-level lifting. A consultation is required to determine whether it is appropriate for your skin, concerns and desired outcome.",
    howItWorks: "Following an assessment, the selected treatment areas are carefully mapped, cleansed and prepared. Local anaesthesia or other comfort measures may be used when appropriate. A sterile, single-use optical microfibre is then introduced beneath the skin through a very small entry point. Controlled laser energy is delivered directly to the targeted tissue to encourage tightening, stimulate new collagen production and reduce localised fat where appropriate. The fibre is removed after treatment, and the area is examined before personalised aftercare instructions are provided.",
    benefits: ["Tightens loose skin and underlying tissue",
    "Stimulates the production of new collagen",
    "May improve mild to moderate skin laxity",
    "May reduce small pockets of localised fat",
    "Improves facial and body definition",
    "Supports a firmer and smoother appearance",
    "May refine the jawline and lower face",
    "Provides a minimally invasive alternative for selected concerns",
    "Can complement a broader body contouring programme"],
    idealFor: ["Loose or mildly sagging skin",
    "Reduced jawline definition",
    "Fullness beneath the chin",
    "Early jowling",
    "Age-related changes in facial shape",
    "Small pockets of resistant fat",
    "Loose skin following changes in body weight",
    "Areas requiring greater firmness or definition",
    "Loose skin around the neck or lower face",
    "Selected areas of the abdomen, upper arms or thighs",
    "Fullness around the bra line, back or flanks",
    "Clients seeking improvement without traditional surgery"],
    whatToExpect: "Your appointment begins with an assessment of your skin, underlying tissue, localised fat, medical history and desired result. During treatment, you may feel pressure, warmth or movement beneath the skin. The procedure is carefully controlled according to the area, tissue condition and intended outcome. Temporary swelling, redness, tenderness, bruising, tightness, sensitivity, numbness or mild unevenness may occur while the area settles. Some improvement may be noticeable following treatment, but further tightening and definition may develop gradually over the following weeks and months as collagen production increases.",
    aftercare: "Follow the personalised instructions provided by your medical practitioner. You may be advised to keep the treatment area clean, avoid rubbing or placing unnecessary pressure on sensitive tissue and temporarily avoid strenuous exercise, excessive heat, alcohol or certain skincare products. Medication, compression garments or additional precautions may be recommended depending on the area treated. Attend your scheduled progress review and contact Melt Aways promptly if you experience severe or worsening pain, excessive swelling, unusual discolouration, blistering, bleeding, fever, discharge or another unexpected reaction.",
    duration: "Procedure time varies according to the size, location and number of areas being treated. Your expected appointment length, preparation requirements and recovery period will be explained during your consultation.",
    sessions: "Some clients may achieve their desired improvement after one Endolift procedure. Others may benefit from additional treatment or a different approach. Recommendations are based on the condition of the tissue, the area being treated, your response and the result you would reasonably like to achieve.",
    faqs: [{
      question: "When may I see results?",
      answer: "Some tightening or improvement in definition may be noticeable after treatment. Results can continue developing over the following weeks and months as new collagen is produced and temporary swelling settles. The speed and extent of improvement vary between clients."
    },
    {
      question: "Is Endolift a weight-loss treatment?",
      answer: "No. Endolift is intended to tighten selected areas, improve definition and reduce modest pockets of localised fat. It is not designed for general weight loss, large-volume fat removal or the treatment of obesity."
    },
    {
      question: "Is Endolift painful?",
      answer: "Comfort levels vary. You may feel warmth, pressure or movement beneath the skin during the procedure. Local anaesthesia or other appropriate comfort measures may be used, and your medical team will monitor you throughout treatment."
    },
    {
      question: "Is there downtime?",
      answer: "Endolift is minimally invasive, but a recovery period should still be expected. Temporary swelling, redness, bruising, tenderness, tightness, sensitivity, numbness or mild unevenness may occur. Downtime depends on the treatment area, procedure intensity and your body’s response."
    },
    {
      question: "How many treatments will I need?",
      answer: "Some clients may require only one procedure, while others may benefit from additional treatment or a complementary approach. Your plan will be based on reassessment and your response rather than automatically recommending more sessions."
    },
    {
      question: "Can Endolift be performed on the face and body?",
      answer: "Yes, where medically appropriate. Facial areas may include the jawline, lower face, jowls, cheeks, neck and beneath the chin. Selected body areas may include the abdomen, upper arms, inner thighs, knees, back, bra-line area and flanks."
    },
    {
      question: "Is Endolift safe?",
      answer: "Endolift may be performed safely when the client is properly assessed and the procedure is carried out by trained medical professionals using appropriate equipment, sterile single-use fibres and established protocols. Possible complications include burns, infection, bleeding, pigmentation changes, altered sensation, contour irregularities, asymmetry, scarring and injury to nearby tissue."
    },
    {
      question: "Who may not be suitable for Endolift?",
      answer: "Treatment may not be appropriate if you are pregnant or breastfeeding, have an active infection or open wound, a bleeding or clotting disorder, uncontrolled diabetes, impaired healing, abnormal scarring, certain implanted medical devices or a significant underlying medical condition. Blood-thinning medication, recent treatment in the same area or expectations of surgical-level lifting may also affect suitability."
    }],
  },
  "anti-aging": {
    slug: "anti-aging",
    tagline: "Support firmer, smoother and healthier-looking skin",
    overview: "Non surgical anti ageing treatments are designed to soften visible signs of ageing and improve the overall quality of the skin without traditional surgery. Depending on your concerns, treatment may focus on hydration, collagen support, firmness, pigmentation, facial definition, texture or brightness. At Melt Aways, your skin is assessed before treatment so that recommendations reflect its present condition, your health history and the improvement you would realistically like to achieve.",
    howItWorks: "Anti ageing care may involve one carefully selected treatment or a planned combination of techniques. Depending on your skin and the services considered suitable, this may include radiofrequency skin firming, microcurrent treatment, LED light therapy, rejuvenating facials, chemical exfoliation, ultrasound based treatment or another collagen supporting procedure. These methods work in different ways to hydrate the skin, support renewal, encourage collagen activity, improve firmness or address uneven tone and texture. Your practitioner will explain what each recommended procedure is intended to improve before treatment begins.",
    benefits: ["May soften the appearance of fine lines",
    "Supports firmer-looking skin",
    "May encourage collagen and elastin activity",
    "Improves skin hydration and softness",
    "May refine uneven texture and visible pores",
    "Supports a brighter and more refreshed complexion",
    "May improve selected pigmentation concerns",
    "Can enhance facial firmness and definition",
    "Supports the overall quality and condition of mature skin",
    "Provides personalised care without traditional surgery"],
    idealFor: ["Fine lines and mild wrinkles",
    "Reduced skin firmness",
    "Early facial sagging",
    "Dull or tired-looking skin",
    "Dryness and dehydration",
    "Uneven skin texture",
    "Enlarged or visible pores",
    "Sun-related skin changes",
    "Uneven pigmentation",
    "Reduced jawline definition",
    "Crepey-looking skin",
    "Changes affecting the neck and upper chest",
    "A general loss of brightness or vitality"],
    whatToExpect: "Your appointment begins with an assessment of your skin type, sensitivity, hydration, texture, firmness, pigmentation, facial structure, current skincare and relevant health history. The treatment area will usually be cleansed before an appropriate gel, serum, protective layer or treatment product is applied. Depending on the procedure selected, you may experience gentle warmth, cooling, pressure, tingling, mild vibration, temporary tightness, light stinging or facial muscle movement. Your practitioner will monitor your comfort and skin response throughout the session. Some treatments may produce an immediate refreshed appearance, while improvements involving collagen, firmness or skin renewal generally develop more gradually.",
    aftercare: "Aftercare will depend on the procedure performed and your skin’s response. You may be instructed to keep the area clean, use gentle skincare, apply a suitable moisturiser and protect exposed skin with sunscreen. Avoid unnecessary heat, direct sun exposure, picking, rubbing or exfoliating sensitive skin. Strong acids, retinoids, active ingredients and heavy makeup may need to be paused for the period advised. Maintain normal hydration unless medically restricted. Contact Melt Aways if you experience blistering, severe pain, worsening swelling, unusual discolouration or another unexpected reaction. Instructions provided during your appointment should always take priority.",
    duration: "Appointment length varies according to the treatment selected, the areas being treated and whether more than one suitable technique is included. Your expected treatment and recovery time will be explained during consultation.",
    sessions: "Some clients may notice a refreshed appearance after one facial or hydrating treatment. Procedures intended to improve collagen activity, firmness, pigmentation or texture may require a carefully spaced series. The number of appointments will depend on your skin, the concern being addressed, the selected procedure, recovery requirements and your response. Occasional maintenance may be recommended where appropriate.",
    faqs: [{
      question: "When may I notice a difference?",
      answer: "Some treatments may leave the skin looking brighter, smoother or more hydrated shortly after the appointment. Improvements involving collagen production, firmness or skin renewal usually develop over a longer period. The timing and extent of change depend on your skin, general health, treatment type, lifestyle and consistency with the recommended plan."
    },
    {
      question: "How long may the results last?",
      answer: "The duration of improvement depends on the procedure and concern being treated. Sun protection, suitable skincare, healthy lifestyle habits and occasional maintenance may help preserve your results. However, no aesthetic procedure can permanently stop natural ageing, facial movement, hormonal changes or future environmental damage."
    },
    {
      question: "Do anti ageing treatments hurt?",
      answer: "Many non surgical treatments cause little discomfort, although the experience varies. You may feel warmth, tingling, pressure or temporary sensitivity. Procedures using stronger energy or deeper exfoliation may feel more intense. Tell your practitioner immediately if you experience burning, sharp pain or unexpected discomfort."
    },
    {
      question: "Is there downtime?",
      answer: "Many treatments allow you to resume your routine shortly afterwards. Depending on the procedure, temporary redness, warmth, swelling, tenderness, dryness, flaking, tightness, sensitivity, bruising or darkening of pigmentation may occur. Your expected recovery period will be discussed before treatment."
    },
    {
      question: "Which anti ageing treatment is right for me?",
      answer: "The appropriate treatment depends on whether your primary concern involves dryness, texture, pigmentation, reduced firmness, facial definition or another factor. Your skin should be assessed before a recommendation is made, as not every person needs the same procedure or combination."
    },
    {
      question: "Can different treatments be combined?",
      answer: "Suitable treatments may sometimes be combined as part of a planned programme. However, combining multiple procedures without a clear clinical reason may irritate the skin and will not necessarily improve the result. The timing and compatibility of each treatment should be considered carefully."
    },
    {
      question: "Are anti ageing treatments safe?",
      answer: "Non surgical anti ageing procedures may be performed safely when the client is properly assessed and suitable products, equipment and settings are used by a trained practitioner. Possible risks vary by treatment and may include persistent irritation, burns, blistering, allergic reactions, pigmentation changes, infection, scarring, prolonged swelling, uneven results or eye injury when appropriate protection is not used."
    },
    {
      question: "Who may need treatment postponed or medical clearance?",
      answer: "Treatment may need to be changed, postponed or medically cleared if you are pregnant or breastfeeding, have an active infection, rash, wound, sunburn, impaired healing, uncontrolled diabetes, abnormal scarring, reduced skin sensation, certain implants or a significant medical condition. Photosensitising medication, prescription acne medication, recent injectables, laser treatment, chemical peels or an unexplained skin lesion may also affect suitability."
    },
    {
      question: "Will anti ageing treatment change how my face looks?",
      answer: "The aim is to improve selected concerns while preserving your natural features. These treatments cannot stop ageing or guarantee a permanently younger appearance. A thoughtful care plan should help you look refreshed and well cared for without creating an artificial or unfamiliar result."
    }],
  },
  "breast-filler": {
    slug: "breast-filler",
    tagline: "Personalised fullness and contour enhancement without surgery",
    overview: "Injectable breast enhancement is a medical aesthetic procedure that uses a selected filler to add limited volume or refine specific areas of the breasts without implants or fat-transfer surgery. Depending on your anatomy and medical suitability, it may be considered for subtle fullness, mild asymmetry or selected contour irregularities. It does not provide the lifting or enlargement possible with surgery. Because breast injections carry serious risks and may interfere with future breast screening, a detailed medical assessment, full product disclosure and informed consent are essential before treatment.",
    howItWorks: "Following a medical and breast assessment, the proposed treatment areas are photographed, measured and carefully marked. The exact filler, its regulatory status, expected duration, possible risks and available methods of managing complications should be explained before treatment. The skin is cleansed, and local anaesthesia or another comfort measure may be used. A qualified medical professional then places controlled amounts of filler into selected areas using medically appropriate injection equipment. Treatment may be staged to monitor healing, symmetry, tissue response and how the product settles before any additional filler is considered.",
    benefits: ["May provide a limited increase in breast fullness",
    "May improve mild differences in breast size",
    "Can restore the appearance of some upper-breast fullness",
    "May refine selected contour depressions",
    "Can create a subtly fuller-looking outline",
    "May improve balance between the breasts",
    "Offers a non surgical option for carefully selected clients",
    "Allows treatment to be planned in controlled stages",
    "Focuses on subtle enhancement rather than major enlargement"],
    idealFor: ["Mild differences in breast size",
    "Limited loss of breast fullness",
    "A flatter-looking upper breast",
    "Selected contour depressions or irregularities",
    "Subtle cleavage enhancement",
    "Modest improvement in overall breast balance",
    "Clients seeking a small and carefully planned change",
    "Clients with realistic expectations about non surgical enhancement",
    "Clients medically cleared for treatment with the proposed filler"],
    whatToExpect: "Your consultation should include a review of your breast health, medical history, medication, allergies, previous procedures, breast imaging and personal or family history of breast disease. The breasts may be examined, photographed, measured and marked before treatment. During injection, you may experience stinging, pressure, tightness, fullness or discomfort. The area is assessed afterwards for symmetry, circulation, swelling, bleeding, sensation and immediate reactions. Some fullness may be visible immediately, although swelling can temporarily distort the result. Tenderness, bruising, firmness, temporary asymmetry, altered sensation or small irregularities may occur while the area settles.",
    aftercare: "Keep the injection sites clean and dry as instructed and wear the recommended supportive garment. Do not rub, press or aggressively massage the breasts unless specifically advised. Follow all sleeping and positioning instructions, avoid strenuous exercise and excessive heat for the period directed and do not apply unapproved products to the injection sites. Attend every scheduled review and retain the name, manufacturer, batch information and treatment date of the filler used. Contact Melt Aways immediately for increasing pain, heat, redness, discharge, unusual firmness or changes in skin colour, temperature or sensation. Seek emergency care for chest pain, difficulty breathing, fainting, confusion, sudden weakness or another severe reaction.",
    duration: "Procedure time depends on the product selected, amount administered, treatment areas and whether the enhancement is completed in stages. Consultation, preparation, monitoring and recovery requirements will be explained before treatment.",
    sessions: "Some clients may receive treatment during one appointment, while others may require a staged approach. Additional filler should only be considered after healing, symmetry, product settling and tissue response have been properly reviewed. More filler does not automatically provide a safer or more natural result.",
    faqs: [{
      question: "When may I notice results?",
      answer: "Some fullness may be visible immediately, but swelling can temporarily affect the appearance of the breasts and should not be mistaken for the final result. The outcome becomes clearer as swelling settles and the product integrates with the surrounding tissue. A particular cup size, measurement or amount of cleavage cannot be guaranteed."
    },
    {
      question: "Is injectable breast enhancement a breast lift?",
      answer: "No. Filler may create the appearance of additional fullness, but it cannot remove excess skin, reposition the nipples, correct significant sagging or provide the result of a surgical breast lift. A plastic-surgery consultation may be more appropriate when sagging or nipple position is the primary concern."
    },
    {
      question: "How long may the results last?",
      answer: "Duration depends on the exact product, amount administered, placement, individual metabolism, weight changes, pregnancy, breastfeeding and natural changes in breast tissue. A reliable timeframe cannot be given until the proposed filler has been identified and assessed."
    },
    {
      question: "Can breast filler be removed?",
      answer: "That depends entirely on the injected material. Some fillers may have a method of partial or attempted reversal, while others can be difficult or impossible to remove completely. Correction may require additional injections, imaging, drainage, surgery or treatment for infection and inflammation. Reversal may not correct tissue damage, scarring or migrated product."
    },
    {
      question: "Does injectable breast enhancement hurt?",
      answer: "You may experience stinging, pressure, tightness or fullness during treatment, followed by temporary tenderness, swelling or soreness. Severe or worsening pain, particularly when accompanied by skin-colour or temperature changes, requires immediate medical attention."
    },
    {
      question: "Is there downtime?",
      answer: "Some interruption to your normal routine may be required. Temporary swelling, bruising, tenderness, tightness, firmness, altered sensation, sleeping discomfort, small lumps or unevenness may occur. Recovery depends on the product, amount injected, placement and your individual response."
    },
    {
      question: "Will breast filler affect future breast screening?",
      answer: "It may. Breast filler can create lumps, shadows or other changes during mammograms, ultrasounds, MRI scans and physical examinations. Always tell your doctor and breast-imaging provider that filler is present and provide the product name, treatment date and injected areas."
    },
    {
      question: "What should I know about the product being injected?",
      answer: "Before treatment, you should receive the exact product name, active material, manufacturer, source, batch information, expiration date, regulatory status, intended medical use, expected duration, known risks and available removal or management options. You should also be told whether breast enhancement is an approved or off-label use. Do not proceed when the substance is described only by a vague term such as body filler, modelling gel or biopolymer."
    },
    {
      question: "Can injectable silicone or needle-free devices be used?",
      answer: "Free liquid silicone should not be injected for cosmetic breast enhancement because it can migrate and cause severe or permanent complications. High-pressure needle-free devices should also not be used because they may not provide adequate control over the amount, depth and location of the product."
    },
    {
      question: "Is injectable breast enhancement safe?",
      answer: "Proper assessment, sterile equipment, a verified product and an appropriately qualified medical professional may reduce risk, but cannot make the procedure risk-free. Complications may include infection, bleeding, inflammatory reactions, hard nodules, migration, asymmetry, altered sensation, tissue damage, blocked blood vessels, embolism, lung complications, interference with breast imaging, permanent deformity, serious injury or death. Certain problems may emerge months or years later."
    },
    {
      question: "Who may not be suitable?",
      answer: "Treatment may be unsuitable if you are pregnant, breastfeeding or attempting pregnancy; have an unexplained lump, nipple discharge, abnormal imaging, active breast disease, infection, bleeding disorder, uncontrolled diabetes, impaired healing, significant sagging or a serious underlying condition. Previous injections involving an unknown filler, silicone or biopolymer also require careful investigation. Medical clearance, imaging or referral to a breast specialist or plastic surgeon may be necessary."
    }],
  },
  "muscle-toning": {
    slug: "muscle-toning",
    tagline: "Strengthen the look of selected muscles and create firmer body definition",
    overview: "Muscle toning is a non surgical body contouring treatment that uses controlled electrical or electromagnetic stimulation to produce repeated contractions within selected muscle groups. Depending on the equipment available and the area being treated, Melt Aways may use Emsculpt or a similar body sculpting system. Treatment is intended to support muscle conditioning, visible firmness and body definition. It does not replace strength training, regular movement, balanced nutrition or medical rehabilitation.",
    howItWorks: "Applicators are positioned over the selected muscle group and secured where necessary. The device delivers controlled electrical impulses or an electromagnetic field that activates the nerves responsible for muscle movement. This produces repeated involuntary contractions without requiring you to perform each movement consciously. Treatment begins at a manageable intensity and may be increased gradually according to your comfort, muscle response and the protocol for the selected equipment. Muscle stimulation may be used independently or combined with separate treatments for fat reduction, skin firmness or temporary fluid retention when appropriate.",
    benefits: ["May improve the appearance of muscle tone",
    "Supports firmer looking body contours",
    "May create greater definition in selected areas",
    "Encourages stronger engagement of targeted muscles",
    "May improve the appearance of the abdomen or buttocks",
    "Can support muscle reconditioning after reduced activity where appropriate",
    "Complements regular exercise and an active lifestyle",
    "May support visible tone following weight changes",
    "Can form part of a wider body contouring programme"],
    idealFor: ["Limited abdominal definition",
    "A soft or poorly conditioned appearance",
    "Reduced muscle tone following weight loss",
    "Difficulty engaging selected muscles during exercise",
    "Changes in abdominal tone following pregnancy",
    "Reduced buttock firmness",
    "Limited definition in the thighs",
    "Muscle deconditioning following a period of inactivity",
    "Maintaining visible tone alongside regular exercise",
    "Clients seeking greater firmness in selected muscle groups",
    "Suitable areas of the abdomen, buttocks, thighs, calves or upper arms"],
    whatToExpect: "Your appointment begins with an assessment of the targeted muscle group, existing tone, surrounding fat, skin firmness, exercise habits, previous injuries, operations and relevant health conditions. The applicators are positioned to produce a balanced contraction, and the session usually begins at a lower intensity. You may experience strong contractions, tightening, rhythmic pulsing, pressure, tingling, tapping, vibration or temporary cramping. The sensation can feel unusual and intense but should remain manageable. Mild soreness or fatigue may occur afterwards, similar to the feeling following a demanding workout. Visible changes generally develop gradually rather than immediately.",
    aftercare: "Maintain normal hydration unless medically restricted and continue gentle movement after treatment. Allow the targeted muscles adequate time to recover and avoid immediately overtraining an area that feels sore or fatigued. You may resume your regular exercise routine when comfortable. Continue balanced nutrition and appropriate physical activity to support and maintain visible muscle tone. Avoid rubbing or irritating sensitive skin and follow any instructions provided for the equipment used. Contact Melt Aways if you experience severe pain, significant weakness, persistent cramping, blistering, unusual swelling or another concerning reaction.",
    duration: "Appointment length varies according to the equipment used, the muscle group being treated, the number of areas selected and the intensity of the session. Your expected treatment time will be confirmed during consultation.",
    sessions: "Muscle toning is commonly planned as a short, carefully spaced series rather than a single appointment. The number of sessions depends on the device, treatment area, starting muscle condition, intensity, response and desired level of definition. Muscles require time to recover and adapt, so more frequent treatment is not automatically more effective. Maintenance sessions may be recommended where appropriate.",
    faqs: [{
      question: "When may I notice a difference?",
      answer: "The area may temporarily feel tighter immediately after treatment because the muscles have contracted repeatedly. Visible improvements may develop more gradually as the muscles respond and recover between sessions. Results depend on your starting muscle condition, surrounding fat, skin firmness, treatment intensity, completed sessions, exercise habits, nutrition and individual response."
    },
    {
      question: "How long may the results last?",
      answer: "Visible improvements may be easier to maintain with regular strength training, consistent physical activity, balanced nutrition, stable body weight, adequate rest and suitable maintenance treatments. Without continued activity, muscles can gradually lose conditioning. Treatment cannot permanently prevent future loss of tone, weight gain, pregnancy related changes or natural ageing."
    },
    {
      question: "Does muscle toning hurt?",
      answer: "The contractions may feel intense, tight or demanding, but they should remain manageable. Some clients experience temporary cramping or mild muscle soreness afterwards. The intensity should be adjusted to your tolerance, and stronger settings should not be used simply to create the impression of a more effective treatment."
    },
    {
      question: "Is there downtime?",
      answer: "Most clients can return to their normal routine after treatment. Temporary soreness, localised fatigue, mild redness, tenderness, tingling, cramping, tightness, skin sensitivity or temporary weakness may occur. Severe pain, significant weakness or worsening symptoms should be reported promptly."
    },
    {
      question: "Is muscle toning the same as exercise?",
      answer: "No. The device can produce repeated contractions within a selected muscle group, but it does not train cardiovascular fitness, coordination, balance, mobility, bone strength, endurance or full body functional movement. Muscle stimulation works best as a body contouring aid alongside regular exercise rather than as a replacement for physical activity."
    },
    {
      question: "Does muscle toning burn fat?",
      answer: "That depends on the exact equipment and treatment settings. Some electromagnetic systems are designed to affect both muscle and fat, while others primarily stimulate muscle contractions. If a significant layer of fat covers the targeted muscle, separate fat reduction treatment may be considered. Muscle toning should not be presented as effortless weight loss or a treatment for obesity."
    },
    {
      question: "Can muscle toning be combined with other treatments?",
      answer: "Yes, when each treatment has a clear purpose and the combination is considered suitable. Muscle stimulation may address the underlying muscle, while cavitation or another method may target selected fat. Radiofrequency may address reduced skin firmness, and lymphatic drainage may assist with temporary fluid retention. Combining multiple treatments does not automatically produce a better result."
    },
    {
      question: "Is muscle toning safe?",
      answer: "Muscle stimulation may be performed safely when the client is properly screened, suitable equipment is used and the applicators are positioned according to the manufacturer’s instructions. Possible reactions include muscle pain, cramping, redness, swelling, bruising, skin irritation, altered sensation, burns with certain electrical devices, aggravation of an existing injury or interference with implanted electronic devices."
    },
    {
      question: "Who may need treatment postponed or medical clearance?",
      answer: "Treatment may need to be postponed, changed or medically cleared if you are pregnant, recently gave birth or are breastfeeding; have a pacemaker, defibrillator, copper intrauterine device or another implanted electronic or metal device; or have epilepsy, heart disease, a blood clot, hernia, severe abdominal separation, recent surgery, reduced sensation, an active infection, an unresolved injury, uncontrolled diabetes, kidney disease, cancer or a significant muscle, nerve or circulatory condition. Suitability must be assessed using the guidance for the exact device."
    }],
  },
  "butt-filler": {
    slug: "butt-filler",
    tagline: "",
    overview: "",
    howItWorks: "",
    benefits: [],
    idealFor: [],
    whatToExpect: "",
    aftercare: "",
    duration: "",
    sessions: "",
    faqs: [],
  },
  "cavitation": {
    slug: "cavitation",
    tagline: "",
    overview: "",
    howItWorks: "",
    benefits: [],
    idealFor: [],
    whatToExpect: "",
    aftercare: "",
    duration: "",
    sessions: "",
    faqs: [],
  },
  "lymphatic-drainage": {
    slug: "lymphatic-drainage",
    tagline: "",
    overview: "",
    howItWorks: "",
    benefits: [],
    idealFor: [],
    whatToExpect: "",
    aftercare: "",
    duration: "",
    sessions: "",
    faqs: [],
  },
  "slimming-injections": {
    slug: "slimming-injections",
    tagline: "",
    overview: "",
    howItWorks: "",
    benefits: [],
    idealFor: [],
    whatToExpect: "",
    aftercare: "",
    duration: "",
    sessions: "",
    faqs: [],
  },
  "peptides": {
    slug: "peptides",
    tagline: "",
    overview: "",
    howItWorks: "",
    benefits: [],
    idealFor: [],
    whatToExpect: "",
    aftercare: "",
    duration: "",
    sessions: "",
    faqs: [],
  },
  "body-contouring": {
    slug: "body-contouring",
    tagline: "",
    overview: "",
    howItWorks: "",
    benefits: [],
    idealFor: [],
    whatToExpect: "",
    aftercare: "",
    duration: "",
    sessions: "",
    faqs: [],
  },
};