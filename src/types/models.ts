export type TClient = {
  id?: string
  name: string
  phone: number
  email: string
  address: string
  city: string
  state: string
  zip: number
  imageUrl?: string
  notes: string[] //**Array of strings to track notes */
};

export type TProject = {
  id?: string
  clientId: string
  projectName: string
  projectDate: Date
  paid: boolean
  bid: TBid
  projectType: ProjectType
  // installed: boolean //**for project type lights */
  // teardown: boolean //**for project type lights */
  // expenses: number[]  //**Array of numbers to calculate costs */
  imageUrl?: string
  notes?: string[] //**Array of strings to track notes */
};

export type TExpense = {
  id?: string
  // projectId?: string
  // clientId?: string
  expenseType: ExpenseType
  expenseAmount: number
  paymentType: PaymentType
  expenseDate: Date
  vendor: string
  description: string
}

export enum BidStatus {
  Tentative = 'tentative',
  Accepted = 'accepted',
  Declined = 'declined'
}

type TBid = {
  sent: boolean
  status: BidStatus
  amount: number
}

export enum ProjectType {
  Other = 'other',
  Painting = 'painting',
  Lights = 'lights'
}

export enum ExpenseType {
  None = '',
  Other = 'other',
  Materials = 'materials',
  Labor = 'labor'
}

export enum PaymentType {
  None = '',
  Cash = 'cash',
  CreditCard = 'credit card',
  Check = 'check'
}

export enum States {
  AL = 'Alabama',
  AK = 'Alaska',
  AZ = 'Arizona',
  AR = 'Arkansas',
  CA = 'California',
  CO = 'Colorado',
  CT = 'Connecticut',
  DE = 'Delaware',
  FL = 'Florida',
  GA = 'Georgia',
  HI = 'Hawaii',
  ID = 'Idaho',
  IL = 'Illinois',
  IN = 'Indiana',
  IA = 'Iowa',
  KS = 'Kansas',
  KY = 'Kentucky',
  LA = 'Louisiana',
  ME = 'Maine',
  MD = 'Maryland',
  MA = 'Massachusetts',
  MI = 'Michigan',
  MN = 'Minnesota',
  MS = 'Mississippi',
  MO = 'Missouri',
  MT = 'Montana',
  NE = 'Nebraska',
  NV = 'Nevada',
  NH = 'New Hampshire',
  NJ = 'New Jersey',
  NM = 'New Mexico',
  NY = 'New York',
  NC = 'North Carolina',
  ND = 'North Dakota',
  OH = 'Ohio',
  OK = 'Oklahoma',
  OR = 'Oregon',
  PA = 'Pennsylvania',
  RI = 'Rhode Island',
  SC = 'South Carolina',
  SD = 'South Dakota',
  TN = 'Tennessee',
  TX = 'Texas',
  UT = 'Utah',
  VT = 'Vermont',
  VA = 'Virginia',
  WA = 'Washington',
  WV = 'West Virginia',
  WI = 'Wisconsin',
  WY = 'Wyoming'
}