import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-5">
        <header className="flex justify-between items-center py-5">
          <div className="text-2xl font-extrabold text-primary">BookLog</div>
          <nav>
            <ul className="flex gap-5">
              <li><a href="#" className="font-bold text-text hover:text-primary transition-colors">홈</a></li>
              <li><a href="#" className="font-bold text-text hover:text-primary transition-colors">기능</a></li>
              <li><a href="#" className="font-bold text-text hover:text-primary transition-colors">로그인</a></li>
            </ul>
          </nav>
        </header>

        <section className="flex flex-col md:flex-row items-center justify-between py-20 gap-10">
          <div className="flex-1 text-center md:text-left">
            <p className="text-lg text-gray-400 mb-2 font-bold uppercase tracking-widest">나만의 독서 기록장</p>
            <h1 className="text-5xl font-extrabold mb-4 leading-tight text-[#FF9AA2]">책과 함께하는<br />소중한 시간</h1>
            <p className="mb-4 text-lg">
              읽은 책을 기록하고, 감상을 나누며,<br />
              더 풍요로운 독서 생활을 즐겨보세요.
            </p>
            <button className="btn btn-primary">기록 시작하기</button>
          </div>
          <div className="flex-1 flex justify-center order-first md:order-last">
            <Image 
              src="/images/hero.png" 
              alt="Cozy reading corner illustration" 
              width={500} 
              height={500}
              priority
              className="rounded-2xl shadow-soft max-w-full h-auto"
            />
          </div>
        </section>

        <section className="py-20 bg-[#FFF0F5] rounded-[40px] my-10">
          <div className="container mx-auto px-5">
            <h2 className="text-3xl font-extrabold mb-8 text-center">주요 기능</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div className="bg-white p-10 rounded-3xl shadow-soft transition-transform duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
                  <Image src="/images/feature-record.png" alt="Record" width={80} height={80} className="object-contain" />
                </div>
                <h3 className="text-xl mb-2 text-text font-bold">간편한 기록</h3>
                <p className="text-gray-500 text-[0.95rem]">읽은 책의 제목, 저자, 날짜를<br/>손쉽게 기록하세요.</p>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-soft transition-transform duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
                  <Image src="/images/feature-share.png" alt="Share" width={80} height={80} className="object-contain" />
                </div>
                <h3 className="text-xl mb-2 text-text font-bold">감상 공유</h3>
                <p className="text-gray-500 text-[0.95rem]">친구들과 독서 감상평을<br/>나누고 소통하세요.</p>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-soft transition-transform duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
                  <Image src="/images/feature-discover.png" alt="Discover" width={80} height={80} className="object-contain" />
                </div>
                <h3 className="text-xl mb-2 text-text font-bold">새로운 발견</h3>
                <p className="text-gray-500 text-[0.95rem]">취향에 맞는 새로운 책을<br/>추천받아보세요.</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center py-10 text-gray-400 text-sm">
          <p>© 2024 BookLog. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
