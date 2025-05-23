'use client';

import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

function BreadCrumbs() {
    const path = usePathname();

    // Ensure no empty segments from leading slash
    const segments = path.split("/").filter(segment => segment !== "");

    console.log(segments);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {segments.map((segment, index) => {
                    const href = `/${segments.slice(0, index + 1).join("/")}`;
                    const isLast = index === segments.length - 1;
                    return (
                        <Fragment key={index}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                            {isLast ? (
                                <BreadcrumbPage>{segment}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                            )}
                            </BreadcrumbItem>
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default BreadCrumbs;
