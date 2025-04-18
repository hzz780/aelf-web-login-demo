'use client';
import ReCaptcha from '@matt-block/react-recaptcha-v2';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <div>Please check result in console</div>
      <ReCaptcha
        siteKey="6Lc26GMqAAAAACW7eGuv9dfefWoQJYz__YBU3m4N"
        theme="light"
        size="normal"
        onSuccess={(captcha) => console.log(`Successful, result is ${captcha}`)}
        onError={() =>
          console.log('Something went wrong, check your conenction')
        }
        onExpire={() => console.log('Verification has expired, re-verify.')}
      />
      <Link
        href="https://www.google.com/recaptcha/admin/create"
        target="_blank"
        className="text-blue-500"
      >
        Docs: Google ReCaptcha
      </Link>
    </>
  );
}
