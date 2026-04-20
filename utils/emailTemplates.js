const welcomeTemplate = (user) => ({
      subject: 'Welcome to TrekMap  🏔️',
      html: `
       <h1>Welcome to TrekMap, ${user.username || user.displayName}!</h1>
          <p>Your adventure begins here. Start exploring treks, create your own, and connect with other trekkers.</p>
          <a href="http://localhost:3000/treks" style="background:#4CAF50;color:white;padding:10px
  20px;text-decoration:none;border-radius:5px;">Explore Treks</a>
          <hr>
          <p><small>TrekMap - Your Ultimate Trekking Companion</small></p>
      `
});


const passwordResetTemplate = (user, resetToken) => ({
      subject: 'Passwrod Reset!',
      html: `
          <h2>Password Reset Request</h2>
          <p>Hi ${user.username},</p>
          <p>Click the link below to reset your password:</p>
          <a href="http://localhost:3000/reset-password/${resetToken}">Reset Password</a>
          <p>This link expires in 1 hour.</p>
          <p>If you didn't request this, ignore this email.</p>
      `

});

const trekNotificationTemplate = (user, trekTitle) => ({
      subject: 'You have created a Trek.',
      html: `<h2>Your Trek is Live! 🎉</h2>
          <p>Hi ${user.username},</p>
          <p>Your trek "<strong>${trekTitle}</strong>" has been published.</p>
          <a href="http://localhost:3000/treks">View Your Trek</a>`

});

const emailLoginTemplate = (user, trekTitle) => ({
      subject: 'Login successful. - TrekMap',
      html: `<h2>You've been logged in! 🎉</h2>
          <p>Hi ${user.username},</p>
          <p>Welcome back to TrekMap</p>
          <a href="http://localhost:3000/">Explore more Treks</a>`

});

module.exports = {
      welcomeTemplate,
      passwordResetTemplate,
      trekNotificationTemplate,
      emailLoginTemplate
}