"use server";

import {profile} from "@/lib/db/schema";
import {db} from "@/lib/db/connect";
import {eq} from "drizzle-orm";

export async function getProfile(id) {
	try {
		return await db.query.profile.findFirst({
			where: (profiles, {eq}) => {
				eq(profiles.id, id)
			}
		})
		
	} catch (error) {
		console.error('Error processing user:', error);
		return null;
	}
}
