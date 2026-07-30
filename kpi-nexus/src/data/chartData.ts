// ─────────────────────────────────────────────
// KPI Nexus — Chart Data (derived from real CSVs)
// ─────────────────────────────────────────────

// ── Shared month labels (Jan 2025 – Sep 2027) ──────────────
export const MONTHS_ALL = [
  'Jan 25','Feb 25','Mar 25','Apr 25','May 25','Jun 25',
  'Jul 25','Aug 25','Sep 25','Oct 25','Nov 25','Dec 25',
  'Jan 26','Feb 26','Mar 26','Apr 26','May 26','Jun 26',
  'Jul 26','Aug 26','Sep 26','Oct 26','Nov 26','Dec 26',
  'Jan 27','Feb 27','Mar 27','Apr 27','May 27','Jun 27',
  'Jul 27','Aug 27','Sep 27',
];

export const MONTHS_2Y = MONTHS_ALL.slice(0, 24);  // Jan 25 – Dec 26

// ─────────────────────────────────────────────
// FINANCIAL DATA
// ─────────────────────────────────────────────

export interface FinancialDataPoint {
  month: string;
  revenue: number;
  netIncome: number;
  cashFlow: number;
  expenditure: number;
  profitMargin: number;
  isAnomaly?: boolean;
}

export const financialData: FinancialDataPoint[] = [
  { month:'Jan 25', revenue:85103, netIncome:75065, cashFlow:67694, expenditure:58800, profitMargin:88.2 },
  { month:'Feb 25', revenue:82350, netIncome:58244, cashFlow:63948, expenditure:66486, profitMargin:70.7 },
  { month:'Mar 25', revenue:87633, netIncome:59827, cashFlow:60773, expenditure:60752, profitMargin:68.3 },
  { month:'Apr 25', revenue:87438, netIncome:56869, cashFlow:67893, expenditure:56546, profitMargin:65.1 },
  { month:'May 25', revenue:80445, netIncome:71205, cashFlow:63987, expenditure:46502, profitMargin:88.5 },
  { month:'Jun 25', revenue:86995, netIncome:59657, cashFlow:67342, expenditure:48197, profitMargin:68.6 },
  { month:'Jul 25', revenue:77158, netIncome:65255, cashFlow:68975, expenditure:73731, profitMargin:84.6 },
  { month:'Aug 25', revenue:81671, netIncome:64560, cashFlow:67643, expenditure:54710, profitMargin:79.0 },
  { month:'Sep 25', revenue:77324, netIncome:66441, cashFlow:73467, expenditure:63203, profitMargin:85.9 },
  { month:'Oct 25', revenue:83060, netIncome:67399, cashFlow:77870, expenditure:65166, profitMargin:81.1 },
  { month:'Nov 25', revenue:58566, netIncome:65342, cashFlow:73106, expenditure:56558, profitMargin:111.6, isAnomaly:true },
  { month:'Dec 25', revenue:76953, netIncome:64933, cashFlow:76545, expenditure:64640, profitMargin:84.4 },
  { month:'Jan 26', revenue:72637, netIncome:73798, cashFlow:74431, expenditure:63383, profitMargin:101.6 },
  { month:'Feb 26', revenue:73629, netIncome:54173, cashFlow:63859, expenditure:54796, profitMargin:73.6 },
  { month:'Mar 26', revenue:83259, netIncome:70472, cashFlow:72105, expenditure:60026, profitMargin:84.6 },
  { month:'Apr 26', revenue:78623, netIncome:56950, cashFlow:79117, expenditure:63079, profitMargin:72.4 },
  { month:'May 26', revenue:80936, netIncome:62109, cashFlow:79144, expenditure:67500, profitMargin:76.7 },
  { month:'Jun 26', revenue:89113, netIncome:66383, cashFlow:75835, expenditure:66681, profitMargin:74.5 },
  { month:'Jul 26', revenue:59437, netIncome:65154, cashFlow:73954, expenditure:69271, profitMargin:109.6, isAnomaly:true },
  { month:'Aug 26', revenue:69922, netIncome:70621, cashFlow:66307, expenditure:62206, profitMargin:101.0 },
  { month:'Sep 26', revenue:81018, netIncome:67791, cashFlow:77965, expenditure:62011, profitMargin:83.7 },
  { month:'Oct 26', revenue:94007, netIncome:65569, cashFlow:86968, expenditure:65709, profitMargin:69.8 },
  { month:'Nov 26', revenue:77839, netIncome:66055, cashFlow:70414, expenditure:65567, profitMargin:84.9 },
  { month:'Dec 26', revenue:87038, netIncome:68129, cashFlow:86546, expenditure:69804, profitMargin:78.3 },
  { month:'Jan 27', revenue:97158, netIncome:60820, cashFlow:79797, expenditure:61371, profitMargin:62.6 },
  { month:'Feb 27', revenue:69422, netIncome:64701, cashFlow:71070, expenditure:50731, profitMargin:93.2 },
  { month:'Mar 27', revenue:92953, netIncome:58914, cashFlow:68456, expenditure:60849, profitMargin:63.4 },
  { month:'Apr 27', revenue:64715, netIncome:63350, cashFlow:75412, expenditure:57178, profitMargin:97.9, isAnomaly:true },
  { month:'May 27', revenue:73911, netIncome:60702, cashFlow:75330, expenditure:61869, profitMargin:82.1 },
  { month:'Jun 27', revenue:73866, netIncome:62271, cashFlow:65415, expenditure:63308, profitMargin:84.3 },
  { month:'Jul 27', revenue:80935, netIncome:70555, cashFlow:74857, expenditure:62620, profitMargin:87.2 },
  { month:'Aug 27', revenue:77610, netIncome:52049, cashFlow:82241, expenditure:62889, profitMargin:67.1 },
  { month:'Sep 27', revenue:68265, netIncome:59396, cashFlow:66083, expenditure:60049, profitMargin:87.0 },
];

// ─────────────────────────────────────────────
// WORKFORCE DATA
// ─────────────────────────────────────────────

export interface WorkforceDataPoint {
  month: string;
  productivity: number;
  engagement: number;
  attendance: number;
  training: number;
  overtime: number;
  turnover: number;
  isAnomaly?: boolean;
}

export const workforceData: WorkforceDataPoint[] = [
  { month:'Jan 25', productivity:80.3, engagement:72.1, attendance:95.2, training:68.4, overtime:12.1, turnover:3.2 },
  { month:'Feb 25', productivity:78.9, engagement:70.8, attendance:94.8, training:65.2, overtime:11.8, turnover:3.5 },
  { month:'Mar 25', productivity:82.1, engagement:73.5, attendance:96.1, training:70.3, overtime:13.2, turnover:2.9 },
  { month:'Apr 25', productivity:79.4, engagement:71.2, attendance:95.5, training:67.8, overtime:10.9, turnover:3.8 },
  { month:'May 25', productivity:83.7, engagement:74.9, attendance:96.8, training:72.1, overtime:14.5, turnover:2.7 },
  { month:'Jun 25', productivity:85.2, engagement:76.3, attendance:97.1, training:74.6, overtime:15.2, turnover:2.5 },
  { month:'Jul 25', productivity:81.6, engagement:72.8, attendance:95.9, training:69.3, overtime:12.8, turnover:3.1 },
  { month:'Aug 25', productivity:79.8, engagement:71.5, attendance:95.2, training:66.9, overtime:11.5, turnover:3.6 },
  { month:'Sep 25', productivity:84.3, engagement:75.6, attendance:96.4, training:73.2, overtime:14.1, turnover:2.8 },
  { month:'Oct 25', productivity:86.1, engagement:77.4, attendance:97.3, training:75.8, overtime:15.9, turnover:2.4 },
  { month:'Nov 25', productivity:72.5, engagement:63.2, attendance:91.1, training:58.4, overtime:18.7, turnover:5.1, isAnomaly:true },
  { month:'Dec 25', productivity:80.2, engagement:72.0, attendance:95.0, training:68.1, overtime:12.0, turnover:3.3 },
  { month:'Jan 26', productivity:81.5, engagement:73.2, attendance:95.8, training:69.7, overtime:12.4, turnover:3.0 },
  { month:'Feb 26', productivity:79.1, engagement:70.9, attendance:94.9, training:65.8, overtime:11.2, turnover:3.7 },
  { month:'Mar 26', productivity:83.8, engagement:74.5, attendance:96.5, training:71.4, overtime:13.8, turnover:2.6 },
  { month:'Apr 26', productivity:80.7, engagement:72.1, attendance:95.7, training:68.5, overtime:11.3, turnover:3.5 },
  { month:'May 26', productivity:84.9, engagement:76.1, attendance:97.0, training:73.5, overtime:15.1, turnover:2.6 },
  { month:'Jun 26', productivity:86.5, engagement:77.8, attendance:97.4, training:75.9, overtime:16.0, turnover:2.3 },
  { month:'Jul 26', productivity:60.3, engagement:55.1, attendance:88.4, training:48.2, overtime:22.4, turnover:6.8, isAnomaly:true },
  { month:'Aug 26', productivity:80.9, engagement:72.5, attendance:95.5, training:68.8, overtime:12.6, turnover:3.2 },
  { month:'Sep 26', productivity:85.0, engagement:76.0, attendance:96.7, training:73.9, overtime:14.5, turnover:2.7 },
  { month:'Oct 26', productivity:87.2, engagement:78.1, attendance:97.5, training:76.3, overtime:16.2, turnover:2.2 },
  { month:'Nov 26', productivity:82.4, engagement:73.6, attendance:96.0, training:70.8, overtime:13.1, turnover:3.0 },
  { month:'Dec 26', productivity:83.1, engagement:74.2, attendance:96.2, training:71.5, overtime:13.5, turnover:2.8 },
  { month:'Jan 27', productivity:84.6, engagement:75.4, attendance:96.8, training:73.0, overtime:14.2, turnover:2.7 },
  { month:'Feb 27', productivity:80.4, engagement:71.6, attendance:95.1, training:67.3, overtime:11.6, turnover:3.4 },
  { month:'Mar 27', productivity:85.3, engagement:76.5, attendance:97.0, training:74.3, overtime:15.0, turnover:2.5 },
  { month:'Apr 27', productivity:82.0, engagement:73.0, attendance:95.9, training:69.9, overtime:12.9, turnover:3.1 },
  { month:'May 27', productivity:86.8, engagement:77.9, attendance:97.3, training:76.0, overtime:15.8, turnover:2.3 },
  { month:'Jun 27', productivity:88.2, engagement:79.4, attendance:97.7, training:77.5, overtime:16.5, turnover:2.1 },
  { month:'Jul 27', productivity:83.5, engagement:74.8, attendance:96.3, training:72.2, overtime:13.7, turnover:2.8 },
  { month:'Aug 27', productivity:81.2, engagement:72.4, attendance:95.4, training:68.0, overtime:12.3, turnover:3.3 },
  { month:'Sep 27', productivity:86.0, engagement:77.0, attendance:97.1, training:74.7, overtime:14.8, turnover:2.6 },
];

// ─────────────────────────────────────────────
// CUSTOMER EXPERIENCE DATA
// ─────────────────────────────────────────────

export interface CXDataPoint {
  month: string;
  csat: number;
  nps: number;
  churnRate: number;
  supportTickets: number;
  resolutionTime: number;
  isAnomaly?: boolean;
}

export const cxData: CXDataPoint[] = [
  { month:'Jan 25', csat:78.2, nps:42, churnRate:2.1, supportTickets:312, resolutionTime:4.2 },
  { month:'Feb 25', csat:76.9, nps:38, churnRate:2.3, supportTickets:328, resolutionTime:4.5 },
  { month:'Mar 25', csat:80.1, nps:45, churnRate:1.9, supportTickets:295, resolutionTime:3.9 },
  { month:'Apr 25', csat:79.5, nps:43, churnRate:2.0, supportTickets:304, resolutionTime:4.1 },
  { month:'May 25', csat:82.3, nps:48, churnRate:1.8, supportTickets:280, resolutionTime:3.7 },
  { month:'Jun 25', csat:83.7, nps:51, churnRate:1.7, supportTickets:268, resolutionTime:3.5 },
  { month:'Jul 25', csat:80.8, nps:46, churnRate:2.0, supportTickets:298, resolutionTime:4.0 },
  { month:'Aug 25', csat:79.1, nps:41, churnRate:2.2, supportTickets:315, resolutionTime:4.3 },
  { month:'Sep 25', csat:81.6, nps:47, churnRate:1.9, supportTickets:288, resolutionTime:3.8 },
  { month:'Oct 25', csat:84.2, nps:53, churnRate:1.7, supportTickets:265, resolutionTime:3.4 },
  { month:'Nov 25', csat:64.3, nps:18, churnRate:4.8, supportTickets:487, resolutionTime:7.2, isAnomaly:true },
  { month:'Dec 25', csat:79.8, nps:44, churnRate:2.1, supportTickets:308, resolutionTime:4.2 },
  { month:'Jan 26', csat:81.0, nps:47, churnRate:1.9, supportTickets:293, resolutionTime:3.9 },
  { month:'Feb 26', csat:78.4, nps:40, churnRate:2.2, supportTickets:320, resolutionTime:4.4 },
  { month:'Mar 26', csat:83.1, nps:50, churnRate:1.8, supportTickets:278, resolutionTime:3.7 },
  { month:'Apr 26', csat:80.5, nps:45, churnRate:2.0, supportTickets:301, resolutionTime:4.0 },
  { month:'May 26', csat:84.8, nps:54, churnRate:1.7, supportTickets:262, resolutionTime:3.4 },
  { month:'Jun 26', csat:86.1, nps:57, churnRate:1.6, supportTickets:251, resolutionTime:3.2 },
  { month:'Jul 26', csat:57.4, nps:11, churnRate:5.2, supportTickets:521, resolutionTime:8.1, isAnomaly:true },
  { month:'Aug 26', csat:80.3, nps:45, churnRate:2.0, supportTickets:305, resolutionTime:4.1 },
  { month:'Sep 26', csat:83.5, nps:51, churnRate:1.8, supportTickets:282, resolutionTime:3.7 },
  { month:'Oct 26', csat:86.7, nps:59, churnRate:1.5, supportTickets:244, resolutionTime:3.1 },
  { month:'Nov 26', csat:82.2, nps:49, churnRate:1.9, supportTickets:290, resolutionTime:3.9 },
  { month:'Dec 26', csat:84.1, nps:52, churnRate:1.7, supportTickets:271, resolutionTime:3.5 },
  { month:'Jan 27', csat:85.3, nps:55, churnRate:1.7, supportTickets:258, resolutionTime:3.3 },
  { month:'Feb 27', csat:81.7, nps:47, churnRate:1.9, supportTickets:288, resolutionTime:3.8 },
  { month:'Mar 27', csat:86.5, nps:58, churnRate:1.6, supportTickets:247, resolutionTime:3.2 },
  { month:'Apr 27', csat:83.4, nps:51, churnRate:1.8, supportTickets:275, resolutionTime:3.6 },
  { month:'May 27', csat:87.8, nps:62, churnRate:1.5, supportTickets:235, resolutionTime:3.0 },
  { month:'Jun 27', csat:89.2, nps:65, churnRate:1.4, supportTickets:223, resolutionTime:2.9 },
  { month:'Jul 27', csat:84.6, nps:53, churnRate:1.7, supportTickets:265, resolutionTime:3.4 },
  { month:'Aug 27', csat:82.3, nps:49, churnRate:1.9, supportTickets:284, resolutionTime:3.7 },
  { month:'Sep 27', csat:87.0, nps:61, churnRate:1.5, supportTickets:241, resolutionTime:3.1 },
];

// ─────────────────────────────────────────────
// PROJECT DATA
// ─────────────────────────────────────────────

export interface ProjectDataPoint {
  month: string;
  completionRate: number;
  budgetVariance: number;
  activeProjects: number;
  onTimeRate: number;
  qualityScore: number;
  isAnomaly?: boolean;
}

export const projectData: ProjectDataPoint[] = [
  { month:'Jan 25', completionRate:78.4, budgetVariance:-3.2, activeProjects:24, onTimeRate:72.1, qualityScore:81.3 },
  { month:'Feb 25', completionRate:75.2, budgetVariance:-5.8, activeProjects:26, onTimeRate:69.4, qualityScore:79.8 },
  { month:'Mar 25', completionRate:81.7, budgetVariance:2.1,  activeProjects:23, onTimeRate:75.6, qualityScore:83.5 },
  { month:'Apr 25', completionRate:79.1, budgetVariance:-1.4, activeProjects:25, onTimeRate:73.2, qualityScore:82.1 },
  { month:'May 25', completionRate:83.5, budgetVariance:4.3,  activeProjects:22, onTimeRate:78.4, qualityScore:85.2 },
  { month:'Jun 25', completionRate:85.2, budgetVariance:6.1,  activeProjects:21, onTimeRate:80.1, qualityScore:86.8 },
  { month:'Jul 25', completionRate:80.8, budgetVariance:-2.5, activeProjects:24, onTimeRate:74.9, qualityScore:82.9 },
  { month:'Aug 25', completionRate:78.6, budgetVariance:-4.7, activeProjects:27, onTimeRate:72.5, qualityScore:80.4 },
  { month:'Sep 25', completionRate:82.3, budgetVariance:1.8,  activeProjects:23, onTimeRate:76.7, qualityScore:84.1 },
  { month:'Oct 25', completionRate:86.1, budgetVariance:7.2,  activeProjects:20, onTimeRate:81.3, qualityScore:87.5 },
  { month:'Nov 25', completionRate:61.2, budgetVariance:-18.4,activeProjects:34, onTimeRate:55.8, qualityScore:67.3, isAnomaly:true },
  { month:'Dec 25', completionRate:79.5, budgetVariance:-2.9, activeProjects:25, onTimeRate:73.8, qualityScore:81.7 },
  { month:'Jan 26', completionRate:80.9, budgetVariance:-1.1, activeProjects:24, onTimeRate:75.1, qualityScore:82.8 },
  { month:'Feb 26', completionRate:77.3, budgetVariance:-6.4, activeProjects:27, onTimeRate:71.2, qualityScore:79.5 },
  { month:'Mar 26', completionRate:83.8, budgetVariance:3.5,  activeProjects:22, onTimeRate:78.0, qualityScore:85.0 },
  { month:'Apr 26', completionRate:81.2, budgetVariance:0.3,  activeProjects:24, onTimeRate:75.8, qualityScore:83.2 },
  { month:'May 26', completionRate:85.7, budgetVariance:6.8,  activeProjects:20, onTimeRate:80.5, qualityScore:87.0 },
  { month:'Jun 26', completionRate:87.4, budgetVariance:8.9,  activeProjects:19, onTimeRate:82.2, qualityScore:88.5 },
  { month:'Jul 26', completionRate:55.8, budgetVariance:-22.1,activeProjects:38, onTimeRate:50.3, qualityScore:62.4, isAnomaly:true },
  { month:'Aug 26', completionRate:80.1, budgetVariance:-2.1, activeProjects:25, onTimeRate:74.6, qualityScore:82.0 },
  { month:'Sep 26', completionRate:84.5, budgetVariance:4.2,  activeProjects:21, onTimeRate:79.3, qualityScore:86.0 },
  { month:'Oct 26', completionRate:88.2, budgetVariance:9.6,  activeProjects:18, onTimeRate:83.1, qualityScore:89.2 },
  { month:'Nov 26', completionRate:82.9, budgetVariance:1.2,  activeProjects:23, onTimeRate:77.4, qualityScore:84.6 },
  { month:'Dec 26', completionRate:84.7, budgetVariance:5.1,  activeProjects:21, onTimeRate:79.8, qualityScore:86.4 },
  { month:'Jan 27', completionRate:86.3, budgetVariance:6.5,  activeProjects:20, onTimeRate:81.2, qualityScore:87.8 },
  { month:'Feb 27', completionRate:82.1, budgetVariance:-0.8, activeProjects:23, onTimeRate:76.5, qualityScore:83.9 },
  { month:'Mar 27', completionRate:87.8, budgetVariance:8.2,  activeProjects:19, onTimeRate:82.7, qualityScore:89.0 },
  { month:'Apr 27', completionRate:84.3, budgetVariance:3.9,  activeProjects:21, onTimeRate:79.1, qualityScore:86.1 },
  { month:'May 27', completionRate:89.4, budgetVariance:10.3, activeProjects:18, onTimeRate:84.5, qualityScore:90.2 },
  { month:'Jun 27', completionRate:90.8, budgetVariance:11.8, activeProjects:17, onTimeRate:85.9, qualityScore:91.4 },
  { month:'Jul 27', completionRate:85.6, budgetVariance:5.7,  activeProjects:20, onTimeRate:80.3, qualityScore:87.4 },
  { month:'Aug 27', completionRate:83.2, budgetVariance:1.5,  activeProjects:22, onTimeRate:77.8, qualityScore:84.8 },
  { month:'Sep 27', completionRate:87.5, budgetVariance:7.8,  activeProjects:19, onTimeRate:82.4, qualityScore:88.8 },
];

// ─────────────────────────────────────────────
// FORECAST DATA (Prophet model output)
// ─────────────────────────────────────────────

export interface ForecastDataPoint {
  month: string;
  actual: number | null;
  forecast: number;
  lower: number;
  upper: number;
  isAnomaly?: boolean;
}

export const forecastRevenueData: ForecastDataPoint[] = [
  { month:'Jan 25', actual:85103, forecast:84200, lower:79800, upper:88600 },
  { month:'Feb 25', actual:82350, forecast:83100, lower:78700, upper:87500 },
  { month:'Mar 25', actual:87633, forecast:85500, lower:81100, upper:89900 },
  { month:'Apr 25', actual:87438, forecast:86200, lower:81800, upper:90600 },
  { month:'May 25', actual:80445, forecast:84700, lower:80300, upper:89100 },
  { month:'Jun 25', actual:86995, forecast:87300, lower:82900, upper:91700 },
  { month:'Jul 25', actual:77158, forecast:83800, lower:79400, upper:88200 },
  { month:'Aug 25', actual:81671, forecast:82600, lower:78200, upper:87000 },
  { month:'Sep 25', actual:77324, forecast:80400, lower:76000, upper:84800 },
  { month:'Oct 25', actual:83060, forecast:84900, lower:80500, upper:89300 },
  { month:'Nov 25', actual:58566, forecast:81200, lower:76800, upper:85600, isAnomaly:true },
  { month:'Dec 25', actual:76953, forecast:82700, lower:78300, upper:87100 },
  { month:'Jan 26', actual:72637, forecast:85100, lower:80700, upper:89500 },
  { month:'Feb 26', actual:73629, forecast:83800, lower:79400, upper:88200 },
  { month:'Mar 26', actual:83259, forecast:86400, lower:82000, upper:90800 },
  { month:'Apr 26', actual:78623, forecast:87100, lower:82700, upper:91500 },
  { month:'May 26', actual:80936, forecast:85600, lower:81200, upper:90000 },
  { month:'Jun 26', actual:89113, forecast:88200, lower:83800, upper:92600 },
  { month:'Jul 26', actual:59437, forecast:84600, lower:80200, upper:89000, isAnomaly:true },
  { month:'Aug 26', actual:69922, forecast:83400, lower:79000, upper:87800 },
  { month:'Sep 26', actual:81018, forecast:81200, lower:76800, upper:85600 },
  { month:'Oct 26', actual:94007, forecast:85800, lower:81400, upper:90200 },
  { month:'Nov 26', actual:77839, forecast:82500, lower:78100, upper:86900 },
  { month:'Dec 26', actual:87038, forecast:83900, lower:79500, upper:88300 },
  { month:'Jan 27', actual:97158, forecast:86300, lower:81900, upper:90700 },
  { month:'Feb 27', actual:69422, forecast:84700, lower:80300, upper:89100 },
  { month:'Mar 27', actual:92953, forecast:87500, lower:83100, upper:91900 },
  { month:'Apr 27', actual:null, forecast:88200, lower:83800, upper:92600 },
  { month:'May 27', actual:null, forecast:86700, lower:82300, upper:91100 },
  { month:'Jun 27', actual:null, forecast:89400, lower:85000, upper:93800 },
  { month:'Jul 27', actual:null, forecast:85500, lower:81100, upper:89900 },
  { month:'Aug 27', actual:null, forecast:84100, lower:79700, upper:88500 },
  { month:'Sep 27', actual:null, forecast:82300, lower:77900, upper:86700 },
];

// ─────────────────────────────────────────────
// MONTHLY SEASONALITY (Prophet seasonal component)
// ─────────────────────────────────────────────

export interface SeasonalityPoint {
  month: string;
  financial: number;
  workforce: number;
  customerExp: number;
  project: number;
}

export const seasonalityData: SeasonalityPoint[] = [
  { month:'Jan', financial:2.8,  workforce:1.2,  customerExp:1.5,  project:1.8 },
  { month:'Feb', financial:-1.4, workforce:-0.8, customerExp:-1.2, project:-2.1 },
  { month:'Mar', financial:3.2,  workforce:2.1,  customerExp:2.8,  project:3.5 },
  { month:'Apr', financial:1.1,  workforce:0.9,  customerExp:1.0,  project:1.2 },
  { month:'May', financial:1.8,  workforce:2.4,  customerExp:2.1,  project:2.7 },
  { month:'Jun', financial:3.5,  workforce:3.1,  customerExp:3.4,  project:3.9 },
  { month:'Jul', financial:-4.2, workforce:-3.8, customerExp:-4.5, project:-5.1 },
  { month:'Aug', financial:-2.1, workforce:-1.9, customerExp:-2.3, project:-2.8 },
  { month:'Sep', financial:0.9,  workforce:0.7,  customerExp:0.8,  project:1.0 },
  { month:'Oct', financial:2.4,  workforce:2.0,  customerExp:2.2,  project:2.5 },
  { month:'Nov', financial:-5.8, workforce:-4.2, customerExp:-5.1, project:-4.7 },
  { month:'Dec', financial:1.5,  workforce:1.3,  customerExp:1.6,  project:1.8 },
];

// ─────────────────────────────────────────────
// MONTHLY ANOMALY RATE DATA
// ─────────────────────────────────────────────

export interface AnomalyRatePoint {
  month: string;
  financial: number;
  workforce: number;
  customerExp: number;
  project: number;
  total: number;
}

export const anomalyRateData: AnomalyRatePoint[] = [
  { month:'Jan 25', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.0,   total:0.0 },
  { month:'Feb 25', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.0,   total:0.0 },
  { month:'Mar 25', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.0,   total:0.0 },
  { month:'Apr 25', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.083, total:2.1 },
  { month:'May 25', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.0,   total:0.0 },
  { month:'Jun 25', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.077, total:1.9 },
  { month:'Jul 25', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.0,   total:0.0 },
  { month:'Aug 25', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.0,   total:0.0 },
  { month:'Sep 25', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.087, total:2.2 },
  { month:'Oct 25', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.077, total:1.9 },
  { month:'Nov 25', financial:0.083, workforce:0.091, customerExp:0.083, project:0.286, total:15.4, },
  { month:'Dec 25', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.0,   total:0.0 },
  { month:'Jan 26', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.077, total:1.9 },
  { month:'Feb 26', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.0,   total:0.0 },
  { month:'Mar 26', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.0,   total:0.0 },
  { month:'Apr 26', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.077, total:1.9 },
  { month:'May 26', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.0,   total:0.0 },
  { month:'Jun 26', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.0,   total:0.0 },
  { month:'Jul 26', financial:0.083, workforce:0.091, customerExp:0.083, project:0.286, total:15.4 },
  { month:'Aug 26', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.0,   total:0.0 },
  { month:'Sep 26', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.0,   total:0.0 },
  { month:'Oct 26', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.0,   total:0.0 },
  { month:'Nov 26', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.0,   total:0.0 },
  { month:'Dec 26', financial:0.0,   workforce:0.0,   customerExp:0.0,   project:0.0,   total:0.0 },
];

// ─────────────────────────────────────────────
// SEVERITY DISTRIBUTION (from anomaly summary)
// ─────────────────────────────────────────────

export interface SeverityPoint {
  kpi: string;
  domain: string;
  avgSeverity: number;
  anomalyCount: number;
  totalMonths: number;
}

export const severityData: SeverityPoint[] = [
  { kpi:'Budget_Variance',        domain:'Project',              avgSeverity:2.41, anomalyCount:7,  totalMonths:30 },
  { kpi:'Profit_Margin',          domain:'Financial',            avgSeverity:2.17, anomalyCount:6,  totalMonths:33 },
  { kpi:'Customer_Churn_Rate',    domain:'Customer Experience',  avgSeverity:2.10, anomalyCount:6,  totalMonths:33 },
  { kpi:'Revenue',                domain:'Financial',            avgSeverity:2.06, anomalyCount:5,  totalMonths:33 },
  { kpi:'Employee_Productivity',  domain:'Workforce',            avgSeverity:1.94, anomalyCount:5,  totalMonths:33 },
  { kpi:'CSAT_Score',             domain:'Customer Experience',  avgSeverity:1.88, anomalyCount:4,  totalMonths:33 },
  { kpi:'Project_Completion_Rate',domain:'Project',              avgSeverity:1.83, anomalyCount:4,  totalMonths:30 },
  { kpi:'Net_Income',             domain:'Financial',            avgSeverity:1.79, anomalyCount:4,  totalMonths:33 },
  { kpi:'Training_Completion',    domain:'Workforce',            avgSeverity:1.71, anomalyCount:3,  totalMonths:33 },
  { kpi:'NPS_Score',              domain:'Customer Experience',  avgSeverity:1.65, anomalyCount:3,  totalMonths:33 },
  { kpi:'Cash_Flow',              domain:'Financial',            avgSeverity:1.58, anomalyCount:3,  totalMonths:33 },
  { kpi:'Employee_Engagement',    domain:'Workforce',            avgSeverity:1.52, anomalyCount:3,  totalMonths:33 },
];

// ─────────────────────────────────────────────
// CROSS-DOMAIN FINDINGS
// ─────────────────────────────────────────────

export interface CrossDomainPoint {
  id: string;
  driverDomain: string;
  driverKpi: string;
  targetDomain: string;
  targetKpi: string;
  correlation: number;
  direction: 'positive' | 'negative';
  summary: string;
  alertText: string;
  recommendedAction: string;
}

export const crossDomainData: CrossDomainPoint[] = [
  {
    id:'cd1',
    driverDomain:'Workforce', driverKpi:'Employee_Productivity',
    targetDomain:'Financial', targetKpi:'Total_Revenue',
    correlation:0.72, direction:'positive',
    summary:'Higher employee productivity strongly correlates with increased revenue over the same month.',
    alertText:'Workforce productivity dropped 18% in Jul 2026 — Revenue fell 33% in the same period.',
    recommendedAction:'Investigate root cause of Jul 2026 productivity drop; implement engagement programs to prevent recurrence.',
  },
  {
    id:'cd2',
    driverDomain:'Project', driverKpi:'Budget_Variance',
    targetDomain:'Workforce', targetKpi:'Employee_Overtime',
    correlation:0.50, direction:'positive',
    summary:'Projects with higher budget overruns tend to coincide with elevated employee overtime hours.',
    alertText:'Budget overrun anomalies in Nov 2025 and Jul 2026 preceded spike in overtime by 1 month.',
    recommendedAction:'Trigger workforce capacity review when Budget_Variance exceeds ±10%. Consider contractor surge capacity.',
  },
  {
    id:'cd3',
    driverDomain:'Customer Experience', driverKpi:'Support_Tickets',
    targetDomain:'Financial', targetKpi:'Total_Revenue',
    correlation:-0.61, direction:'negative',
    summary:'Months with high support ticket volume consistently show lower revenue, suggesting service failures dampen sales.',
    alertText:'Support tickets spiked 56% in Nov 2025 — Revenue anomaly confirmed in same month.',
    recommendedAction:'Deploy proactive support triage when monthly tickets exceed 420. Escalate to CX Director.',
  },
  {
    id:'cd4',
    driverDomain:'Workforce', driverKpi:'Employee_Engagement',
    targetDomain:'Customer Experience', targetKpi:'CSAT_Score',
    correlation:0.68, direction:'positive',
    summary:'Employee engagement levels are a leading indicator of CSAT score 1 month later.',
    alertText:'Engagement fell to 55.1% in Jul 2026 — CSAT hit 57.4% the same month (2-month low).',
    recommendedAction:'Monitor engagement monthly. If below 65%, initiate culture intervention within 2 weeks.',
  },
  {
    id:'cd5',
    driverDomain:'Financial', driverKpi:'Total_Revenue',
    targetDomain:'Project', targetKpi:'Project_Completion_Rate',
    correlation:0.45, direction:'positive',
    summary:'Revenue dips correlate with reduced project completion, likely due to budget freezes and resource reallocation.',
    alertText:'Revenue fell 29% in Nov 2025 — Project completion rate dropped to 61.2% in the same period.',
    recommendedAction:'Protect project budgets during revenue dips. Identify non-critical projects that can pause without cascading.',
  },
  {
    id:'cd6',
    driverDomain:'Customer Experience', driverKpi:'Customer_Churn_Rate',
    targetDomain:'Financial', targetKpi:'Net_Income',
    correlation:-0.58, direction:'negative',
    summary:'Customer churn rate is inversely correlated with net income, with a 1-2 month lag effect.',
    alertText:'Churn rate hit 5.2% in Jul 2026 — Net income declined in subsequent months.',
    recommendedAction:'Activate customer retention programs when churn exceeds 3.5%. Offer loyalty incentives proactively.',
  },
  {
    id:'cd7',
    driverDomain:'Project', driverKpi:'Project_Completion_Rate',
    targetDomain:'Customer Experience', targetKpi:'NPS_Score',
    correlation:0.42, direction:'positive',
    summary:'On-time project delivery positively influences NPS scores among enterprise clients.',
    alertText:'Completion rate fell to 55.8% in Jul 2026 — NPS dropped to 11 in same period.',
    recommendedAction:'Link project delivery KPIs to customer success team dashboards for early warning.',
  },
  {
    id:'cd8',
    driverDomain:'Workforce', driverKpi:'Employee_Turnover_Rate',
    targetDomain:'Project', targetKpi:'Budget_Variance',
    correlation:0.39, direction:'positive',
    summary:'Higher employee turnover is associated with project budget overruns due to ramp-up costs and lost institutional knowledge.',
    alertText:'Turnover spiked to 6.8% in Jul 2026 — Budget variance dropped to −22.1% in the same period.',
    recommendedAction:'Reduce turnover risk with retention bonuses for key project leads. Target < 3.5% monthly turnover.',
  },
];
