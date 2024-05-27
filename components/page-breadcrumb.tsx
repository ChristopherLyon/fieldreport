// Libraries
import React from "react";
import { useSession } from "next-auth/react";

// UI
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AudioLinesIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PageBreadcrumb() {

    // Get session from NextAuth
    const session = useSession();

    return (
        <Breadcrumb className="hidden lg:flex">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink>
                        {/* If !session show skeleton, else show session.user.name */}
                        {session.data ? session.data.user?.name : <Skeleton className="w-28 h-5" />}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="flex flex-row gap-2 items-center">
                    Brain Stream <AudioLinesIcon size="1.5em" />
                    </BreadcrumbPage>
                </BreadcrumbItem>
               {/*  <BreadcrumbSeparator />
                <BreadcrumbItem>
                </BreadcrumbItem> */}
            </BreadcrumbList>
        </Breadcrumb>
    )
}