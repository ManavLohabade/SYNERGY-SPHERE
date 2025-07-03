import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { useWallet } from './walletProvider';
import { generateImage as generateOpenAIImage } from '../libs/openai';

interface GenerateButtonProps {
  prompt: string;
  onImageGenerated: (imageUrl: string) => void;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  prompt,
  onImageGenerated,
}) => {
  const { walletAddress } = useWallet();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const demoImageUrl = "./images/ai2.webp";

  const handleGenerateClick = async () => {
    if (!walletAddress) {
      setError("Please connect your wallet first");
      return;
    }

    if (!prompt.trim()) {
      setError("Please enter a prompt first");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const imageUrl = await generateOpenAIImage(prompt);
      onImageGenerated(imageUrl);
    } catch (error: any) {
      setError("Failed to generate image. Displaying a demo instead.");
      onImageGenerated(demoImageUrl);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative space-y-4">
      <div className="flex gap-2">
        <button
          onClick={handleGenerateClick}
          disabled={isGenerating}
          className={`flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 rounded-lg text-white flex items-center justify-center gap-2 transition-all ${isGenerating ? "opacity-75 cursor-not-allowed" : ""}`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              GENERATING...
            </>
          ) : (
            "GENERATE"
          )}
        </button>
      </div>
      {error && (
        <div className="error-message">
          <AlertCircle /> {error}
        </div>
      )}
      {/* ...other UI elements */}
    </div>
  );
};

export default GenerateButton;