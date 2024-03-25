import * as React from "react"

import { cn } from "@/lib/utils"
import { FolderPlus } from 'lucide-react' 
import { Button } from "./ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
interface EmptyPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> { }

export function EmptyPlaceholder({
    className,
    children,
    ...props
}: EmptyPlaceholderProps) {
    return (
        <div
            className={cn(
                "flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm",
                className
            )}
            {...props}
        >
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                {children}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button> Add new invoice </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add invoice</DialogTitle>
                            <DialogDescription>
                                Adding an invoice by entering details and submitting them in the system.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                    Link
                                </Label>
                                <Input
                                    id="picture" type="file"
                                    
                                />
                            </div>
                        
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

interface EmptyPlaceholderIconProps
    extends Partial<React.SVGProps<SVGSVGElement>> {}

EmptyPlaceholder.Icon = function EmptyPlaceHolderIcon({
    className,
    ...props
}: EmptyPlaceholderIconProps) {
    

  

    return (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <FolderPlus  className={cn("h-10 w-10", className)} {...props} />
        </div>
    )
}

interface EmptyPlacholderTitleProps
    extends React.HTMLAttributes<HTMLHeadingElement> { }

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
    className,
    ...props
}: EmptyPlacholderTitleProps) {
    return (
        <h2 className={cn("mt-6 text-xl font-semibold", className)} {...props} />
    )
}

interface EmptyPlacholderDescriptionProps
    extends React.HTMLAttributes<HTMLParagraphElement> { }

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({
    className,
    ...props
}: EmptyPlacholderDescriptionProps) {
    return (
        <p
            className={cn(
                "mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground",
                className
            )}
            {...props}
        />
    )
}