import { useEffect } from "react";

function SubscribeButton({ alreadySubscribed }) {
  if (alreadySubscribed) {
    return (
      <span>
        You have already susbcribed to this Newsletter.
      </span>
    );
  }

  return (
    <button className="open-mailchimp-subscribe-popup relative inline-flex rounded 
      items-center px-4 py-2 border border-gray-600 text-gray-200 bg-gray-700 
      hover:bg-gray-700 hover:bg-opacity-50">
      Subscribe
    </button>
  );
}

export default function MailchimpSubscribe({ dateString }) {
  let alreadySubscribed = false;

  // if (process.browser ) {
  if (typeof document !== 'undefined') {
    alreadySubscribed = document.cookie.includes('MCPopupSubscribed=yes');
  }

  return (
    <>
      {/* <!-- Begin Mailchimp Signup Form --> */}
      <div className="border-t border-gray-600 flex flex-col justify-center place-items-center gap-6 p-8 mt-8">
        <div>
          I write about technology, career, travel and philosophy. I'm too lazy to spam you.
          Get notified on new posts.
        </div>
        <SubscribeButton alreadySubscribed={alreadySubscribed} />
      </div>
    </>
  );
}

