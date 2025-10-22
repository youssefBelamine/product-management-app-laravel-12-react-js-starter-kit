import React from "react";
import { Link } from "@inertiajs/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

export default function ProductsPagination({ links }: { links: any[] }) {
  if (!links || links.length === 0) return null;

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {links.map((link, index) => {
          // If it's "Previous" or "Next" link
          if (link.label.includes("Previous")) {
            return (
              <PaginationItem key={index}>
                {link.url ? (
                  <PaginationPrevious >
                    <Link href={link.url} preserveScroll>
                      Previous
                    </Link>
                  </PaginationPrevious>
                ) : (
                  <PaginationPrevious
                    aria-disabled
                    className="pointer-events-none opacity-50"
                  >
                    Previous
                  </PaginationPrevious>
                )}
              </PaginationItem>
            );
          }

          if (link.label.includes("Next")) {
            return (
              <PaginationItem key={index}>
                {link.url ? (
                  <PaginationNext >
                    <Link href={link.url} preserveScroll>
                      Next
                    </Link>
                  </PaginationNext>
                ) : (
                  <PaginationNext
                    aria-disabled
                    className="pointer-events-none opacity-50"
                  >
                    Next
                  </PaginationNext>
                )}
              </PaginationItem>
            );
          }

          // Regular page number links
          return (
            <PaginationItem key={index}>
              <PaginationLink
                href={link.url ?? "#"}
                isActive={link.active}
                
              >
                <Link href={link.url ?? "#"} preserveScroll>
                  {link.label}
                </Link>
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
}
