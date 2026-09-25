# Canada-based eligibility for US "remote" roles (researched 2026-09-24)

Tags: **[P]** primary (company board/API, government, vendor's own docs) · **[S]** reputable secondary · **[A]** anecdotal.
Job-board data was pulled live on 2026-09-24 from the public Greenhouse/Ashby/Jobvite APIs. Postings change daily.
FX: 1 USD = 1.4136 CAD (Bank of Canada, 2026-09-24) [P] https://www.bankofcanada.ca/valet/observations/FXUSDCAD/json?recent=3

**Your two targets aren't the same number.** USD 180k ≈ **CAD 254k**. CAD 200k ≈ USD 141k.

---

## 1. "Remote" usually means remote within one country, and visa status is a separate question

- **The reasons are payroll, tax and entity.** One remote employee in a new US state can create tax nexus and require the employer to register for withholding and unemployment insurance there. A company can't run payroll for someone in a country where it has no entity or EOR. [S] https://rsmus.com/insights/services/business-tax/remote-workforces-are-complicating-state-tax-nexus-and-withholdi.html
- **Clearest example: NinjaOne.** Its postings say "Remote, 18 Locations", and every one of those 18 is a US state: "flexible on remote working from home, if you are located in the USA and reside in one of the following states - CA, CO, CT, FL…" This is from "Senior Performance Software Engineer". [P] https://jobs.jobvite.com/ninjaone/job/oSkmAfwS
- **How postings signal it:**
  - A country in the location field ("Remote U.S.", "Remote - USA", "United States - Remote").
  - Province lists ("Canada - Remote (ON, AB, BC, or NS Only)" at Instacart [P] https://instacart.careers/job/?gh_jid=7939947; "CA Remote (BC & ON only)" at Webflow [P] https://job-boards.greenhouse.io/webflow/jobs/8186854).
  - Pay ranges given only for US states.
  - Greenhouse only allows a country-only location on a job post if the role is remote, so "Remote" with country "US" is a normal setup. [P] https://support.greenhouse.io/hc/en-us/articles/360043197972-Remote-job-post-for-Indeed-and-LinkedIn-Limited-Listings
- **Knockout questions.** These are the real application-form questions on US-remote postings, pulled from the Greenhouse API on 2026-09-24 [P]:
  - Discord, Staff SWE, location "Remote": "Are you currently located in the US?" and "Are you legally authorized to work in the United States for our Company?" https://boards-api.greenhouse.io/v1/boards/discord/jobs/8464570002?questions=true
  - Affirm, Remote US: "Which U.S. State or Canadian Province do you reside in?" plus US work-authorization and sponsorship questions. https://boards-api.greenhouse.io/v1/boards/affirm/jobs/7671388003?questions=true
  - Instacart: "Are you authorized to work in the United States?" and "Which state or province do you currently live in?" https://boards-api.greenhouse.io/v1/boards/instacart/jobs/8147298?questions=true
  - GitLab: "Please choose the country in which you are located." https://boards-api.greenhouse.io/v1/boards/gitlab/jobs/8565469002?questions=true
- **Answers can reject you automatically.** Greenhouse "Auto-reject" rejects an applicant based on how they answer a job-post question, and can also send the rejection email. [P] https://support.greenhouse.io/hc/en-us/articles/360000653472-Auto-reject. Ashby has global auto-reject rules on its Enterprise plan. [P] https://docs.ashbyhq.com/global-application-questions-and-global-auto-reject-rules
  - **What this means for you:** if you honestly answer "not authorized in the US" or give a province as your location on a US-only post, you're likely rejected before anyone reads your resume. That fits your roughly one call from many applications.

## 2. How US companies hire in Canada

- **The four routes:** hire directly (register with the CRA and run payroll), set up a Canadian subsidiary, use an EOR, or engage a contractor. Deel calls EOR "often the most cost-effective and compliant strategy." It says contractors should use their own workspace, be hired for specific jobs rather than ongoing work, get no benefits, and advertise their services. [P, vendor] https://www.deel.com/blog/hire-and-pay-workers-in-canada/
- **EOR list prices** [P]:
  - Deel: EOR $599/mo, contractor $49/mo, Contractor of Record $325/mo. https://www.deel.com/pricing/
  - Remote: Canada EOR $699/mo. It warns contractor misclassification "may lead to fines and penalties" and that stock options for contractors can raise that risk. https://remote.com/country-explorer/canada
  - Oyster: EOR $699/mo, contractor $29/mo. https://www.oysterhr.com/pricing
- **CRA test for contractor vs employee.** Status comes from "all of the facts, including the actual terms and conditions… not just the intention." Signs of an employee: works "under the direction and control" of the payer and is "an integral part of the payer's business." [P] https://www.canada.ca/en/revenue-agency/services/tax/canada-pension-plan-cpp-employment-insurance-ei-rulings/employee-self-employed.html
  - A full-time senior engineer on a product team looks like an employee under this test. That is the misclassification risk a US company's legal team would weigh.
- **What large employers actually do.** Companies that hire in Canada mostly use a Canadian entity or an EOR, not contractors:
  - GitLab has GitLab Canada Corp (Vancouver). [P] https://handbook.gitlab.com/handbook/total-rewards/benefits/general-and-entity-benefits/canada-corp-benefits/
  - Vanta's Canada postings offer "Pension contribution" and medical, which means employee status. [P] https://jobs.ashbyhq.com/vanta/adcc38ca-79e9-4788-893d-bcdf03db10b2
  - Many companies post a separate Canada requisition with CAD pay (Affirm, Instacart, Coinbase; see §3).
- **Will a company turn a US-only role into a Canadian contract?** No primary data exists on how often this happens. Anecdotes point both ways:
  - "Most companies are pretty strict on location since that's where their employer of record and budget has to be." One applicant: "Turned out most were for US only candidates." [A] https://www.levels.fyi/community/thread/CFxBov/canada-remote-roles-for-us-companies
  - "only a handful of high-paying US companies that hire Canadians remotely. So your contractor route is intriguing." [A] https://www.teamblind.com/post/us-companies-that-hire-canadians-remotely-xo7xivc4
  - GitLab tells applicants: "some roles may carry specific location-based eligibility requirements. Our Talent Acquisition team can help answer any questions about location after…" So a recruiter can say yes, but only after you're in the process. [P] https://job-boards.greenhouse.io/gitlab/jobs/8739391002
  - **Inference:** at companies that already employ people in Canada, the realistic move is getting switched to their Canada requisition. That means an employee at Canadian pay, not a contractor at US pay. At companies with no Canadian entity, a contract is possible but depends on one person being willing, and the ATS knockout questions above stop most applications before that conversation happens.

## 3. The three named companies (live boards, 2026-09-24)

| Company | Canada presence | Canada-eligible eng roles now | Notes |
|---|---|---|---|
| **Vanta** | Yes. Canada-specific postings with a Canadian benefits package. | 7 of 88 postings are "Remote - Canada". Examples: Senior Fullstack SWE, GRC [P] https://jobs.ashbyhq.com/vanta/adcc38ca-79e9-4788-893d-bcdf03db10b2 · Senior SWE, Product Platform [P] https://jobs.ashbyhq.com/vanta/62945aae-55b0-4598-977a-b2dd00ec9081 · Staff SWE, Foundations Data Platform - CAN [P] https://jobs.ashbyhq.com/vanta/a59302dc-b7ea-4bba-af3c-ddab91489848 · Senior SWE, Developer Experience (US + Canada) [P] https://jobs.ashbyhq.com/vanta/dbd4e02c-0c6c-4031-a658-f57e88ec9943 | Canada postings list no pay range. US twins list one: Senior Fullstack USD 195–229k, Staff USD 260–306k [P, same board]. One secondary source says Vanta hires only in AB/ON/BC [S] https://www.remoterocketship.com/ca/company/vanta/ (not verified in the posting text). |
| **ClickUp** | Canada appears only as a secondary location. | Senior Frontend and Staff Frontend Engineer posted for "Poland; Canada; Bulgaria; Ukraine; Hungary; Czechia; Ireland", no pay listed [P] https://jobs.ashbyhq.com/clickup/941d0542-fe1c-45fb-b0d7-1865050f1e7e · https://jobs.ashbyhq.com/clickup/d29aff4d-d811-486d-ac04-5e0f4e3d7e82 · Staff Data Engineer (US + Canada) USD 169–211k [P] https://jobs.ashbyhq.com/clickup/e8c4b937-621a-47c1-b71c-f36073a62ec2 | The US FE postings are a separate requisition: Senior USD 160–210k, Staff 200–250k, Principal 250–300k [P] https://jobs.ashbyhq.com/clickup/0cb4e985-a3fa-4b96-8441-3471bcdeb5af. Grouping Canada with Poland and Eastern Europe suggests a lower pay band (inference). |
| **NinjaOne** | None found. Offices: Austin, Tampa, Berlin, Sydney and others [S] https://builtin.com/company/ninjaone/offices | **0 of 87** postings mention Canada. Remote engineering roles are limited to a list of US states [P] https://jobs.jobvite.com/ninjaone/jobs | A Canadian application almost certainly doesn't clear the location filter. Senior Performance SWE pays USD 150–230k in CA/CO/MD/NJ/WA/NY [P]. |

**Across 39 company boards scanned** (the ones listed below plus others such as OpenAI, Notion, Plaid, Vercel, Discord, Airbnb, Chime, Supabase, Replit, Linear), 287 of 1,345 software/frontend/fullstack postings named a Canadian location. Companies with **zero** included OpenAI, Notion, Plaid, Vercel, Discord, Airbnb, Chime, Replit, Squarespace. [P, API pull]

### Companies with current Canada-eligible engineering postings (verified 2026-09-24)

All ranges are base salary. "Remote" means the posting says remote in Canada. "Office/hybrid" means it names a Canadian office.

| # | Company | Posting (sample) | Mode | Posted Canada range |
|---|---|---|---|---|
| 1 | **Affirm** | Senior SWE, Frontend (App Experience) https://job-boards.greenhouse.io/affirm/jobs/7927799003 · Staff SWE, Frontend (App Experience) https://job-boards.greenhouse.io/affirm/jobs/7816193003 | Remote Canada | Senior **CAD 153–213k**. Staff **CAD 181–241k**. The US twin of the same role pays Senior USD 173–255k. |
| 2 | **Wealthsimple** | Senior Software Developer, Product Engineering (Canada or US) https://jobs.ashbyhq.com/wealthsimple/9f45d7bf-788e-456c-97d3-8fba8b88387d | Remote Canada | Senior **CA$151–189k** |
| 3 | **1Password** | Principal Engineer, Product Engineering https://jobs.ashbyhq.com/1password/42e39877-8c7c-4f18-9d42-336777df1de9 · Developer, Full Stack https://jobs.ashbyhq.com/1password/f51cc73a-fde2-4686-b54b-f183cdaedb45 | Remote US/Canada | Principal **CAD 228–342k**. Developer CAD 111–155k. |
| 4 | **Coinbase** | Senior SWE, Backend (Growth Foundations) https://www.coinbase.com/careers/positions/8092651?gh_jid=8092651 · Senior Staff SWE, Payments https://www.coinbase.com/careers/positions/8060842?gh_jid=8060842 | Remote Canada | Senior **CAD 191.1k** (a single number, not a range). Senior Staff **CAD 260.1k**. |
| 5 | **Instacart** | Senior SWE II, Marketing Enablement https://instacart.careers/job/?gh_jid=8141535 · Staff SWE, DevEx https://instacart.careers/job/?gh_jid=8202247 | Remote (ON/AB/BC/NS) | Senior CAD 168–178k. Senior II **CAD 196–207k** (the US twin pays USD 220–243k). Staff **CAD 229–241k**. |
| 6 | **GitLab** | Staff Fullstack Engineer (Ruby/Vue.js) https://job-boards.greenhouse.io/gitlab/jobs/8739391002 | Remote Canada/US | The only range posted is USD 153–259k and is "for residents of the United States only". Canada pay isn't posted. |
| 7 | **Samsara** | Senior Software Engineer II https://www.samsara.com/company/careers/roles/8083934?gh_jid=8083934 | Remote Canada | **CAD 143–185k** |
| 8 | **Twilio** | Staff Software Engineer (L4) https://job-boards.greenhouse.io/twilio/jobs/7716279 | Remote, "based in Canada" | $160–200k (currency not stated) + 15% bonus |
| 9 | **Okta** | Staff Frontend Engineer, SecureAI https://www.okta.com/company/careers/opportunity/8208369?gh_jid=8208369 · Principal SWE (Auth0) https://www.okta.com/company/careers/opportunity/8139694?gh_jid=8139694 | Toronto | Staff FE **CAD 160–220k**. Principal CAD 184–253k. Senior Fullstack CAD 136–187k. |
| 10 | **Cohere** | Senior Full-Stack Engineer, Internal Apps https://jobs.ashbyhq.com/cohere/7133d205-5421-4336-a8e2-6037b5f55073 · Senior Full-Stack (Front-End Leaning) https://jobs.ashbyhq.com/cohere/c12e3636-ed16-47e7-ba1f-82860f88d340 | Toronto/Canada | Senior Full-Stack **CA$215–310k** (highest found) |
| 11 | **Databricks** | Senior Software Frontend Engineer – Dashboards https://databricks.com/company/careers/open-positions/job?gh_jid=8230883002 | Vancouver | Senior CAD 146–201k. Staff CAD 173–238k. |
| 12 | **Brex** | Senior SWE, Frontend https://www.brex.com/careers/8815466002?gh_jid=8815466002 · Senior SWE, Full Stack https://www.brex.com/careers/8472632002?gh_jid=8472632002 | **Vancouver hybrid, 3 days/week in office** | Senior **CAD 192–240k**. Staff CAD 240–300k. |
| 13 | **Stripe** | Staff Fullstack Engineer, User Auth Experience (location "Canada") https://stripe.com/jobs/search?gh_jid=8113221 | Canada / Toronto | No range in the API posting text |
| 14 | **Reddit** | Senior SWE, Ads https://job-boards.greenhouse.io/reddit/jobs/6909093 | Remote in Ontario ("any country in which we have a physical presence") | Not posted |
| 15 | **Automattic** | Experienced Software Engineer https://automattic.com/jobs/ | Remote, 70+ countries | **USD 70–170k.** Its ranges are "global, regardless of location, and we pay in local currency." |

Also posting Canada roles: Robinhood (Toronto, Senior CAD 166–195k) https://boards.greenhouse.io/robinhood/jobs/8083818 · Asana (Vancouver, Senior Web App Perf CAD 176–200k) https://www.asana.com/jobs/apply/7968154?gh_jid=7968154 · Lyft (Toronto hybrid, Senior CAD 136–170k) · Cloudflare (Staff/Principal "Canada based hires" 192–264k) https://boards.greenhouse.io/cloudflare/jobs/7053411 · Ramp (FE posting lists "Remote (Canada)" but dates from 2023) · Dropbox ("Remote - Canada: Select locations"). [P, all]

**Checked but not found open to Canada:**
- **Shopify** is "Digital by Design" with Canadian offices [P] https://www.shopify.com/careers. Its board isn't on a public ATS API, so no posting was verified.
- **Zapier** lists regions (NAMER/EMEA/APAC) plus a sheet of excluded countries [P] https://jobs.ashbyhq.com/zapier/1767482d-de23-460c-80eb-6d0a3caa72ab. Canada wasn't confirmed.
- **Datadog** has no Canada frontend/fullstack posting today.

## 4. Finding Canada-eligible roles efficiently

- **Hit ATS job boards directly and filter by location.** Each company's board is public JSON. This is how the data above was gathered:
  - `boards-api.greenhouse.io/v1/boards/<co>/jobs?content=true`
  - `api.ashbyhq.com/posting-api/job-board/<co>?includeCompensation=true`
  - Filter location for Canada, Toronto, Vancouver, or "Remote - Canada". This is the most reliable filter because it's the company's own field. [P]
- **Remote Rocketship:** "Canada – Remote" and province filters, a minimum-salary filter, and ghost-job scoring. 1,201 remote SWE jobs in Canada. [S] https://www.remoterocketship.com/country/canada/jobs/software-engineer
- **HN "Who is hiring?" (Sept 2026, 262 posts)** [P] https://news.ycombinator.com/item?id=49522897. hnhiring.com lets you filter for remote. [S] https://hnhiring.com/locations/remote. Search for "US/Canada" or "North America".
- **LinkedIn:** workplace type and location are separate fields. Search with location = Canada and workplace = Remote, not location = United States. [S] https://theremotehive.com/remote-jobs-linkedin/
- **Signal words to look for:** "Remote - Canada", "US or Canada", "North America" (Linear's FE posting uses "North America" but doesn't name countries [P] https://jobs.ashbyhq.com/linear/cd5ae036-0223-427a-b038-ba16ef9dcb32), "Americas", "Remote, Global".

## 5. Is USD 180k realistic from Canada?

- **Base pay: mostly no, apart from a few top payers.** USD 180k is CAD 254k. The highest Canadian base ranges posted:
  - Senior: Cohere CA$215–310k and Brex CAD 192–240k (hybrid). Most senior bands top out at CAD 185–213k (Affirm, Instacart, Samsara, Wealthsimple, Coinbase 191k).
  - Staff: CAD 220–300k (Affirm 241k top, Instacart 241k, Okta FE 220k, Coinbase senior staff 260k, Brex 300k).
  - Principal: 1Password CAD 228–342k.
- **CAD 200k base is realistic at Staff, and at the top of Senior bands at US-HQ payers.** Pay ranges above are [P] (§3).
- **Canada bands run about 60–65% of the US band once converted to USD.** Affirm Senior: CAD 153–213k vs USD 173–255k. Instacart Senior II: CAD 196–207k vs USD 220–243k. [P]
- **Market medians (total comp, not base)** [S]:
  - All Canada: CA$139k median, p75 CA$188k, p90 CA$243k. https://www.levels.fyi/t/software-engineer/locations/canada
  - Toronto: CA$145k median, p75 CA$195k, p90 CA$251k. https://www.levels.fyi/t/software-engineer/locations/greater-toronto-area
  - So CAD 254k total comp is roughly the top 10% of Canadian SWEs.
- **The ways to actually earn a USD-level number from Canada:**
  - Companies with one global pay band (Automattic, paid in local currency) [P].
  - Total comp at a well-paying staff role (base plus equity).
  - A true B2B contract paid in USD. No primary data exists on how often these are offered (§2).
- **Pay-transparency catch.** Since 2026-01-01, Ontario requires a pay range on public job postings: max $50k wide, employers with 25+ staff. The rule **doesn't apply when pay exceeds $200k**, or to work performed outside Ontario. [P] https://www.ontario.ca/document/your-guide-employment-standards-act-0/requirements-related-publicly-advertised-job
  - So Canadian postings at or above your CAD 200k target can legally omit the range. Missing ranges on Canadian senior/staff postings (Reddit, Stripe, Vanta CA) don't mean the pay is low.

---

## Implications for his search

- **Your ~1 call is explained by the location knockout, not your resume.** US-remote postings ask for location or US work authorization and can reject on the answer automatically (§1). Stop applying to US-only requisitions through the ATS.
- **Apply to the Canada requisition, not the US one.** Vanta, Affirm, Instacart, GitLab, Coinbase and Wealthsimple post separate Canada roles. That's how you get past the filter.
- **Drop NinjaOne.** Its remote roles are limited to US states and it has no Canadian presence. For ClickUp, apply to its Canada/EU frontend posting and expect a band below the US one. Vanta is the best fit of the three.
- **Pick one target.** USD 180k and CAD 200k differ by about CAD 54k. CAD 200k+ base is realistic at Staff-level Canada postings (Affirm, Instacart, Okta, Coinbase, Brex, Cohere, 1Password). USD 180k base is realistic only at a few top payers or through equity.
- **Use a contractor setup only on referral or recruiter outreach, never through the ATS form.** The CRA test makes a full-time embedded contractor look like an employee, and companies that already hire in Canada will route you to their EOR or entity instead.
- **Filter at the source:** ATS JSON boards with location containing Canada, Remote Rocketship's Canada + senior + salary filters, and HN "US/Canada" posts. That replaces broad LinkedIn US searches.
- **Don't read a missing range on a Canadian posting as low pay.** Ontario exempts roles paying over $200k, so ask the recruiter for the range early.
- **Screens are graded against the level on the requisition.** Staff-level Canada postings are where CAD 200k+ lives, which makes Staff-level interview performance the thing to prepare for.
