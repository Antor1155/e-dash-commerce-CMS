import { createNextRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

import { utapi } from "uploadthing/server";
import { isAdminRequest } from "../auth/[...nextauth]/route";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});

export const DELETE = async (req, res) => {
  try {
    await isAdminRequest()
    const params = new URL(req.url).searchParams
    const id = params.get("id")
    if (id) {
      const result = await utapi.deleteFiles(id)

      if (result.success) {
        return new Response("success", { status: 200 })
      }

      return new Response("success as img not in database", { status: 200 })
    } else {
      return new Response("failed to delete ", { status: 500 })
    }

  } catch (error) {
    console.log("error in delete images for StorageCloud***: ", error)
  }



}