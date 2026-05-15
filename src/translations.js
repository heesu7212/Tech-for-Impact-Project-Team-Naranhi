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

    // Head regions
    top: "Crown", forehead: "Forehead",
    leftTemple: "Left Temple", rightTemple: "Right Temple",
    leftEye: "Left Eye Area", rightEye: "Right Eye Area",
    leftCheek: "Left Cheek", rightCheek: "Right Cheek",
    leftSide: "Left Side", rightSide: "Right Side",

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
    throbbing: "Throbbing",
    stabbing: "Stabbing",
    pressure: "Pressure",
    burning: "Burning",
    electric: "Electric",
    hollow: "Dull Ache",

    // IntensitySlider
    howIntense: "How intense is the pain?",
    dragSlider: "Drag the slider",
    noPain: "No pain", littlePain: "Little pain", worstPain: "Worst",
    pastLabel: "← Past", nowLabel: "Now →", daysUnit: "days ago",
    mild: "Mild", moderate: "Moderate", severe: "Severe", verySevere: "Very Severe",

    // Onset
    whenDidItStart: "When did the pain start?",
    selectOnset: "Select the closest option",
    onset_today: "Today",
    onset_1to3days: "1–3 days",
    onset_1week: "~1 week",
    onset_2to3weeks: "2–3 weeks",
    onset_1month: "1+ month",
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
    timelineTitle: "Pain timeline",
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
        medical: "Pulsating / Throbbing headache",
        phrase: (loc) => `The ${loc} throbs like a heartbeat and gets worse with each pulse.`,
      },
      stabbing: {
        medical: "Stabbing / Lancinating pain",
        phrase: (loc) => `There is a sudden, sharp stabbing sensation in the ${loc}.`,
      },
      pressure: {
        medical: "Tension-type headache",
        phrase: (loc) => `The ${loc} feels like it is being squeezed or pressed down heavily.`,
      },
      burning: {
        medical: "Burning pain (Causalgia)",
        phrase: (loc) => `The ${loc} feels hot and burning, like a stinging sensation.`,
      },
      electric: {
        medical: "Neuropathic pain",
        phrase: (loc) => `There is an electric, shooting, tingling feeling in the ${loc}.`,
      },
      hollow: {
        medical: "Dull aching pain",
        phrase: (loc) => `The ${loc} has a constant, heavy, dull ache.`,
      },
    },
  },

  ko: {
    appTitle: "통증 문진표",
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

    // Head regions
    top: "정수리", forehead: "이마",
    leftTemple: "왼쪽 관자놀이", rightTemple: "오른쪽 관자놀이",
    leftEye: "왼쪽 눈 주변", rightEye: "오른쪽 눈 주변",
    leftCheek: "왼쪽 볼", rightCheek: "오른쪽 볼",
    leftSide: "왼쪽 측면", rightSide: "오른쪽 측면",

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
    throbbing: "욱신거림",
    stabbing: "찌르는 통증",
    pressure: "압박감",
    burning: "화끈거림",
    electric: "찌릿찌릿",
    hollow: "둔한 통증",

    // IntensitySlider
    howIntense: "통증이 얼마나 심한가요?",
    dragSlider: "슬라이더를 움직여 강도를 선택하세요",
    noPain: "통증 없음", littlePain: "약한 통증", worstPain: "극심",
    pastLabel: "← 과거", nowLabel: "지금 →", daysUnit: "일 전",
    mild: "약함", moderate: "보통", severe: "심함", verySevere: "매우 심함",

    // Onset
    whenDidItStart: "언제부터 아팠나요?",
    selectOnset: "가장 가까운 것을 선택하세요",
    onset_today: "오늘",
    onset_1to3days: "1~3일 전",
    onset_1week: "약 1주 전",
    onset_2to3weeks: "2~3주 전",
    onset_1month: "1달 이상",
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
    timelineTitle: "통증 변화 타임라인",
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
        medical: "박동성 두통 (搏動性頭痛)",
        phrase: (loc) => `${loc}이(가) 심장 박동처럼 욱신욱신 뛰어요. 맥박이 느껴질 때마다 더 심해지는 것 같아요.`,
      },
      stabbing: {
        medical: "자통 (刺痛)",
        phrase: (loc) => `${loc}에 갑자기 날카롭게 찌르는 느낌이 와요.`,
      },
      pressure: {
        medical: "긴장성 두통",
        phrase: (loc) => `${loc}이(가) 눌리는 것처럼 조이고 짓누르는 느낌이에요.`,
      },
      burning: {
        medical: "작열통 (灼熱痛)",
        phrase: (loc) => `${loc}이(가) 화끈화끈 타는 것처럼 뜨겁고 따가워요.`,
      },
      electric: {
        medical: "신경통 (神經痛)",
        phrase: (loc) => `${loc}에서 전기가 오는 것처럼 찌릿찌릿한 느낌이 퍼져요.`,
      },
      hollow: {
        medical: "둔통 (鈍痛)",
        phrase: (loc) => `${loc}이(가) 뻐근하고 무거운 느낌으로 계속 아파요.`,
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

    // Head regions
    top: "Ubun-ubun", forehead: "Dahi",
    leftTemple: "Pelipis Kiri", rightTemple: "Pelipis Kanan",
    leftEye: "Kawasan Mata Kiri", rightEye: "Kawasan Mata Kanan",
    leftCheek: "Pipi Kiri", rightCheek: "Pipi Kanan",
    leftSide: "Sisi Kiri", rightSide: "Sisi Kanan",

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
    throbbing: "Berdenyut",
    stabbing: "Menusuk",
    pressure: "Tekanan",
    burning: "Terbakar",
    electric: "Elektrik",
    hollow: "Tumpul",

    // IntensitySlider
    howIntense: "Seberapa teruk kesakitan itu?",
    dragSlider: "Seret gelangsar untuk menilai",
    noPain: "Tiada sakit", littlePain: "Sakit sedikit", worstPain: "Paling teruk",
    pastLabel: "← Lepas", nowLabel: "Kini →", daysUnit: "hari lepas",
    mild: "Ringan", moderate: "Sederhana", severe: "Teruk", verySevere: "Sangat Teruk",

    // Onset
    whenDidItStart: "Bila kesakitan bermula?",
    selectOnset: "Pilih yang paling hampir",
    onset_today: "Hari ini",
    onset_1to3days: "1–3 hari",
    onset_1week: "~1 minggu",
    onset_2to3weeks: "2–3 minggu",
    onset_1month: "1+ bulan",
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
    timelineTitle: "Garis masa kesakitan",
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
        medical: "Sakit kepala berdenyut",
        phrase: (loc) => `${loc} berdenyut seperti degupan jantung dan semakin teruk dengan setiap denyutan.`,
      },
      stabbing: {
        medical: "Sakit menusuk",
        phrase: (loc) => `Ada sensasi menusuk yang tajam dan tiba-tiba di ${loc}.`,
      },
      pressure: {
        medical: "Sakit kepala ketegangan",
        phrase: (loc) => `${loc} terasa seperti ditekan atau diperas dengan berat.`,
      },
      burning: {
        medical: "Sakit terbakar",
        phrase: (loc) => `${loc} terasa panas dan terbakar seperti sensasi pedih.`,
      },
      electric: {
        medical: "Sakit neuropatik",
        phrase: (loc) => `Ada perasaan elektrik, menembak, dan kesemutan di ${loc}.`,
      },
      hollow: {
        medical: "Sakit tumpul",
        phrase: (loc) => `${loc} mempunyai sakit tumpul yang berat dan berterusan.`,
      },
    },
  },
};

export default translations;
