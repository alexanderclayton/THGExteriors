import { RadarAddress } from "radar-sdk-js/dist/types";

export type TClient = {
  id?: string
  clientFirstName: string
  clientLastName: string
  clientPhone: number
  clientEmail: string
  clientAddress: RadarAddress
  imageUrl?: string
  notes: string[] //**Array of strings to track notes */
};

export type TProject = {
  id?: string
  projectClientId: string
  projectName: string
  projectStartDate: Date
  projectEndDate: Date
  projectPaid: boolean
  projectPaymentType: PaymentType
  projectBid: TBid
  projectType: ProjectType
  // installed: boolean //**for project type lights */
  // teardown: boolean //**for project type lights */
  projectStatus: ProjectStatus
  imageUrl?: string
  notes?: string[] //**Array of strings to track notes */
};

export type TExpense = {
  id?: string
  // clientId?: string
  expenseType: ExpenseType
  expenseAmount: number
  expensePaymentType: PaymentType
  expenseDate: Date
  expenseVendor: string
  expenseDescription: string
  expenseProjectId?: string
  imageUrl?: string
}

export type TModels = TClient | TProject | TExpense;


export type TBid = {
  sent: boolean
  status: BidStatus
  amount: number
}

export enum BidStatus {
  Tentative = 'tentative',
  Accepted = 'accepted',
  Declined = 'declined'
}

export enum ProjectType {
  Other = 'other',
  Painting = 'painting',
  Lights = 'lights'
}

export enum ProjectStatus {
  Upcoming = 'upcoming',
  Current = 'current',
  Complete = 'complete'
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
  Venmo = 'venmo',
  Check = 'check'
}