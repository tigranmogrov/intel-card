export default function auth({ next, store }) {
  if (store.state.authModule.isLoggedIn) {
    return next({
      name: "Home",
    });
  }

  return next();
}
