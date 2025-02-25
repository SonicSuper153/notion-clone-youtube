import NewDocumentButton from "./NewDocumentButton";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function SideBar() {
  const menuOptions = (
    <>
      <NewDocumentButton />
    </>
  );

  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
      {/* Show MenuIcon only on small screens */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>
                {menuOptions} {/* Ensure menu options appear in the Sheet */}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div> {/* ← Fixed the closing tag issue */}

      {/* Show NewDocumentButton only on medium+ screens */}
      <div className="hidden md:inline">
        {menuOptions}
      </div>
    </div>
  );
}

export default SideBar;
