export type TClient = {
  id?: string
  name: string
  phone: number
  email: string
  address: string
  imageUrl?: string
};

export type TProject = {
  id?: string
  clientId: string
  projectName: string
  projectDate: Date
  paid: boolean
  bid: TBid
  projectType: ProjectType
  imageUrl?: string
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