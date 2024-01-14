export type TClient = {
  id?: string
  name: string
  phone: number
  email: string
  address: string
  // city: string
  // state: string //**Maybe a selector? */
  zip: number
  imageUrl?: string
  // notes: string[] //**Array of strings to track notes */
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
  // expeses: number[]  //**Array of numbers to calculate costs */
  imageUrl?: string
  // notes: string[] //**Array of strings to track notes */
};

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

export type TClientValidation = {
  name: boolean,
  phone: boolean,
  email: boolean,
  address: boolean,
  zip: boolean
}