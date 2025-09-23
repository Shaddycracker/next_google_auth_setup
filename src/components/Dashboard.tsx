"use client"

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, User, Mail } from "lucide-react"
import { signIn } from "next-auth/react";

export function DashboardContent() {
  const { data: session, status } = useSession()
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Loading skeleton for header */}
            <div className="mb-8">
              <div className="h-10 w-64 bg-muted animate-pulse rounded-lg"> </div>
            </div>

            {/* Loading skeleton for cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="h-6 w-32 bg-muted animate-pulse rounded"></div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded"></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-6 w-40 bg-muted animate-pulse rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-32 w-full bg-muted animate-pulse rounded"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (!session) {
    return (<div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full relative px-8 py-4 font-bold text-gray-300 rounded-full border border-gray-600 bg-gray-800 transition-all duration-300 hover:bg-gray-700 hover:text-white active:scale-95"
      >
        Continue with Google
      </button>
    </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with logout button */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <Button variant="outline" onClick={() => signOut()} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Profile Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{session?.user?.name || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{session?.user?.email || "Not provided"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Welcome Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Welcome Back!</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Hello {session?.user?.name?.split(" ")[0] || "there"}! You're successfully logged in to your
                    dashboard.
                  </p>
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm font-medium text-primary">🎉 Your session is active and secure</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
