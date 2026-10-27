/* =====================================================================
   State helpline finder data
   Source: National Commission for Women, "List of State Women Commissions"
   https://www.ncw.gov.in/important-links/list-of-state-women-commissions/
   Office numbers only (no personal mobiles). Last checked: October 2026.
   112 and 181 work in every state and are always shown on the page.
   To add or fix a state: edit its line below. Leave phone: [] if unknown.
   ===================================================================== */

const STATES_CHECKED = "October 2026";

const STATES = {
  "Andaman and Nicobar Islands": { phone: [], web: "" },
  "Andhra Pradesh":    { phone: [], web: "" },
  "Arunachal Pradesh": { phone: ["0360-2290549"], web: "" },
  "Assam":             { phone: ["0361-2220013"], web: "" },
  "Bihar":             { phone: ["0612-2507800"], web: "http://www.mahilaayogbihar.in/" },
  "Chandigarh":        { phone: [], web: "" },
  "Chhattisgarh":      { phone: ["0771-2433488"], web: "" },
  "Dadra and Nagar Haveli and Daman and Diu": { phone: [], web: "" },
  "Delhi":             { phone: [], web: "https://dcw.delhi.gov.in/" },
  "Goa":               { phone: ["0832-2421080"], web: "" },
  "Gujarat":           { phone: ["079-23251613"], web: "" },
  "Haryana":           { phone: ["0172-2584039"], web: "https://hscw.in/" },
  "Himachal Pradesh":  { phone: ["0177-2627171"], web: "" },
  "Jammu and Kashmir": { phone: [], web: "" },
  "Jharkhand":         { phone: ["0651-2401849"], web: "http://jscw.in/" },
  "Karnataka":         { phone: ["080-22216485"], web: "" },
  "Kerala":            { phone: ["0471-2307590"], web: "" },
  "Ladakh":            { phone: [], web: "" },
  "Lakshadweep":       { phone: [], web: "" },
  "Madhya Pradesh":    { phone: ["0755-2661802"], web: "" },
  "Maharashtra":       { phone: ["022-26590739"], web: "https://mscw.org.in/" },
  "Manipur":           { phone: ["0385-2411880"], web: "http://manipurwomencommission.gov.in/" },
  "Meghalaya":         { phone: ["0364-2501998"], web: "http://mscw.gov.in/" },
  "Mizoram":           { phone: ["0389-2319614"], web: "" },
  "Nagaland":          { phone: ["0370-2242670"], web: "" },
  "Odisha":            { phone: ["0674-2573870"], web: "" },
  "Puducherry":        { phone: ["0413-2205153"], web: "https://wcd.py.gov.in/puducherry-women%E2%80%99s-commission" },
  "Punjab":            { phone: ["0172-2783607"], web: "https://punjabwomencommission.punjab.gov.in/" },
  "Rajasthan":         { phone: ["0141-2744000", "0141-2779001"], web: "" },
  "Sikkim":            { phone: ["03592-203051"], web: "" },
  "Tamil Nadu":        { phone: ["044-28551155"], web: "" },
  "Telangana":         { phone: ["040-27540415"], web: "" },
  "Tripura":           { phone: ["0381-2323355"], web: "" },
  "Uttar Pradesh":     { phone: ["0522-2728670"], web: "http://mahilaayog.up.gov.in/" },
  "Uttarakhand":       { phone: ["0135-2775817"], web: "" },
  "West Bengal":       { phone: ["033-23595609"], web: "https://www.wbcw.co.in/" },
};
