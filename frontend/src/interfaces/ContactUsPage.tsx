export default function ContactUsPage() {
  return (
    <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem'}}>
      <h1 style={{textAlign: 'center'}}>Contact Us</h1>
      <p style={{textAlign: 'center', margin: '3rem'}}>
        If you have a question, need assistance, or would like to give feedback, send us a message and we will get back to you as soon as possible!
      </p>

      <div style={{display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'flex-start'}}>
        
        {/* Contact Form */}
        <form className="card" style={{flex: '1', minWidth: '300px'}}>
          <div>
            <label>Name</label>
            <input 
              type="text"  
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label>Message</label>
            <textarea
              placeholder="How can we help you?"
              required
            />
          </div>

          <button type="submit" style={{marginBottom: '2rem'}}>Send Message</button>

        </form>

      </div>

      <div>
        <div className="card" style={{marginBottom: '1.5rem'}}>
          <h2 style={{marginBottom: '1rem'}}>Visit Our Store</h2>
          <p><strong>Pro Racketeers</strong></p>
          <p>New York City, NY</p>
          <p>Phone: (123) 456-789</p>
          <p>Email: info@proracketeers.com</p>
        </div>

        <div style={{height: '300px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <iframe 
            width="100%" 
            height="100%" 
            style={{ border: 0 }}
            loading="lazy"
            src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=New%20York%20City+(Pro%20Racketeers)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
          </iframe>
        </div>
      </div>
    </div>
  );
}