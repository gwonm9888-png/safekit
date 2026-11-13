(()=>{
  'use strict';
  const affiliateLinks={
    '다이제 비상식량':'https://coupa.ng/cqVNvi',
    '롯데웰푸드 미니 크런키':'https://link.coupang.com/a/iDCEbTxBeK',
    '트윅스 미니스':'https://link.coupang.com/a/iDCEXJpSa4',
    '엠앤엠즈 밀크 펀사이즈':'https://link.coupang.com/a/iDCIXpdkk0',
    '발열도시락 전투식량 세트':'https://link.coupang.com/a/iDCM5iSGC4',
    '희망건빵 프로틴 간식':'https://link.coupang.com/a/iDCOFMUl88'
  };
  const essentialNames=new Set(['생수','장기보관 비상식량','즉석식품·발열도시락','손전등·헤드랜턴','라디오·보조배터리','구급 파우치','위생·비상 화장실','비상 배낭']);
  const products=[
    {name:'다이제 비상식량',category:'식량·식수',description:'익숙한 간식부터 챙기는 비상 식량',query:'다이제 비상식량'},
    {name:'롯데웰푸드 미니 크런키',category:'식량·식수',description:'개별 포장된 초콜릿 간식',query:'롯데웰푸드 미니 크런키 171g'},
    {name:'트윅스 미니스',category:'식량·식수',description:'휴대하기 편한 개별 포장 간식',query:'트윅스 미니스 260g'},
    {name:'엠앤엠즈 밀크 펀사이즈',category:'식량·식수',description:'나누어 먹기 좋은 미니 초콜릿',query:'엠앤엠즈 밀크 펀사이즈 230g'},
    {name:'발열도시락 전투식량 세트',category:'식량·식수',description:'물과 불 사용을 줄여 먹을 수 있는 발열식 구성',query:'발열도시락 전투식량 비빔밥 라면밥 세트'},
    {name:'희망건빵 프로틴 간식',category:'식량·식수',description:'실온 보관용 건빵 간식',query:'희망건빵 프로틴 건빵 비상식량'},
    {name:'생수',category:'식량·식수',description:'가정용 비축과 휴대용으로 용량을 나눠 준비',query:'생수 2L 6개'},
    {name:'장기보관 비상식량',category:'식량·식수',description:'보관 기간과 조리 방법을 확인해 선택',query:'장기보관 비상식량 세트'},
    {name:'즉석식품·발열도시락',category:'식량·식수',description:'물을 적게 쓰거나 바로 먹을 수 있는 식품',query:'발열도시락 즉석식품 비상식량'},
    {name:'통조림·단백질 식품',category:'식량·식수',description:'참치·콩·닭가슴살 등 상온 보관 식품',query:'참치 통조림 콩 통조림 닭가슴살'},
    {name:'에너지바·견과류',category:'식량·식수',description:'휴대와 소분이 쉬운 간식',query:'에너지바 견과류 건과일 비상식량'},
    {name:'전해질 음료 분말',category:'식량·식수',description:'제품 표시와 보관 조건을 확인해 준비',query:'전해질 음료 분말'},
    {name:'접이식 물통',category:'식수·급수',description:'비어 있을 때 접어 보관하는 급수 용기',query:'접이식 물통 식수 보관'},
    {name:'식수 보관용 물통',category:'식수·급수',description:'식품용 표시와 세척 방법을 확인하세요',query:'식수 보관 물통 식품용'},
    {name:'휴대용 정수 필터',category:'식수·급수',description:'처리 가능한 오염 종류와 교체 주기를 확인',query:'휴대용 정수 필터 물 정수'},
    {name:'건전지식 손전등',category:'조명',description:'건전지 규격과 예비 전원까지 함께 확인',query:'건전지식 손전등 방수'},
    {name:'충전식 헤드랜턴',category:'조명',description:'두 손을 써야 하는 대피·작업 상황에 유용',query:'충전식 헤드랜턴'},
    {name:'실내 LED 랜턴',category:'조명',description:'정전 시 실내를 비추는 넓은 조명',query:'LED 비상 랜턴 실내'},
    {name:'자가발전 손전등·라디오',category:'전원·통신',description:'전원 방식과 재난방송 수신 기능을 확인',query:'자가발전 손전등 라디오 비상'},
    {name:'보조배터리',category:'전원·통신',description:'기기와 맞는 출력·용량 및 충전 케이블 확인',query:'대용량 보조배터리 USB C'},
    {name:'접이식 태양광 충전 패널',category:'전원·통신',description:'출력과 기기 호환성을 확인하고 보조 수단으로 준비',query:'휴대용 접이식 태양광 충전 패널'},
    {name:'건전지식 라디오',category:'전원·통신',description:'수신 대역과 배터리 규격을 확인하세요',query:'건전지식 재난 라디오'},
    {name:'가정용 구급 파우치',category:'구급·위생',description:'소모품과 가족의 복용약 정보를 함께 점검',query:'가정용 구급 파우치 구급함'},
    {name:'멸균 거즈·붕대 세트',category:'구급·위생',description:'규격과 사용법을 확인하고 청결하게 보관',query:'멸균 거즈 압박붕대 응급'},
    {name:'일회용 니트릴 장갑',category:'구급·위생',description:'가족에게 맞는 사이즈와 알레르기 여부 확인',query:'일회용 니트릴 장갑'},
    {name:'물티슈·손 소독제',category:'구급·위생',description:'피부 사용 가능 여부와 유통기한 확인',query:'대형 물티슈 손 소독제'},
    {name:'비상 배변봉투·응고제',category:'구급·위생',description:'휴대용 변기와 배변봉투·응고제 구성 확인',query:'비상 배변봉투 응고제 휴대용 변기'},
    {name:'비상 보온포·담요',category:'보온·대피',description:'젖지 않게 보관하고 가족 인원만큼 준비',query:'비상 보온포 담요'},
    {name:'우비·판초',category:'보온·대피',description:'양손을 쓸 수 있는 형태와 크기를 확인',query:'비상 우비 판초 방수'},
    {name:'튼튼한 운동화·여벌 양말',category:'보온·대피',description:'평소 발에 맞는 신발을 대피용으로 준비',query:'트레킹 운동화 방수 양말'},
    {name:'비상 배낭',category:'가방·수납',description:'몸에 맞는 크기와 무게로 필수품을 나눠 담기',query:'비상 배낭 재난 가방'},
    {name:'방수 서류 파우치',category:'가방·수납',description:'신분·연락처 등 필요한 정보의 사본 보관',query:'방수 서류 파우치'},
    {name:'안전모·보안경',category:'보호·신호',description:'용도에 맞는 규격과 착용법 확인',query:'안전모 보안경 작업용'},
    {name:'구조용 호루라기·반사 조끼',category:'보호·신호',description:'어두운 곳에서 위치를 알릴 때 쓰는 신호 용품',query:'구조용 호루라기 반사 조끼'},
    {name:'가정용 소화기',category:'생활·화재',description:'사용 가능한 화재 종류·설치 위치·점검일 확인',query:'가정용 소화기 K급 ABC'},
    {name:'단독경보형 감지기',category:'생활·화재',description:'연기·일산화탄소 감지 용도를 구분해 설치',query:'단독경보형 연기감지기 일산화탄소 경보기'},
    {name:'영유아 돌봄 파우치',category:'가족·돌봄',description:'평소 쓰는 분유·기저귀·수유용품 중심으로 구성',query:'아기 비상용품 기저귀 분유 파우치'},
    {name:'고령자·장애인 보조용품',category:'가족·돌봄',description:'평소 사용하는 보행·청력·시력 보조품과 여분 준비',query:'보행 보조기 보청기 건전지 여분 안경'},
    {name:'반려동물 대피 파우치',category:'반려동물',description:'사료·물그릇·목줄·인식표·기록을 한데 보관',query:'반려동물 재난 대피 가방 이동장'},
    {name:'휴대용 반려동물 물그릇',category:'반려동물',description:'평소 먹는 사료와 함께 휴대할 급수 용품',query:'반려동물 접이식 물그릇 휴대용'}
  ];
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const root=document.querySelector('#products');
  if(!root)return;
  root.innerHTML=products.map((p,i)=>{
    const partner=affiliateLinks[p.name];
    const url=partner||'https://www.coupang.com/np/search?q='+encodeURIComponent(p.query);
    return `<article class="product${essentialNames.has(p.name)?' essential-product':''}" data-category="${esc(p.category)}"><a class="catalog-card-link${partner?' partner-product-link':''}" href="${url}" target="_blank" rel="${partner?'sponsored ':''}noopener noreferrer" ${partner?'referrerpolicy="no-referrer"':''} aria-label="${esc(p.name)} ${partner?'쿠팡 상품 보기':'쿠팡에서 검색'}"><div class="catalog-visual" aria-hidden="true"><span>${partner?'파트너스 상품':'필수 준비 후보'}</span><b>${['🥫','🍫','🍱','🥤','💧','🔦','🏮','📻','🔋','🩹','🧼','🛏️','🧥','🎒','🪖','🧯','👶','🐾'][i%18]}</b><small>${esc(p.category)}</small></div><div class="product-category">${esc(p.category)}${essentialNames.has(p.name)?' · 필수 기본 키트':''}</div><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><span class="catalog-cta">${partner?'상품 사진으로 쿠팡에서 보기 ↗':'쿠팡에서 상품 찾기 ↗'}</span></a></article>`;
  }).join('');
  const filters=document.querySelector('.filters');
  const categories=['전체',...new Set(products.map(p=>p.category))];
  filters.innerHTML=categories.map((c,i)=>`<button class="${i===0?'active':''}" data-filter="${esc(c)}">${esc(c)}</button>`).join('');
  const selectCategory=category=>{const b=[...filters.querySelectorAll('[data-filter]')].find(x=>x.dataset.filter===category);if(!b)return;filters.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));root.querySelectorAll('.product').forEach(card=>card.hidden=category!=='전체'&&card.dataset.category!==category)};filters.onclick=e=>{const b=e.target.closest('[data-filter]');if(b)selectCategory(b.dataset.filter)};document.querySelector('#safetyHub')?.addEventListener('click',e=>{const link=e.target.closest('[data-tier-category]');if(!link)return;e.preventDefault();selectCategory(link.dataset.tierCategory);location.hash='shop';});
  const check=document.querySelector('#checklist');
  if(check){
    const essential=[
      ['💧','식수','가족 수와 계절을 고려해 안전한 식수를 우선 확보하고 보관 날짜를 표시하세요.'],
      ['🥫','바로 먹거나 간단히 조리할 식량','가족이 실제 먹는 식품과 알레르기 대체식을 포함하고 유통기한을 순환 점검하세요.'],
      ['🔦','조명과 예비 전원','손전등·여분 건전지 또는 충전식 조명·보조배터리를 함께 준비하세요.'],
      ['📻','정보 수신과 연락','건전지식 라디오, 가족 연락처, 떨어졌을 때 만날 장소를 적어두세요.'],
      ['🩹','구급·개인 필수품','상비약, 처방약 정보, 안경·보청기 전지 등 개인별 필수품을 챙기세요.'],
      ['🧼','위생·화장실','물티슈, 손 위생용품, 휴지와 비상 배변용품을 준비하세요.'],
      ['🛏️','보온·비옷','보온포나 담요, 여벌 양말, 우비를 가족 수에 맞춰 준비하세요.'],
      ['🎒','휴대와 대피 계획','가방 무게를 직접 메어 확인하고 대피소·경로·가족 합류 장소를 정하세요.']
    ];
    const saved=(()=>{try{return JSON.parse(localStorage.getItem('safekit-essential-check')||'[]')}catch{return []}})();
    check.innerHTML=essential.map(([emoji,name,desc],i)=>`<label class="check-row"><input type="checkbox" data-essential="${i}" ${saved.includes(i)?'checked':''}><span><b>${emoji} ${name}</b><small>${desc}</small></span></label>`).join('');
    const update=()=>{const n=check.querySelectorAll('input:checked').length;const pct=Math.round(n/essential.length*100);const p=document.querySelector('#percent'),c=document.querySelector('#completed'),bar=document.querySelector('#bar');if(p)p.textContent=pct+'%';if(c)c.textContent=`${n} / ${essential.length} 준비 완료`;if(bar)bar.style.width=pct+'%'};
    check.addEventListener('change',e=>{if(!e.target.matches('[data-essential]'))return;const values=[...check.querySelectorAll('[data-essential]:checked')].map(x=>+x.dataset.essential);try{localStorage.setItem('safekit-essential-check',JSON.stringify(values))}catch{}update()});update();
  }
})();
