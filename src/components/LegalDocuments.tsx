import React, { useState } from 'react';
import { FileText, Download, Copy, Check } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import { UpgradePrompt } from './UpgradePrompt';

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
}

const templates: Template[] = [
  {
    id: 'terms',
    title: 'Terms of Service',
    description: 'Standard terms of service template for SaaS businesses',
    category: 'Legal',
    content: `Terms of Service

1. Acceptance of Terms
By accessing and using this service, you agree to be bound by these Terms of Service.

2. Description of Service
[Your Company Name] provides [service description] to users who register for an account.

3. User Accounts
Users must provide accurate information when creating an account and are responsible for maintaining account security.

4. Payment Terms
Subscription fees are billed in advance and are non-refundable.

5. Intellectual Property
All content and materials available through the service are protected by intellectual property rights.

6. Limitation of Liability
[Your Company Name] shall not be liable for any indirect, incidental, special, consequential, or punitive damages.

7. Termination
We reserve the right to terminate or suspend access to the service for violations of these terms.

8. Changes to Terms
We may modify these terms at any time, with notice to users.

9. Governing Law
These terms shall be governed by the laws of [Your Jurisdiction].

10. Contact Information
For questions about these terms, please contact [Your Contact Information].`,
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    description: 'Comprehensive privacy policy template compliant with major regulations',
    category: 'Legal',
    content: `Privacy Policy

1. Information We Collect
We collect information that you provide directly to us, including:
- Name and contact information
- Account credentials
- Payment information
- Usage data

2. How We Use Your Information
We use the collected information to:
- Provide and maintain our services
- Process transactions
- Send notifications
- Improve our services

3. Information Sharing
We do not sell your personal information. We may share information with:
- Service providers
- Legal authorities when required
- Business partners with your consent

4. Data Security
We implement appropriate security measures to protect your personal information.

5. Your Rights
You have the right to:
- Access your personal information
- Correct inaccurate data
- Request deletion of your data
- Opt-out of marketing communications

6. Cookies and Tracking
We use cookies and similar technologies to improve user experience.

7. Children's Privacy
Our services are not intended for children under 13.

8. Changes to Privacy Policy
We may update this policy periodically.

9. Contact Us
For privacy concerns, contact [Your Contact Information].`,
  },
  {
    id: 'nda',
    title: 'Non-Disclosure Agreement',
    description: 'Standard NDA template for protecting confidential information',
    category: 'Legal',
    content: `Non-Disclosure Agreement

This Non-Disclosure Agreement (the "Agreement") is entered into by and between:

[Your Company Name] ("Disclosing Party")
and
[Recipient Name] ("Receiving Party")

1. Definition of Confidential Information
"Confidential Information" means any information disclosed by the Disclosing Party to the Receiving Party.

2. Obligations
The Receiving Party shall:
- Maintain confidentiality
- Use information only for permitted purposes
- Implement security measures
- Not disclose to third parties

3. Exceptions
Confidential Information does not include information that:
- Is publicly available
- Was known prior to disclosure
- Is independently developed
- Is required by law to be disclosed

4. Term
This Agreement remains in effect for [duration] from the date of disclosure.

5. Return of Materials
Upon request, the Receiving Party shall return all Confidential Information.

6. Remedies
The Disclosing Party may seek injunctive relief for violations.

7. Governing Law
This Agreement is governed by the laws of [Your Jurisdiction].

8. Entire Agreement
This Agreement constitutes the entire understanding between the parties.`,
  },
];

export const LegalDocuments: React.FC = () => {
  const { hasFeature } = useSubscription();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTemplateSelect = (template: Template) => {
    if (!hasFeature('legalDocuments')) {
      setShowUpgradePrompt(true);
      return;
    }
    setSelectedTemplate(template);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!selectedTemplate) return;
    await navigator.clipboard.writeText(selectedTemplate.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!selectedTemplate) return;
    const blob = new Blob([selectedTemplate.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate.title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Legal Documents</h1>
        <p className="text-gray-600">
          Generate and customize legal documents for your startup
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Templates List */}
        <div className="lg:col-span-1 space-y-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                selectedTemplate?.id === template.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <FileText className={`w-5 h-5 ${
                    selectedTemplate?.id === template.id ? 'text-primary-500' : 'text-gray-400'
                  }`} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{template.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Document Preview */}
        <div className="lg:col-span-2">
          {selectedTemplate ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">{selectedTemplate.title}</h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center space-x-2 px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  {selectedTemplate.content}
                </pre>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Template</h3>
              <p className="text-gray-500">
                Choose a legal document template to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {showUpgradePrompt && (
        <UpgradePrompt
          currentPlan="starter"
          feature="Legal Documents"
          onClose={() => setShowUpgradePrompt(false)}
        />
      )}
    </div>
  );
}; 