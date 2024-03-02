import { procedure, router } from "@/server/trpc";
import { cmcAxios } from "@/utils/cmcAxios";

export const cmcRouter = router({
  latest: procedure.query(async () => {
    const { data } = await cmcAxios.get("v1/cryptocurrency/listings/latest");

    return data?.data;
  }),
});