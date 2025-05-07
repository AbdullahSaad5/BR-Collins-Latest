import React from "react";
import { X, FileText, Link as LinkIcon } from "lucide-react";
import ReactPlayer from "react-player";

interface PreviewPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    contentType: string;
    contentUrl: string;
    title: string;
    description?: string;
    duration?: string;
  } | null;
}

const PreviewPlayerModal: React.FC<PreviewPlayerModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen || !content) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 animate-slideIn relative mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">{content.title}</h2>
          {content.contentType === "video" ? (
            <div className="aspect-video rounded-lg overflow-hidden bg-black mb-4">
              <ReactPlayer
                url={content.contentUrl}
                width="100%"
                height="100%"
                controls={true}
                playing={true}
                className="!absolute !top-0 !left-0"
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload",
                      onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
                    },
                  },
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded mb-4">
              <div className="mb-4">
                {content.contentType === "document" ? (
                  <FileText className="h-12 w-12 text-gray-400" />
                ) : (
                  <LinkIcon className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <a
                href={content.contentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                {content.contentType === "document" ? "View Document" : "Open Resource"}
                <LinkIcon className="h-4 w-4" />
              </a>
            </div>
          )}
          {content.description && <p className="text-gray-600 mb-2">{content.description}</p>}
          {content.duration && <p className="text-xs text-gray-400">Duration: {content.duration} min</p>}
        </div>
      </div>
    </div>
  );
};

export default PreviewPlayerModal;
