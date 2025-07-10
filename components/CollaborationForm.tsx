// CollaborationForm.tsx
import React, { useState } from 'react';
import { CollaborationFormData } from '../types';
import { CONTACT_EMAIL, CREATOR_NAME } from '../constants';
import SectionTitle from './SectionTitle';
import { SendIcon } from './icons/GenericIcons';

// Declare emailjs if using global script
declare var emailjs: any;

const EMAILJS_SERVICE_ID = 'service_23q72pn';
const EMAILJS_TEMPLATE_ID = 'template_2zqd315';
const EMAILJS_PUBLIC_KEY = 'uynadYILbwJHHaNEj';

const CollaborationForm: React.FC = () => {
  const [formData, setFormData] = useState<CollaborationFormData>({
    name: '',
    email: '',
    message: '',
    projectType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    if (typeof emailjs === 'undefined') {
      setSubmitStatus('error');
      setSubmitMessage(
        'Email service unavailable. Please try again later or contact directly.'
      );
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: CREATOR_NAME,
      project_type: formData.projectType || 'General Inquiry',
      message: formData.message,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setSubmitStatus('success');
      setSubmitMessage(
        'Your message has been sent successfully! I will get back to you soon.'
      );
      setFormData({ name: '', email: '', message: '', projectType: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      setSubmitMessage(
        `Failed to send. ${((error as any)?.text || 'Unknown error')}. Or email at ${CONTACT_EMAIL}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-8 md:py-16 bg-white dark:bg-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionTitle
          title="Let's Collaborate!"
          subtitle="Interested in working together? Send me a message!"
        />

        <div className="max-w-2xl mx-auto bg-pink-50 dark:bg-slate-700 p-8 rounded-xl shadow-xl border border-pink-200 dark:border-slate-600">
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-700 border border-green-300 dark:border-green-600 text-green-700 dark:text-green-100 rounded-md">
              {submitMessage}
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-700 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-100 rounded-md">
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 dark:text-pink-200"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="mt-1 block w-full px-4 py-2 bg-white dark:bg-slate-600 border border-pink-300 dark:border-slate-500 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:focus:ring-pink-500 dark:focus:border-pink-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-300"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-pink-200"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="mt-1 block w-full px-4 py-2 bg-white dark:bg-slate-600 border border-pink-300 dark:border-slate-500 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:focus:ring-pink-500 dark:focus:border-pink-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-300"
              />
            </div>

            {/* Project Type */}
            <div>
              <label
                htmlFor="projectType"
                className="block text-sm font-medium text-slate-700 dark:text-pink-200"
              >
                Project Type (Optional)
              </label>
              <select
                name="projectType"
                id="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 bg-white dark:bg-slate-600 border border-pink-300 dark:border-slate-500 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:focus:ring-pink-500 dark:focus:border-pink-500 sm:text-sm"
              >
                <option value="">Select a project type</option>
                <option value="ugc_content">UGC Content</option>
                <option value="sponsored_video">Sponsored Video</option>
                <option value="product_review">Product Review</option>
                <option value="brand_ambassador">Brand Ambassadorship</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700 dark:text-pink-200"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell me about your project or idea..."
                className="mt-1 block w-full px-4 py-2 bg-white dark:bg-slate-600 border border-pink-300 dark:border-slate-500 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:focus:ring-pink-500 dark:focus:border-pink-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-300"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-6 py-3 rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark dark:bg-pink-500 dark:hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-pink-400 disabled:opacity-50 transition-colors duration-200"
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <SendIcon className="w-5 h-5 mr-2" />
                )}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-center text-slate-600 dark:text-slate-400">
            Or email me directly at{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-primary dark:text-pink-400 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default CollaborationForm;
