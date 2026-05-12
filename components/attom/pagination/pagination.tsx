type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  data:
    | {
        first: number;
        prev: number | null;
        next: number | null;
        last: number;
        pages: number;
        items: number;
        [key: string]: any;
      }
    | undefined;
};

export const Pagination: React.FC<PaginationProps> = ({ page, setPage, data }) => {
  return (
    <div className="flex justify-center  items-center gap-4">
      <button
        className="px-2 py-1 border border-neutral-300 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setPage(Math.max(data?.prev || 0, 1))}
        disabled={!data?.prev}
      >
        قبلی
      </button>

      {Array(data?.pages)
        .fill("")
        .map((item, i) => {
          return (
            <button
              key={i}
              className="px-2 py-1 border border-neutral-300 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setPage(i + 1)}
              disabled={page === i + 1}
            >
              {i + 1}
            </button>
          );
        })}

      <button
        className="px-2 py-1 border border-neutral-300 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setPage(data?.next || 0)}
        disabled={!data?.next}
      >
        بعدی
      </button>
    </div>
  );
};
