import { contactDetails } from './contactDetails.js';

export function contactDraftText(data) {
  return `Subject: ${data.subject.trim()}\n\n${data.message.trim()}\n\nFrom: ${data.name.trim()}\nReply to: ${data.email.trim()}`;
}

export function contactDraftUrl(data) {
  const subject = data.subject.trim().replace(/[\r\n]+/g, ' ');
  const body = `${data.message.trim()}\n\nFrom: ${data.name.trim()}\nReply to: ${data.email.trim()}`;
  return `mailto:${contactDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
