// generic key: value object
export interface Obj {
  [key: string]: any 
}

export interface Entry extends Obj{
  Description?: string,
  Type: string,
  Category: string[],
  Amount: string,
  Notes?: string
}

export interface DMY {
  [key: string]: JSX.Element
}