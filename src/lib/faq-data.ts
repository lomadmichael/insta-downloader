export const faqs = [
  {
    question: "인스타그램 사진 다운로드는 어떻게 하나요?",
    answer:
      "인스타그램 앱이나 웹에서 저장하고 싶은 게시물의 공유 버튼을 눌러 링크를 복사하세요. 복사한 URL을 InstaDown 입력창에 붙여넣고 다운로드 버튼을 누르면 원본 고화질 사진을 저장할 수 있습니다.",
  },
  {
    question: "인스타그램 릴스 영상도 다운로드할 수 있나요?",
    answer:
      "네, 인스타그램 릴스(Reels) 영상도 다운로드할 수 있습니다. 릴스 게시물의 URL을 복사해서 붙여넣으면 MP4 형식으로 영상을 저장할 수 있습니다.",
  },
  {
    question: "여러 장의 사진이 있는 캐러셀 게시물도 저장 가능한가요?",
    answer:
      "네, 캐러셀(슬라이드) 게시물의 모든 사진과 영상을 개별적으로 다운로드하거나 '모두 다운로드' 버튼으로 한 번에 저장할 수 있습니다.",
  },
  {
    question: "인스타 다운로드 서비스는 무료인가요?",
    answer:
      "네, InstaDown은 완전 무료 서비스입니다. 회원가입이나 앱 설치 없이 바로 사용할 수 있으며, 다운로드 횟수 제한도 없습니다.",
  },
  {
    question: "비공개 계정의 게시물도 다운로드할 수 있나요?",
    answer:
      "아니요, 공개 계정의 게시물만 다운로드할 수 있습니다. 비공개 계정의 게시물은 해당 계정의 팔로워만 볼 수 있으므로 다운로드가 지원되지 않습니다.",
  },
  {
    question: "다운로드한 사진의 화질은 어떤가요?",
    answer:
      "인스타그램에 업로드된 원본 해상도 그대로 다운로드됩니다. 별도의 압축 없이 최고 화질의 이미지를 저장할 수 있습니다.",
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};
