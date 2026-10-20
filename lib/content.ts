export interface ChapterItem {
  id: string;
  title: string;
  text: string;
  photo: string;
  caption: string;
  rotation: number; // degrees (-4 to 5)
  tapeVariant: "peach" | "soft" | "deep";
  tapePosition: "top-center" | "top-left" | "top-right";
}

export interface WishNote {
  id: string;
  name: string;
  message: string;
  rotation: number;
  colorVariant: "rose" | "peach" | "soft" | "cream";
}

export interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  poster: string;
}

export interface ContentData {
  recipient: {
    shortName: string;
    fullName: string;
  };
  company: {
    name: string;
    team: string;
  };
  envelope: {
    badge: string;
    tagline: string;
    buttonText: string;
    secretHint: string;
    letterPreview: {
      salutation: string;
      body: string;
      closing: string;
    };
  };
  hero: {
    badge: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    subtitle: string;
    scrollHint: string;
  };
  chapters: ChapterItem[];
  videoMoment: {
    badge: string;
    title: string;
    subtitle: string;
    src: string;
    poster: string;
    handwrittenNote: string;
    videos: VideoItem[];
  };
  wishes: WishNote[];
  finalSurprise: {
    question: string;
    acceptButton: string;
    declineButton: string;
    declinePersuaded: string;
    invitation: {
      tagline: string;
      couple: string;
      blessing: string;
      weddingDate: string;
      signature: string;
    };
    galleryCaption: string;
    replayButton: string;
  };
}

export const content: ContentData = {
  recipient: {
    shortName: "Mỹ Vũ",
    fullName: "Mỹ Vũ",
  },
  company: {
    name: "Pione Global",
    team: "Tất cả các anh em nam Pione Global",
  },
  envelope: {
    badge: "Special Delivery • 20/10",
    tagline: "Có một lá thư gửi Mỹ Vũ",
    buttonText: "Chạm để mở thư",
    secretHint: " ",
    letterPreview: {
      salutation: "Gửi Mỹ Vũ thân mến,",
      body: "Giữa một rừng anh em coder mộc mạc và khô khan tại Pione Global, Mỹ Vũ chính là mảnh ghép dịu dàng, ấm áp và rực rỡ nhất. Hôm nay là ngày đặc biệt của phái đẹp, tụi tui đã cùng nhau gom góp những kỷ niệm vui nhộn nhất để làm riêng cho bà cuốn album này...",
      closing: "Mở ra xem cùng tụi tui nhé! 💌",
    },
  },
  hero: {
    badge: "Từ các anh em Pione Global",
    titleBefore: "Chúc mừng 20/10, ",
    titleHighlight: "Mỹ Vũ",
    titleAfter: "!",
    subtitle:
      "Cảm ơn vì đã luôn là nguồn năng lượng ồn ào, ngọt ngào và kiên nhẫn nhất văn phòng!",
    scrollHint: "Cuộn xuống để mở album nhé",
  },
  chapters: [
    {
      id: "01",
      title: "Ngày đầu Mỹ Vũ bước vào công ty",
      text: "  Ngày đầu tiên Mỹ Vũ tới Pione Global, cả văn phòng bỗng nhiên ngăn nắp và thơm tho lạ thường. Cánh đàn ông ai cũng cố tỏ vẻ thật chuyên nghiệp nhưng trong lòng thầm reo vui vì team cuối cùng cũng có bóng hồng!",
      photo: "/media/photo-1.jpg",
      caption: "  Nụ cười ngày đầu làm sáng bừng cả phòng họp",
      rotation: -3,
      tapeVariant: "peach",
      tapePosition: "top-center",
    },
    {
      id: "02",
      title: "Những ly trà sữa cứu deadline",
      text: "  Những hôm chạy task căng thẳng đến toát mồ hôi, chỉ cần nghe giọng Mỹ Vũ rủ rê đặt trà sữa là năng lượng của cả team tự động hồi sinh 100%. Không chỉ cứu deadline, Mỹ Vũ cứu luôn cả tâm trạng của cả văn phòng.",
      photo: "/media/photo-2.jpg",
      caption: " Đồng minh số một của team mỗi kỳ release căng thẳng",
      rotation: 4,
      tapeVariant: "soft",
      tapePosition: "top-right",
    },
    {
      id: "03",
      title: "Lần Mỹ Vũ cứu cả team",
      text: " Có những lúc sự chu đáo, tỉ mỉ và tinh tế của Mỹ Vũ đã gỡ những pha hóc búa nhất mà cánh đàn ông vụng về chịu trận. Cảm ơn Mỹ Vũ vì luôn để ý từng chi tiết nhỏ và âm thầm hỗ trợ anh em mọi lúc.",
      photo: "/media/photo-3.jpg",
      caption: "  Nữ anh hùng không mang áo choàng của Pione Global",
      rotation: -2,
      tapeVariant: "peach",
      tapePosition: "top-left",
    },
    {
      id: "04",
      title: "Mỗi ngày đi làm vui hơn vì có Mỹ Vũ",
      text: " Có Mỹ Vũ, Pione Global không chỉ là nơi gõ phím làm việc mà luôn tràn ngập tiếng cười, sự gắn kết và ấm áp của 6 anh em cùng Mỹ Vũ. 20/10 này, chúc Mỹ Vũ mãi xinh đẹp, hạnh phúc và luôn toả sáng rạng ngời!",
      photo: "/media/photo-4.jpg",
      caption: " Đại gia đình 6 anh em Pione Global luôn yêu quý Mỹ Vũ!",
      rotation: 3,
      tapeVariant: "deep",
      tapePosition: "top-center",
    },
  ],
  videoMoment: {
    badge: "Signature Moments",
    title: "Và đây là những đoạn phim nhỏ",
    subtitle:
      "Lưu lại những khoảnh khắc rất riêng mà anh em đã 'lén' quay lại được… Bật âm lượng lên nhé!",
    src: "/media/video-1.mp4",
    poster: "/media/photo-1.jpg",
    handwrittenNote: "Còn nữa, cuộn tiếp nhé… điều bất ngờ đang ở ngay phía sau!",
    videos: [
      {
        id: "vid-1",
        title: "Thước phim 01: Khoảnh khắc đáng nhớ",
        subtitle: "Một góc nhìn thật tự nhiên và dễ thương của Mỹ Vũ",
        src: "/media/video-1.mp4",
        poster: "/media/photo-1.jpg",
      },
      {
        id: "vid-2",
        title: "Thước phim 02: Nụ cười rạng rỡ",
        subtitle: "Năng lượng tích cực mỗi ngày Mỹ Vũ mang đến cho cả team",
        src: "/media/video-2.mp4",
        poster: "/media/photo-2.jpg",
      },
      {
        id: "vid-3",
        title: "Thước phim 03: Những phút giây ngẫu hứng",
        subtitle: "Kỷ niệm không thể quên của Mỹ Vũ cùng anh em Pione Global",
        src: "/media/video-3.mp4",
        poster: "/media/photo-3.jpg",
      },
    ],
  },
  wishes: [
    {
      id: "wish-1",
      name: "Anh Kiệt",
      message:
        "Chúc Mỹ Vũ 20/10 luôn tươi tắn, ngập tràn niềm vui và hạnh phúc! Cảm ơn em vì luôn đem lại sự ấm áp và chu đáo cho cả team!",
      rotation: -2.2,
      colorVariant: "rose",
    },
    {
      id: "wish-2",
      name: "Anh Hoàng",
      message:
        "Chúc em gái Mỹ Vũ 20/10 thật rực rỡ, task nào giao vào tay cũng hoàn thành xuất sắc và luôn là nguồn năng lượng tích cực của anh em!",
      rotation: 2.8,
      colorVariant: "peach",
    },
    {
      id: "wish-3",
      name: "Bạn Nhật",
      message:
        "Chúc Mỹ Vũ ngày 20/10 thật vui vẻ, luôn giữ nụ cười tỏa nắng trên môi và tiếp tục đồng hành cùng team trên mọi mặt trận nha!",
      rotation: -1.9,
      colorVariant: "soft",
    },
    {
      id: "wish-4",
      name: "Bạn Long",
      message:
        "20/10 chúc Mỹ Vũ lúc nào cũng xinh xắn, trà sữa đầy bàn, luôn đáng yêu và là đồng minh uy tín số 1 mỗi kỳ chạy deadline!",
      rotation: 3.1,
      colorVariant: "cream",
    },
    {
      id: "wish-5",
      name: "Bạn Khang",
      message:
        "Chúc Mỹ Vũ ngày Phụ nữ Việt Nam thật ngọt ngào, nhận được thật nhiều hoa và quà, luôn vui tươi và hạnh phúc mỗi ngày!",
      rotation: -2.8,
      colorVariant: "rose",
    },
    {
      id: "wish-6",
      name: "Bạn Hảo",
      message:
        "Chúc Mỹ Vũ 20/10 siêu rực rỡ! Deadline không lo, bug tự né, việc nặng cứ để cánh anh em gánh vác, Mỹ Vũ cứ việc xinh đẹp và tỏa sáng thôi!",
      rotation: 2.4,
      colorVariant: "peach",
    },
  ],
  finalSurprise: {
    question: "Các anh có một lời chúc cuối, Mỹ Vũ có nhận không?",
    acceptButton: "Nhận ạ",
    declineButton: "Không",
    declinePersuaded: "Thôi nhận đi mà",
    invitation: {
      tagline: "THÔNG ĐIỆP BÍ MẬT TỪ ANH EM PIONE",
      couple: "Mỹ Vũ & An",
      blessing: "Chúc hai bạn sớm về chung một nhà!",
      weddingDate: "NGÀY CƯỚI: SỚM THÔI",
      signature: "Toàn thể anh em Pione Global",
    },
    galleryCaption: "Tất cả những khoảnh khắc đã có Mỹ Vũ",
    replayButton: "Xem lại từ đầu",
  },
};
