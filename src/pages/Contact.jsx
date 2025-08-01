import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react'
import { usePageTracking } from '../hooks/useInteractionTracking.js'

const Contact = () => {
  const { currentTheme } = useTheme()
  const { trackFormSubmission, trackSocialMediaClick, trackLinkClick } = usePageTracking('contact')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Track form submission
    trackFormSubmission('contact_form', {
      formType: 'contact',
      hasName: !!formData.name,
      hasEmail: !!formData.email,
      hasSubject: !!formData.subject,
      hasMessage: !!formData.message,
      messageLength: formData.message.length
    })
    
    // Create mailto link with form data
    const mailtoLink = `mailto:rmugalkhod.cse@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`
    window.location.href = mailtoLink
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="text-white" size={24} />,
      title: "EMAIL",
      value: "rmugalkhod.cse@gmail.com",
      link: "mailto:rmugalkhod.cse@gmail.com"
    },
    {
      icon: <Phone className="text-white" size={24} />,
      title: "PHONE",
      value: "+91 8073971460",
      link: "tel:+918073971460"
    },
    {
      icon: <MapPin className="text-white" size={24} />,
      title: "LOCATION",
      value: "Bangalore, Karnataka, India",
      link: null
    }
  ]

  const socialLinks = [
    {
      icon: <Github size={24} />,
      name: "GitHub",
      url: "https://github.com/RohitM1518",
      color: "hover:text-gray-400"
    },
    {
      icon: <Linkedin size={24} />,
      name: "LinkedIn",
      url: "https://linkedin.com/in/rohit-mugalkhod",
      color: "hover:text-blue-400"
    },
    {
      icon: <Twitter size={24} />,
      name: "Twitter",
      url: "https://twitter.com/RohitSM5",
      color: "hover:text-cyan-400"
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--color-backgroundGradient)', color: 'var(--color-text)' }}>
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              backgroundColor: currentTheme.primary,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-mono font-bold mb-6 relative" style={{ color: 'var(--color-text)' }}>
              <span className="inline-block animate-glitch">GET</span>
              <span className="inline-block ml-4 animate-glitch-delay">IN_TOUCH</span>
            </h1>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed font-mono" style={{ color: 'var(--color-textSecondary)' }}>
              &gt; Ready to collaborate on your next project? Let's discuss how we can work together 
              to bring your ideas to life. I'm always excited to take on new challenges!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <MessageCircle size={24} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <h2 className="text-3xl font-mono font-bold" style={{ color: 'var(--color-text)' }}>&gt; SEND_MESSAGE</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-mono font-medium mb-2" style={{ color: 'var(--color-textSecondary)' }}>
                        YOUR_NAME
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors resize-none font-mono"
                        style={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                          color: 'var(--color-text)',
                          border: `1px solid var(--color-primary)`,
                          placeholderColor: 'var(--color-textSecondary)'
                        }}
                        placeholder="John_Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-mono font-medium mb-2" style={{ color: 'var(--color-textSecondary)' }}>
                        EMAIL_ADDRESS
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors font-mono"
                        style={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                          color: 'var(--color-text)',
                          border: `1px solid var(--color-primary)`,
                          placeholderColor: 'var(--color-textSecondary)'
                        }}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-mono font-medium mb-2" style={{ color: 'var(--color-textSecondary)' }}>
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors font-mono"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                        color: 'var(--color-text)',
                        border: `1px solid var(--color-primary)`,
                        placeholderColor: 'var(--color-textSecondary)'
                      }}
                      placeholder="Project_Collaboration"
                    />
                  </div>
   
    <div>
                    <label htmlFor="message" className="block text-sm font-mono font-medium mb-2" style={{ color: 'var(--color-textSecondary)' }}>
                      MESSAGE
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none transition-colors resize-none font-mono"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                        color: 'var(--color-text)',
                        border: `1px solid var(--color-primary)`,
                        placeholderColor: 'var(--color-textSecondary)'
                      }}
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 rounded-lg font-mono font-medium transition-all duration-300 flex items-center justify-center gap-3"
                    style={{ 
                      backgroundColor: 'var(--color-primary)', 
                      color: 'var(--color-text)'
                    }}
                  >
                    <Send size={20} />
                    SEND_MESSAGE()
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Social */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Contact Information */}
              <div className="glass-card p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-mono font-bold mb-4 sm:mb-6 flex items-center gap-3" style={{ color: 'var(--color-text)' }}>
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--color-primary)' }} />
                  &gt; CONTACT_INFO
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg transition-all duration-300 hover:scale-105"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                        border: `1px solid var(--color-primary)`
                      }}
                    >
                      <div className="p-2 sm:p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                        {React.cloneElement(info.icon, { style: { color: 'var(--color-primary)' } })}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-mono font-semibold text-xs sm:text-sm" style={{ color: 'var(--color-text)' }}>{info.title}</h4>
                        {info.link ? (
                          <a 
                            href={info.link}
                            className="font-mono text-xs sm:text-sm transition-colors break-words"
                            style={{ color: 'var(--color-textSecondary)' }}
                            onMouseEnter={(e) => {
                              e.target.style.color = 'var(--color-primary)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.color = 'var(--color-textSecondary)';
                            }}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-mono text-xs sm:text-sm break-words" style={{ color: 'var(--color-textSecondary)' }}>{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-card p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-mono font-bold mb-4 sm:mb-6 flex items-center gap-3" style={{ color: 'var(--color-text)' }}>
                  <Github className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--color-primary)' }} />
                  &gt; SOCIAL_LINKS
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackSocialMediaClick(social.name.toLowerCase(), {
                        platform: social.name,
                        url: social.url
                      })}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center p-3 sm:p-4 rounded-lg transition-all duration-300 group"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                        border: `1px solid var(--color-primary)`
                      }}
                    >
                                              <div className="p-2 sm:p-3 rounded-lg mb-2 transition-all duration-300" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                          {React.cloneElement(social.icon, { style: { color: 'var(--color-primary)' } })}
                        </div>
                        <span className="font-mono text-xs sm:text-sm text-center break-words" style={{ color: 'var(--color-text)' }}>{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Response */}
              <div className="glass-card p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-mono font-bold mb-4" style={{ color: 'var(--color-text)' }}>&gt; QUICK_RESPONSE</h3>
                <p className="font-mono text-xs sm:text-sm leading-relaxed mb-4" style={{ color: 'var(--color-textSecondary)' }}>
                  I typically respond to emails within 24 hours. For urgent matters, 
                  feel free to reach out via phone or LinkedIn.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: 'var(--color-primary)' }} />
                  <span className="font-mono text-xs sm:text-sm" style={{ color: 'var(--color-textSecondary)' }}>Currently available for new projects</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-20"
          >
            <div className="glass-card p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold mb-4 break-words" style={{ color: 'var(--color-text)' }}>&gt; LET'S_BUILD_SOMETHING_AMAZING</h2>
              <p className="text-sm sm:text-base mb-6 max-w-2xl mx-auto font-mono leading-relaxed" style={{ color: 'var(--color-textSecondary)' }}>
                Whether you have a project in mind, want to collaborate, or just want to say hello, 
                I'm always open to new opportunities and connections.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <motion.a
                  href="mailto:rmugalkhod.cse@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 sm:px-6 py-3 rounded-lg font-mono font-medium transition-all duration-300 text-sm sm:text-base"
                  style={{ 
                    backgroundColor: 'var(--color-primary)', 
                    color: 'var(--color-text)'
                  }}
                >
                  <span className="hidden sm:inline">EMAIL_ME()</span>
                  <span className="sm:hidden">EMAIL</span>
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/rohit-mugalkhod-192466220/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 sm:px-6 py-3 rounded-lg font-mono font-medium transition-all duration-300 text-sm sm:text-base"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    color: 'var(--color-text)',
                    border: `1px solid var(--color-primary)`
                  }}
                >
                  <span className="hidden sm:inline">CONNECT_ON_LINKEDIN()</span>
                  <span className="sm:hidden">LINKEDIN</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
    </div>
    </div>
  )
}

export default Contact