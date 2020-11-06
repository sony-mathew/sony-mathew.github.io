import {  useEffect } from 'react';

export default function Share() {
  useEffect(() => {
    if (typeof(a2a) != undefined) {
      a2a.init();
    }
  }, []);

  return (
    <>
      <div className="flex a2a_kit a2a_kit_size_32 a2a_default_style gap-1 pt-8">
        <a className="a2a_button_facebook" alt="Share on Facebook">&nbsp;</a>
        <a className="a2a_button_twitter">&nbsp;</a>
        <a className="a2a_button_linkedin">&nbsp;</a>
        <a className="a2a_button_copy_link">&nbsp;</a>
      </div>
      {/* <!-- Share buttons --> */}
      <script async src={ "https://static.addtoany.com/menu/page.js" } />
    </>
  );
}
