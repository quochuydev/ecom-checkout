import { APIService } from "@ecom/types";

export type ApiV1AdminFileCreate = APIService<
  "api.v1.admin.file.create",
  {
    files: Array<{
      fileName: string;
      url: string;
    }>;
  },
  void
>;
