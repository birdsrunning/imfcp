"use client";

import {
  Gem,
  Image as ImageIcon,
  Box,
  Palette,
  Trees,
  Shapes,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SidebarProps {
  username: string;
  imageCount: number;
  imageLimit: number;
  planType: string;
  selectedCategory: string;

  selectedOrientation: string;
}

export function Sidebar({
  username,
  imageCount,
  imageLimit,
  planType,
  selectedCategory,
  selectedOrientation,
}: SidebarProps) {
  const usagePercentage = (imageCount / imageLimit) * 100;

  return (
    <aside className="fixed left-0 top-[73px] bottom-0 w-72 overflow-y-auto text-brand-white">
      <div className="p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Welcome,
            <br />
            {username}
          </h1>
          <p className="text-sm">Your library is updated.</p>
        </div>

        {/* <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Plan Usage
            </span>
            <span className="text-xs text-green-500 font-medium capitalize">
              {planType}
            </span>
          </div>

          <div>
            <div className="text-3xl font-bold mb-2">
              {imageCount}
              <span className="text-gray-500 text-xl font-normal">
                {' '}
                / {imageLimit} images
              </span>
            </div>
            <div className="h-2 w-full bg-[#1a2820] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full bg-white hover:bg-gray-100 text-black font-medium border-none"
          >
            <Gem className="w-4 h-4 mr-2" />
            Upgrade to Premium
          </Button>
        </div> */}

        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Categories</h3>
          <RadioGroup value={selectedCategory}>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="all"
                  id="all"
                  className="border-gray-600 text-green-500"
                />
                <Label
                  htmlFor="all"
                  className="text-sm text-gray-300 cursor-pointer flex items-center gap-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  All Images
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="3d-renders"
                  id="3d-renders"
                  className="border-gray-600 text-green-500"
                />
                <Label
                  htmlFor="3d-renders"
                  className="text-sm text-gray-300 cursor-pointer flex items-center gap-2"
                >
                  <Box className="w-4 h-4" />
                  3D Renders
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="abstract"
                  id="abstract"
                  className="border-gray-600 text-green-500"
                />
                <Label
                  htmlFor="abstract"
                  className="text-sm text-gray-300 cursor-pointer flex items-center gap-2"
                >
                  <Palette className="w-4 h-4" />
                  Abstract
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="nature"
                  id="nature"
                  className="border-gray-600 text-green-500"
                />
                <Label
                  htmlFor="nature"
                  className="text-sm text-gray-300 cursor-pointer flex items-center gap-2"
                >
                  <Trees className="w-4 h-4" />
                  Nature
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="vectors"
                  id="vectors"
                  className="border-gray-600 text-green-500"
                />
                <Label
                  htmlFor="vectors"
                  className="text-sm text-gray-300 cursor-pointer flex items-center gap-2"
                >
                  <Shapes className="w-4 h-4" />
                  Vectors
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Orientation</h3>
          <div className="flex gap-3">
            <button
              className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                selectedOrientation === "portrait"
                  ? "border-green-500 bg-green-500/10"
                  : "border-gray-700 hover:border-gray-600"
              }`}
              aria-label="Portrait orientation"
            >
              <div
                className={`w-5 h-7 rounded ${
                  selectedOrientation === "portrait"
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`}
              ></div>
            </button>

            <button
              className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                selectedOrientation === "landscape"
                  ? "border-green-500 bg-green-500/10"
                  : "border-gray-700 hover:border-gray-600"
              }`}
              aria-label="Landscape orientation"
            >
              <div
                className={`w-7 h-5 rounded ${
                  selectedOrientation === "landscape"
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`}
              ></div>
            </button>

            <button
              className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                selectedOrientation === "square"
                  ? "border-green-500 bg-green-500/10"
                  : "border-gray-700 hover:border-gray-600"
              }`}
              aria-label="Square orientation"
            >
              <div
                className={`w-6 h-6 rounded ${
                  selectedOrientation === "square"
                    ? "bg-brand-orange"
                    : "bg-brand-orange/70"
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
