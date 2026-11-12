async (page) => {
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByRole('log').waitFor();
  await page.waitForTimeout(2000);
  return { greeting: await page.getByRole('log').innerText(), header: await page.getByRole('dialog').innerText(), visitor: await page.evaluate(() => localStorage.getItem('omni.visitor_id')) };
}
