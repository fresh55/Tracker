"use client";

import { Loader2 } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useContext, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { Client, LoginRequest } from '@/lib/clientApi';
export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState<string | null>(null);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>();


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const client = new Client();
        setIsLoading(true);
        setServerMessage(null); // Clear previous server messages

        try {
            const loginRequest = new LoginRequest();
            loginRequest.email = data.email;
            loginRequest.password = data.password;

            const response = await client.postApiUserLogin(false,false, loginRequest);
            console.log(accessToken);
            router.push('/');
        } catch (error) {
            console.error("Failed to login:", error);
            setServerMessage("Failed to login");
        }
        setIsLoading(false);

    }


    return (
        <div className="grid gap-6">
            {serverMessage && (
                <Alert variant="destructive">
                    <AlertTitle>Pozor</AlertTitle>
                   
                    <AlertDescription>
                        Vase uporabnisko ime ali geslo je napacno
                    </AlertDescription>
                </Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-1 ">
                        <Label htmlFor="email">
                        Email
                        </Label>
                        <Input
                            id="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("email", { required: true })}
                        />
                        <div className="mb-2">
                            {errors.email?.type === "required" && (
                                <p className="px-1 text-xs text-red-600">Email is required </p>
                            )}
                        </div>
                        <Label>Pssword</Label>
                        <Input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("password", { required: true })}
                        />
                        <div className="mb-2">
                            {errors.password?.type === "required" && (
                                <p className="px-1 text-xs text-red-600">Password is required </p>
                            )}
                        </div>
                    </div>
                    <Button
                        className="bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-700 hover:to-sky-600 hover:shadow-sm"
                        disabled={isLoading}
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Login
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Continue with social media account 
                    </span>
                </div>
            </div>
            <Button disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              
            </Button>

            <Button disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

           
                <p className="ml-3">Facebook</p>
            </Button>
        </div>
    );
}