const galleryItems = [
  {
    tag: "Tình Mẹ Bao La",
    title: "Tảo Tần Gánh Cả Yêu Thương",
    desc: "Hình ảnh Người Mẹ tảo tần bên chiếc xe đạp cọc cạch chở che đàn con thơ – biểu tượng thiêng liêng, cao quý và xúc động nhất của người phụ nữ Việt Nam.",
    quote: "Đi khắp thế gian không ai tốt bằng Mẹ – Gánh nặng cuộc đời không ai khổ bằng Cha.",
    img: "assets/4.jpg"
  },
  {
    tag: "Người Lái Đò Tận Tụy",
    title: "Tà Áo Dài & Người Cô Kính Yêu",
    desc: "Cô giáo hiền hậu bên bục giảng điện tử hiện đại, người trao truyền tri thức và nâng bước ước mơ tuổi trẻ trưởng thành.",
    quote: "Cùng học, cùng sẻ chia, cùng trưởng thành – cảm ơn Cô vì đã luôn bao dung và kiên nhẫn dìu dắt chúng em.",
    img: "assets/3.jpg"
  },
  {
    tag: "Đóa Hoa Lớp Mình",
    title: "Nụ Cười Bừng Sáng Góc Lớp",
    desc: "Nụ cười rạng rỡ của bạn nữ bên bình hoa thực hành sinh học – khoảnh khắc mộc mạc mà làm bừng sáng cả lớp học thân thương.",
    quote: "Thanh xuân đẹp nhất là khi trong ký ức luôn có nụ cười tỏa nắng và sự dịu dàng của các bạn nữ.",
    img: "assets/2.jpg"
  },
  {
    tag: "Thanh Xuân Chung Mái Nhà",
    title: "Hôm Nay Cố Gắng, Ngày Mai Tỏa Sáng!",
    desc: "Những giờ học sôi nổi, những bông hoa trao tay và sự đoàn kết gắn bó của tập thể lớp chúng mình dưới mái trường.",
    quote: "Dưới bảng đen phấn trắng, tình thầy trò và bạn bè chính là mảnh ghép tuyệt vời nhất trong năm tháng học trò.",
    img: "assets/1.jpg"
  }
];

const magicTitles = [
  {
    title: "Nữ Thần Nụ Cười Tỏa Nắng ☀️",
    badge: "Chỉ số rạng ngời: 100/100",
    desc: "Mỗi khi bạn cười, cả phòng học như được bừng sáng. Năng lượng tích cực của bạn chính là liều thuốc ngọt ngào nhất cho mọi người xung quanh!"
  },
  {
    title: "Nàng Thơ Dịu Dàng & Tinh Tế 🌸",
    badge: "Chỉ số đáng yêu: Vô cực 💖",
    desc: "Sự ân cần, biết lắng nghe và tấm lòng ấm áp của bạn luôn khiến mọi người cảm thấy bình yên và được trân trọng."
  },
  {
    title: "Cô Nàng Bản Lĩnh & Trí Tuệ 🌟",
    badge: "Chỉ số thông thái: 99.9%",
    desc: "Tự tin, thông minh và luôn kiên trì theo đuổi mục tiêu. Bạn chính là hình mẫu đóa hoa hiện đại vừa xinh đẹp vừa tài năng!"
  },
  {
    title: "Đóa Hướng Dương Lan Tỏa Năng Lượng 🌻",
    badge: "Chỉ số yêu đời: 200%",
    desc: "Ở đâu có bạn, ở đó có tiếng cười rộn rã. Bạn làm cho những tiết học căng thẳng nhất cũng trở nên thú vị và đáng nhớ!"
  },
  {
    title: "Công Chúa Trực Nhật 'Bất Tử' 👑",
    badge: "Chỉ số may mắn: 100%",
    desc: "Hôm nay là 20/10, bạn chỉ việc ngồi thật xinh đẹp và tận hưởng, mọi việc lau bảng, quét lớp đã có các đấng mày râu lo!"
  }
];

const luckyFortunes = [
  {
    icon: "🧋",
    type: "Quẻ Trà Sữa Đại Cát",
    content: "Dự báo trong hôm nay hoặc ngày mai, bạn sẽ được ai đó bí mật khao một ly trà sữa full topping siêu ngon miệng!"
  },
  {
    icon: "🧹",
    type: "Quẻ Kim Bài Miễn Trực Nhật",
    content: "Chúc mừng bạn! Hôm nay bạn được miễn trực nhật hoàn toàn. Các bạn nam trong lớp sẽ quét lớp và giặt giẻ lau bảng giúp bạn!"
  },
  {
    icon: "💯",
    type: "Quẻ Điểm Mười Rực Rỡ",
    content: "Mọi nỗ lực học tập của bạn sắp được đền đáp xứng đáng. Bài kiểm tra sắp tới sẽ đạt điểm số cao ngoài mong đợi!"
  },
  {
    icon: "💌",
    type: "Quẻ Bất Ngờ Ngọt Ngào",
    content: "Một lời chúc vụng về nhưng cực kỳ chân thành từ một người bạn đặc biệt đang chuẩn bị gửi đến bạn đấy!"
  },
  {
    icon: "🌸",
    type: "Quẻ Xinh Đẹp Toàn Năng",
    content: "Gương mặt mộc của bạn hôm nay đạt điểm tuyệt đối. Hãy tự tin nở nụ cười thật tươi vì bạn luôn là đóa hoa xinh đẹp nhất!"
  },
  {
    icon: "✨",
    type: "Quẻ Bình An May Mắn",
    content: "Chúc bạn 365 ngày tới mỗi ngày thức dậy đều là một ngày vui, không âu lo, không muộn phiền và luôn được chở che!"
  }
];
