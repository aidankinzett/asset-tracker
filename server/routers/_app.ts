import { router } from "../trpc";

import { cmcRouter } from "@/server/routers/cmc";

export const appRouter = router({
  cmc: cmcRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;