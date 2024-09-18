const buildConfig = () => {
  return {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3333",
  };
};

export const config = buildConfig();
