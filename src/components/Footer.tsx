export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-8">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-500 mb-2">
          본 서비스는 Instagram / Meta와 관련이 없는 독립적인 서비스입니다.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          공개 게시물만 다운로드할 수 있으며, 다운로드한 콘텐츠의 저작권은 원작자에게 있습니다.
        </p>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} InstaDown
        </p>
      </div>
    </footer>
  );
}
