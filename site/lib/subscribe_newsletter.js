import { useState } from 'react';
import DEFAULT_CONFIG from '../config/default_config';
import styles from './subscribe_newsletter.module.scss';

function sendSusbcribeRequest(email) {
  return fetch(`${DEFAULT_CONFIG.sheetsUrl}?email=${email}`);
}

function SubscribeBlock() {
  const [email, setNewEmail] = useState(null);
  const [errors, setErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const validateEmail = (email) => {
    if (!email) {
      setErrorMessage('Email is required');
      return false;
    }
    
    const sanitizedEmail = email.trim().toLowerCase();
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if (!emailRegex.test(sanitizedEmail)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    
    return true;
  };
  
  const onSave = async (emailId) => {
    if (!validateEmail(emailId)) {
      setErrors(true);
      return;
    }
    
    const sanitizedEmail = emailId.trim().toLowerCase();
    setErrors(false);
    setIsLoading(true);
    
    try {
      const resp = await sendSusbcribeRequest(sanitizedEmail);
      console.log(resp);
      if (resp.status == 200) {
        setSubscribed(true);
      } else {
        setErrors(true);
        setErrorMessage('Subscription failed. Please try again later.');
      }
    } catch (error) {
      setErrors(true);
      setErrorMessage('An error occurred. Please try again later.');
      console.error("Subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if(subscribed) {
    return (
      <div className={styles.successMessage}>
        <strong>Thank you for subscribing.</strong>
        <span>You did good today. 😼</span>
      </div>
    );
  } else {
    return (
      <div className={styles.formArea}>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label className={styles.visuallyHidden} htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              onChange={(e) => setNewEmail(e.target.value)}
              type="email"
              className={`${styles.emailInput} ${
                errors ? styles.emailInputError : ""
              }`}
              required
              disabled={isLoading}
              placeholder="you@example.com"
            />
          </div>
          <button
            type="button"
            onClick={() => onSave(email)}
            className={styles.subscribeButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subscribing...
              </>
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
        {errors && (
          <div className={styles.errorMessage} role="alert">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
}


export default function SubscribeNewsletter() {
  const alreadySubscribed = false;

  if (DEFAULT_CONFIG.disableNewsletter || alreadySubscribed) {
    return (<></>);
  } else {
    return (
      <section className={styles.newsletter} aria-labelledby="newsletter-title">
        <div className={styles.newsletterCopy}>
          <span>Newsletter</span>
          <h2 id="newsletter-title">New ramblings, occasionally.</h2>
          <p>I write about technology, career, travel, and philosophy.</p>
        </div>
        <SubscribeBlock />
      </section>
    );
  }
}
