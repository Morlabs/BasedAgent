import nodemailer from 'nodemailer'
import { db } from "@/lib/db/connect";
import { sql, eq } from "drizzle-orm";
import { developerInvites } from "@/lib/db/schema";
import { v4 as uuidv4 } from 'uuid'

export async function POST(request) {
    const { developerId, inviteeEmail, source, totalWeight } = await request.json()


    // Check if the referral already exists
    const referral = await db.query.developerInvites.findFirst({
        where: eq(developerInvites.email, inviteeEmail)
    });

    if (referral) {
        return Response.json({ message: 'Referral already exists' })
    }



    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        port: 465,
       secure: true,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASS,
        },
    })


    const referralToken = uuidv4()
    // const baseUrl = 'http://localhost:3000'
    const baseUrl = process.env.FE_BASE_URL
    const referralLink = `${baseUrl}/home`

    const html = `
        <h1>Morlabs Referral Invite</h1>
        <p>Hi there! You've been invited to join Morlabs referral program. Click the link below to get started:</p>
        <a href="${referralLink}">${referralLink}</a>
    `

    const mailOptions = {
        from: {
            name: "Based Agent",
            address: process.env.SMTP_EMAIL
        },

        to: inviteeEmail,
        subject: "Referral Invite",
        html: html,
    }

    try {
        await transporter.sendMail(mailOptions)

        let earnings = totalWeight * 0.1
        earnings = Math.round(earnings)

        // Step 1: Fetch the current maximum id
        const maxIdResult = await db
            .select({ maxId: sql`MAX(id)` })
            .from(developerInvites)
            .limit(1);

        // Get the maximum id
        const maxId = maxIdResult[0]?.maxId || 0;

        // Step 2: Reset the sequence based on the maximum id
        await db.execute(
            sql`SELECT setval(pg_get_serial_sequence('developer_invites', 'id'), ${maxId + 1}, false);`
        );

        // Step 3: Insert the new record
        const invite = await db.insert(developerInvites).values({
            developerId: developerId,         // ID of the developer sending the invite
            email: inviteeEmail,            // Email of the invited developer
            status: 'pending',                // Initial status of the invite
            earnings: earnings,                  // Initial earnings (default is 0)
            inviteDate: new Date(),           // Current timestamp for invite date
            source: source,                   // Source of the invite (e.g., email, LinkedIn)
            githubAccess: 'Level 1'
        })

        console.log('Referral invite sent:', invite)

        return Response.json(invite)
    } catch (error) {
        console.error('Error sending referral invite:', error)
        return Response.json({ message: 'Error sending referral invite' })
    }

}