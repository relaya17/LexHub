import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Mail } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-primary-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-headline text-4xl font-bold mb-6">
          אודותינו
        </h2>
        <p className="font-body text-xl mb-8 max-w-3xl mx-auto opacity-90">
          ארכיב דיגיטלי הוא מערכת מקוונת המיועדת לשמירה, ניהול וגישה מאובטחת למסמכים וקבצים. במקום לחפש בקלסרים פיזיים, הכל הופך לדיגיטלי, זמין ומוגן.
        </p>
        <p className="font-body text-lg mb-8 max-w-3xl mx-auto opacity-90">
          המטרה שלנו ב-A.M.D היא להעביר אתכם לעולם הדיגיטלי בצורה חלקה ונוחה, תוך הבטחת שמירה על המידע שלכם לטווח ארוך.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
          <div className="bg-white/10 rounded-lg p-6 text-right">
            <h3 className="font-headline text-2xl font-bold mb-4">המשימה שלנו</h3>
            <p className="font-body opacity-90">
              להפוך כל מסמך פיזי לנכס דיגיטלי נגיש, מאובטח ומנוהל היטב.
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-6 text-right">
            <h3 className="font-headline text-2xl font-bold mb-4">החזון שלנו</h3>
            <p className="font-body opacity-90">
              להוביל את מהפכת הארכיון הדיגיטלי ולהיות הבחירה המועדפת לניהול מסמכים חכם.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
