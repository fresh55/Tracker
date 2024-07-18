'use client'

import {Loader2} from "lucide-react";
import {FieldValues, SubmitHandler, useForm}
from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Client, RegisterUserCommand } from '@/lib/clientApi';
import { useRouter } from "next/navigation";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
const UserSchema = z.object({
    password: z.string()
        .min(6, { message: "Password must be at least six characters long." })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one numeric digit, and one nonalphanumeric character."
    ),
    email: z.string().email(),
});

const RegisterForm = () => {
    const [isLoading,setIsLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState<string | null>(null);
    const router = useRouter();
    const client = new Client(); // Create a Client instance
    const { 
        register, 
        handleSubmit,

        formState: {
          errors
        },
        setError

    } = useForm<FieldValues>(
        {
            resolver: zodResolver(UserSchema)
            }        );
   

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        setIsLoading(true);
        try {
            const registerCommand = new RegisterUserCommand({
                email: data.email,
                password: data.password
            });

            await client.registerUser(registerCommand);

            console.log("Registration successful");
            router.push('/login');
        } catch (error) {
            console.error("Registration failed:", error);
            setError("root.serverError", {
                type: "server",
                message: "Registration failed. Please try again."
            });
        } finally {
            setIsLoading(false);
        }
    };
    
      
      return (
        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1 ">
                          <Label htmlFor="email">Email</Label>
                          <Input
                              id="email"
                              placeholder="name@gmail.com"
                              type="email"
                              autoCapitalize="none"
                              autoComplete="email"
                              autoCorrect="off"
                              disabled={isLoading}
                              {...register("email", { required: true })}
                          />
                          <div className="mb-2">
                              {errors.email?.type === 'required' && <p className="px-1 text-xs text-red-600">Email is required </p>}
                          </div>

               <Label>Password</Label>
                <Input
                  id="password"
                  placeholder="pass123"
                  type="password"
                  autoComplete="current-password"
                  autoCorrect="off"
                  disabled={isLoading}  
                  {...register("password",{ required: true})}
                />
                          <div className="mb-2">
                              {errors.password && typeof errors.password.message === 'string' && (
                                  <span className="px-1 text-xs text-red-600">{errors.password.message}</span>
                              )}
                          </div>
              
             
              
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-700 hover:to-sky-600 hover:shadow-sm"  disabled={isLoading}>
              {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
               
                Registration
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
             
            </div>
            <div className="relative flex justify-center text-xs uppercase">
            
            </div>
          </div>
         
         
        </div>
      )
              }


export default RegisterForm;