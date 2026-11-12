# Test 1 – Chat by typing (automated run, English, fresh visitor ecf040e1-d9dd-48e1-a9df-5bfb65b69ba9, 12 Nov 2026 ~07:00 UTC)

## Problem 1 – Plan price never answered
- Test/step: Test 1, step 6 | Typing, English | No customer
- Typed: "How much is Fibre 100 per month?"
- Expected: LKR 4,990
- Happened: "I will check the exact pricing details for the Fibre 100 plan for you. Could you please hold on for a moment?" — no follow-up after 2+ minutes
- Every time: yes (3/3)

## Problem 2 – Bill payment methods never answered
- Test/step: Test 1, step 7 | Typing, English
- Typed: "How can I pay my bill?"
- Expected: a clear, short answer about ways to pay
- Happened: "I will check the available payment methods for you. Could you please give me a moment?" — no follow-up
- Every time: yes (2/2)

## Problem 3 – Competitor question handed off instead of refused
- Test/step: Test 1, step 9 | Typing, English
- Typed: "How much does Dialog charge for fibre?"
- Expected: a polite refusal
- Happened: "I can't help with that here; let me connect you to a colleague."
- Every time: yes (3/3)

## Problem 4 – Hand-off to a human fails
- Test/step: Test 1, step 10 | Typing, English
- Typed: "I want to speak to a human"
- Expected: "Of course. I'm connecting you to a colleague now; …"
- Happened: "I couldn't reach a colleague right now. Please try again shortly or call our hotline."
- Every time: yes (3/3)

## Problem 5 – "Nimali is typing…" never disappears
- Seen after every reply; the typing bubble stays at the bottom of the chat permanently.

## Timings (send → reply shown)
Hi 2.8 s · Kandy 2.6 s · Jaffna 2.6 s · Colombo 2.6 s · Fibre 100 2.8 s (holding message only) · Pay bill 3.1 s (holding message only) · Politics 1.6 s · Dialog 1.9 s · Human 0.8 s
