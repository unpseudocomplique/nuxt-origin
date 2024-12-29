export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const page = parseInt(query.page?.toString() || '1', 10);
    const pageSize = 2;

    try {
        const organizations = await prisma.organization.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: {
                display: 'asc'
            },
            include: {
                UserOrganization: {
                    where: {
                        role: "admin"
                    },
                    select: {
                        user: {
                            select: {
                                firstname: true,
                                lastname: true,
                            }
                        }
                    }
                }
            }
        });

        const total = await prisma.organization.count();

        return { success: true, organizations, total };

    } catch (error) {
        console.log(error)
        throw createError({ statusCode: 500, message: 'Failed to fetch organizations', error })
    }
});