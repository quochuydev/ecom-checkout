import { APIService } from "./types";

export type ApiV1AuthAuthorize = APIService<
  "api.v1.auth.authorize",
  undefined,
  void
>;

export type ApiV1AuthLogin = APIService<
  "api.v1.auth.login",
  {
    username: string;
    password: string;
  },
  void
>;
