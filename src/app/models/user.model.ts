import { environment } from "../../environments/environment";

const baseUrl = environment.baseUrl;

export class User {

  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public profilePicture?: string,
    public role?: string,
    public google?: boolean,
    public id?: string
  ) { }

  get pictureUrl() {
    if (this.profilePicture) {
      if (this.profilePicture?.includes('https')) {
        return this.profilePicture;
      }

      return `${ baseUrl }/uploads/users/${ this.profilePicture }`;
    }

    return `${ baseUrl }/uploads/users/no-image`;
  }

}
