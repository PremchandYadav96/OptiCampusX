import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Mail, CheckCircle } from "lucide-react"

export default function SignupSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <Image src="/opticampus-logo.png" alt="OptiCampus-X" width={150} height={60} />
          </div>

          <Card className="border-0 shadow-xl text-center">
            <CardHeader className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Account Created!</CardTitle>
              <CardDescription>We&apos;ve sent a verification email to your inbox</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Please check your email and click the verification link to activate your account.
                </p>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/auth/login">Continue to Login</Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                  Didn&apos;t receive the email? Check your spam folder or try signing up again.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
