// Korean subject particle: "이" after consonant, "가" after vowel
const p = (s) => {
  if (!s) return '';
  const c = s.charCodeAt(s.length - 1);
  if (c < 0xAC00 || c > 0xD7A3) return '이(가)';
  return (c - 0xAC00) % 28 !== 0 ? '이' : '가';
};

const translations = {
  en: {
    appTitle: "Pain Questionnaire",
    appDesc: "Visually describe your pain to help your interpreter communicate with the doctor more accurately.",
    start: "Start",
    next: "Next →",
    back: "← Back",
    seeSummary: "View Summary →",
    startAgain: "Start Again",

    // Step labels
    stepOnset: "Step 1 · Select Pain Date",
    stepArea: "Step 2 · Select Pain Area",
    stepType: "Step 3 · Select Pain Type",
    stepIntensity: "Step 4 · Select Intensity",
    stepSummary: "Step 5 · Summary",

    // BodySelector
    selectBodyPart: "Where does it hurt?",
    tapBodyPart: "Touch the area on the body where you feel pain",
    comingSoon: "Coming soon — only head available now",
    tapHead: "Tap the head to continue",

    // HeadSelector
    whereDoesItHurt: "Which part of the head?",
    selectArea: "Tap the painful area on the diagram",
    selected: "Selected",
    tapToSelect: "Tap a region to select",
    selectedAreas: "Selected",
    selectAll: "Select All",
    unknownArea: "Not sure",
    headAll: "Entire Head",

    // Head regions
    top: "Crown", forehead: "Forehead",
    leftTemple: "Left Temple", rightTemple: "Right Temple",
    leftEye: "Left Eye Area", rightEye: "Right Eye Area",
    backNeck: "Back of Neck",

    // Body regions (3D selector)
    head: "Head",
    front_torso: "Front (Chest & Abdomen)",
    back_torso: "Back",
    right_hand: "Right Arm / Hand",
    left_hand: "Left Arm / Hand",
    hip: "Hip / Pelvis",
    right_leg: "Right Leg",
    left_leg: "Left Leg",

    // PainTypeSelector
    whatKindOfPain: "What type of pain?",
    selectType: "Select the closest type",
    tapPainType: "Tap a pain type",
    throbbing:  "Throbbing",
    stabbing:   "Stabbing",
    splitting:  "Splitting",
    squeezing:  "Squeezing",
    heavy:      "Heavy",
    aching:     "Aching",
    cold_sharp:      "Cold / Sharp",
    dull_foggy:      "Foggy / Dull",
    dizzy:           "Dizzy",
    aching_stabbing: "Aching / Stabbing",
    sharp_pain:      "Tingling / Electric",
    fever:           "Burning / Feverish",

    // IntensitySlider
    howIntense: "How intense is the pain?",
    dragSlider: "Drag the slider",
    noPain: "No pain", littlePain: "Little pain", worstPain: "Worst",
    pastLabel: "← Past", nowLabel: "Now →", daysUnit: "days ago",
    mild: "Mild", moderate: "Moderate", severe: "Severe", verySevere: "Very Severe",

    // Gender
    genderLabel: "Gender",
    gender_male: "Male",
    gender_female: "Female",

    // Onset
    whenDidItStart: "When did the pain start?",
    selectOnset: "Select the closest option",
    onset_today: "Today",
    onset_1to3days: "1–3 days",
    onset_1week: "~1 week",
    onset_2to3weeks: "2–3 weeks",
    onset_1month: "1+ month",
    onset_2months: "2 months",
    onset_3months: "3 months",
    onset_4months: "4 months",
    onset_5months: "5 months",
    onset_6months_plus: "6+ months",
    painOnset: "Pain started",
    painTrend: "Trend",

    // SummaryCard
    painSummary: "Pain Summary",
    reviewShare: "Review with your interpreter",
    painLocation: "Pain Area",
    painType: "Pain Type",
    intensity: "Intensity",
    expressionTitle: "How to describe it",
    medicalTerm: "Medical term",
    koreanExpr: "Expression to use",
    shareBtn: "Complete",
    editBtn: "Edit",
    disclaimer: "This is not a medical diagnosis. For interpreter reference only.",
    sessionNoteLabel: "Additional notes (optional)",
    sessionNotePlaceholder: "e.g. took medicine this morning, pain worse in the evening…",
    downloadPdf: "Download Summary PDF",
    pdfDownloaded: "summary.pdf downloaded",

    // PainSetupScreen
    painSetupTitle: "Pain history",
    painSetupSub: "When did it start and how has it changed?",
    painPatternTitle: "How has the pain changed?",
    pattern_same: "About the same",
    pattern_worse: "Getting worse",
    pattern_better: "Getting better",
    pattern_fluctuating: "Ups and downs",
    pattern_same_desc: "Constant since it started",
    pattern_worse_desc: "Gradually or suddenly worse",
    pattern_better_desc: "Improving over time",
    pattern_fluctuating_desc: "Comes and goes / varies",

    // TimelineEditor
    timelineTitle: "Pain intensity timeline",
    timelineSub: "Drag the nodes to adjust intensity",
    timelineNodeLabel: "Tap a node to add details",
    addNode: "+ Add point",
    removeNode: "Remove",
    nodeEditorTitle: "Details for this point",
    memoPlaceholder: "Optional note (e.g. after taking medicine)",
    memoLabel: "Note",
    done: "Done",
    timeStart: "Start",
    timeNow: "Now",
    timeMid: "Middle",

    anotherAreaQ: "Another area hurting too?",
    addAnotherArea: "+ Add another area",
    pastRecords: "Past records",
    noRecords: "No saved records",
    entryLabel: "Pain area",

    sameAreaAsAbove: "Use same area as previous",

    // Data consent modal
    consentTitle: "De-identified Pain Data Consent",
    consentDesc: "This service may collect de-identified pain data for future research and service improvement.",
    consentCollects: "What we collect:",
    consentCollectsList: ["Pain onset date", "Pain change pattern", "Pain area", "Pain type", "Pain intensity"],
    consentNotCollects: "What we do NOT collect:",
    consentNotCollectsList: ["Name", "Contact information", "National ID number", "Exact address", "Hospital name", "Any personally identifiable information"],
    consentNote: "Collected data is used only for statistical analysis and service improvement.",
    consentCanDecline: "You can still use this service even if you decline.",
    consentQuestion: "Do you consent to the use of de-identified pain data?",
    consentAgree: "I Agree",
    consentDecline: "I Decline",

    medicalExpressions: {
      throbbing: {
        medical: "Pulsating / Throbbing pain",
        phrase: (loc) => loc
          ? `The ${loc} throbs like a heartbeat and gets worse with each pulse.`
          : `The pain throbs like a heartbeat and gets worse with each pulse.`,
      },
      stabbing: {
        medical: "Stabbing / Lancinating pain",
        phrase: (loc) => loc
          ? `There is a sudden, sharp stabbing sensation in the ${loc}.`
          : `There is a sudden, sharp stabbing sensation, though the exact location is unclear.`,
      },
      splitting: {
        medical: "Severe / Splitting headache",
        phrase: (loc) => loc
          ? `The ${loc} feels like it is about to burst or split apart.`
          : `The head feels like it is about to burst or split apart.`,
      },
      squeezing: {
        medical: "Constricting / Tension-type pain",
        phrase: (loc) => loc
          ? `The ${loc} feels like it is being squeezed or pressed.`
          : `The head feels like it is being squeezed or pressed.`,
      },
      heavy: {
        medical: "Cephalic heaviness / Pressure pain",
        phrase: (loc) => loc
          ? `The ${loc} feels heavy and weighed down.`
          : `The head feels heavy and weighed down.`,
      },
      aching: {
        medical: "Dull aching headache",
        phrase: (loc) => loc
          ? `There is a deep, persistent aching sensation in the ${loc}.`
          : `There is a deep, persistent aching sensation, though the exact location is unclear.`,
      },
      cold_sharp: {
        medical: "Cold allodynia / Neuropathic sensitivity",
        phrase: (loc) => loc
          ? `The ${loc} feels cold, numb, and tingly — like an ice-cold sting.`
          : `The area feels cold, numb, and tingly — like an ice-cold sting.`,
      },
      dull_foggy: {
        medical: "Brain fog / Cognitive dullness",
        phrase: (loc) => loc
          ? `The ${loc} feels dull and foggy, like a heavy haze.`
          : `The head feels dull and foggy, like a heavy haze.`,
      },
      dizzy: {
        medical: "Vertigo / Dizziness-associated pain",
        phrase: (loc) => loc
          ? `There is a spinning, dizzy feeling around the ${loc}, making it hard to focus.`
          : `There is a spinning, dizzy feeling making it hard to focus.`,
      },
      aching_stabbing: {
        medical: "Dull aching / Stabbing headache",
        phrase: (loc) => loc
          ? `The ${loc} has a persistent deep ache with occasional sharp stabbing episodes.`
          : `There is a persistent deep ache with occasional sharp stabbing episodes.`,
      },
      sharp_pain: {
        medical: "Paresthesia / Electric-type pain",
        phrase: (loc) => loc
          ? `The ${loc} has a sharp, electric tingling sensation — like a sudden jolt or pins and needles.`
          : `There is a sharp, electric tingling sensation — like a sudden jolt or pins and needles.`,
      },
      fever: {
        medical: "Burning / Thermal pain",
        phrase: (loc) => loc
          ? `The ${loc} feels hot and burning, like heat radiating from within.`
          : `The area feels hot and burning, like heat radiating from within.`,
      },
    },
  },

  ko: {
    appTitle: "통증 문진 서비스",
    appDesc: "통증을 시각적으로 표현해서 통역사가 의사에게 더 정확하게 전달할 수 있도록 도와줍니다.",
    start: "시작하기",
    next: "다음 →",
    back: "← 뒤로",
    seeSummary: "요약 보기 →",
    startAgain: "다시 시작",

    // Step labels
    stepOnset: "Step 1 · 통증 시점 선택",
    stepArea: "Step 2 · 통증 부위 선택",
    stepType: "Step 3 · 통증 유형 선택",
    stepIntensity: "Step 4 · 통증 강도 선택",
    stepSummary: "Step 5 · 통증 요약",

    // BodySelector
    selectBodyPart: "어디가 아프신가요?",
    tapBodyPart: "아픔을 느끼는 신체 부위를 터치하세요",
    comingSoon: "준비 중 — 현재 머리 부위만 이용 가능합니다",
    tapHead: "머리를 눌러 계속하세요",

    // HeadSelector
    whereDoesItHurt: "머리 어느 부위가 아픈가요?",
    selectArea: "아픈 부위를 눌러주세요",
    selected: "선택됨",
    tapToSelect: "부위를 눌러 선택하세요",
    selectedAreas: "선택한 부위",
    selectAll: "전체 선택",
    unknownArea: "모르겠음",
    headAll: "머리 전체",

    // Head regions
    top: "정수리", forehead: "이마",
    leftTemple: "왼쪽 관자놀이", rightTemple: "오른쪽 관자놀이",
    leftEye: "왼쪽 눈 주변", rightEye: "오른쪽 눈 주변",
    backNeck: "뒷목",

    // Body regions (3D selector)
    head: "머리",
    front_torso: "앞면 (가슴·배)",
    back_torso: "등",
    right_hand: "오른팔 / 손",
    left_hand: "왼팔 / 손",
    hip: "골반",
    right_leg: "오른쪽 다리",
    left_leg: "왼쪽 다리",

    // PainTypeSelector
    whatKindOfPain: "어떤 종류의 통증인가요?",
    selectType: "가장 비슷한 유형을 선택하세요",
    tapPainType: "통증 유형을 눌러주세요",
    throbbing:  "욱신거리는 통증",
    stabbing:   "찌르는 통증",
    splitting:  "깨질 듯한 통증",
    squeezing:  "조이는 통증",
    heavy:      "무거운 통증",
    aching:     "쑤시는 통증",
    cold_sharp:      "시린 통증",
    dull_foggy:      "띵한 통증",
    dizzy:           "어지러운 통증",
    aching_stabbing: "쑤시고 찌르는 통증",
    sharp_pain:      "찌릿한 통증",
    fever:           "열이 나는 통증",

    // IntensitySlider
    howIntense: "통증이 얼마나 심한가요?",
    dragSlider: "슬라이더를 움직여 강도를 선택하세요",
    noPain: "통증 없음", littlePain: "약한 통증", worstPain: "극심",
    pastLabel: "← 과거", nowLabel: "지금 →", daysUnit: "일 전",
    mild: "약함", moderate: "보통", severe: "심함", verySevere: "매우 심함",

    // Gender
    genderLabel: "성별",
    gender_male: "남성",
    gender_female: "여성",

    // Onset
    whenDidItStart: "언제부터 아팠나요?",
    selectOnset: "가장 가까운 것을 선택하세요",
    onset_today: "오늘",
    onset_1to3days: "1~3일 전",
    onset_1week: "약 1주 전",
    onset_2to3weeks: "2~3주 전",
    onset_1month: "1달 이상",
    onset_2months: "2달 전",
    onset_3months: "3달 전",
    onset_4months: "4달 전",
    onset_5months: "5달 전",
    onset_6months_plus: "6달 이상",
    painOnset: "통증 시작",
    painTrend: "변화 양상",

    // SummaryCard
    painSummary: "통증 요약",
    reviewShare: "통역사와 함께 확인하세요",
    painLocation: "아픈 부위",
    painType: "통증 유형",
    intensity: "통증 강도",
    expressionTitle: "이렇게 표현해 보세요",
    medicalTerm: "의학 용어",
    koreanExpr: "한국어 표현",
    shareBtn: "완료",
    editBtn: "수정",
    disclaimer: "이 내용은 진단이 아닙니다. 통역 참고용입니다.",
    sessionNoteLabel: "추가 메모 (선택사항)",
    sessionNotePlaceholder: "예: 오늘 아침 약 복용, 저녁에 더 심해짐…",
    downloadPdf: "요약 PDF 다운로드",
    pdfDownloaded: "summary.pdf 다운로드 완료",

    // PainSetupScreen
    painSetupTitle: "통증 이력",
    painSetupSub: "언제부터, 어떻게 변화했나요?",
    painPatternTitle: "통증이 어떻게 변했나요?",
    pattern_same: "비슷해요",
    pattern_worse: "점점 심해져요",
    pattern_better: "나아지고 있어요",
    pattern_fluctuating: "좋아졌다 나빠졌다 해요",
    pattern_same_desc: "처음부터 지금까지 비슷함",
    pattern_worse_desc: "서서히 또는 갑자기 악화됨",
    pattern_better_desc: "시간이 지나며 나아지는 중",
    pattern_fluctuating_desc: "왔다 갔다 / 변화가 있음",

    // TimelineEditor
    timelineTitle: "통증 강도 변화 타임라인",
    timelineSub: "노드를 드래그해서 강도를 조절하세요",
    timelineNodeLabel: "노드를 탭해서 세부 정보를 입력하세요",
    addNode: "+ 시점 추가",
    removeNode: "삭제",
    nodeEditorTitle: "이 시점의 통증 정보",
    memoPlaceholder: "메모 (예: 약 복용 후)",
    memoLabel: "메모",
    done: "완료",
    timeStart: "처음",
    timeNow: "지금",
    timeMid: "중간",

    anotherAreaQ: "다른 부위도 아프신가요?",
    addAnotherArea: "+ 다른 부위 추가하기",
    pastRecords: "이전 기록",
    noRecords: "저장된 기록이 없습니다",
    entryLabel: "통증 부위",

    sameAreaAsAbove: "이전과 같은 부위 선택",

    // Data consent modal
    consentTitle: "비식별 통증 데이터 활용 동의",
    consentDesc: "본 서비스는 향후 연구 및 서비스 개선을 위해 비식별 통증 데이터를 수집할 수 있습니다.",
    consentCollects: "수집되는 정보:",
    consentCollectsList: ["통증 시작 시점", "통증 변화 양상", "통증 부위", "통증 유형", "통증 강도"],
    consentNotCollects: "수집하지 않는 정보:",
    consentNotCollectsList: ["이름", "연락처", "주민등록번호", "정확한 주소", "병원명", "개인을 식별할 수 있는 정보"],
    consentNote: "수집된 데이터는 통계 분석 및 서비스 개선 목적으로만 사용됩니다.",
    consentCanDecline: "동의하지 않아도 서비스를 계속 이용할 수 있습니다.",
    consentQuestion: "비식별 통증 데이터 활용에 동의하시나요?",
    consentAgree: "동의합니다",
    consentDecline: "동의하지 않습니다",

    medicalExpressions: {
      throbbing: {
        medical: "박동성 두통 (搏動性 頭痛)",
        phrase: (loc) => loc
          ? `${loc}${p(loc)} 심장 박동처럼 욱신욱신 뛰어요.`
          : `어디인지 확실하진 않지만 심장 박동처럼 욱신욱신 뛰어요.`,
      },
      stabbing: {
        medical: "자통성 두통 (刺痛性 頭痛)",
        phrase: (loc) => loc
          ? `${loc}에 갑자기 날카롭게 찌르는 느낌이 있어요.`
          : `어딘가에 갑자기 날카롭게 찌르는 느낌이 있어요.`,
      },
      splitting: {
        medical: "심한 두통 / 압박성 통증",
        phrase: (loc) => loc
          ? `${loc}${p(loc)} 쪼개질 듯이 아파요.`
          : `머리가 쪼개질 듯이 아파요.`,
      },
      squeezing: {
        medical: "긴장성 두통 (수축형)",
        phrase: (loc) => loc
          ? `${loc}${p(loc)} 조이거나 누르는 느낌이에요.`
          : `머리가 조이거나 누르는 느낌이에요.`,
      },
      heavy: {
        medical: "두중감 (頭重感)",
        phrase: (loc) => loc
          ? `${loc}${p(loc)} 무겁고 눌리는 느낌이에요.`
          : `머리가 무겁고 눌리는 느낌이에요.`,
      },
      aching: {
        medical: "둔통성 두통 (鈍痛性 頭痛)",
        phrase: (loc) => loc
          ? `${loc} 깊은 곳에서 묵직하게 쑤시는 느낌이 지속돼요.`
          : `어딘가 깊은 곳에서 묵직하게 쑤시는 느낌이 지속돼요.`,
      },
      cold_sharp: {
        medical: "신경성 두통 / 냉각 과민통",
        phrase: (loc) => loc
          ? `${loc}${p(loc)} 시리고 차갑게 저리는 느낌이에요.`
          : `머리가 시리고 차갑게 저리는 느낌이에요.`,
      },
      dull_foggy: {
        medical: "긴장형 두통 / 인지 기능 저하",
        phrase: (loc) => loc
          ? `${loc}${p(loc)} 전반적으로 띵하고 멍한 느낌이에요.`
          : `머리가 전반적으로 띵하고 멍한 느낌이에요.`,
      },
      dizzy: {
        medical: "현훈 (眩暈) / 두통성 어지럼증",
        phrase: (loc) => loc
          ? `${loc} 쪽이 어지럽고 빙글빙글 도는 느낌이에요.`
          : `어지럽고 빙글빙글 도는 느낌이에요.`,
      },
      aching_stabbing: {
        medical: "둔통 · 자통 혼합형 두통",
        phrase: (loc) => loc
          ? `${loc} 깊은 곳에서 쑤시는 느낌이 있다가 가끔씩 날카롭게 찌르는 통증이 와요.`
          : `묵직하게 쑤시는 느낌이 있다가 가끔씩 날카롭게 찌르는 통증이 와요.`,
      },
      sharp_pain: {
        medical: "감각이상 (感覺異常) / 신경통",
        phrase: (loc) => loc
          ? `${loc}에 전기가 오는 것처럼 찌릿찌릿한 느낌이에요.`
          : `어딘가에 전기가 오는 것처럼 찌릿찌릿한 느낌이에요.`,
      },
      fever: {
        medical: "작열통 (灼熱痛)",
        phrase: (loc) => loc
          ? `${loc}${p(loc)} 뜨겁고 화끈거리는 느낌이에요.`
          : `머리가 뜨겁고 화끈거리는 느낌이에요.`,
      },
    },
  },

  ms: {
    appTitle: "Borang Kesakitan",
    appDesc: "Huraikan kesakitan anda secara visual supaya jurubahasa boleh menyampaikannya dengan lebih tepat kepada doktor.",
    start: "Mulakan",
    next: "Seterusnya →",
    back: "← Kembali",
    seeSummary: "Lihat Ringkasan →",
    startAgain: "Mulakan Semula",

    // Step labels
    stepOnset: "Langkah 1 · Pilih Tarikh Sakit",
    stepArea: "Langkah 2 · Pilih Kawasan Sakit",
    stepType: "Langkah 3 · Pilih Jenis Sakit",
    stepIntensity: "Langkah 4 · Pilih Intensiti",
    stepSummary: "Langkah 5 · Ringkasan",

    // BodySelector
    selectBodyPart: "Di mana yang sakit?",
    tapBodyPart: "Sentuh kawasan pada badan yang anda rasa sakit",
    comingSoon: "Akan datang — hanya bahagian kepala tersedia",
    tapHead: "Ketik kepala untuk teruskan",

    // HeadSelector
    whereDoesItHurt: "Bahagian kepala mana yang sakit?",
    selectArea: "Ketik kawasan yang sakit pada gambar",
    selected: "Dipilih",
    tapToSelect: "Ketik kawasan untuk memilih",
    selectedAreas: "Kawasan dipilih",
    selectAll: "Pilih Semua",
    unknownArea: "Tidak pasti",
    headAll: "Keseluruhan Kepala",

    // Head regions
    top: "Ubun-ubun", forehead: "Dahi",
    leftTemple: "Pelipis Kiri", rightTemple: "Pelipis Kanan",
    leftEye: "Kawasan Mata Kiri", rightEye: "Kawasan Mata Kanan",
    backNeck: "Tengkuk",

    // Body regions (3D selector)
    head: "Kepala",
    front_torso: "Depan (Dada & Perut)",
    back_torso: "Belakang",
    right_hand: "Lengan / Tangan Kanan",
    left_hand: "Lengan / Tangan Kiri",
    hip: "Pinggul / Pelvis",
    right_leg: "Kaki Kanan",
    left_leg: "Kaki Kiri",

    // PainTypeSelector
    whatKindOfPain: "Apakah jenis kesakitan?",
    selectType: "Pilih jenis yang paling hampir",
    tapPainType: "Ketik jenis kesakitan",
    throbbing:  "Berdenyut",
    stabbing:   "Menusuk",
    splitting:  "Membelah",
    squeezing:  "Menekan",
    heavy:      "Berat",
    aching:     "Sengal",
    cold_sharp:      "Ngilu",
    dull_foggy:      "Kabur / Tebal",
    dizzy:           "Pening",
    aching_stabbing: "Sengal / Menusuk",
    sharp_pain:      "Kesemutan / Elektrik",
    fever:           "Panas / Terbakar",

    // IntensitySlider
    howIntense: "Seberapa teruk kesakitan itu?",
    dragSlider: "Seret gelangsar untuk menilai",
    noPain: "Tiada sakit", littlePain: "Sakit sedikit", worstPain: "Paling teruk",
    pastLabel: "← Lepas", nowLabel: "Kini →", daysUnit: "hari lepas",
    mild: "Ringan", moderate: "Sederhana", severe: "Teruk", verySevere: "Sangat Teruk",

    // Gender
    genderLabel: "Jantina",
    gender_male: "Lelaki",
    gender_female: "Perempuan",

    // Onset
    whenDidItStart: "Bila kesakitan bermula?",
    selectOnset: "Pilih yang paling hampir",
    onset_today: "Hari ini",
    onset_1to3days: "1–3 hari",
    onset_1week: "~1 minggu",
    onset_2to3weeks: "2–3 minggu",
    onset_1month: "1+ bulan",
    onset_2months: "2 bulan",
    onset_3months: "3 bulan",
    onset_4months: "4 bulan",
    onset_5months: "5 bulan",
    onset_6months_plus: "6+ bulan",
    painOnset: "Mula sakit",
    painTrend: "Perubahan",

    // SummaryCard
    painSummary: "Ringkasan Kesakitan",
    reviewShare: "Semak bersama jurubahasa anda",
    painLocation: "Kawasan Sakit",
    painType: "Jenis Kesakitan",
    intensity: "Intensiti",
    expressionTitle: "Cara menerangkannya",
    medicalTerm: "Istilah perubatan",
    koreanExpr: "Ungkapan untuk digunakan",
    shareBtn: "Selesai",
    editBtn: "Edit",
    disclaimer: "Ini bukan diagnosis perubatan. Untuk rujukan jurubahasa sahaja.",
    sessionNoteLabel: "Nota tambahan (pilihan)",
    sessionNotePlaceholder: "cth: ambil ubat pagi ini, sakit bertambah teruk malam…",
    downloadPdf: "Muat Turun PDF Ringkasan",
    pdfDownloaded: "summary.pdf dimuat turun",

    // PainSetupScreen
    painSetupTitle: "Sejarah kesakitan",
    painSetupSub: "Bila bermula dan bagaimana ia berubah?",
    painPatternTitle: "Bagaimana kesakitan berubah?",
    pattern_same: "Lebih kurang sama",
    pattern_worse: "Semakin teruk",
    pattern_better: "Semakin baik",
    pattern_fluctuating: "Naik turun",
    pattern_same_desc: "Sama sejak mula",
    pattern_worse_desc: "Bertambah teruk secara beransur atau tiba-tiba",
    pattern_better_desc: "Bertambah baik dari semasa ke semasa",
    pattern_fluctuating_desc: "Datang pergi / berubah-ubah",

    // TimelineEditor
    timelineTitle: "Garis masa intensiti kesakitan",
    timelineSub: "Seret nod untuk laraskan intensiti",
    timelineNodeLabel: "Ketik nod untuk tambah butiran",
    addNode: "+ Tambah titik",
    removeNode: "Buang",
    nodeEditorTitle: "Butiran untuk titik ini",
    memoPlaceholder: "Nota pilihan (cth: selepas ambil ubat)",
    memoLabel: "Nota",
    done: "Selesai",
    timeStart: "Mula",
    timeNow: "Kini",
    timeMid: "Pertengahan",

    anotherAreaQ: "Ada kawasan lain yang sakit?",
    addAnotherArea: "+ Tambah kawasan lain",
    pastRecords: "Rekod lepas",
    noRecords: "Tiada rekod tersimpan",
    entryLabel: "Kawasan kesakitan",

    sameAreaAsAbove: "Guna kawasan yang sama",

    // Data consent modal
    consentTitle: "Persetujuan Data Kesakitan Tanpa Pengenalan",
    consentDesc: "Perkhidmatan ini mungkin mengumpul data kesakitan tanpa pengenalan untuk penyelidikan dan penambahbaikan perkhidmatan.",
    consentCollects: "Apa yang kami kumpul:",
    consentCollectsList: ["Tarikh mula sakit", "Corak perubahan kesakitan", "Kawasan kesakitan", "Jenis kesakitan", "Intensiti kesakitan"],
    consentNotCollects: "Apa yang TIDAK kami kumpul:",
    consentNotCollectsList: ["Nama", "Maklumat hubungan", "Nombor Pengenalan", "Alamat tepat", "Nama hospital", "Sebarang maklumat pengenalan peribadi"],
    consentNote: "Data yang dikumpul hanya digunakan untuk analisis statistik dan penambahbaikan perkhidmatan.",
    consentCanDecline: "Anda boleh terus menggunakan perkhidmatan walaupun menolak.",
    consentQuestion: "Adakah anda bersetuju dengan penggunaan data kesakitan tanpa pengenalan?",
    consentAgree: "Saya Bersetuju",
    consentDecline: "Saya Tidak Bersetuju",

    medicalExpressions: {
      throbbing: {
        medical: "Sakit berdenyut",
        phrase: (loc) => loc
          ? `${loc} berdenyut seperti degupan jantung dan semakin teruk dengan setiap denyutan.`
          : `Kesakitan berdenyut seperti degupan jantung dan semakin teruk dengan setiap denyutan.`,
      },
      stabbing: {
        medical: "Sakit menusuk tajam",
        phrase: (loc) => loc
          ? `Ada sensasi menusuk yang tajam dan tiba-tiba di ${loc}.`
          : `Ada sensasi menusuk yang tajam dan tiba-tiba, walaupun kawasan tepat tidak pasti.`,
      },
      splitting: {
        medical: "Sakit kepala teruk / tekanan",
        phrase: (loc) => loc
          ? `${loc} terasa seperti hendak pecah atau terbelah.`
          : `Kepala terasa seperti hendak pecah atau terbelah.`,
      },
      squeezing: {
        medical: "Sakit kepala ketegangan (mengetat)",
        phrase: (loc) => loc
          ? `${loc} terasa seperti diperah atau ditekan.`
          : `Kepala terasa seperti diperah atau ditekan.`,
      },
      heavy: {
        medical: "Rasa berat di kepala",
        phrase: (loc) => loc
          ? `${loc} terasa berat dan tertekan.`
          : `Kepala terasa berat dan tertekan.`,
      },
      aching: {
        medical: "Sakit kepala tumpul / berterusan",
        phrase: (loc) => loc
          ? `Ada rasa sengal yang dalam dan berterusan di ${loc}.`
          : `Ada rasa sengal yang dalam dan berterusan, walaupun kawasan tepat tidak pasti.`,
      },
      cold_sharp: {
        medical: "Alodinia sejuk / sensitiviti neuropatik",
        phrase: (loc) => loc
          ? `${loc} terasa ngilu dan sejuk seperti terkena ais.`
          : `Kawasan tersebut terasa ngilu dan sejuk seperti terkena ais.`,
      },
      dull_foggy: {
        medical: "Kabus otak / Penurunan tumpuan",
        phrase: (loc) => loc
          ? `${loc} terasa kebas dan kabur, seperti ada kabus yang tidak hilang.`
          : `Kepala terasa kebas dan kabur, seperti ada kabus yang tidak hilang.`,
      },
      dizzy: {
        medical: "Vertigo / pening berkaitan sakit",
        phrase: (loc) => loc
          ? `Ada rasa pening dan berpusing di sekitar ${loc}, sukar untuk fokus.`
          : `Ada rasa pening dan berpusing, sukar untuk fokus.`,
      },
      aching_stabbing: {
        medical: "Sakit kepala tumpul dan menusuk",
        phrase: (loc) => loc
          ? `${loc} terasa sengal yang dalam dan berterusan, diselangi dengan episod menusuk yang tajam.`
          : `Ada rasa sengal yang dalam dan berterusan, diselangi dengan episod menusuk yang tajam.`,
      },
      sharp_pain: {
        medical: "Parestesia / Sakit jenis elektrik",
        phrase: (loc) => loc
          ? `${loc} terasa seperti kesemutan elektrik — seperti renjatan tiba-tiba atau jarum menusuk.`
          : `Ada rasa kesemutan elektrik — seperti renjatan tiba-tiba atau jarum menusuk.`,
      },
      fever: {
        medical: "Sakit terbakar / Sakit terma",
        phrase: (loc) => loc
          ? `${loc} terasa panas dan terbakar, seperti haba yang memancar dari dalam.`
          : `Kawasan tersebut terasa panas dan terbakar, seperti haba yang memancar dari dalam.`,
      },
    },
  },
  zh: {
    appTitle: "疼痛问卷",
    appDesc: "以视觉方式描述您的疼痛，帮助翻译员更准确地向医生说明。",
    start: "开始",
    next: "下一步 →",
    back: "← 返回",
    seeSummary: "查看摘要 →",
    startAgain: "重新开始",

    // Step labels
    stepOnset: "第1步 · 选择疼痛日期",
    stepArea: "第2步 · 选择疼痛部位",
    stepType: "第3步 · 选择疼痛类型",
    stepIntensity: "第4步 · 选择疼痛强度",
    stepSummary: "第5步 · 疼痛摘要",

    // BodySelector
    selectBodyPart: "哪里疼痛？",
    tapBodyPart: "触摸身体上感到疼痛的部位",
    comingSoon: "即将推出 — 目前仅可选择头部",
    tapHead: "点击头部继续",

    // HeadSelector
    whereDoesItHurt: "头部哪个部位疼痛？",
    selectArea: "在图示上点击疼痛部位",
    selected: "已选",
    tapToSelect: "点击部位进行选择",
    selectedAreas: "已选部位",
    selectAll: "全选",
    unknownArea: "不确定",
    headAll: "整个头部",

    // Head regions
    top: "头顶", forehead: "前额",
    leftTemple: "左太阳穴", rightTemple: "右太阳穴",
    leftEye: "左眼区域", rightEye: "右眼区域",
    backNeck: "后颈",

    // Body regions (3D selector)
    head: "头部",
    front_torso: "前面（胸部和腹部）",
    back_torso: "背部",
    right_hand: "右臂／手",
    left_hand: "左臂／手",
    hip: "髋部／骨盆",
    right_leg: "右腿",
    left_leg: "左腿",

    // PainTypeSelector
    whatKindOfPain: "是哪种疼痛？",
    selectType: "选择最接近的类型",
    tapPainType: "点击疼痛类型",
    throbbing:  "搏动性疼痛",
    stabbing:   "刺痛",
    splitting:  "裂开样疼痛",
    squeezing:  "紧压感",
    heavy:      "沉重感",
    aching:     "酸痛",
    cold_sharp:      "冷刺感",
    dull_foggy:      "迟钝／昏沉",
    dizzy:           "头晕",
    aching_stabbing: "酸痛／刺痛",
    sharp_pain:      "麻刺感",
    fever:           "灼热感",

    // IntensitySlider
    howIntense: "疼痛有多强烈？",
    dragSlider: "拖动滑块",
    noPain: "无疼痛", littlePain: "轻微疼痛", worstPain: "极度疼痛",
    pastLabel: "← 过去", nowLabel: "现在 →", daysUnit: "天前",
    mild: "轻微", moderate: "中度", severe: "严重", verySevere: "极严重",

    // Gender
    genderLabel: "性别",
    gender_male: "男",
    gender_female: "女",

    // Onset
    whenDidItStart: "疼痛是什么时候开始的？",
    selectOnset: "选择最接近的选项",
    onset_today: "今天",
    onset_1to3days: "1–3天",
    onset_1week: "约1周",
    onset_2to3weeks: "2–3周",
    onset_1month: "1个月以上",
    onset_2months: "2个月",
    onset_3months: "3个月",
    onset_4months: "4个月",
    onset_5months: "5个月",
    onset_6months_plus: "6个月以上",
    painOnset: "疼痛开始",
    painTrend: "变化趋势",

    // SummaryCard
    painSummary: "疼痛摘要",
    reviewShare: "与翻译员一起确认",
    painLocation: "疼痛部位",
    painType: "疼痛类型",
    intensity: "疼痛强度",
    expressionTitle: "如何描述",
    medicalTerm: "医学术语",
    koreanExpr: "使用的表达",
    shareBtn: "完成",
    editBtn: "编辑",
    disclaimer: "这不是医疗诊断。仅供翻译员参考。",
    sessionNoteLabel: "附加备注（可选）",
    sessionNotePlaceholder: "例：今早服药，晚上疼痛加剧…",
    downloadPdf: "下载摘要PDF",
    pdfDownloaded: "summary.pdf 已下载",

    // PainSetupScreen
    painSetupTitle: "疼痛史",
    painSetupSub: "何时开始，如何变化？",
    painPatternTitle: "疼痛如何变化？",
    pattern_same: "大致相同",
    pattern_worse: "越来越严重",
    pattern_better: "逐渐好转",
    pattern_fluctuating: "时好时坏",
    pattern_same_desc: "从开始到现在基本相同",
    pattern_worse_desc: "逐渐或突然加重",
    pattern_better_desc: "随时间逐渐改善",
    pattern_fluctuating_desc: "时有时无／有变化",

    // TimelineEditor
    timelineTitle: "疼痛强度时间线",
    timelineSub: "拖动节点调整强度",
    timelineNodeLabel: "点击节点添加详情",
    addNode: "+ 添加时间点",
    removeNode: "删除",
    nodeEditorTitle: "此时间点的详情",
    memoPlaceholder: "可选备注（例：服药后）",
    memoLabel: "备注",
    done: "完成",
    timeStart: "开始",
    timeNow: "现在",
    timeMid: "中间",

    anotherAreaQ: "还有其他部位疼痛吗？",
    addAnotherArea: "+ 添加其他部位",
    pastRecords: "历史记录",
    noRecords: "没有保存的记录",
    entryLabel: "疼痛部位",

    sameAreaAsAbove: "使用与上次相同的部位",

    // Data consent modal
    consentTitle: "匿名疼痛数据授权",
    consentDesc: "本服务可能收集匿名疼痛数据，用于未来研究及服务改进。",
    consentCollects: "我们收集的信息：",
    consentCollectsList: ["疼痛开始日期", "疼痛变化模式", "疼痛部位", "疼痛类型", "疼痛强度"],
    consentNotCollects: "我们不收集的信息：",
    consentNotCollectsList: ["姓名", "联系方式", "身份证号码", "详细地址", "医院名称", "任何可识别个人身份的信息"],
    consentNote: "收集的数据仅用于统计分析和服务改进。",
    consentCanDecline: "即使拒绝，您仍可继续使用本服务。",
    consentQuestion: "您是否同意使用匿名疼痛数据？",
    consentAgree: "我同意",
    consentDecline: "我不同意",

    medicalExpressions: {
      throbbing: {
        medical: "搏动性头痛",
        phrase: (loc) => loc
          ? `${loc}像心跳一样搏动，每次跳动都会加剧疼痛。`
          : `疼痛像心跳一样搏动，每次跳动都会加剧。`,
      },
      stabbing: {
        medical: "刺痛 / 锐痛",
        phrase: (loc) => loc
          ? `${loc}突然出现尖锐的刺痛感。`
          : `某处突然出现尖锐的刺痛感，但具体位置不确定。`,
      },
      splitting: {
        medical: "剧烈头痛 / 压裂感",
        phrase: (loc) => loc
          ? `${loc}感觉像是即将爆裂或裂开。`
          : `头部感觉像是即将爆裂或裂开。`,
      },
      squeezing: {
        medical: "收缩性 / 紧张型疼痛",
        phrase: (loc) => loc
          ? `${loc}感觉像是被挤压或按压着。`
          : `头部感觉像是被挤压或按压着。`,
      },
      heavy: {
        medical: "头部沉重感 / 压迫性疼痛",
        phrase: (loc) => loc
          ? `${loc}感觉沉重，像有重物压着。`
          : `头部感觉沉重，像有重物压着。`,
      },
      aching: {
        medical: "钝痛性头痛 / 持续性头痛",
        phrase: (loc) => loc
          ? `${loc}深处有持续的酸痛感。`
          : `某处深部有持续的酸痛感，但具体位置不确定。`,
      },
      cold_sharp: {
        medical: "冷性异常性疼痛 / 神经性过敏",
        phrase: (loc) => loc
          ? `${loc}感觉冰冷、麻木、刺痛——像冰冷的刺激。`
          : `该区域感觉冰冷、麻木、刺痛——像冰冷的刺激。`,
      },
      dull_foggy: {
        medical: "脑雾 / 注意力下降",
        phrase: (loc) => loc
          ? `${loc}感觉迟钝而昏沉，像一片云雾散不去。`
          : `头部感觉迟钝而昏沉，像一片云雾散不去。`,
      },
      dizzy: {
        medical: "眩晕 / 与头晕相关的疼痛",
        phrase: (loc) => loc
          ? `${loc}周围有旋转、眩晕的感觉，难以集中注意力。`
          : `有旋转、眩晕的感觉，难以集中注意力。`,
      },
      aching_stabbing: {
        medical: "钝痛 / 刺痛混合型头痛",
        phrase: (loc) => loc
          ? `${loc}深处有持续的酸痛感，并伴随突发的尖锐刺痛。`
          : `有持续的深部酸痛感，并伴随突发的尖锐刺痛。`,
      },
      sharp_pain: {
        medical: "感觉异常 / 电击样疼痛",
        phrase: (loc) => loc
          ? `${loc}有尖锐的电击麻刺感——像突然的触电或针刺感。`
          : `有尖锐的电击麻刺感——像突然的触电或针刺感。`,
      },
      fever: {
        medical: "灼烧痛 / 热性疼痛",
        phrase: (loc) => loc
          ? `${loc}感觉发热灼烧，像从内部散发出的热量。`
          : `该区域感觉发热灼烧，像从内部散发出的热量。`,
      },
    },
  },
};

export default translations;
