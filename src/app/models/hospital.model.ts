interface Author {
  id: string,
  name: string,
  image?: string
}

export class Hospital {

  constructor(
    public name: string,
    public image?: string,
    public createdBy?: Author,
    public updatedBy?: Author,
    public id?: string
  ) { }

}
