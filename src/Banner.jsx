// Banner.jsx

export function Banner() {
  return (
    <div>
      <div>
        <p>
          We use tracking cookies to understand how you use 
          the product and help us improve it.
          Please accept cookies to help us improve.
        </p>
        <button type="button" onClick={handleAcceptCookies}>Accept cookies</button>
        <span> </span>
        <button type="button" onClick={handleDeclineCookies}>Decline cookies</button>
      </div>
    </div>
  )
}