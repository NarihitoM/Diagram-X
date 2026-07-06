import { useAuth } from '@/store/authstore';
import { Toaster, toast } from 'sonner';
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin, type TokenResponse } from '@react-oauth/google';
import { authapi } from '@/api/authapi';
import { Spinner } from '@/components/ui/spinner';
import DiagramXLogo from "@/assets/DiagramX-Icon.png"

export const Login = () => {
    const [useremail, setuseremail] = useState<string>("");
    const [userpassword, setuserpassword] = useState<string>("");
    const navigate = useNavigate();
    const { loadingLogin, googlelogin, diagramxlogin, loadingDiagramxlogin } = useAuth();

    const googleauth: any = useGoogleLogin({
        onSuccess: async (response: TokenResponse) => {
            try {
                const result = await authapi.googletoken(response);
                const feedback = await googlelogin(
                    result.name,
                    result.email,
                    result.sub,
                    result.picture
                )
                toast.success(feedback.message);
                navigate("/dashboard", { replace: true });
            } catch (err: any) {
                toast.error(err?.response?.data?.message || "It seems something went wrong!")
            }
        },
        onError: () => {
            toast.error("Google login fail!")
        }
    });

    const login = async () => {
        try {
            const message = await diagramxlogin(useremail, userpassword);
            toast.success(message || "Login successful");
                navigate("/dashboard", { replace: true })
            
        }
        catch (err: any) {
            toast.error(err?.response?.data?.message || "It seems something went wrong!")
        }
    }

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    className: "bg-cyan-500 text-white shadow-lg rounded-lg p-4",
                    duration: 4000,
                }}
            />

            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="bg-muted relative hidden lg:block">
                    <div className="flex gap-3 justify-center bg-linear-to-tl from-cyan-500 to-white items-center h-full">
                        <img src={DiagramXLogo} alt="Diagram X" className="size-20 rounded-lg" />
                        <span className="font-bold text-3xl text-primary"><span className="text-cyan-500">D</span>iagram X</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4 p-6 md:p-4">
                    <div className="flex justify-center gap-2 md:justify-center">
                        <Link to="/" className="flex items-center gap-2 font-medium">
                            <img src={DiagramXLogo} alt="Diagram X" className="size-6 rounded-md" />
                            <span className="font-bold text-3xl text-primary"><span className="text-cyan-500">D</span>iagram X</span>
                        </Link>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-xs">
                            <div className="flex flex-col gap-6">
                                <FieldGroup>
                                    <div className="flex flex-col items-center gap-1">
                                        <h1 className="text-3xl font-bold text-cyan-500">Login</h1>
                                    </div>

                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input id="email" onChange={(e) => setuseremail(e.target.value)} value={useremail} type="email" placeholder="Enter Email" />
                                    </Field>
                                    <Field>
                                        <div className="flex items-center">
                                            <FieldLabel htmlFor="password" >Password</FieldLabel>
                                        </div>
                                        <Input id="password" onChange={(e) => setuserpassword(e.target.value)} value={userpassword} placeholder="Enter Password" type="password" />
                                    </Field>
                                    <Field>
                                        <Button type="button" onClick={login} className="bg-cyan-500 hover:bg-cyan-600">{loadingDiagramxlogin ? <Spinner /> : "Login"}</Button>
                                    </Field>
                                    <FieldSeparator>Or continue with</FieldSeparator>
                                    <Field>
                                        <Button onClick={googleauth} variant="outline">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                                                <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
                                                <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
                                                <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
                                                <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
                                            </svg>
                                            {loadingLogin ? "Authenticating" : "Login with Google"}
                                        </Button>
                                        <FieldDescription className="text-center">
                                            Don&apos;t have an account?{" "}
                                            <Link to="/signup" className="underline underline-offset-4">
                                                Sign up
                                            </Link>
                                        </FieldDescription>
                                    </Field>
                                </FieldGroup>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
