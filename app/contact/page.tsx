import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim | Arges Makine",
  description: "Arges Makine - Bize ulaşın, sorularınızı yanıtlayalım",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-[#0f0f0f] py-12 md:py-16">
        <div className="px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Bizimle İletişime Geçin
            </h1>
            <p className="text-zinc-400 md:text-lg">
              Sorularınızı yanıtlamak, ürünlerimiz hakkında bilgi vermek veya
              teklif hazırlamak için her zaman hazırız.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-zinc-50 p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold mb-6">İletişim Bilgileri</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-[#febd00]/10 p-3">
                    <MapPin className="h-5 w-5 text-[#febd00]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adres</h3>
                    <p className="text-zinc-600 flex flex-col">
                      <span>İkitelli Organize Sanayi Bölgesi Mahallesi</span>
                      <span>Sefaköy Sanayi Sitesi</span>
                      <span>15. Blok No:26</span>
                      <strong>Başakşehir, İstanbul</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-[#febd00]/10 p-3">
                    <Phone className="h-5 w-5 text-[#febd00]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <p className="text-zinc-600">
                      <a
                        href="tel:+903122222222"
                        className="hover:text-[#febd00]"
                      >
                        +90 212 549 05 86
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-[#febd00]/10 p-3">
                    <Mail className="h-5 w-5 text-[#febd00]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">E-posta</h3>
                    <p className="text-zinc-600">
                      <a
                        href="mailto:muzafferarslan05@hotmail.com"
                        className="hover:text-[#febd00]"
                      >
                        muzafferarslan05@hotmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-[#febd00]/10 p-3">
                    <Clock className="h-5 w-5 text-[#febd00]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Çalışma Saatleri</h3>
                    <p className="text-zinc-600">
                      Pazartesi - Cuma: 08:30 - 18:00 <br />
                      Cumartesi: 8:30 - 15:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">Lokasyonumuz</h2>

              <div className="aspect-square w-full rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.4142740668723!2d28.803431499999998!3d41.0815278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA0JzUzLjUiTiAyOMKwNDgnMjAuMiJF!5e0!3m2!1str!2str!4v1726453935036!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="mt-4">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=41.081528,28.80562"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#febd00] rounded-lg text-black font-medium hover:bg-[#febd00]/90 transition-colors"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Yol Tarifi Al
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
