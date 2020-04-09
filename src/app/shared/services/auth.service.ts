import { BaseService } from "./../core/base.service";
import { Injectable, Injector } from "@angular/core";
import { map } from "rxjs/operators";
import { User } from "src/app/account/models/register";

@Injectable({
  providedIn: "root"
})
export class AuthService extends BaseService<any> {
  constructor(injector: Injector) {
    super(injector);
  }

  login(username: string, password: string) {
    return this.post("account/login", { username, password }).pipe(
      map((result: any) => {
        if (!result.token) return false;

        localStorage.setItem("token", result.token);
        // const helper = new JwtHelperService();

        // const decodedToken = helper.decodeToken(result.token);
        // this.currentUserSubject.next(decodedToken); // <-- pump the value in here
        return true;
      })
    );
  }

  logout() {
    localStorage.removeItem("token");
  }

  isAuthendicated() {
    const token = localStorage.getItem("token");
    if (!token) return false;
    return true;
  }

  register(model: User) {
    return this.post("account/register", model);
  }
}
