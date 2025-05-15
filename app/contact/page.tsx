import { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim | Arges Makine",
  description: "Arges Makine - Bize ulaşın, sorularınızı yanıtlayalım",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-[#0f0f0f] py-12 md:py-16">
        <div className="container px-4 md:px-6">
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
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-zinc-100">
                <h2 className="text-2xl font-bold mb-6">Bize Yazın</h2>
                <ContactForm />
              </div>
            </div>

            <div>
              <div className="bg-zinc-50 p-8 rounded-xl shadow-sm h-full">
                <h2 className="text-2xl font-bold mb-6">İletişim Bilgileri</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 rounded-full bg-[#febd00]/10 p-3">
                      <MapPin className="h-5 w-5 text-[#febd00]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Adres</h3>
                      <p className="text-zinc-600">
                        İstanbul Yolu 35. km No:244, <br />
                        Ankara, Türkiye
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
                          +90 312 222 22 22
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
                          href="mailto:info@argesmakine.com"
                          className="hover:text-[#febd00]"
                        >
                          info@argesmakine.com
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
                        Cumartesi: 09:00 - 13:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Lokasyonumuz</h2>
          <div className="aspect-video w-full rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.4022479118985!2d32.72115281744385!3d39.90173899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34e41ade85379%3A0xc9e42931bc764962!2sAnkara!5e0!3m2!1str!2str!4v1654170052661!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
