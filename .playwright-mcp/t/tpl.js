async (page) => {
  const msgs = __MSGS__;
  const log = page.getByRole('log');
  const box = page.getByRole('textbox', { name: /Type your message|ඔබේ|உங்கள்/ });
  const replies = async () => log.evaluate(el => [...el.querySelectorAll('[aria-label]')].map(n => n.getAttribute('aria-label')).filter(s => !s.startsWith('You') && !/is typing/.test(s)));
  const typingNow = async () => log.evaluate(el => [...el.querySelectorAll('[aria-label]')].some(n => /is typing/.test(n.getAttribute('aria-label'))));
  const out = [];
  for (const m of msgs) {
    const before = (await replies()).length;
    await box.fill(m);
    const t0 = Date.now();
    await box.press('Enter');
    let typingAt = null, first = null, lastChange = 0, last = '';
    while (Date.now() - t0 < 50000 / msgs.length) {
      await page.waitForTimeout(100);
      const typing = await typingNow();
      if (typing && typingAt === null) typingAt = Date.now() - t0;
      const news = (await replies()).slice(before);
      const cur = news.join(' || ');
      if (news.length && first === null) first = Date.now() - t0;
      if (cur !== last) { last = cur; lastChange = Date.now() - t0; }
      if (first !== null && Date.now() - t0 - lastChange > 6000) break;
    }
    out.push({ sent: m, typingAtMs: typingAt, firstReplyMs: first, lastUpdateMs: lastChange, reply: last });
  }
  return out;
}
