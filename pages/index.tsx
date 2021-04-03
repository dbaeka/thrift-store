/*
|--------------------------------------------------------------------------
| The home page.
|--------------------------------------------------------------------------
|
| The home page of your application.
|
*/
import Link from "next/link";
import {H1} from "@/components/Typography/Headers";

export default function Home() {
    return (
        <>
            <div className="flex w-screen h-screen items-center justify-center">
                <div className="w-1/2">
                    <H1 center={true} withMargin={true}>
                        Welcome to the Thrift Store Project
                    </H1>

                    <div className="flex justify-between items-center text-blue-500 underline">
                        <Link href="/dashboard">Go to Admin Dashboard</Link>
                        <Link href="/user/password/forgot">Go to Reset Password Screen</Link>
                        <Link href="/user/email/verify/1/2">Go to Verify Screen</Link>
                    </div>
                </div>
            </div>
        </>
    );
}