'use client';

import { useState } from 'react';
import { HamburgerMenu, Loading } from '@/src/widgets';
import { booksApi, readingLogsApi } from '@/src/lib/api';
import { useUser } from '@/src/lib/hooks/useUser';
import type { NaverBook } from '@/src/types';
import { useRouter } from 'next/navigation';

export default function AddView() {
  const router = useRouter();
  const { userId } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NaverBook[]>([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [addingBook, setAddingBook] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    console.log('🔍 [ADD] handleSearch called with:', query);
    setSearchQuery(query);
    
    if (!query.trim()) {
      console.log('🔍 [ADD] Empty query, clearing results');
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    try {
      setSearching(true);
      setHasSearched(true);
      console.log('🔍 [ADD] Calling booksApi.searchNaver...');
      const result = await booksApi.searchNaver(query, 20, 1);
      console.log('✅ [ADD] Search results received:', result);
      setSearchResults(result.items);
    } catch (error) {
      console.error('❌ [ADD] Failed to search books:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleAddBook = async (book: NaverBook) => {
    console.log('📚 [ADD] Adding book:', book.title);
    console.log('📚 [ADD] User ID:', userId);
    setAddingBook(book.isbn);

    try {
      // 1. ISBN으로 이미 존재하는 책 확인
      let existingBook = null;
      if (book.isbn) {
        try {
          const allBooks = await booksApi.getAll({ search: book.isbn, limit: 1 });
          if (allBooks.data.length > 0 && allBooks.data[0].isbn === book.isbn) {
            existingBook = allBooks.data[0];
            console.log('✅ [ADD] Book already exists:', existingBook.id);
          }
        } catch (error) {
          console.log('📝 [ADD] Book not found, will create new one');
        }
      }

      // 2. 책이 없으면 생성, 있으면 기존 책 사용
      const targetBook = existingBook || await booksApi.create({
        isbn: book.isbn,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        published_at: book.published_at,
        cover_url: book.cover_url,
      });

      console.log('✅ [ADD] Using book:', targetBook.id);

      // 3. 읽기 로그 생성 (TO_READ 상태로)
      const readingLog = await readingLogsApi.create({
        userId: userId!,
        bookId: targetBook.id,
        status: 'TO_READ',
      });

      console.log('✅ [ADD] Reading log created:', readingLog);

      // 4. 책장 페이지로 이동
      router.push('/bookshelf');
    } catch (error: any) {
      console.error('❌ [ADD] Failed to add book:', error);
      const errorMessage = error?.message || '알 수 없는 오류가 발생했습니다.';
      alert(`책을 추가하는데 실패했습니다.\n오류: ${errorMessage}`);
    } finally {
      setAddingBook(null);
    }
  };

  return (
    <div className='bg-brown-20 relative flex min-h-screen text-white w-full'>
      <HamburgerMenu />

      <main className='flex-1 overflow-y-auto px-6 py-8'>
        <div className='mx-auto max-w-7xl space-y-8'>
          <div className='text-center'>
            <h1 className='text-4xl leading-tight font-black tracking-tight'>
              책 추가하기
            </h1>
            <p className='text-brown-90 mt-2 text-lg'>
              읽고 싶은 책을 검색하고 내 서재에 추가하세요
            </p>
          </div>

          <div className='mx-auto w-full'>
            <label className='block w-full'>
              <div className='bg-brown-30/50 flex w-full items-stretch rounded-lg'>
                <div className='text-brown-90 flex items-center justify-center px-4'>
                  🔍
                </div>
                <input
                  className='t-b-r placeholder:text-brown-90/80 focus:ring-brown-40 w-full flex-1 rounded-r-lg bg-transparent px-4 py-3 text-white focus:ring-2 focus:outline-none'
                  placeholder='책 제목이나 저자를 검색하세요'
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </label>
          </div>

          {searching ? (
            <Loading fullPage={false} message='검색 중...' />
          ) : hasSearched ? (
            searchResults.length > 0 ? (
              <div className='grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-6'>
                {searchResults.map((book, index) => (
                  <div
                    key={`${book.isbn}-${index}`}
                    className='bg-brown-30 group flex flex-col overflow-hidden rounded-2xl'
                  >
                    <div
                      className='aspect-3/4 w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105'
                      style={{ backgroundImage: `url(${book.cover_url})` }}
                      aria-label={`${book.title} 표지`}
                    />
                    <div className='flex flex-1 flex-col gap-3 p-4'>
                      <div className='flex-1'>
                        <h3 className='line-clamp-2 text-base leading-tight font-bold'>
                          {book.title}
                        </h3>
                        <p className='text-brown-90 mt-1 text-sm'>{book.author}</p>
                        <p className='text-brown-90 mt-1 text-xs'>{book.publisher}</p>
                      </div>
                      <button
                        type='button'
                        onClick={() => handleAddBook(book)}
                        disabled={addingBook === book.isbn}
                        className='btn bg-brown-40 hover:bg-brown-50 disabled:bg-brown-60 disabled:cursor-not-allowed w-full px-4 py-2 text-sm text-white transition-colors'
                      >
                        {addingBook === book.isbn ? '추가 중...' : '내 서재에 추가'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='bg-brown-30 flex flex-col items-center gap-4 rounded-lg p-12'>
                <span className='text-6xl'>🔍</span>
                <h3 className='text-xl font-bold'>검색 결과가 없습니다</h3>
                <p className='text-brown-90'>다른 검색어로 시도해보세요</p>
              </div>
            )
          ) : (
            <div className='bg-brown-30 flex flex-col items-center gap-4 rounded-lg p-12'>
              <span className='text-6xl'>📚</span>
              <h3 className='text-xl font-bold'>책을 검색해보세요</h3>
              <p className='text-brown-90 text-center'>
                책 제목이나 저자를 검색하면
                <br />
                네이버 도서 검색 결과가 표시됩니다
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
