import { Injectable } from "@angular/core";
import { User } from "../models/register";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AccountsService {
  readonly rootUrl = "http://localhost:5001/api";
  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    const body: User = {
      accountName: user.accountName,
      primaryAdminFirstlName: user.primaryAdminFirstlName,
      primaryAdminLastName: user.primaryAdminLastName,
      primaryAdminEmail: user.primaryAdminEmail,
      primaryAdminPassword: user.primaryAdminPassword,
      accountMobile: user.accountMobile,
      countryId: user.countryId,
    };

    return this.http.post(this.rootUrl + "/api/Account", body);
  }
  // Url: string;
  // token: string;
  // header: any;
  // constructor(private http: HttpClient) {
  //   this.Url = "http://localhost:5001/api";
  // }
  // CreateUser(register: Register) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ "Content-Type": "application/json" })
  //   };
  //   return this.http.post<Register[]>(
  //     this.Url + "/Account/",
  //     register,
  //     httpOptions
  //   );
  // }
}
