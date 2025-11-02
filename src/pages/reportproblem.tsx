import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";


interface Attachment {
  file: File;
  preview: string;
}

interface Errors {
  title?: string;
  description?: string;
  submit?: string;
}

export default function ReportProblemForm(): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("bug");
  const [severity, setSeverity] = useState<string>("medium");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  // ✅ Validation logic
  function validate(): Errors {
    const e: Errors = {};
    if (!title.trim()) e.title = "Title is required.";
    if (!description.trim() || description.trim().length < 20)
      e.description = "Please provide a more detailed description (min 20 characters).";
    return e;
  }

  // ✅ File input handler
  function handleFilesChange(ev: ChangeEvent<HTMLInputElement>): void {
    if (!ev.target.files) return;
    const files = Array.from(ev.target.files).slice(0, 5);
    const mapped = files.map((f) => ({ file: f, preview: URL.createObjectURL(f) }));
    setAttachments((prev) => [...prev, ...mapped]);
  }

  // ✅ Remove file preview and revoke URL
  function removeAttachment(index: number): void {
    URL.revokeObjectURL(attachments[index].preview);
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  }

  // ✅ Submit handler
  async function submitReport(ev: FormEvent<HTMLFormElement>): Promise<void> {
    ev.preventDefault();
    setSuccessMessage("");
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", title.trim());
      fd.append("category", category);
      fd.append("severity", severity);
      fd.append("description", description.trim());
      fd.append("tags", tags);
      fd.append("anonymous", anonymous ? "1" : "0");
      attachments.forEach((a) => fd.append("attachments", a.file, a.file.name));

      // Simulate API call delay
      await new Promise((r) => setTimeout(r, 900));

      setSuccessMessage("Report submitted — thank you! The community will review this shortly.");

      // Reset form fields
      setTitle("");
      setCategory("bug");
      setSeverity("medium");
      setDescription("");
      setTags("");
      setAttachments([]);
      setAnonymous(false);
      setErrors({});
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Failed to submit. Try again later." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm p-6"
      >
        <header className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-semibold">Report a problem</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Help the community by reporting issues, bugs, or suggestions.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium">Community</span>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">Moderated</span>
          </div>
        </header>

        <form onSubmit={submitReport} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short, descriptive title — e.g. 'Can't upload images in comments'"
              className={`w-full rounded-lg border px-4 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:bg-slate-800 dark:border-slate-700 ${
                errors.title ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
          </div>

          {/* Category / Severity / Tags */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border px-3 py-2"
              >
                <option value="bug">Bug</option>
                <option value="feature">Feature request</option>
                <option value="abuse">Abuse / Harassment</option>
                <option value="help">Need help</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Severity</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full rounded-lg border px-3 py-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="ui,comments,images"
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              placeholder="Explain what happened, how to reproduce it, and expected behavior. Include browser, device, and steps if possible."
              className={`w-full rounded-lg border px-4 py-3 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:bg-slate-800 dark:border-slate-700 ${
                errors.description ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium mb-2">Attachments (screenshots, logs) — up to 5</label>
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 cursor-pointer rounded-lg border border-dashed px-4 py-2">
                <input
                  type="file"
                  accept="image/*,text/plain,.log"
                  multiple
                  onChange={handleFilesChange}
                  className="hidden"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4 4 4m6 4v8m0 0l4-4m-4 4-4-4" />
                </svg>
                <span className="text-sm">Choose files</span>
              </label>
              <p className="text-sm text-gray-500">PNG, JPG, TXT — max 5 files</p>
            </div>

            {attachments.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                {attachments.map((a, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden border">
                    <img src={a.preview} alt={`attach-${i}`} className="object-cover w-full h-28" />
                    <button
                      type="button"
                      onClick={() => removeAttachment(i)}
                      className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Anonymous & Submit */}
          <div className="flex items-center justify-between gap-4">
            <label className="inline-flex items-center gap-3">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm">Post anonymously</span>
            </label>

            <div className="text-sm text-gray-500">By reporting, you agree to our community guidelines.</div>
          </div>

          {errors.submit && <p className="text-sm text-red-600">{errors.submit}</p>}
          {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2 bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
            >
              {submitting ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A1 1 0 0017.5 4h-15a1 1 0 00-.497 1.884z" />
                </svg>
              )}
              <span>{submitting ? "Submitting..." : "Submit report"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setTitle("");
                setDescription("");
                setAttachments([]);
                setTags("");
                setErrors({});
              }}
              className="rounded-lg px-4 py-2 border"
            >
              Clear
            </button>

            <div className="ml-auto text-xs text-gray-400">
              Need help? <a href="#" className="underline">Contact moderators</a>
            </div>
          </div>
        </form>
      </motion.div>

      <footer className="mt-4 text-xs text-gray-500">
        Tip: good reports include steps to reproduce, expected vs actual behavior, and screenshots or logs.
      </footer>
    </div>
  );
}
