(() => {
  const $ = (id) => document.getElementById(id);
  const clamp = (value) => Math.max(0, Math.min(100, value));
  const state = { life: 100, hunger: 16, stamina: 100, score: 0, route: "none", step: 0, answered: false };

  const scenes = {
    home: '<svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" role="img" aria-label="밤 시간 집 안과 창문"><defs><linearGradient id="homeSky" x2="0" y2="1"><stop stop-color="#344E52"/><stop offset="1" stop-color="#172D32"/></linearGradient><linearGradient id="homeWall" x2="0" y2="1"><stop stop-color="#83968B"/><stop offset="1" stop-color="#566C63"/></linearGradient></defs><rect width="1000" height="560" fill="url(#homeWall)"/><rect x="515" y="52" width="380" height="292" rx="8" fill="#21363B" stroke="#C4D2C8" stroke-width="12"/><rect x="531" y="68" width="348" height="260" fill="url(#homeSky)"/><path d="M531 259l70-73 54 43 64-98 82 88 78-45v154H531z" fill="#385357"/><path d="M531 299l72-45 54 28 64-58 78 47 80-31v88H531z" fill="#2B4448"/><circle cx="819" cy="119" r="18" fill="#E5D7A5"/><path d="M696 68v260M531 198h348" stroke="#C4D2C8" stroke-width="9"/><rect y="374" width="1000" height="186" fill="#455B53"/><path d="M90 408h350v118H90z" rx="18" fill="#60776B"/><path d="M113 395h304v42H113z" fill="#72877B"/><path d="M125 526v34m278-34v34" stroke="#314940" stroke-width="16"/><rect x="448" y="401" width="46" height="9" rx="4" fill="#D6C99C"/><path d="M462 410v76m-20 0h40" stroke="#D6C99C" stroke-width="5"/><circle cx="485" cy="397" r="18" fill="#E0D4AA" opacity=".28"/></svg>',
    entrance: '<svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" role="img" aria-label="공동주택 복도와 계단 입구"><defs><linearGradient id="hall" x2="0" y2="1"><stop stop-color="#A5B1A7"/><stop offset="1" stop-color="#5B7067"/></linearGradient></defs><rect width="1000" height="560" fill="url(#hall)"/><path d="M0 0h1000L740 560H0z" fill="#84958A"/><path d="M740 0h260v560H740z" fill="#667A70"/><path d="M0 380l740-90v270H0z" fill="#465B52"/><path d="M740 290h260v270H740z" fill="#334940"/><path d="M675 82h160v337H675z" fill="#41554B" stroke="#CCD5C9" stroke-width="10"/><path d="M693 101h124v297H693z" fill="#253A39"/><circle cx="793" cy="250" r="7" fill="#D6C99C"/><rect x="240" y="66" width="220" height="18" rx="9" fill="#E9E4D0"/><path d="M60 461h185l80-44h160l-82 50H125z" fill="#72867A"/><path d="M60 461v38h343v-32" fill="none" stroke="#CCD5C9" stroke-width="8"/><path d="M146 350h200" stroke="#AFC0B4" stroke-width="4"/></svg>',
    shelter: '<svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" role="img" aria-label="지하 대피시설 내부"><defs><linearGradient id="shelter" x2="0" y2="1"><stop stop-color="#71847B"/><stop offset="1" stop-color="#344D45"/></linearGradient></defs><rect width="1000" height="560" fill="url(#shelter)"/><path d="M0 0h1000v90H0z" fill="#A5B0A4"/><path d="M0 90h1000v16H0z" fill="#415B50"/><path d="M78 106h168v354H78zM754 106h168v354H754z" fill="#566B60"/><path d="M100 126h124v300H100zM776 126h124v300H776z" fill="#364F47"/><path d="M0 442h1000v118H0z" fill="#2D443B"/><rect x="324" y="155" width="350" height="170" rx="14" fill="#E2E9DE" opacity=".13"/><path d="M362 359h282v24H362zM392 383v76m222-76v76" stroke="#D4DCCF" stroke-width="12"/><rect x="421" y="115" width="158" height="50" rx="8" fill="#DDE8DB"/><text x="500" y="148" fill="#31594A" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="700">대피 안내</text><circle cx="500" cy="88" r="18" fill="#D6C99C" opacity=".8"/></svg>',
    night: '<svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" role="img" aria-label="밤의 도시와 대피로"><defs><linearGradient id="night" x2="0" y2="1"><stop stop-color="#344F55"/><stop offset="1" stop-color="#192F34"/></linearGradient></defs><rect width="1000" height="560" fill="url(#night)"/><circle cx="825" cy="105" r="34" fill="#D7D1B3" opacity=".75"/><path d="M0 348h124V205h126v143h100V150h143v198h104V228h116v120h118V176h142v172h27v212H0z" fill="#2D484C"/><path d="M145 238h20v25h-20zm39 0h20v25h-20zm168-47h22v27h-22zm43 0h22v27h-22zm42 0h22v27h-22zm166 65h18v24h-18zm39 0h18v24h-18zm145-51h21v26h-21zm43 0h21v26h-21z" fill="#D8C991" opacity=".62"/><path d="M0 447h1000" stroke="#83968A" stroke-width="8"/><path d="M560 560l120-113h320" fill="none" stroke="#A7B9AA" stroke-width="15"/><path d="M614 560l117-113" stroke="#D6C99C" stroke-width="4" stroke-dasharray="16 20"/><path d="M92 0l-20 95m118-82-26 112m722-108-31 126" stroke="#B9C8BD" stroke-width="4" opacity=".45"/></svg>'
  };

  const baseQuestions = [
    {
      scene: "home", time: "저녁 8시", place: "집 안",
      title: "공습경보가 울렸어요. 가장 먼저 확인할 것은?",
      copy: "휴대전화에 재난문자가 도착했습니다. 주변 소문보다 공식 경보와 안내를 먼저 확인해요.",
      choices: [
        { title: "민방공 문자와 정부 안내방송을 확인한다", note: "경보 종류와 현재 행동 안내를 먼저 파악해요.", score: 1, delta: { life: 0, hunger: 0, stamina: 0 }, feedback: "공식 안내를 먼저 확인했어요. 다음 선택은 안내된 대피 방법과 실제 이동 여건을 함께 봅니다." },
        { title: "단체 채팅방에서 들은 제보를 따라 움직인다", note: "내용과 시점이 확인되지 않은 소문일 수 있어요.", score: 0, delta: { life: -2, hunger: 1, stamina: -2 }, feedback: "미확인 제보는 서로 다른 행동을 유도할 수 있어요. 공식 문자와 방송에서 사실을 확인하세요." }
      ]
    },
    {
      scene: "entrance", time: "경보 직후", place: "이동 여부 판단",
      title: "안내문에 대피소가 표시됐습니다. 어디로 갈까요?",
      copy: "지정된 지하 대피시설이 안내됐고, 이동 경로가 통제되거나 위험하다는 추가 안내는 아직 없습니다.",
      choices: [
        { title: "가방을 들고 안내된 지하 대피시설로 이동한다", note: "공식 안내와 현장 통제가 허용하는 경로를 확인해요.", score: 1, delta: { life: 0, hunger: 0, stamina: -11 }, route: "shelter", feedback: "지정 대피시설로 향하는 경로를 선택했어요. 이동 중에는 현장 안내와 통제를 따라야 해요." },
        { title: "집 안쪽 창문 없는 공간에 머물며 방송을 듣는다", note: "이동 경로가 통제되거나 안전하지 않을 때 고려할 선택이에요.", score: 0, delta: { life: 0, hunger: 0, stamina: 0 }, route: "home", feedback: "집에 머무는 경로로 이어집니다. 실제로 대피 지시가 내려졌다면 공식 안내를 우선하고, 이동이 안전하지 않을 때는 현장 안내를 따라야 해요." }
      ]
    },
    {
      scene: "home", time: "저녁 8시 10분", place: "식사 선택",
      title: "한 끼를 골라야 해요. 무엇을 먹을까요?",
      copy: "전기와 조리 가능 여부가 불확실하고, 가방에는 밀봉 식수와 비상식량이 있습니다.",
      choices: [
        { title: "참치캔처럼 바로 먹을 수 있는 식품", note: "조리 연료와 물을 아낄 수 있어요.", score: 1, delta: { life: 0, hunger: -15, stamina: 2 }, feedback: "바로 먹는 식품을 선택했어요. 조리 없이 먹을 수 있는 식품은 물과 연료를 아끼는 데 도움이 됩니다." },
        { title: "라면을 준비한다", note: "안전한 식수와 안전한 조리 수단이 있을 때만 선택해요.", score: 0, delta: { life: 0, hunger: -21, stamina: -4 }, feedback: "따뜻한 식사는 도움이 될 수 있지만, 물과 안전한 조리 수단을 먼저 확인해야 해요. 조건이 불확실하면 조리 없이 먹을 수 있는 식품을 우선하세요." }
      ]
    },
    {
      scene: "shelter", time: "대피 중", place: "식수 확인",
      title: "물을 마실 시간이 됐습니다. 어떤 물을 고를까요?",
      copy: "집 안에 있든 대피 중이든, 마실 수 있는 물의 출처와 남은 양을 확인해야 합니다.",
      choices: [
        { title: "밀봉해 둔 식수를 조금씩 나누어 마신다", note: "가족이 마실 양을 확인하고 남은 양도 살펴요.", score: 1, delta: { life: 1, hunger: 0, stamina: 2 }, feedback: "안전하게 보관한 식수를 선택했어요. 남은 양을 확인해 가족과 나누어 두세요." },
        { title: "출처가 확인되지 않은 물을 바로 마신다", note: "물의 안전성을 모르면 건강에 위험할 수 있어요.", score: 0, delta: { life: -5, hunger: 2, stamina: -3 }, feedback: "출처와 안전성을 알 수 없는 물은 피하세요. 실제 상황에서는 당국의 식수 안내를 확인해야 합니다." }
      ]
    },
    {
      scene: "home", time: "이동 준비", place: "비상가방",
      title: "가방에 무엇을 챙길까요?",
      copy: "집에 머무르는 경우에도 비상가방은 출입구와 가까운 곳에 두고, 안내에 따라 이동할 수 있게 준비합니다.",
      choices: [
        { title: "준비해 둔 가벼운 비상가방을 바로 확인한다", note: "식수·식량·복용약·조명처럼 먼저 필요한 것을 확인해요.", score: 1, delta: { life: 0, hunger: 0, stamina: -2 }, feedback: "미리 준비한 가방을 확인했어요. 필요한 약과 가족별 물품이 들어 있는지도 점검하세요." },
        { title: "귀중품과 물건을 더 챙기느라 시간을 쓴다", note: "짐이 많아지면 이동과 휴식이 어려워질 수 있어요.", score: 0, delta: { life: 0, hunger: 1, stamina: -11 }, feedback: "물건을 더 챙기느라 체력이 줄었어요. 들고 이동할 수 있는 무게로 필수품을 우선하세요." }
      ]
    },
    {
      scene: "night", time: "전기가 불안정해짐", place: "조명 선택",
      title: "주변이 어두워졌습니다. 조명은 어떻게 쓸까요?",
      copy: "휴대전화는 연락과 안내 확인에도 필요하니 배터리를 아껴 쓰는 편이 좋아요.",
      choices: [
        { title: "손전등을 켜고 여분 건전지를 확인한다", note: "휴대전화 배터리를 연락과 안내 확인용으로 남겨요.", score: 1, delta: { life: 0, hunger: 0, stamina: 0 }, feedback: "손전등을 선택했어요. 여분 건전지와 충전 상태도 함께 확인해 두세요." },
        { title: "휴대전화 플래시를 계속 켜 둔다", note: "배터리가 빠르게 줄어 연락이 어려워질 수 있어요.", score: 0, delta: { life: 0, hunger: 0, stamina: -1 }, feedback: "휴대전화 배터리가 줄었어요. 조명은 손전등을 쓰고 휴대전화는 필요한 연락과 안내에 남겨두세요." }
      ]
    },
    {
      scene: "shelter", time: "저녁 8시 30분", place: "정보 확인",
      title: "새 소식이 계속 올라옵니다. 무엇을 믿을까요?",
      copy: "상황이 바뀔 수 있으니 게시물의 날짜와 출처, 공식 안내 여부를 확인하세요.",
      choices: [
        { title: "라디오와 정부 안내방송을 계속 확인한다", note: "경보 해제 뒤에도 추가 안내를 기다려요.", score: 1, delta: { life: 0, hunger: 0, stamina: 0 }, feedback: "공식 방송을 선택했어요. 최신 안내가 나올 때까지 계속 확인하세요." },
        { title: "확인되지 않은 SNS 글을 공유하고 따라간다", note: "오래된 정보나 잘못된 위치가 섞여 있을 수 있어요.", score: 0, delta: { life: -2, hunger: 0, stamina: -3 }, feedback: "미확인 정보는 혼란을 키울 수 있어요. 출처와 작성 시점을 확인한 뒤 행동하세요." }
      ]
    },
    {
      scene: "shelter", time: "가족 연락", place: "연락 방법",
      title: "가족에게 연락이 닿지 않습니다. 어떻게 할까요?",
      copy: "통신이 불안정할 수 있어요. 이미 정한 연락 담당자와 만날 장소가 있는지 확인합니다.",
      choices: [
        { title: "짧은 문자로 상태와 약속 장소를 남긴다", note: "연락을 한 사람에게 모으고 배터리를 아껴요.", score: 1, delta: { life: 0, hunger: 0, stamina: -1 }, feedback: "짧은 연락을 남겼어요. 가족과 미리 정한 합류 장소와 대체 연락 방법도 확인하세요." },
        { title: "가족을 찾으러 여러 장소를 계속 돌아다닌다", note: "이동이 위험하거나 통신이 끊기면 더 멀어질 수 있어요.", score: 0, delta: { life: -3, hunger: 1, stamina: -12 }, feedback: "찾아다니느라 체력이 줄었어요. 실제 상황에서는 공식 대피 안내와 사전에 정한 연락·합류 계획을 우선하세요." }
      ]
    },
    {
      scene: "home", time: "대기 시간", place: "체력 관리",
      title: "대기 시간이 길어집니다. 체력을 어떻게 관리할까요?",
      copy: "불필요하게 움직이면 체력과 물을 더 쓸 수 있어요. 현재 위치와 안내에 맞춰 행동합니다.",
      choices: [
        { title: "앉아서 쉬고 식수와 동행자 상태를 확인한다", note: "무리한 이동을 줄이고 다음 안내에 대비해요.", score: 1, delta: { life: 1, hunger: -1, stamina: 15 }, feedback: "휴식으로 스태미나가 회복됐어요. 가족의 건강 상태와 필요한 약도 확인하세요." },
        { title: "창밖과 출입구를 계속 확인하러 움직인다", note: "위험한 장소에 반복해서 접근하지 않도록 해요.", score: 0, delta: { life: -2, hunger: 1, stamina: -12 }, feedback: "불필요한 이동으로 체력이 크게 줄었어요. 안전한 위치에서 방송을 듣고 공식 안내를 기다리세요." }
      ]
    },
    {
      scene: "night", time: "추가 안내 도착", place: "마지막 선택",
      title: "사이렌 소리가 멈췄습니다. 이제 나가도 될까요?",
      copy: "소리가 잠시 멈춘 것만으로 상황이 끝났다고 판단하지 말고, 경보 해제와 후속 안내를 확인해야 합니다.",
      choices: [
        { title: "정부 안내방송에서 경보 해제와 이동 지침을 확인한다", note: "추가 안내가 있을 때까지 현재 안전한 장소에서 대기해요.", score: 1, delta: { life: 0, hunger: 0, stamina: 0 }, feedback: "경보 해제와 이동 안내를 확인했어요. 실제 상황에서는 정부와 지자체의 후속 지침을 따라야 합니다." },
        { title: "사이렌이 멈춘 것만 보고 곧바로 밖으로 나간다", note: "추가 안내나 현장 위험이 남아 있을 수 있어요.", score: 0, delta: { life: -6, hunger: 0, stamina: -8 }, feedback: "경보음만으로 상황 종료를 판단하지 마세요. 공식 해제와 후속 안내를 먼저 확인해야 해요." }
      ]
    }
  ];

  const sceneNames = { home: "집 안", entrance: "대피 경로", shelter: "지하 대피시설", night: "정전이 가까운 밤" };
  const art = (key) => scenes[key] || scenes.home;
  const paintStats = (changed) => {
    ["life", "hunger", "stamina"].forEach((key) => {
      const value = state[key];
      $(key + "Value").textContent = String(value);
      $(key + "Bar").style.width = value + "%";
      if (changed) {
        const card = document.querySelector('[data-stat="' + key + '"]');
        card.classList.remove("is-changing");
        void card.offsetWidth;
        card.classList.add("is-changing");
        window.setTimeout(() => card.classList.remove("is-changing"), 420);
      }
    });
    $("scoreLabel").textContent = "준비 선택 " + state.score + " / 10";
  };

  const renderQuestion = () => {
    const question = baseQuestions[state.step];
    const routeBasedStep = [2, 3, 4, 8].includes(state.step);
    const sceneKey = routeBasedStep ? (state.route === "home" ? "home" : "shelter") : question.scene;
    const scene = $("gameScene");
    scene.dataset.scene = sceneKey;
    $("sceneArt").innerHTML = art(sceneKey);
    $("sceneTime").textContent = question.time;
    $("sceneName").textContent = state.step > 1 ? sceneNames[sceneKey] : question.place;
    $("stepLabel").textContent = "선택 " + (state.step + 1) + " / 10";
    $("stepBar").style.width = (state.step * 10) + "%";
    $("questionType").textContent = "상황 " + String(state.step + 1).padStart(2, "0");
    $("questionTitle").textContent = question.title;
    const routeCopies = {
      2: { home: "집 안쪽 안전공간에서 대기 중입니다. 조리와 물 사용이 불확실하니 바로 먹을 수 있는 식품도 생각해 보세요.", shelter: "지정 대피시설로 이동했습니다. 배급과 조리 가능 여부가 확인되지 않아 바로 먹을 수 있는 식품도 고려해요." },
      3: { home: "집에 보관한 밀봉 식수를 확인합니다. 출처를 알 수 없는 물은 마시지 않아요.", shelter: "대피시설에서 식수 안내를 기다리는 중입니다. 밀봉 식수의 남은 양을 확인해요." },
      4: { home: "집 안에 머무르더라도 비상가방을 출입구 가까운 곳에 두고 필요한 물품을 확인해요.", shelter: "대피 중에는 가방을 몸 가까이에 두고, 꼭 필요한 물품을 바로 꺼낼 수 있게 해요." },
      8: { home: "집 안쪽 안전공간에서 대기 중입니다. 무리한 이동을 줄이고 동행자 상태를 살펴요.", shelter: "대피시설에서 대기 중입니다. 무리하게 이동하지 말고 동행자 상태와 안내를 확인해요." }
    };
    $("questionCopy").textContent = routeCopies[state.step]?.[state.route] || question.copy;
    $("answerFeedback").hidden = true;
    $("nextChoice").textContent = state.step === 9 ? "결과 확인" : "다음 상황 →";
    const choices = $("choices");
    choices.replaceChildren();
    question.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "sk-choice";
      const marker = document.createElement("span");
      marker.className = "sk-choice-index";
      marker.textContent = String.fromCharCode(65 + index);
      const content = document.createElement("span");
      const title = document.createElement("b");
      title.className = "sk-choice-title";
      title.textContent = choice.title;
      const note = document.createElement("small");
      note.className = "sk-choice-note";
      note.textContent = choice.note;
      content.append(title, note);
      const arrow = document.createElement("span");
      arrow.className = "sk-choice-arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "›";
      button.append(marker, content, arrow);
      button.addEventListener("click", () => selectChoice(button, choice));
      choices.append(button);
    });
    state.answered = false;
    $("stepBar").style.width = ((state.step + 1) * 10) + "%";
    window.scrollTo({ top: $("gameSession").offsetTop - 16, behavior: "smooth" });
  };

  const selectChoice = (selected, choice) => {
    if (state.answered) return;
    state.answered = true;
    state.life = clamp(state.life - 1 + choice.delta.life);
    state.hunger = clamp(state.hunger + 2 + choice.delta.hunger);
    state.stamina = clamp(state.stamina - 3 + choice.delta.stamina);
    state.score += choice.score;
    if (choice.route) state.route = choice.route;
    document.querySelectorAll(".sk-choice").forEach((button) => {
      button.disabled = true;
      if (button === selected) button.classList.add("is-selected");
    });
    paintStats(true);
    $("feedbackTitle").textContent = choice.score ? "준비에 도움이 되는 선택이에요" : "다음에는 이 점을 확인해 보세요";
    $("feedbackCopy").textContent = choice.feedback;
    $("answerFeedback").hidden = false;
    $("nextChoice").focus({ preventScroll: true });
  };

  const showResult = () => {
    $("gameSession").hidden = true;
    $("gameResult").hidden = false;
    $("stepBar").style.width = "100%";
    const cleared = state.score >= 7 && state.life >= 70 && state.hunger <= 40 && state.stamina >= 40;
    $("resultMark").textContent = cleared ? "🏁" : "🎒";
    $("resultKicker").textContent = cleared ? "CHALLENGE CLEARED" : "CHALLENGE RESULT";
    $("resultTitle").textContent = cleared ? "10번의 선택을 통과했어요!" : "가방과 선택을 한 번 더 점검해 봐요";
    $("resultCopy").textContent = cleared
      ? "공식 안내 확인, 필요한 물품, 체력 관리가 균형을 이뤘어요. 이 점수는 게임 결과이며 실제 상황의 안전을 보장하지 않습니다."
      : "선택에 따라 준비 점수와 컨디션이 달라졌어요. 특히 공식 정보 확인, 식수·식량, 조명, 휴식 선택을 다시 살펴보세요.";
    $("resultStats").innerHTML = [
      ["준비 선택", state.score + " / 10"],
      ["생명력", state.life],
      ["허기", state.hunger],
      ["스태미나", state.stamina]
    ].map(([label, value]) => '<div class="sk-result-stat"><b>' + label + '</b><span>' + value + '</span></div>').join("");
    window.scrollTo({ top: $("gameResult").offsetTop - 20, behavior: "smooth" });
  };

  $("coverArt").innerHTML = art("home");
  paintStats(false);
  $("startGame").addEventListener("click", () => {
    state.life = 100; state.hunger = 16; state.stamina = 100; state.score = 0; state.route = "none"; state.step = 0;
    $("gameIntro").hidden = true;
    $("gameResult").hidden = true;
    $("gameSession").hidden = false;
    paintStats(false);
    renderQuestion();
  });
  $("nextChoice").addEventListener("click", () => {
    if (!state.answered) return;
    if (state.step === 9) { showResult(); return; }
    state.step += 1;
    renderQuestion();
  });
  $("playAgain").addEventListener("click", () => {
    $("gameResult").hidden = true;
    $("gameIntro").hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  $("shareResult").addEventListener("click", async () => {
    const text = "SAFEKIT 전쟁 상황 선택 결과: 준비 선택 " + state.score + "/10 · 생명력 " + state.life + " · 허기 " + state.hunger + " · 스태미나 " + state.stamina;
    try {
      if (navigator.share) await navigator.share({ title: "SAFEKIT 생존 선택", text, url: location.href });
      else { await navigator.clipboard.writeText(text + " " + location.href); $("shareResult").textContent = "결과를 복사했어요"; }
    } catch (error) {
      if (error.name !== "AbortError") $("shareResult").textContent = "공유할 수 없어요";
    }
  });
})();
