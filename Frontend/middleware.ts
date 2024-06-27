import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {

    let user = null;
    try {
        const response = await fetch("http://localhost:5093/api/User/getCurrentUserId", {
            method: 'GET',
            headers: {
                Cookie: cookies().toString() 
            }

        });
        
        user = await response.json();
        console.log("User: ", user);
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null; // Handle error appropriately
    } 
   
    if (!user && request.nextUrl.pathname  === '/') {
        return Response.redirect(new URL('/login', request.url));
    }
    if (user && request.nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/', request.url)); // Redirect to home page if user exists and tries to access login page
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}