import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";

export default function AddInvoice() {
    {/* This is a page */ }
    return (
        <div className="flex items-center justify-center">
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Add Invoice</CardTitle>
                <CardDescription>Upload an invoice document and we will extract the key details using OCR.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="invoice">Invoice Document</Label>
                        <Input id="invoice" type="file" />
                    </div>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-1">
                                <Label>Vendor Name</Label>
                                <Input defaultValue="Acme Inc." />
                            </div>
                            <div className="grid gap-1">
                                <Label>Invoice Date</Label>
                                <Input defaultValue="2023-06-01" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-1">
                                <Label>Invoice Number</Label>
                                <Input defaultValue="INV-2023-06-001" />
                            </div>
                            <div className="grid gap-1">
                                <Label>Total Amount</Label>
                                <Input defaultValue="$1,234.56" />
                            </div>
                        </div>
                        <div className="grid gap-1">
                            <Label>Description</Label>
                            <Textarea defaultValue="Monthly subscription for June 2023" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline">Clear</Button>
                        <Button>Submit Invoice</Button>
                    </div>
                </form>
            </CardContent>
            </Card>

            </div>
    )
}