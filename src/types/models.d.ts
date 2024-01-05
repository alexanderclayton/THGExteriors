export type TClient = {
    id?: string
    name: string
    phone: string
    email: string
    address: string
  };

export type TProject = {
    id?: string
    clientId: string
    projectName: string
    projectDate: string
    paid: boolean
  };