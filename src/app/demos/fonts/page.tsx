import { lusitana } from '@/app/ui/fonts';

export default function DifferentFonts() {
  return (
    <>
      <p className="text-gray-800">
        default font(define in layout), your first fonts
      </p>
      <p className={`${lusitana.className} text-gray-800`}>
        lusitana font, your second fonts
      </p>
      <p className={`${lusitana.className} text-lg text-gray-800`}>
        lusitana font, your second fonts
      </p>
    </>
  );
}
