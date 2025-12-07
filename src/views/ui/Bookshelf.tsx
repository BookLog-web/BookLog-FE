import { HamburgerMenu } from '@/src/widgets';

type Book = {
  title: string;
  author: string;
  cover: string;
  rating: number;
};

const filters = ['장르', '읽은 연도', '평점', '정렬'];

const books: Book[] = [
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAsF2hwTjql5hIgHKi2uFtk8BV7eSw7RbH6YNzuQHyjlKh_NHMDzZVkmq0x3ED6_DGzZTGBCgFBa0lozQiHIKs6cDysyeiNRvqFkmBRepc6L_-mNkEOVNy4oNZFITu57sZWWoquOsbNeE9-KUXUZWQl12qodVN3pmC18qoLnDCIspPYOQ_QLWfChpMJMOAIoX3iYX9k1rbmIhhcbF7PVI7OqRXZKAWt44IEWRgdVYF1LDY5_jwgzFURGHX3JqSB8dKMNSoSN-sznww7',
    rating: 4,
  },
  {
    title: 'The Four Winds',
    author: 'Kristin Hannah',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCkRZa31L4d2ZYVlFk9uixqyNeL9dcT5Z-aYWt8gW0Kae_LM4RL_0yUI5mGwPIpyt6vg9o1soJR8RZLc7ESYiBJyWyZ7xd2o71RN6c1nLuUJu7KSQ_ImcmOrufgvkYgreG2HtnrdBy7oNOqYu5OXAajXAZGyx9Hl1hi-eIJ1Z8qapUMWz-5NOKN4r1olKcEWxKhp3af0mlBR8H5Ss06qgeifhfILsVGPZjl3vRr7rphctcR6cSrI3BIBZsOZ0xetYClo9TlMj7fpB48',
    rating: 5,
  },
  {
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAi7JqGhZwq9PMy11cZvHIQx_VDdESrJdYiO1sk5FytIIoi83T7w7bZ_VEVgW86xUFSgFIUUKfFK0rxX_3jzeFDk5fHS6HYlYr8JUrAoJh4dnTnHZnpXpADG8aBYrfn48e9icHbL7CGdFO1cfVz33VgMf4oYo7gjcZt_Uiebbq0OuEFTqL_iJ9EC3i4SC5hLH0bOPe0GJrS4hbDT-JaijdT_vS-mFf5BE7e0I1jSLPOTpVetUd6FwscC0AZDIe516e1i38q6MjycqSI',
    rating: 4,
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBeYTc18yXBHZsf73AprDj1dKnEM8tbduhUS8BR5TonpR_4uKQv_r4HaBR4TDYDCRnQbE18YzynctF5QzubOXk9UEFYxwRJ-FUMFkaDOiSrw-OLrRboPh3tbDG0dK4UvZznLuLqC6LgmNmSkDU60alnv16WPoH4bLhIyaVDAYA7lzyFHQoBkAdGBqvO_ffLS3l5KCqYu9Hnl6In9XNUTUj3-s5P06iwIGekxStfu6wIb_veVdunYCuQTXqPOdrcL_hvLPkHD-9qMPFo',
    rating: 5,
  },
  {
    title: 'The Lincoln Highway',
    author: 'Amor Towles',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCbb2PVQKkfZwqkohuRd_GiclwKX1KE-htnq7PC6qfDEyQ51PKZItdL87vsSa2hJK70WjUT4nQeBgiUc5JiBuz6WW8-nejqogYJEFQZ4itAs4sDAFiAaAvsGEZgmPcElDABgebcfzVgPKLAZjfy8KXRNsvgIUdbcG8G9UPvu0IS30CeE5k8wBnyATTbeQmjiCp4Aezagq4w-KJfGMhtVUxQ1ugYXjy_ImQWspF3EOTGT-bS3j4tbXNrUABLMl0uYeBJMZ-o2KrHjxJb',
    rating: 4,
  },
  {
    title: 'Cloud Cuckoo Land',
    author: 'Anthony Doerr',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCYTIxoni2ZOcjuLj5oONL-KMQ5ZTWiUCdohrZUNgp2v4GIzdCD4218jktR7eyHnrQrISqta2gr_h0uRN6X4NWxh8m0Q2WhaIS0dfvzNBDHFGzvG3-zc41DG2DlhIpaNhcI97yZniqbuUnJElA_gho6IBzsxT2NmQWUjeuh-qd5CZ8plWRC8NvL91onkO_ZAAlchkZDO4g6aCaHAUxu0FaHnnu_tzMXvMLfdBVqVmpKQRMf9h2rG5Gx8_Vl9g0Bkd3a2f6HmfTKG3AO',
    rating: 5,
  },
  {
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGcLyuQtKd_DsgiuREGCbjxS9mzd08l4u6tRuxxWjqQ73uJVjNm5TSlpI9YcXbxxnH8fiZMBA3L3wYq29mXTJFrqLYVk2JNKOcUIHVPQbw5e-toHkUz05rrDBYzJQ-96RyPCZTkzet6WOW13w7lu7KvclTro-_OdqYnAzudTQ-D2yBv23uu1Si1zVXI8bdBiG03PTpNk1I_Jc_Lkyn0EuF2Wq47GCUy4ZDnHKDtvVpMjKc5AOEmJ0WW4yZn3XbWdPYI_Z5a6LLB9Ap',
    rating: 4,
  },
  {
    title: 'Circe',
    author: 'Madeline Miller',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBAKonRQ4TYll66Zm5lC1Q0pFtgS1sI2Y9XAubAQNC9OVXuNgRASa2fKbN50Je5T2-sjBVqnF3FZfxBDDwZXR6y65TrtykOSRem7I7aT0kTieF4K5W6234fKQEa1LvhtLoQZ9DY93VGPWOhnzFmHQuz2vNbBau4ZbuQkBko1egqkfk-3aMD_WAA0HJHpo_1uri8Nn1lq2HhvJJkhbsQ6Or36EZIzfIlvpJBNah1h7Wr9xI_4641Sg4wN0-tixwz16b2BQFLqz2nCwa2',
    rating: 5,
  },
];

function Rating({ value }: { value: number }) {
  return (
    <div className='text-brown-50 flex items-center gap-1'>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} aria-hidden>
          {index < value ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

export default function BookshelfView() {
  return (
    <div className='bg-brown-20 relative flex min-h-screen text-white'>
      <HamburgerMenu />

      <main className='flex-1 overflow-y-auto px-6 py-8'>
        <div className='mx-auto max-w-7xl space-y-8'>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <h1 className='text-4xl leading-tight font-black tracking-tight'>
              내 책장
            </h1>
            <button className='btn bg-brown-40 hover:bg-brown-30 flex items-center gap-2 rounded-lg px-5 py-3 text-white'>
              <span aria-hidden>＋</span>
              <span>책 추가</span>
            </button>
          </div>

          <div>
            <label className='flex flex-col'>
              <div className='bg-brown-30/50 flex w-full items-stretch rounded-lg'>
                <div className='text-brown-90 flex items-center justify-center px-4'>
                  🔍
                </div>
                <input
                  className='t-b-r placeholder:text-brown-90/80 focus:ring-brown-40 flex-1 rounded-r-lg bg-transparent px-4 py-3 text-white focus:ring-2 focus:outline-none'
                  placeholder='제목이나 저자를 검색하세요'
                />
              </div>
            </label>
          </div>

          <div className='flex flex-wrap gap-3'>
            {filters.map(filter => (
              <button
                key={filter}
                className='bg-brown-30/60 text-brown-90 hover:bg-brown-30 flex h-9 items-center gap-2 rounded-lg px-3'
              >
                <span className='text-base' aria-hidden>
                  ⚙️
                </span>
                <span className='t-b-r text-white'>{filter}</span>
                <span className='text-base' aria-hidden>
                  ▾
                </span>
              </button>
            ))}
          </div>

          <div className='grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-6'>
            {books.map(book => (
              <div
                key={book.title}
                className='group bg-brown-30 relative aspect-3/4 overflow-hidden rounded-2xl'
              >
                <div
                  className='absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105'
                  style={{ backgroundImage: `url(${book.cover})` }}
                  aria-label={`${book.title} 표지`}
                />
                <div className='absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/70 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  <p className='line-clamp-2 text-base leading-tight font-bold'>
                    {book.title}
                  </p>
                  <p className='text-brown-90 text-sm'>{book.author}</p>
                  <div className='mt-2'>
                    <Rating value={book.rating} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-8 flex justify-center'>
            <nav className='flex items-center gap-2'>
              <button
                className='text-brown-90 hover:bg-brown-30/60 flex h-9 w-9 items-center justify-center rounded-lg disabled:opacity-50'
                disabled
              >
                ‹
              </button>
              <button className='bg-brown-40 flex h-9 w-9 items-center justify-center rounded-lg text-white'>
                1
              </button>
              <button className='text-brown-90 hover:bg-brown-30/60 flex h-9 w-9 items-center justify-center rounded-lg'>
                2
              </button>
              <button className='text-brown-90 hover:bg-brown-30/60 flex h-9 w-9 items-center justify-center rounded-lg'>
                3
              </button>
              <span className='text-brown-90'>...</span>
              <button className='text-brown-90 hover:bg-brown-30/60 flex h-9 w-9 items-center justify-center rounded-lg'>
                10
              </button>
              <button className='text-brown-90 hover:bg-brown-30/60 flex h-9 w-9 items-center justify-center rounded-lg'>
                ›
              </button>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
}
