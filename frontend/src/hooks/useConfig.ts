// APIs are now served from this Next.js app itself — no external backend needed.
export function useConfig() {
  return {
    configuration: { apiUrl: '' },
  };
}
