export default function auth({ next, store }) {
  if (!store.state.authModule.isLoggedIn) {
    return next({
      name: "Login",
    });
  }

  return next();
}
