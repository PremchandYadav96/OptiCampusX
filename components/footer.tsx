import Image from "next/image"
import { Separator } from "@/components/ui/separator"

const teamMembers = ["V C Premchand Yadav", "P R Kiran Kumar Reddy", "Edupulapati Sai Praneeth", "Sanjana Pasam"]

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - OptiCampus */}
          <div className="flex items-center gap-3">
            <Image src="/opticampus-logo.png" alt="OptiCampus-X" width={48} height={48} className="rounded-lg" />
            <div>
              <h3 className="font-[family-name:var(--font-display)] font-bold">OptiCampus-X</h3>
              <p className="text-xs text-muted-foreground">VIT-AP Smart Campus Resource Optimization</p>
            </div>
          </div>

          {/* Right side - Team RED-DRAGON */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Made by</span>
              <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-lg">
                <Image src="/red-dragon-logo.png" alt="Team RED-DRAGON" width={32} height={32} className="rounded" />
                <span className="font-[family-name:var(--font-display)] font-bold text-sm">Team RED-DRAGON</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-3 gap-y-1 text-xs text-muted-foreground">
              {teamMembers.map((member, i) => (
                <span key={member} className="flex items-center gap-1">
                  {member}
                  {i < teamMembers.length - 1 && <span className="text-border">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>Powered by Google Gemini 2.5 Flash API • Built for Google Solution Challenge 2025</p>
          <p>© 2025 OptiCampus-X for VIT-AP University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
