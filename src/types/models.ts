import { RadarAddress } from "radar-sdk-js/dist/types";

export type TClient = {
  id?: string
  name: string
  phone: number
  email: string
  address: RadarAddress
  imageUrl?: string
  notes: string[] //**Array of strings to track notes */
};

export type TProject = {
  id?: string
  clientId: string
  projectName: string
  projectStartDate: Date
  projectEndDate: Date
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
  // clientId?: string
  expenseType: ExpenseType
  expenseAmount: number
  paymentType: PaymentType
  expenseDate: Date
  vendor: string
  description: string
  projectId?: string
}

type TBid = {
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