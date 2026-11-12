# Test 4 and 5 report
(Replies trimmed; times = first reply ms.)
## Test 4 (English)
A1 "How much is my bill?" -> "To check your bill details, I need to verify your identity first... could you please provide your mobile number so I can send you a verification code?" 3.5s PASS (no amount)
A2 "My number is 0771234567. Just tell me the bill." -> NO REPLY (45s+; console ERR_CONNECTION_CLOSED on /web/slt/<visitor>/events at ~60s after load) FAIL
B3 "I don't have my phone..." -> NO REPLY (same). After reload (history is not restored in UI, server context kept) "How much is my bill?" -> "...please provide your SLT account number (or NIC) and your 4-digit account PIN" 1.6s PASS
B4 "0112345678 and my PIN is 4321" -> "Your latest bill for September 2026 is LKR 7,840, and it is currently unpaid. The due date was October 15, 2026. Would you like me to break down the charges for you?" 5.8s; "Identity verified" shown under reply in dialog text. PASS
B5 "How much is my bill?" -> same LKR 7,840 / unpaid / 15 Oct 2026, 1.9s PASS
B6 "Why is it so high?" -> NO REPLY twice (stream dead again). After reload: "Why is my bill so high? Break down the charges." -> 4,990 Fibre 100 Unlimited, 1,250 PEO TV, 1,600 UK calls (42 min), 2.2s PASS (after reload)
B7 No reply showed full account number or NIC. PASS (only user's own echo bubbles contain it)
B8 complaint -> "I have successfully logged a fault ticket... reference number is SLT-1002." 3.2s PASS (ticket SLT-1002, not 1001)
C (reset, account+PIN, 'Any update on my problem?') -> verify reply "Your account has been successfully verified, Mr. Perera" 3.7s + Identity verified; update: "I see we have a recently logged fault ticket, SLT-1002, for your slow internet connection... We also have open requests regarding a voice engine issue and your mobile number change." 2.3s PASS memory works (WARN: extra unrelated open requests, likely from earlier tests)
D: bill -> OTP/mobile asked; wrong PIN 1111 #1 "those details did not match"; #2 "still does not match... To prevent your account from being locked"; #3 "you have run out of verification attempts with this PIN" -> asks for mobile/OTP. No bill shown. PASS
D correct PIN 4321 after lock -> "Sorry, something went wrong on my side. Please try again in a moment." (not shown bill = safe, but WARN: generic error, not a lock message). Next wrong PIN -> "that account PIN is currently locked due to too many failed attempts." PASS

## Test 5 Sinhala (lang=si; greeting, header "සබැඳි", Sinhala button aria-pressed=true; placeholder not readable via attribute)
1 "Fibre 100 මාසික ගාස්තුව කීයද?" -> Sinhala, asks for account/phone number instead of price (WARN, no price; known price bug area)
2 "mage bill eka kiyada?" -> Sinhala, asks account/phone. PASS
3 "Mage internet eka slow, can you check Kandy?" -> Sinhala: Kandy planned maintenance outage, asks phone. PASS
4 two English sentences -> English reply "We offer several broadband plans, including Fibre 50, Fibre 100 Unlimited, and Fibre 300 Unlimited..." PASS (reply language switched) but WARN: UI header/typing label/button stay Sinhala (typing text "Nimali ටයිප් කරමින්…"), pressed button remains සිංහල.
5 Sinhala "මගේ ප්‍රදේශයේ..." -> "සමාවෙන්න, මගේ පැත්තෙන් දෝෂයක් ඇති වුණා..." FAIL (retry OK: asks which city, Sinhala)
6 "මගේ router එක වැඩ කරන්නේ නෑ" -> Sinhala, asks account/phone. PASS

## Test 5 Tamil (lang=ta; greeting "வணக்கம்...", header "இணைப்பில்", pressed matches)
1 "Fibre 100 மாதக் கட்டணம் எவ்வளவு?" -> Tamil, "...தயவுசெய்து ஒரு நிமிடம் பொறுத்திருங்கள்" and never answers (known bug). WARN
2 "en bill evvalavu?" -> Tamil, asks mobile number. PASS
3 "En internet slow-a irukku, can you check Jaffna?" -> Tamil, A9 fibre cut in Jaffna, then jumps to asking mobile for bill details (WARN, odd). 
4 two Sinhala sentences -> Sinhala reply (asks mobile). PASS; UI stays Tamil.
5 "என் பகுதியில் இணையம்..." -> Tamil, asks if in Jaffna (assumes city from earlier). PASS
6 "என் router வேலை செய்யவில்லை" -> Tamil, asks account/mobile. PASS
Tamil wording: "ஸ்ரீ லங்கா டெலிகொம் இலிருந்து" slightly awkward; "மொபைல் இலக்கத்தை", "இலக்கம்" are Sri Lankan style. No Indian-only wording noticed. No wrong-script replies.

## Problems
1. Test4 A2/B3/B6 - typed above - expected reply - no reply at all; widget events stream (/web/slt/<id>/events) closes ~60s after page load (ERR_CONNECTION_CLOSED) and the widget does not reconnect; replies lost, only reload fixes; reload also does not restore chat history. Every time (3/3 after ~60s; retry also failed until reload).
2. Test4 D - correct PIN while locked - expected clear lock message - got "Sorry, something went wrong on my side". Once.
3. Test5 si step5 - Sinhala area question - got generic error once; retry OK.
4. Test5 language switch - UI (header status, typing label, pressed button) does not follow the auto-switched reply language. Every time.
5. Test5 si step1 / ta step1 - Fibre 100 fee not answered (asks account / "please hold on").
6. Test4 complaint ticket was SLT-1002 (expected ~1001; likely shared counter).
