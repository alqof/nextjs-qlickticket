import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { IJwt } from './libs/types/auth'
import { getToken } from 'next-auth/jwt'
import environment from './libs/config/environtment'
 
export async function middleware(request: NextRequest) {
    const token: IJwt|null = await getToken({req: request, secret: environment.AUTH_SECRET})
    const { pathname } = request.nextUrl;
    console.log("token role ==> ", token?.user?.role)
    console.log("token ==> ", token)

    // Protect /member/* && /explore/*
    if( (pathname==='/member' || pathname.startsWith('/member/')) || (pathname==='/explore' || pathname.startsWith('/explore/')) ){
        if(!token){
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    }

    // Protect /admin dan /admin/*
    if (pathname === '/admin' || pathname.startsWith('/admin/')) {
        if (!token || token.user?.role !== 'admin') {
            return NextResponse.rewrite(new URL('/404', request.url))
        }
    }

    // Already logged in? protect auth access
    if(pathname==='/auth/register' || pathname==="/auth/login"){
        if(token){
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return NextResponse.next(); //==> Jika tidak ada redirect, request tetap lanjut
}
 
export const config = {
    matcher: [
        '/admin',
        '/admin/:path*',
        '/member',
        '/member/:path*',
        '/explore',
        '/explore/:path*',
        '/auth/:path*',
    ],
}