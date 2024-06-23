import Link from 'next/link'
import { buttonVariants } from '../../../components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { cn } from '../../../lib/utils'
import LoginForm from './Components/LoginForm'
export default function LoginPage() {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Link
                href="/"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute left-4 top-4 md:left-8 md:top-8"
                )}
            >
                <>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back    
                </>
            </Link>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <div className="flex items-center justify-center mb-3">
                        <Link
                            href="/"
                            className="flex h-9 items-center gap-2 rounded-xl px-2 mb-3"
                        >
                            
                        </Link>
                    </div>
                    <h1 className="text-5xl font-semibold tracking-tight">
                        Welcome back, <br/>
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        If you dont have an account, you can{' '}
                          <Link
                            href="/register"
                            className="hover:text-brand underline underline-offset-4"
                        >
                            register here
                        </Link>
                    </p>


                </div>
            <LoginForm />
                
            </div>
        </div>
    )
}