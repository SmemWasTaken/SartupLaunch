import { Resend } from 'resend';

const resend = new Resend('re_aAsDvLpU_Abu751BaYHWsXYt99wB4zV8E');

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  return resend.emails.send({
    from: 'noreply@microsaaslaunch.com',
    to,
    subject,
    html,
  });
} 