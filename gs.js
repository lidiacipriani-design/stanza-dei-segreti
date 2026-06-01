// GAMESTATE — sistema di stato condiviso tra pagine
// Funziona sia con file:// che con https://
window.GS = {
  save(data) {
    const json = JSON.stringify(data);
    try { localStorage.setItem('gsdata', json); } catch(e) {}
    try { sessionStorage.setItem('gsdata', json); } catch(e) {}
  },
  load() {
    try {
      const p = new URLSearchParams(window.location.search).get('gs');
      if (p) { const d = JSON.parse(decodeURIComponent(p)); this.save(d); return d; }
    } catch(e) {}
    try { const d = localStorage.getItem('gsdata'); if (d) return JSON.parse(d); } catch(e) {}
    try { const d = sessionStorage.getItem('gsdata'); if (d) return JSON.parse(d); } catch(e) {}
    return null;
  },
  go(page, data) {
    this.save(data);
    try {
      window.location.href = page + '?gs=' + encodeURIComponent(JSON.stringify(data));
    } catch(e) { window.location.href = page; }
  },
  default() {
    return { teams:['Squadra 1','Squadra 2'], scores:[0,0], completedBy:[[],[],[]], clues:[], currentTeam:0, personaggioIdx:-1 };
  }
};
