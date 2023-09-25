import { Hospital } from "./hospital.model";

interface Author {
  id: string,
  name: string,
  image?: string
}

export class Doctor {

  constructor(
    public name: string,
    public image?: string,
    public createdBy?: Author,
    public updatedBy?: Author,
    public hospital?: Hospital,
    public id?: string
  ) { }

}
