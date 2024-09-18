import type { File } from ".";

export type APIGetImages = {
  url: "/api/images";
  method: "get";
  result: {
    items: File[];
    total: number;
  };
};
