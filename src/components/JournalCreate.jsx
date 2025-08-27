import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createJournalAction } from "../store/journalAction";
import { useDispatch,useSelector } from "react-redux";

/**
 * Props:
 *  - onSubmit: (payload) => void | Promise<void>
 *  - defaultValues?: { title, content, tags, visibility, attachments }
 */
export default function JournalForm({ onSubmit, defaultValues }) {
  const [title, setTitle] = useState(defaultValues?.title || "");
  const [content, setContent] = useState(defaultValues?.content || "");
  const [visibility, setVisibility] = useState(defaultValues?.visibility || "private");
  const [tags, setTags] = useState(defaultValues?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [attachments, setAttachments] = useState(defaultValues?.attachments || []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user?._id);

  const addTag = () => {
    const t = tagInput.trim();
    if (!t) return;
    if (tags.includes(t)) return;
    setTags((prev) => [...prev, t]);
    setTagInput("");
  };

  const removeTag = (idx) => {
    setTags((prev) => prev.filter((_, i) => i !== idx));
  };

  const addAttachment = () => {
    setAttachments((prev) => [...prev, { filename: "", url: "" }]);
  };

  const updateAttachment = (idx, key, value) => {
    setAttachments((prev) =>
      prev.map((att, i) => (i === idx ? { ...att, [key]: value } : att))
    );
  };

  const removeAttachment = (idx) => {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // minimal client-side validation matching schema requirements
    if (!title.trim()) return setError("Title is required.");
    if (!content.trim()) return setError("Content is required.");
    if (!Array.isArray(tags) || tags.length === 0) return setError("At least one tag is required.");
    for (const a of attachments) {
      if (!a.filename?.trim() || !a.url?.trim()) {
        return setError("Each attachment needs a filename and a URL.");
      }
    }

    try {
      setBusy(true);
      const payload = {
        title: title.trim(),
        content: content.trim(),
        tags,
        visibility,
        attachments,
        userId
      };
      await onSubmit?.(payload);
      await dispatch(createJournalAction(payload));
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center py-10">
      {/* Soft gradient glows (blushing) */}
      <div className="pointer-events-none absolute -z-10 inset-0">
        <div className="absolute left-10 top-10 w-40 h-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute right-12 bottom-16 w-48 h-48 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[40vw]  rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-5 shadow-xl shadow-fuchsia-500/5"
      >
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white">New Journal</h2>
          <p className="text-sm text-zinc-400">Dark • Animated • Glowy</p>
        </div>

        {/* Title */}
        <label className="block text-sm text-zinc-300 mb-1">Title *</label>
        <motion.input
          whileFocus={{ boxShadow: "0 0 0 2px rgba(236,72,153,0.4)" }}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="A tiny love letter to code…"
          className="w-full mb-3 rounded-lg bg-zinc-900/70 border border-white/10 px-3 py-2 text-white outline-none placeholder:text-zinc-500"
        />

        {/* Content */}
        <label className="block text-sm text-zinc-300 mb-1">Content *</label>
        <motion.textarea
          whileFocus={{ boxShadow: "0 0 0 2px rgba(59,130,246,0.35)" }}
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts…"
          className="w-full mb-3 rounded-lg bg-zinc-900/70 border border-white/10 px-3 py-2 text-white outline-none placeholder:text-zinc-500 resize-y"
        />

        {/* Tags */}
        <label className="block text-sm text-zinc-300 mb-1">Tags * (press +)</label>
        <div className="flex gap-2 mb-2">
          <motion.input
            whileFocus={{ boxShadow: "0 0 0 2px rgba(34,197,94,0.35)" }}
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="e.g. mern_stack"
            className="flex-1 rounded-lg bg-zinc-900/70 border border-white/10 px-3 py-2 text-white outline-none placeholder:text-zinc-500"
          />
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={addTag}
            className="rounded-lg bg-emerald-500/20 border border-emerald-400/30 px-3 py-2 text-emerald-300 hover:bg-emerald-500/30 transition"
          >
            +
          </motion.button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <AnimatePresence>
            {tags.map((t, idx) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs text-fuchsia-200"
              >
                {t}
                <button
                  type="button"
                  onClick={() => removeTag(idx)}
                  className="text-fuchsia-300/80 hover:text-fuchsia-100"
                  aria-label={`Remove ${t}`}
                >
                  ×
                </button>
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Visibility */}
        <label className="block text-sm text-zinc-300 mb-1">Visibility</label>
        <div className="mb-4 flex items-center gap-3">
          {["private", "public"].map((opt) => (
            <label
              key={opt}
              className={`cursor-pointer rounded-lg border px-3 py-2 text-sm transition
                ${visibility === opt
                  ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-200"
                  : "border-white/10 bg-zinc-900/70 text-zinc-300 hover:border-white/20"}`}
            >
              <input
                type="radio"
                name="visibility"
                value={opt}
                checked={visibility === opt}
                onChange={(e) => setVisibility(e.target.value)}
                className="mr-2 accent-cyan-400"
              />
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </label>
          ))}
        </div>

        {/* Attachments */}
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm text-zinc-300">Attachments</label>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={addAttachment}
            className="rounded-lg bg-cyan-500/15 border border-cyan-400/30 px-2 py-1 text-xs text-cyan-200 hover:bg-cyan-500/25 transition"
          >
            + Add
          </motion.button>
        </div>

        <div className="space-y-2 mb-4">
          <AnimatePresence initial={false}>
            {attachments.map((att, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="grid grid-cols-1 gap-2 rounded-lg border border-white/10 bg-zinc-900/60 p-3"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={att.filename}
                    onChange={(e) => updateAttachment(idx, "filename", e.target.value)}
                    placeholder="filename.ext"
                    className="flex-1 rounded-md bg-black/50 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-zinc-500 outline-none"
                  />
                  <input
                    type="url"
                    value={att.url}
                    onChange={(e) => updateAttachment(idx, "url", e.target.value)}
                    placeholder="https://…"
                    className="flex-1 rounded-md bg-black/50 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-zinc-500 outline-none"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeAttachment(idx)}
                    className="text-xs text-red-300/80 hover:text-red-200"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-3 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <motion.button
          type="submit"
          disabled={busy}
          whileTap={{ scale: 0.98 }}
          className={`w-full rounded-lg px-4 py-2 font-medium transition
            ${busy
              ? "bg-zinc-700 text-zinc-300 cursor-not-allowed"
              : "bg-gradient-to-r from-fuchsia-600/80 to-cyan-600/80 hover:from-fuchsia-500/80 hover:to-cyan-500/80 text-white shadow-lg shadow-fuchsia-500/20"}`}
        >
          {busy ? "Saving..." : "Save Journal"}
        </motion.button>
      </motion.form>
    </div>
  );
}
