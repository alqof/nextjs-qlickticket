import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { IJwt } from './libs/types/auth'
import { getToken } from 'next-auth/jwt'
import environment from './libs/config/environtment'
 
export async function middleware(request: NextRequest) {
    const token: IJwt|null = await getToken({req: request, secret: environment.AUTH_SECRET})
    // const accessToken = token?.user?.accessToken; 
    // console.log("accessToken ==> ", accessToken);
    const { pathname } = request.nextUrl;

    // // Validasi token ke backend pakai fetch (bukan axios)
    // let isValid = false;
    // if (accessToken) {
    //     const res = await fetch(`${environment.BACKEND_API}/auth/me`, {
    //         headers: { Authorization: `Bearer ${accessToken}` }
    //     });
    //     isValid = res.status === 200;
    //     if (res.status === 403) {
    //         // Hapus cookie session
    //         const response = NextResponse.redirect(new URL("/auth/login", request.url));
    //         response.cookies.delete("next-auth.session-token");
    //         response.cookies.delete("next-auth.callback-url");
    //         return response;
    //     }
    // }


    // Redirect admin ke /admin jika bukan di /admin
    if (token && token.user?.role==='admin' && !pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Protect /admin dan /admin/*
    if (pathname==='/admin' || pathname.startsWith('/admin/')) {
        if (!token || token.user?.role !== 'admin') {
            return NextResponse.rewrite(new URL('/404', request.url))
        }
    }
    // Protect /member/* && /explore/*
    if(pathname==='/member' || pathname.startsWith('/member/')){
        if(!token){
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    }

    // Already logged in? protect auth access
    if(token){
        if(pathname==='/auth/register' || pathname==="/auth/login"){
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
        '/',
    ],
}