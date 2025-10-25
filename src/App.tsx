import { useState } from "react";
import {
  Plane,
  Facebook,
  Instagram,
  MessageCircle,
  Music,
  Menu,
  X,
} from "lucide-react";

function App() {
  const [lang, setLang] = useState("ar");

  // ✅ Translations for navbar + form
  const translations = {
    fr: {
      main: "Page principale",
      programmes: "Programmes",
      title: "Réserver votre voyage",
      selectDate: "Sélectionnez la période de départ",
      fullName: "Nom complet",
      travelers: "Nombre de voyageurs",
      phone: "Numéro de téléphone",
      book: "Réserver",
      success:
        "Merci ! Votre réservation a bien été enregistrée. Vous serez contacté par nos agents dans les plus brefs délais pour compléter les démarches.",
      dateOptions: [
        "01/11/2025 → 04/11/2025",
        "10/11/2025 → 14/11/2025",
        "20/11/2025 → 24/11/2025",
        "01/12/2025 → 05/12/2025",
      ],
    },
    ar: {
      main: "الصفحة الرئيسية",
      programmes: "البرامج",
      title: "احجز رحلتك",
      selectDate: "اختر فترة المغادرة",
      fullName: "الاسم الكامل",
      travelers: "عدد المسافرين",
      phone: "رقم الهاتف",
      book: "احجز الآن",
      success:
        "شكرًا لك! تم استلام حجزك بنجاح، سيتصل بك أحد وكلائنا في أقرب وقت لإتمام الإجراءات.",
      dateOptions: [
        "01/11/2025 ← 04/11/2025",
        "10/11/2025 ← 14/11/2025",
        "20/11/2025 ← 24/11/2025",
        "01/12/2025 ← 05/12/2025",
      ],
    },
  };

  const t = translations[lang];

  const [formData, setFormData] = useState({
    departureDate: "",
    fullName: "",
    numberOfTravelers: "",
    phoneNumber: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formspreeEndpoint = "https://formspree.io/f/xjkvpqrb";

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          departureDate: "",
          fullName: "",
          numberOfTravelers: "",
          phoneNumber: "",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* ✅ Navbar */}
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2">
              <Plane className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
              <span className="text-lg sm:text-xl font-bold text-slate-800">
                IDRISS VOYAGE
              </span>
            </div>

            {/* ✅ FIXED LINKS for Desktop */}
            <div className="hidden sm:flex gap-6 lg:gap-8">
              <a
                href="https://idrissvoyage.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
              >
                {t.main}
              </a>
              <a
                href="https://idrissvoyage.netlify.app/programmes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
              >
                {t.programmes}
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setLang(lang === "ar" ? "fr" : "ar")}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                {lang === "ar" ? "FR" : "AR"}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 text-slate-700 hover:text-blue-600 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* ✅ Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t border-slate-200 py-4 space-y-3">
              <a
                href="https://idrissvoyage.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate-700 hover:text-blue-600 font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.main}
              </a>
              <a
                href="https://idrissvoyage.netlify.app/programmes"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate-700 hover:text-blue-600 font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.programmes}
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* ✅ Main content */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="w-full max-w-xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 text-center mb-8">
            {t.title}
          </h1>

          {submitted ? (
            <div className="bg-green-100 text-green-700 p-5 rounded-lg text-center font-medium shadow-md">
              {t.success}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
            >
              <div>
                <label
                  htmlFor="departureDate"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  {t.selectDate}
                </label>
                <select
                  id="departureDate"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="">
                    {lang === "ar" ? "اختر التاريخ" : "Choisir une date"}
                  </option>
                  {t.dateOptions.map((date, i) => (
                    <option key={i} value={date}>
                      {date}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  {t.fullName}
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={t.fullName}
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="numberOfTravelers"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  {t.travelers}
                </label>
                <input
                  type="number"
                  id="numberOfTravelers"
                  name="numberOfTravelers"
                  value={formData.numberOfTravelers}
                  onChange={handleChange}
                  min="1"
                  placeholder="1"
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  {t.phone}
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+213 00 00 00 00"
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg"
              >
                {t.book}
              </button>
            </form>
          )}
        </div>
      </main>

      {/* ✅ Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto" dir="ltr">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Plane className="w-5 h-5 text-blue-600" />
              <span className="text-base font-bold text-slate-800">
                IDRISS VOYAGE
              </span>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/213799632570"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/idriss.bournane"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/idrissbournane"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Music className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500">
            © 2025 IDRISS VOYAGE. Tous droits réservés | Développé par{" "}
            <a
              href="https://zedlink.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-semibold"
            >
              ZEDLINK Solution
            </a>
            .
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
