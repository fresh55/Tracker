import { EmptyPlaceholder } from "../../components/EmptyPlaceholder";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export default function Home() {



    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                <Card className="bg-gradient-to-r from-emerald-500 to-emerald-900 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-white">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>

                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
           
                <Card >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>

                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
</div>
        <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>No invoices</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
                Add a new invoice to get started
            </EmptyPlaceholder.Description>

        </EmptyPlaceholder>
        </>
            );
     
}