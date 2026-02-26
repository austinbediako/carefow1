"use client";

import React, { useState, useEffect } from "react";
import { AdmissionRequest, Bed, Ward } from "@/types";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { motion, AnimatePresence } from "framer-motion";

interface AllocationModalProps {
  request: AdmissionRequest;
  onClose: () => void;
}

export function AllocationModal({ request, onClose }: AllocationModalProps) {
  const { getSuggestions, allocateBed } = useStore();
  const [suggestions, setSuggestions] = useState<{ bed: Bed; ward: Ward; score: number }[]>([]);
  const [selectedBedId, setSelectedBedId] = useState<string | null>(null);
  const [isAllocating, setIsAllocating] = useState(false);

  useEffect(() => {
    const suggs = getSuggestions(request.id);
    setTimeout(() => {
      setSuggestions(suggs);
      if (suggs.length > 0) {
        setSelectedBedId(suggs[0].bed.id);
      }
    }, 0);
  }, [request.id, getSuggestions]);

  const handleAllocate = () => {
    if (!selectedBedId) return;
    setIsAllocating(true);

    // Find wardId for selectedBedId
    const selection = suggestions.find(s => s.bed.id === selectedBedId);
    if (selection) {
      setTimeout(() => {
        allocateBed(request.id, selection.ward.id, selection.bed.id);
        onClose();
      }, 800); // Simulate network delay
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Allocate Bed</h2>
            <p className="text-sm text-slate-500 mt-1">
              For {request.patientName} ({request.priority})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <img src="https://img.icons8.com/ios-filled/50/94a3b8/delete-sign.png" alt="close" className="h-5 w-5 object-contain" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <img src="https://img.icons8.com/ios-filled/50/2563eb/error--v1.png" alt="alert" className="h-5 w-5 object-contain" />
            <div className="text-sm text-blue-800">
              <span className="font-semibold">Required:</span> {request.requiredWardType} Ward • {request.requiredBedType} Bed • {request.gender} Only
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">
              Smart Suggestions
            </h3>

            {suggestions.length === 0 ? (
              <div className="text-center p-8 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                No matching beds found. Please check availability.
              </div>
            ) : (
              <div className="space-y-3">
                {suggestions.map(({ bed, ward, score }) => (
                  <div
                    key={bed.id}
                    onClick={() => setSelectedBedId(bed.id)}
                    className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all ${selectedBedId === bed.id
                      ? "border-blue-600 bg-blue-50/50 shadow-md"
                      : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${selectedBedId === bed.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <img src={`https://img.icons8.com/ios-filled/50/${selectedBedId === bed.id ? 'ffffff' : '94a3b8'}/hospital-bed.png`} alt="bed" className="h-5 w-5 object-contain" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            {bed.name} <span className="text-slate-400 font-normal">• {ward.name}</span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5 flex gap-2">
                            <span className="capitalize">{bed.type.toLowerCase()}</span>
                            <span>•</span>
                            <span className="capitalize">{ward.gender.toLowerCase()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="green" className="bg-green-100 text-green-800 border border-green-200">
                          {score}% Match
                        </Badge>
                        {selectedBedId === bed.id && (
                          <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <img src="https://img.icons8.com/ios-filled/50/ffffff/checkmark--v1.png" alt="check" className="h-3 w-3 object-contain" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAllocate}
            disabled={!selectedBedId || isAllocating}
            isLoading={isAllocating}
            className="bg-slate-900 text-white hover:bg-slate-800"
          >
            {isAllocating ? "Allocating..." : "Confirm Allocation"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
