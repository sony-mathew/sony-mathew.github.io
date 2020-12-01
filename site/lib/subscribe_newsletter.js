import { useState } from 'react';
import DEFAULT_CONFIG from '../config/default_config';

function sendSusbcribeRequest(email) {
  return fetch(`${DEFAULT_CONFIG.sheetsUrl}?email=${email}`);
}

function SubscribeBlock({  }) {
  const [email, setNewEmail] = useState(null);
  const [errors, setErrors] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  
  const onSave = async (emailId) => {
    const sanitizedEmail = emailId.trim().toLowerCase();
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(emailRegex.test(sanitizedEmail)) {
      setErrors(false);
      const resp = await sendSusbcribeRequest(sanitizedEmail);
      console.log(resp);
      if (resp.status == 200) {
        setSubscribed(true);
      } else {
        setErrors(true);
      }
    } else {
      setErrors(true);
    }
  };

  if(subscribed) {
    return (
      <>
        <div className="text-center"> Thank you for subscribing. </div>
        <div className="text-center"> You did good today. 😼 </div>
      </>
    );
  } else {
    return (
      <>
        <div className="text-center">
          I write about technology, career, travel and philosophy.
        </div>
        <div className="flex flex-col lg:flex-row justify-center place-items-center lg:space-x-8 lg:space-y-0 space-y-8">
          <input
            onChange={(e) => setNewEmail(e.target.value)}
            type="email"
            className={ 
              (errors ? 'border-red-600' : 'border-gray-600') + 
              " rounded border focus:outline-none text-gray-600 px-4 py-2"
            }
            required
          />
          <button
            onClick={() => onSave(email)}
            className="relative inline-flex rounded 
              items-center px-4 py-2 border border-gray-600 text-gray-200 bg-gray-700 
              hover:bg-gray-700 hover:bg-opacity-50 focus:outline-none"
          >
            Subscribe
          </button>
        </div>
      </>
    );
  }
}


export default function SubscribeNewsletter() {
  const alreadySubscribed = false;

  if (DEFAULT_CONFIG.disableNewsletter || alreadySubscribed) {
    return (<></>);
  } else {
    return (
      <div className="border-t border-gray-600 flex flex-col justify-center place-items-center space-y-4 p-8 mt-8">
        <SubscribeBlock />
      </div>
    );
  }
}

