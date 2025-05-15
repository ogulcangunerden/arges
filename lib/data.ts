export type Product = {
  id: string;
  title: string;
  slug: string;
  category: string;
  brand: string;
  imageUrl: string;
  description: string;
  features: string[];
  specifications: {
    name: string;
    value: string;
  }[];
};

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type Brand = {
  id: string;
  name: string;
};

export const categories: Category[] = [
  {
    id: "yuruyus-alt-takim",
    name: "Yürüyüş Alt Takım",
    description:
      "Paletli iş makineleri için yürüyüş takımları ve alt şase parçaları",
  },
  {
    id: "kazici-delici-grubu",
    name: "Kazıcı Delici Grubu",
    description: "Kazıcı ve delici ekipmanlar için yedek parçalar",
  },
  {
    id: "motor-mekanik",
    name: "Motor Mekanik",
    description: "Motor ve mekanik aksamlar için yedek parçalar",
  },
  {
    id: "hidrolik",
    name: "Hidrolik",
    description: "Yüksek kaliteli hidrolik sistem komponentleri",
  },
  {
    id: "sanziman",
    name: "Şanzıman",
    description: "Şanzıman ve güç aktarma organları için yedek parçalar",
  },
  {
    id: "tirnak",
    name: "Tırnak",
    description: "Kepçe tırnakları ve bağlantı elemanları",
  },
  {
    id: "digerleri",
    name: "Diğerleri",
    description: "Diğer iş makinesi parçaları ve aksesuarları",
  },
];

export const brands: Brand[] = [
  {
    id: "caterpillar",
    name: "Caterpillar",
  },
  {
    id: "komatsu",
    name: "Komatsu",
  },
  {
    id: "hitachi",
    name: "Hitachi",
  },
  {
    id: "volvo",
    name: "Volvo",
  },
  {
    id: "isuzu-motor",
    name: "Isuzu Motor",
  },
  {
    id: "cummins-motor",
    name: "Cummins Motor",
  },
  {
    id: "perkins-motor",
    name: "Perkins Motor",
  },
  {
    id: "kobelco",
    name: "Kobelco",
  },
  {
    id: "yanmar",
    name: "Yanmar",
  },
  {
    id: "new-holland",
    name: "New Holland",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    title: "Caterpillar Motor Bloğu",
    slug: "caterpillar-motor-blogu",
    category: "motor-mekanik",
    brand: "caterpillar",
    imageUrl: "/products/motor-1.jpg",
    description:
      "Caterpillar C15 Motor Bloğu, dayanıklı dökme demir yapısı ile uzun ömürlü kullanım için tasarlanmıştır. İş makinelerinizin performansını maksimum seviyede tutmak için ideal çözüm.",
    features: [
      "Yüksek kaliteli dökme demir yapı",
      "Uzun ömürlü kullanım",
      "OEM standartlarında üretim",
      "Kolay montaj imkanı",
    ],
    specifications: [
      { name: "Marka", value: "Caterpillar" },
      { name: "Model", value: "C15" },
      { name: "Ağırlık", value: "320 kg" },
      { name: "Üretim Yılı", value: "2023" },
    ],
  },
  {
    id: "p2",
    title: "Komatsu Hidrolik Pompa",
    slug: "komatsu-hidrolik-pompa",
    category: "hidrolik",
    brand: "komatsu",
    imageUrl: "/products/hydraulic-1.jpg",
    description:
      "Komatsu ekskavatörler için tasarlanmış hidrolik pompa, yüksek verimlilik ve dayanıklılık sunmaktadır. Zorlu şantiye koşullarında bile güvenilir performans sağlar.",
    features: [
      "Yüksek basınç kapasitesi",
      "Düşük gürültü seviyesi",
      "Kolay entegrasyon",
      "Uzun servis ömrü",
    ],
    specifications: [
      { name: "Marka", value: "Komatsu" },
      { name: "Model", value: "PC300-8" },
      { name: "Debi", value: "300 L/min" },
      { name: "Basınç", value: "350 bar" },
    ],
  },
  {
    id: "p3",
    title: "Volvo Hava Filtresi",
    slug: "volvo-hava-filtresi",
    category: "digerleri",
    brand: "volvo",
    imageUrl: "/products/filter-1.jpg",
    description:
      "Volvo loaderlar için yüksek kaliteli hava filtresi. Motorunuzu toz ve kirden koruyarak performansı arttırır ve yakıt tasarrufu sağlar.",
    features: [
      "Yüksek filtreleme verimliliği",
      "Uzun değişim aralığı",
      "Kolay montaj",
      "Tüm hava koşullarında optimum performans",
    ],
    specifications: [
      { name: "Marka", value: "Volvo" },
      { name: "Model", value: "L120" },
      { name: "Boyut", value: "380x180x50 mm" },
      { name: "Filtre Sınıfı", value: "F9" },
    ],
  },
  {
    id: "p4",
    title: "Hitachi Palet",
    slug: "hitachi-palet",
    category: "yuruyus-alt-takim",
    brand: "hitachi",
    imageUrl: "/products/tracks-1.jpg",
    description:
      "Hitachi ekskavatörler için özel üretilmiş yürüyüş paleti. Dayanıklı yapısı ile en zorlu zeminlerde bile sorunsuz çalışma imkanı sunar.",
    features: [
      "Sağlam çelik konstrüksiyon",
      "Aşınmaya karşı dayanıklı",
      "Uzun ömürlü kullanım",
      "Her türlü arazide optimum performans",
    ],
    specifications: [
      { name: "Marka", value: "Hitachi" },
      { name: "Model", value: "ZX350" },
      { name: "Uzunluk", value: "4900 mm" },
      { name: "Genişlik", value: "600 mm" },
    ],
  },
  {
    id: "p5",
    title: "New Holland Yağ Filtresi",
    slug: "new-holland-yag-filtresi",
    category: "digerleri",
    brand: "new-holland",
    imageUrl: "/products/filter-2.jpg",
    description:
      "New Holland iş makineleri için yüksek kaliteli yağ filtresi, motorunuzu koruyarak daha uzun ömürlü kullanım sağlar.",
    features: [
      "Üstün filtreleme performansı",
      "OEM uyumlu tasarım",
      "Kolay değişim",
      "Genişletilmiş kullanım ömrü",
    ],
    specifications: [
      { name: "Marka", value: "New Holland" },
      { name: "Model", value: "B110" },
      { name: "Boyut", value: "90x120 mm" },
      { name: "Filtre Tipi", value: "Spin-on" },
    ],
  },
  {
    id: "p6",
    title: "Kobelco Hidrolik Silindir",
    slug: "kobelco-hidrolik-silindir",
    category: "hidrolik",
    brand: "kobelco",
    imageUrl: "/products/hydraulic-2.jpg",
    description:
      "Kobelco ekskavatörler için tasarlanmış hidrolik silindir, yüksek kaldırma kapasitesi ve güvenilir operasyon sunmaktadır.",
    features: [
      "Hassas kontrol imkanı",
      "Yüksek basınç dayanımı",
      "Sızdırmazlık garantisi",
      "Darbelere karşı koruma",
    ],
    specifications: [
      { name: "Marka", value: "Kobelco" },
      { name: "Model", value: "SK200" },
      { name: "Strok", value: "1500 mm" },
      { name: "Çap", value: "120 mm" },
    ],
  },
  {
    id: "p7",
    title: "Cummins Turbo Şarj",
    slug: "cummins-turbo-sarj",
    category: "motor-mekanik",
    brand: "cummins-motor",
    imageUrl: "/products/motor-2.jpg",
    description:
      "Cummins motorlar için tasarlanmış turbo şarj, motorunuzun performansını arttırarak daha verimli çalışmasını sağlar.",
    features: [
      "Yüksek hava basınç oranı",
      "Geliştirilmiş yanma verimliliği",
      "Düşük yakıt tüketimi",
      "Artırılmış motor gücü",
    ],
    specifications: [
      { name: "Marka", value: "Cummins" },
      { name: "Model", value: "QSB6.7" },
      { name: "Hava Debisi", value: "850 m³/h" },
      { name: "Basınç Oranı", value: "3.5:1" },
    ],
  },
  {
    id: "p8",
    title: "Komatsu Paletli Makara",
    slug: "komatsu-paletli-makara",
    category: "yuruyus-alt-takim",
    brand: "komatsu",
    imageUrl: "/products/tracks-2.jpg",
    description:
      "Komatsu dozerleri için üretilmiş paletli makara, uzun ömürlü kullanım ve düşük bakım maliyeti sunmaktadır.",
    features: [
      "Aşınmaya karşı dirençli",
      "Ağır yük taşıma kapasitesi",
      "Sessiz çalışma",
      "Her türlü zemin koşuluna uygun",
    ],
    specifications: [
      { name: "Marka", value: "Komatsu" },
      { name: "Model", value: "D65" },
      { name: "Çap", value: "250 mm" },
      { name: "Malzeme", value: "Sertleştirilmiş Çelik" },
    ],
  },
];

export const getProductsByCategory = (categoryId: string) => {
  return products.filter((product) => product.category === categoryId);
};

export const getProductBySlug = (slug: string) => {
  return products.find((product) => product.slug === slug);
};

export const getProductsByBrand = (brandId: string) => {
  return products.filter((product) => product.brand === brandId);
};
