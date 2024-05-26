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

export default function PageBreadcrumb() {

    // Get session from NextAuth
    const session = useSession();

    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink>{session.data?.user?.name}
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