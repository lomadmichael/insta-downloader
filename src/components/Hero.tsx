import UrlInput from "./UrlInput";

interface HeroProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export default function Hero({ onSubmit, loading }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 text-white">
      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
          인스타그램 사진 & 릴스
          <br />
          다운로더
        </h1>
        <p className="text-white/80 text-base sm:text-lg mb-10 max-w-xl mx-auto">
          인스타그램 게시물 URL을 붙여넣고 사진, 영상을 무료로 다운로드하세요.
        </p>
        <UrlInput onSubmit={onSubmit} loading={loading} />
      </div>
    </section>
  );
}
