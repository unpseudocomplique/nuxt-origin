import bcrypt from 'bcryptjs';
import * as z from 'zod';

const schema = z.object({
    display: z.string().min(2),
    domain: z.string().min(2),
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6)
});

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const validatedBody = schema.parse(body);
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(validatedBody.password, salt)

        //Create the organization
        const organization = await prisma.organization.create({
            data: {
                display: validatedBody.display,
                domain: validatedBody.domain
            }
        });

        const profile = await prisma.profile.create({
            data: {
                display: 'admin',
                organizationId: organization.id
            }
        })

        const user = await prisma.user.create({
            data: {
                firstname: validatedBody.firstname,
                lastname: validatedBody.lastname,
                email: validatedBody.email,
                password: hashedPassword,
                UserOrganization: {
                    create: {
                        role: 'admin',
                        organizationId: organization.id,
                        display: `${validatedBody.firstname} ${validatedBody.lastname} - ${organization.display}`,
                        email: validatedBody.email,
                        profileId: profile.id
                    },
                }
            },
            include: {
                UserOrganization: {
                    select: {
                        id: true,
                    }
                }
            }
        })

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                selectedOrganizationId: user.UserOrganization[0].id
            }
        })


        return { success: true, organization };

    } catch (error) {
        console.log(error)
        throw createError({ statusCode: 500, message: 'Failed to create organization', error })
    }
});