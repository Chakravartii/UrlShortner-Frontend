import React, { useState } from 'react'
import { useStoreContext } from '../../contextApi/ContextApi'
import { useForm } from 'react-hook-form';
import TextField from '../TextField';
import api from '../../api/api';
import toast from 'react-hot-toast';
import { Button, Input } from '../UI';
import { HiX, HiLink, HiCheck } from 'react-icons/hi';

const CreateNewShorten = ({ setOpen, refetch }) => {
  const { token } = useStoreContext();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  const createShortUrlHandler = async (data) => {
    setLoading(true);
    try {
      const { data: res } = await api.post("/api/url/shorten", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const fullShortenUrl = `${import.meta.env.VITE_REACT_SUBDOMAIN}/${res.data.shortUrl}`;
      setShortenedUrl(fullShortenUrl);

      // Copy to clipboard
      navigator.clipboard.writeText(fullShortenUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });

      toast.success("Link shortened successfully! URL copied to clipboard.");

      // Refetch after short delay
      setTimeout(() => {
        reset();
        setShortenedUrl("");
        setOpen(false);
        refetch?.();
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md">
      {!shortenedUrl ? (
        <form onSubmit={handleSubmit(createShortUrlHandler)} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Shorten Your Link
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Paste your long URL below to create a short, trackable link
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Original URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/very/long/url"
                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  errors.originalUrl
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                {...register('originalUrl', {
                  required: 'URL is required',
                  pattern: {
                    value: /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                    message: 'Please enter a valid URL',
                  },
                })}
              />
              {errors.originalUrl && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.originalUrl.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin">⏳</span>
                  Shortening...
                </>
              ) : (
                <>
                  <HiLink className="w-5 h-5" />
                  Shorten URL
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => {
                setOpen(false);
                reset();
                setShortenedUrl("");
              }}
              disabled={loading}
              className="flex-1"
            >
              <HiX className="w-5 h-5" />
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              🎉 Link Shortened!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your link is ready to share
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <HiCheck className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-900 dark:text-green-200 mb-1">
                  Success!
                </p>
                <p className="text-xs text-green-700 dark:text-green-300">
                  Your shortened URL has been copied to clipboard
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-semibold uppercase">
              Your Short URL
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-between gap-3">
              <code className="text-sm font-mono text-gray-900 dark:text-white truncate">
                {shortenedUrl}
              </code>
              <Button
                variant={copied ? "secondary" : "primary"}
                size="sm"
                onClick={handleCopyClick}
                className="flex-shrink-0"
              >
                {copied ? (
                  <HiCheck className="w-4 h-4" />
                ) : (
                  <HiLink className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={() => {
                setShortenedUrl("");
                reset();
              }}
            >
              <HiLink className="w-5 h-5" />
              Shorten Another
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="flex-1"
              onClick={() => {
                setOpen(false);
                setShortenedUrl("");
                reset();
              }}
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewShorten;
