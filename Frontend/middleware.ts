import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5093';
export async function middleware(request: NextRequest) {
     
  
    let user = null;
    console.log("Backend URL from env:", process.env.NEXT_PUBLIC_BACKEND_URL);
    console.log("Backend URL used:", backendUrl);
    try {
        const response = await fetch(`${backendUrl}/api/User/getCurrentUserId`, {
            method: 'GET',
            headers: {
                Cookie: cookies().toString() 
            }

        });
        
        user = await response.json();
        console.log("User: ", user.email);
    } catch (error) {
        console.error("Error fetching current user:", error);
       
    } 
    
    if (!user && request.nextUrl.pathname === '/') {
        return Response.redirect(new URL('/login', request.url));
    }
    if (user && request.nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/', request.url));
    } // Redirect to home page if user exists and tries to access login page
    if (user && request.nextUrl.pathname === '/register') {
        return Response.redirect(new URL('/', request.url));
    } // Redirect to home page if user exists and tries to access register page
}


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};