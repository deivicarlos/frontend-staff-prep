# Session rules come back without the attacks they stop; S1's link-vs-CORS rule decayed

2026-11-25, lesson 12 (S2, AuthN from zero). Retrieval check **2/4**. Warm-up 0/1, cold 2/3,
applies 1: 2/3, 2: 1/3, 3: 3/5, 4: 2/3. Fixation trace not yet said back.

## Finding 1: he states the rule, not the attack it stops

- Apply 3 asked for rule **and** attack: 0 of 4 attacks named. Retrieval (3): three rules, no attacks.
- "Fixation" never appears. His regeneration rule lists role/permission/password change and drops
  login, the case that stops fixation.
- (4) client-side `setTimeout` timeout read as "delete on logout"; missed that the server must enforce it.
- Apply 3 (1): logout that only clears the cookie marked "fine", though his own cold answer said logout
  deletes the server entry. The rule he stated didn't carry to code (LR-0007 pattern).
- Apply 4 (2): password + OTP relay → "the password and the code", not "a logged-in session".
Same shape as lesson 7's "recalls what a tool does, omits when it fails".

## Finding 2: password storage half-held

Cold: "encrypted, md5". Retrieval: Argon2id because slow (right), but salt and one-way absent.
Apply 2 (2): salt's fix right, its limit (SHA-256 still fast) missed. (3) legacy upgrade: blank.

## Finding 3: S1 decayed in 27 days

Warm-up: a clicked cross-site link "is blocked as CORS blocks cross origin". Cleared 5/5 on 10-29
(LR-0022); the one-gate model ("CORS checks every request") is back. S3 (CSRF) is built on exactly
this distinction.

## What held

Session ID is the credential (Apply 1, retrieval 2). HttpOnly + Secure cookie. 64-bit IDs. Passkey
origin binding defeats a proxy (Apply 4, retrieval 4). Cold (b), (c) right from zero.

## What to do

1. He owes the fixation trace in his own words; grade it against the 4-step trace.
2. S3 opens with links/forms never meeting CORS as CSRF's mechanism, not as a warm-up.
3. Every security check from now asks rule → attack pairs; score the attack, not the rule.
4. Cold S2 retest ~12-02: the three properties of a password hash, and four session rules with attacks.
