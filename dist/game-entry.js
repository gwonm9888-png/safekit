(() => {
  const root = document.getElementById("root");
  if (!root) return;
  const addEntry = () => {
    const nav = root.querySelector("nav");
    const hero = root.querySelector("section.L");
    if (nav && !nav.querySelector('[href="survival-game.html"]')) {
      const link = document.createElement("a");
      link.href = "survival-game.html";
      link.textContent = "🎮 생존 선택";
      nav.append(link);
    }
    if (hero && !document.getElementById("skGameEntry")) {
      const section = document.createElement("section");
      section.className = "sk-game-entry";
      section.id = "skGameEntry";
      const inner = document.createElement("div");
      inner.className = "sk-game-entry-inner";
      const copy = document.createElement("div");
      copy.innerHTML = '<span class="sk-game-entry-label">🎮 SAFEKIT INTERACTIVE · NEW</span><h2>공습경보가 울렸다면, 어떤 선택을 할까요?</h2><p>집 안 대기와 대피소 이동, 비상식량 선택까지 10번의 결정으로 체험해 보세요.</p>';
      const link = document.createElement("a");
      link.className = "sk-game-entry-link";
      link.href = "survival-game.html";
      link.textContent = "상황 선택 시작하기 →";
      inner.append(copy, link);
      section.append(inner);
      hero.after(section);
    }
    if (nav && hero) return true;
    return false;
  };
  if (addEntry()) return;
  const observer = new MutationObserver(() => {
    if (addEntry()) observer.disconnect();
  });
  observer.observe(root, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 12000);
})();
