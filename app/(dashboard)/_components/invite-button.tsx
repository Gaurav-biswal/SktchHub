import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Plus_Jakarta_Sans } from "next/font/google";

const font1 = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
})

export const InviteButton = () => {
    return (
        <Dialog>
            <DialogTrigger
                render={
                    <Button variant="outline" className={cn(font1.className)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Invite people
                    </Button>
                    }
            />
            <DialogContent className="p-0 bg-transparent border-none max-w-3xl sm:max-w-3xl" showCloseButton={false}>
                <OrganizationProfile
                  routing="hash"
                  appearance={{
                    elements: {
                        closeButton: "hidden",
                    },
                }}
            />
</DialogContent>
        </Dialog>
    );
};