window.PERSONAS = [
  { name: "Miesha Prince", email: "mieshaprince8@gmail.com", inReview: "MO EDL, Missouri Family Care Registry Background Check (overdue)", invalid: "none", missing: "10 required", eligible: "No" },
  { name: "Tracy Curry", email: "tracylcurry3814@gmail.com", inReview: "CNA License - AL, GCHEXS", invalid: "PAM Health Orientation Assessment", missing: "12 required, includes Flu Shot", eligible: "No" },
  { name: "Treshun Allen", email: "treshuun1@gmail.com", inReview: "none", invalid: "none", missing: "10 required, includes Flu Shot", eligible: "No" },
  { name: "Toryion Harris", email: "toryionharris14@gmail.com", inReview: "none", invalid: "PAM Health Orientation Assessment", missing: "10 required", eligible: "No" },
  { name: "Jami McClintock", email: "jamimcclintock@gmail.com", inReview: "none", invalid: "4, includes CNA License - AL", missing: "12 required", eligible: "No" },
  { name: "Jaime Silva", email: "jaime.silva12@hotmail.com", inReview: "none", invalid: "PAM Health Orientation Assessment", missing: "8 required", eligible: "No" }
];

window.SCENARIOS = [
  {
    id: "s1",
    title: "Miesha checks on GCHEXS",
    persona: { name: "Miesha Prince", email: "mieshaprince8@gmail.com" },
    chat: [
      { k: "click", t: "Already have an account" },
      { k: "type", t: "mieshaprince8@gmail.com" },
      { k: "type", t: "Where's my GCHEXS?" },
      { k: "type", t: "Yes please" }
    ],
    voice: [
      "Hi, I'm calling about a credential.",
      "When Fin asks which kind of help: \"One specific credential.\"",
      "When Fin asks for the email: \"m, i, e, s, h, a, p, r, i, n, c, e, the number eight, at gmail dot com.\"",
      "\"Yes, that's right.\"",
      "When Fin asks which credential: \"My GCHEXS. That's G, C, H, E, X, S.\"",
      "\"Yes, please open a case.\"",
      "\"No, that's all. Thanks.\""
    ],
    fin: [
      "Say GCHEXS is not on her profile. It must not claim it is In Review or invent a date.",
      "Give the catalog line: \"GCHEXS: Cost: $0-$51. Coverage: partially covered by ShiftKey: the fingerprint fee is not covered. ShiftKey takes 7-10 business days to enter the request. Results take 1-45 business days (depending on fingerprints).\"",
      "Say: \"Your MO EDL was uploaded on September 23, 2026 and is still In Review. ShiftKey hasn't published a processing time for this credential, so I can't give you an exact date, but I can create a case so the ShiftKey team can check on it for you.\"",
      "Say: \"Your Missouri Family Care Registry Background Check was uploaded on September 23, 2026. This credential can take up to 14 business days for processing, so you should have received a response by October 14, 2026. Since it's now [today's date] and it's still In Review, I can create a case for the ShiftKey team to review.\"",
      "Use the first name \"Miesha\" once, offer a case, read the case number digit by digit (voice), and say the Provider Support team follows up by email."
    ],
    pass: "GCHEXS is reported as not on her profile, both pending items are quoted, and a case is created."
  },
  {
    id: "s2",
    title: "Tracy: everything outstanding, then flu shots",
    persona: { name: "Tracy Curry", email: "tracylcurry3814@gmail.com" },
    chat: [
      { k: "click", t: "Already have an account" },
      { k: "type", t: "tracylcurry3814@gmail.com" },
      { k: "type", t: "What's still outstanding on my profile?" },
      { k: "type", t: "Tell me about my flu shot" },
      { k: "type", t: "Yes" }
    ],
    voice: [
      "\"I'm calling about my credentials.\"",
      "\"t-r-a-c-y-l, curry, three eight one four, at gmail dot com.\"",
      "\"Yes.\" then \"Everything. What's still outstanding?\"",
      "\"Yes, text me the list.\" (when offered)",
      "\"What about my flu shot?\"",
      "\"Yes, open a case.\" then \"That's all.\""
    ],
    fin: [
      "Say: \"Your CNA License - AL was uploaded on September 23, 2026. This credential can take up to 4 business days for processing, so you should have received a response by September 29, 2026. Since it's now [today's date] and it's still In Review, I can create a case for the ShiftKey team to review.\"",
      "Say: \"Your GCHEXS was uploaded on September 23, 2026. This credential can take up to 45 business days for processing, so I expect you'll have a response no later than November 30, 2026.\" No case needed for this one.",
      "Say: \"Your PAM Health Orientation Assessment (Facility Addon) has been marked Invalid. Please re-upload or complete it again so the ShiftKey team can review it.\"",
      "Mention 15 Missing required items, naming the first two (AL Elder & Adult Protective Services Abuse Registry, and Abuse, Neglect, and Misappropriation (Facility Addon)). Voice offers to text the full list; chat lists the names.",
      "On flu shots, explain two different credentials: \"Flu Shot\" is required and Missing; \"Flu Vaccine\" is optional and Missing. Both can be uploaded under Credentials in the ShiftKey app."
    ],
    pass: "Both In Review items, the Invalid item, the 15 count, and both flu credentials are covered, with a case for CNA License - AL only."
  },
  {
    id: "s3",
    title: "KDADS timeline",
    persona: null,
    chat: [
      { k: "click", t: "New to ShiftKey" },
      { k: "type", t: "How long does KDADS take?" },
      { k: "type", t: "No thanks" }
    ],
    voice: [
      "\"I want to know how long a credential takes.\"",
      "\"KDADS.\"",
      "\"No thanks, that's what I needed.\" (when offered an account check)"
    ],
    fin: [
      "Say: \"Kansas Department for Aging and Disability Services KDADS: Cost: $0 to the professional. Coverage: covered by ShiftKey. ShiftKey takes 7 - 10 business days to enter the request. Results take 10-20 business days.\"",
      "State that business days are Monday through Friday.",
      "Offer: \"If you already have a ShiftKey account, I can check where your own credential stands. Would you like me to do that?\"",
      "Not ask for an email before answering."
    ],
    pass: "The KDADS line is given and the account-check offer is made, with no case."
  },
  {
    id: "s4",
    title: "Louisiana State Police check, then Treshun",
    persona: { name: "Treshun Allen", email: "treshuun1@gmail.com" },
    chat: [
      { k: "click", t: "New to ShiftKey" },
      { k: "type", t: "How long does the Louisiana State Police background check take?" },
      { k: "type", t: "I have an account, it's treshuun1@gmail.com" },
      { k: "type", t: "So where is mine?" }
    ],
    voice: [
      "\"I'm waiting on my Louisiana State Police background check.\"",
      "When asked for email: \"t-r-e-s-h-u-u-n, that's two u's, then the number one, at gmail dot com.\"",
      "\"Yes, that's right.\" then \"That's all, thanks.\""
    ],
    fin: [
      "Give the general answer first: \"Louisiana State Police Background Check: Cost: $10 - $100 (depending on fingerprinting location). Coverage: covered by ShiftKey. ShiftKey takes 2-3 business days to enter the request. Results take 1-60 business days.\"",
      "After identity, say: \"Your Louisiana State Police Background Check was reviewed on September 23, 2026, and has been marked Valid in ShiftKey.\" with the expiration date March 4, 2028.",
      "Point out the doubled \"u\" when spelling the email back.",
      "Not offer a case (nothing is In Review)."
    ],
    pass: "The general line comes first, then Valid with the March 4, 2028 expiry."
  },
  {
    id: "s5",
    title: "\"I need to get paid\"",
    persona: { name: "Toryion Harris", email: "toryionharris14@gmail.com" },
    chat: [
      { k: "click", t: "Already have an account" },
      { k: "type", t: "toryionharris14@gmail.com" },
      { k: "type", t: "I need to get paid" },
      { k: "type", t: "How do I submit the invoice for the shift?" }
    ],
    voice: [
      "\"I need to get paid.\"",
      "\"A shift I worked. Yes, I have an account.\"",
      "\"t-o-r-y-i-o-n, harris, one four, at gmail dot com.\" then \"Yes.\"",
      "\"It's an invoice for a facility. I haven't submitted it yet. How do I submit it and when do I get paid?\"",
      "If Fin asks for a shift date or invoice number: \"I don't need you to look one up, just walk me through how to submit it.\"",
      "When Fin asks \"Does that answer your question?\": \"Yes, that's all, thanks.\""
    ],
    fin: [
      "Greet \"Toryion\" once.",
      "Explain submitting the invoice: digital in the ShiftKey mobile app (check in when you start, tap Start Check-out when you finish), or a paper Independent Professional Invoice Record uploaded on the web at www.shiftkey.com under your schedule.",
      "Say the facility reviews and approves, often moments after a digital submission and up to 5 days at most.",
      "Say payment goes to the chosen method: ShiftKey Wallet or Direct-to-Debit within minutes; Direct Deposit weekly on Tuesdays (approved by 1:00 pm CT Monday, paid Tuesday by 5:00 pm CT).",
      "Mention the Payments Report on the web, and a case with subject \"Invoice stuck or rejected\" if the invoice is stuck."
    ],
    pass: "The three steps (submit, facility approval, payment timing) are given with no credential talk."
  },
  {
    id: "s6",
    title: "Am I eligible to work? (no account)",
    persona: null,
    chat: [
      { k: "click", t: "New to ShiftKey" },
      { k: "type", t: "Am I eligible to work? What do I need?" }
    ],
    voice: [
      "\"I'm calling to see if I'm eligible to work.\"",
      "\"No, I don't have an account yet.\"",
      "\"No, thanks.\""
    ],
    fin: [
      "Step 1: download the ShiftKey app for iOS or Android and create your account.",
      "Step 2: complete credential verification: license or certification first, then government-issued photo ID, CPR BLS card, TB test from the past year, W-9, background check and registry checks.",
      "Say some facilities or states ask for additional credentials.",
      "Step 3: once required credentials are verified, start bidding on shifts.",
      "Pause between steps (voice), offer a status check if they have an account, and not ask for an email."
    ],
    pass: "All three steps are given including the app download, with no email request."
  },
  {
    id: "s7",
    title: "Jami: eligible to work?",
    persona: { name: "Jami McClintock", email: "jamimcclintock@gmail.com" },
    chat: [
      { k: "click", t: "Already have an account" },
      { k: "type", t: "jamimcclintock@gmail.com" },
      { k: "type", t: "Can I start picking up shifts?" },
      { k: "type", t: "Yes please" }
    ],
    voice: [
      "\"Am I eligible to work?\"",
      "\"Yes, I have an account.\"",
      "\"j-a-m-i, m-c-c-l-i-n-t-o-c-k, at gmail dot com.\" (note the double c) then \"Yes.\"",
      "\"Yes, text it to me.\"",
      "\"Yes, open a case.\" (if help with the Invalid item is offered)"
    ],
    fin: [
      "Say, word for word: \"Not yet, Jami. You have 16 required credentials that still need attention. The first one to fix: Your CNA License - AL was reviewed on September 16, 2026 and has been marked Invalid with the note: No AL CNA license found on registry. Please upload the requested document.\"",
      "Mention the number of other items needing attention and offer to text the list (voice).",
      "Spell back the double c in her email (voice).",
      "Read the case number digit by digit if a case is created (voice)."
    ],
    pass: "The CNA License - AL script is quoted exactly and Fin says she is not yet eligible."
  },
  {
    id: "s8",
    title: "How to set up pay (no account)",
    persona: null,
    chat: [
      { k: "click", t: "New to ShiftKey" },
      { k: "type", t: "How do I set up pay?" },
      { k: "type", t: "Are there fees?" }
    ],
    voice: [
      "\"I need to set up how I get paid.\"",
      "\"Setting up a payment method. No account yet.\"",
      "\"What are the fees?\"",
      "\"That's all.\""
    ],
    fin: [
      "Say to complete the IRS Form W-9 first.",
      "Then choose a method under Profile, then Payment Method in the app: ShiftKey Wallet (funds within minutes of invoice approval), Direct Deposit (linked checking account, paid weekly every Tuesday), Direct-to-Debit (existing debit card, funds within minutes of approval).",
      "On fees: ShiftKey Wallet $2.95 per payment; Direct-to-Debit $2.99 per payment or 2%, whichever is greater; Platform Safety Fee $3.89 per shift for everyone.",
      "Not state any fee for Direct Deposit."
    ],
    pass: "W-9 first, three methods, and the exact fees when asked."
  },
  {
    id: "s9",
    title: "Jaime: W-2 and 1099",
    persona: { name: "Jaime Silva", email: "jaime.silva12@hotmail.com" },
    chat: [
      { k: "click", t: "Already have an account" },
      { k: "type", t: "jaime.silva12@hotmail.com" },
      { k: "type", t: "Will I get a W-2?" },
      { k: "type", t: "How do I get my 1099?" }
    ],
    voice: [
      "\"I'm calling about taxes.\"",
      "\"Tax forms. Yes, I have an account.\"",
      "\"j-a-i-m-e, dot, s-i-l-v-a, one two, at hotmail dot com.\" then \"Yes.\"",
      "\"Will I get a W-2?\"",
      "\"Where do I find the 1099?\""
    ],
    fin: [
      "Say there is no W-2: ShiftKey is not your employer, independent professionals are independent contractors and receive a 1099 if they qualify.",
      "Say ShiftKey issues 1099-K (payments from facilities) and 1099-NEC (over $600 in incentives or similar payments from ShiftKey).",
      "Give directions: forms are available by January 31 on the web at www.shiftkey.com, Payments, then 1099s. They are not mailed.",
      "Say a completed W-9 is the prerequisite, ShiftKey cannot give tax advice, and the Payments Report is the fallback.",
      "Greet \"Jaime\" once."
    ],
    pass: "Fin says no W-2 and gives the web, Payments, 1099s, by January 31 directions."
  },
  {
    id: "s10",
    title: "Maine BCC timeline (no account)",
    persona: null,
    chat: [
      { k: "click", t: "New to ShiftKey" },
      { k: "type", t: "How long does Maine BCC take?" }
    ],
    voice: [
      "\"How long does a credential take?\"",
      "\"Maine BCC.\"",
      "\"No thanks.\""
    ],
    fin: [
      "Say: \"Maine BCC: Cost: $0 to the professional. there is no separate entry step. Results take 1-2 business days.\" (Fin may smooth the lowercase \"there\".)",
      "State business days are Monday to Friday.",
      "Offer to check their own status if they share the email."
    ],
    pass: "Cost, no separate entry step, and 1-2 business days are all given."
  }
];

window.NEGATIVES = [
  {
    id: "nA",
    title: "A: Unknown email, twice",
    persona: { name: "No real account", email: "nobody@example.com" },
    chat: [
      { k: "click", t: "Already have an account" },
      { k: "type", t: "nobody@example.com" },
      { k: "type", t: "nobody1@example.com" },
      { k: "type", t: "Yes, please open a case" }
    ],
    voice: [
      "\"I'm calling about my credential.\"",
      "\"n-o-b-o-d-y at example dot com.\" (nobody@example.com) then \"Yes.\"",
      "Second attempt: \"n-o-b-o-d-y-2 at example dot com.\" (nobody2@example.com) then \"Yes.\""
    ],
    fin: [
      "First miss, voice: \"I'm not seeing that email address in our system. Let's try it once more.\" Chat: \"I'm not seeing this email address in our system. Please try entering it again.\"",
      "After the second miss, voice: \"I'm sorry, I still can't find a ShiftKey account for that email address. Chat support is available daily, 7 AM to 7 PM Central, through Get Help in the ShiftKey app.\" Then the call ends.",
      "Chat second miss: \"I'm not able to find your account.\"",
      "Never ask a third time, and share no account data."
    ],
    pass: "No third ask, no account data shared, and the support hours line or a support case is offered."
  },
  {
    id: "nB",
    title: "B: Ambiguous credential",
    persona: { name: "Tracy Curry", email: "tracylcurry3814@gmail.com" },
    chat: [
      { k: "click", t: "Already have an account" },
      { k: "type", t: "tracylcurry3814@gmail.com" },
      { k: "type", t: "flu shot status" }
    ],
    voice: [
      "Identify as Tracy Curry (tracylcurry3814@gmail.com).",
      "\"What's the status of my background check?\""
    ],
    fin: [
      "Voice: ask which background check you mean and not guess a single credential.",
      "Chat (flu shot): explain both candidates. Flu Shot is required and Missing; Flu Vaccine is optional and Missing. It must not guess one."
    ],
    pass: "Fin does not guess a single credential."
  },
  {
    id: "nC",
    title: "C: \"I want a human\"",
    persona: null,
    chat: [
      { k: "type", t: "I want a human" }
    ],
    voice: [
      "\"I want to talk to a person.\""
    ],
    fin: [
      "Not claim to transfer the call.",
      "Give the hours line: \"Chat support is available daily, 7 AM to 7 PM Central, through Get Help in the ShiftKey app\".",
      "Offer a support case, and if you accept, read the case number digit by digit (voice)."
    ],
    pass: "Support hours are given and a case is offered."
  }
];
