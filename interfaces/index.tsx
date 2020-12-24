// generic key: value object
export interface Obj {
  [key: string]: any 
}

export interface Entry extends Obj{
  Vendor?: string,
  Type: string,
  Category: string[],
  Amount: number,
  Notes?: string
}

export interface DMY {
  [key: string]: JSX.Element
}

export interface Headers {
  Authorization: string,
  'Content-Type'?: string
}