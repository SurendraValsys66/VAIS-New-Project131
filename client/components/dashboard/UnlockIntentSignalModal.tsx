import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Zap, Info } from "lucide-react";

interface UnlockIntentSignalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUnlock: (selectedOptions: string[]) => void;
  currentlyClickedBadgeId?: string;
}

const unlockOptions = [
  {
    id: "current",
    label: "Unlock Current Signal",
    description: "This company's intent signal",
  },
  {
    id: "super_strong",
    label: "Super Strong Signals Only",
    description: "Companies with super strong intent signals",
  },
  {
    id: "very_strong",
    label: "Very Strong Signals Only",
    description: "Companies with very strong intent signals",
  },
  {
    id: "strong",
    label: "Strong Signals Only",
    description: "Companies with strong intent signals",
  },
  {
    id: "all",
    label: "Unlock All Signals",
    description: "All intent signals in this list",
  },
];

export default function UnlockIntentSignalModal({
  open,
  onOpenChange,
  onUnlock,
  currentlyClickedBadgeId,
}: UnlockIntentSignalModalProps) {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set(["current"]),
  );

  const handleCheckboxChange = (optionId: string) => {
    const newSelected = new Set(selectedOptions);
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      newSelected.add(optionId);
    }
    setSelectedOptions(newSelected);
  };

  const handleUnlock = () => {
    if (selectedOptions.size > 0) {
      onUnlock(Array.from(selectedOptions));
      onOpenChange(false);
      setSelectedOptions(new Set(["current"]));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 border-0 rounded-xl overflow-hidden">
        <div className="bg-white">
          {/* Header Section */}
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 sm:p-10 text-white overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-valasys-orange rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-valasys-orange to-orange-500 rounded-full mb-4">
                    <Zap className="w-3.5 h-3.5 text-white" />
                    <span className="text-xs font-semibold tracking-wide">Premium Feature</span>
                  </div>

                  {/* Main heading */}
                  <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
                    Unlock Intent<br />Signals
                  </h2>

                  {/* Description */}
                  <p className="text-gray-300 text-base leading-relaxed max-w-md">
                    Access real-time buying intent data powered by Bombora and uncover deeper insights into company behaviors
                  </p>
                </div>

                {/* Icon decoration */}
                <div className="hidden sm:block flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-valasys-orange/20 to-blue-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <Zap className="w-12 h-12 text-valasys-orange opacity-80" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8">
            {/* Options */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                Choose what to unlock
              </h3>
              <div className="space-y-2">
                {unlockOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-valasys-orange hover:bg-orange-50/30 cursor-pointer transition-all group"
                  >
                    <Checkbox
                      checked={selectedOptions.has(option.id)}
                      onCheckedChange={() => handleCheckboxChange(option.id)}
                      className="flex-shrink-0 mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">
                        {option.label}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Cost Alert */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-8">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Each unlock deducts 5 credits</span>
                <br />
                You have <span className="font-semibold">48,256 credits</span> remaining
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  onOpenChange(false);
                  setSelectedOptions(new Set(["current"]));
                }}
                variant="outline"
                className="flex-1 h-10 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUnlock}
                disabled={selectedOptions.size === 0}
                className="flex-1 h-10 bg-gradient-to-r from-valasys-orange to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="w-4 h-4 mr-2" />
                Unlock Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
