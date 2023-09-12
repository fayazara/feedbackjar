declare global {
  interface Window {
    googleLoginCallback: () => void;
  }
}
