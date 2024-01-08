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
    projectDate: string
    paid: boolean
    imageUrl?: string
  };