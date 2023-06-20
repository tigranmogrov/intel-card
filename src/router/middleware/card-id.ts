import { isExistsDoc } from "@/utils";

export default async function auth({ to, next, store }) {
  const id = to.params.id;
  const uid = await store.dispatch("getUid");
  const isExists: boolean = await isExistsDoc(
    uid,
    "card-groups",
    "groups",
    id.toLowerCase()
  );

  if (!isExists) {
    return next({
      name: "Cards",
    });
  }

  return next();
}
