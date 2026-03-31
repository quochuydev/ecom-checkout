import siteInfo from "../public/site-info.json";

const c = siteInfo.company;

export const setting = {
  title: c.name,
  description: c.tagline,
  legalName: c.legalName,
  logo: "/images/logo.svg",
  pages: [
    { name: "Trang Chủ", href: siteInfo.navigation.home },
    { name: "Gọng Kính", href: siteInfo.navigation.frames },
    { name: "Kính Mát", href: siteInfo.navigation.sunglasses },
    { name: "Tròng Kính", href: siteInfo.navigation.lenses },
    { name: "Bộ Sưu Tập", href: siteInfo.navigation.collections },
    { name: "Tin Tức", href: siteInfo.navigation.blog },
  ],
  currencies: [c.currency],
  offers: [
    {
      name: "Miễn phí vệ sinh kính",
      description: `Tại ${c.storeCount} cửa hàng toàn quốc`,
      href: "#",
    },
    {
      name: "Giao hàng nhanh",
      description: "Từ 2 ngày trên toàn quốc",
      href: "#",
    },
    {
      name: "Thu cũ đổi mới",
      description: "Tiết kiệm đến 600.000đ",
      href: "#",
    },
  ],
  banners: [
    {
      src: "/images/ECOM-2.1-1.png",
      alt: `${c.name} Collection`,
      title: "Bộ Sưu Tập Mới",
      description: `Khám phá phong cách kính mắt thời thượng cùng ${c.name}`,
      button: "Khám phá ngay",
      buttonUrl: siteInfo.navigation.collections,
    },
    {
      src: "/images/banner-web-thang-5-1024x449.png",
      alt: `${c.name} Promotion`,
      title: "Ưu Đãi Đặc Biệt",
      description: `Chương trình khuyến mãi hấp dẫn tại ${c.name}`,
      button: "Xem ngay",
      buttonUrl: siteInfo.navigation.collections,
    },
    {
      src: "/images/Design-Banner-CT-Check-in-G.O-BMT-G.O-44-1024x1024.jpg",
      alt: `${c.name} Store`,
      title: c.name,
      description: c.tagline,
      button: "Tìm cửa hàng",
      buttonUrl: "#",
    },
  ],
  collections: siteInfo.collections.map((name, i) => ({
    name,
    image: `/images/${
      [
        "1.-MONG-NHAN-TINH-HOA.webp",
        "2.-shades-brilliance.webp",
        "3.-Aurora-Alloy.webp",
        "4.-THE-ROCK.webp",
        "5.-Red-velvet.webp",
        "6.-Witching-Aura.webp",
        "7.-Disc-Dream.webp",
        "8.-Inde-Girl_.webp",
      ][i]
    }`,
    href: siteInfo.navigation.collections,
  })),
  features: [
    {
      title: `${c.storeCount} Cửa Hàng`,
      description: "Hệ thống cửa hàng rộng khắp toàn quốc, phục vụ tận tâm",
      image: "/images/store-1.png",
    },
    {
      title: "Miễn Phí Vệ Sinh",
      description: "Dịch vụ vệ sinh kính miễn phí trọn đời tại mọi cửa hàng",
      image: "/images/renew.svg",
    },
    {
      title: "Hỗ Trợ Đo Mắt",
      description: "Đội ngũ chuyên gia tư vấn đo thị lực chuyên nghiệp",
      image: "/images/eye-measurement.svg",
    },
    {
      title: "Hoàn Tiền",
      description: "Chính sách hoàn tiền linh hoạt, đảm bảo quyền lợi khách hàng",
      image: "/images/cashback.svg",
    },
  ],
  ambassadors: [
    { name: "Isaac", image: "/images/Isaac@2x.webp" },
    { name: "Long Vũ", image: "/images/long-vu@2x.webp" },
    { name: "Khánh Vy", image: "/images/khanh-vy@2x.webp" },
  ],
  testimonials: [
    {
      id: 1,
      quote: `Chất lượng kính rất tốt, đội ngũ tư vấn nhiệt tình. Mình rất hài lòng với dịch vụ tại ${c.name}!`,
      attribution: "Khách hàng tại TP.HCM",
    },
    {
      id: 2,
      quote: "Gọng kính đẹp, nhẹ và rất thoải mái khi đeo cả ngày. Sẽ quay lại mua thêm!",
      attribution: "Khách hàng tại Hà Nội",
    },
    {
      id: 3,
      quote: `Dịch vụ đo mắt chuyên nghiệp, tư vấn tròng kính phù hợp. Cảm ơn ${c.name}!`,
      attribution: "Khách hàng tại Đà Nẵng",
    },
  ],
  contact: {
    email: c.contact.email,
    address: c.contact.address,
    website: c.website,
  },
  gallery: [
    { src: "/images/339648934_742325727600337_5294432833355861863_n-1024x1024.jpg", alt: `${c.name} Store` },
    { src: "/images/339573280_1281695959446380_8805873728320224173_n-1024x1024.jpg", alt: `${c.name} Products` },
    { src: "/images/370151473_779875627481731_4947430330752365522_n-e1723453918785-956x1024.jpg", alt: `${c.name} Style` },
    { src: "/images/354453278_654805029864554_1443861880791195682_n-e1723452773728-1024x942.jpg", alt: `${c.name} Collection` },
  ],
  marketplaces: {
    shopee: { icon: "/images/shopee.png", url: "#" },
    lazada: { icon: "/images/lazada.png", url: "#" },
  },
};
