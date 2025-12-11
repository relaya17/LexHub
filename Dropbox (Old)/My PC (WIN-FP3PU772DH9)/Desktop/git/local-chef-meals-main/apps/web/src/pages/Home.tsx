import { Button } from "@/components/ui/button";
import ChefShowcase from "@/components/chef/ChefShowcase";
import ChefHomeAssistant from "@/components/chef/ChefHomeAssistant";

export default function Home() {
  return (
    <div className="min-h-screen pt-0">
      <section className="relative overflow-hidden bg-gradient-to-br from-warm-cream via-background to-secondary py-2 md:py-3 mb-10 md:mb-14">
        <div className="container mx-auto max-w-6xl px-4 relative flex flex-col items-center text-center gap-2 md:gap-3">
          <div className="animate-fade-in text-center space-y-1">
            <div className="text-base md:text-lg uppercase tracking-[0.18em] text-primary/90 font-medium font-montserrat drop-shadow-sm">
              Your chef{" "}
              <span className="font-dancing text-primary/95 tracking-tight text-lg md:text-xl">
                knows exactly what you love
              </span>
            </div>
          </div>

          <div className="relative animate-scale-in flex justify-center w-full">
            <ChefShowcase />
          </div>

          <div className="animate-fade-in text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.08em] leading-snug max-w-2xl mx-auto font-montserrat text-primary/90">
              <span>הטעמים שלך,</span>{" "}
              <span className="font-dancing text-accent/80 tracking-tight text-3xl sm:text-4xl md:text-5xl">
                העשייה שלנו.
              </span>
            </h1>
            <div className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground px-4">
              בחרי בין חוויה אישית עם השף הדיגיטלי שלנו לבין מעיין בתפריט העשיר – אנחנו עומדים לרשותך
              בכל דרך שאת בוחרת, במנה ראשונה, עיקרית או סיר מלא.
            </div>
          </div>

          {/* Removed feature & assistant sections per request */}
          <div className="pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
