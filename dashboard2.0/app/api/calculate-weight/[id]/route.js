import { db } from "@/lib/db/connect";
import { eq } from "drizzle-orm";
import { calculateDeveloperWeight } from "./logic";
import { user } from './data';


export async function POST(req, { params }) {
    try {
        // const { id } = params;
        // const developerId = parseInt(id, 10);
        // const { user } = await req.json();

        const data = await calculateDeveloperWeight(user);

        return Response.json({ data });
    }
    catch (error) {
        // console.error('Error calculating developer weight:', error.stack);
        console.log('Error calculating developer weight:', error.message);
        return Response.error({ message: `Error calculating developer weight ${error.message}` });
    }
}
