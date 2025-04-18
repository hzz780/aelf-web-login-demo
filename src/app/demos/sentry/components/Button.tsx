export default function SButton({ onClick, children }: any) {
  return (
    <>
      <button
        type="button"
        className="rounded-4 text-14 m-1 cursor-pointer rounded-md border-none bg-purple-600 p-3 text-white"
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
