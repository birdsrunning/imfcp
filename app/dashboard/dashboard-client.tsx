// dashboard client side
"use client";
import React from "react";
import { useEffect, useState } from "react";
import type { TProfile } from "@/types/types";
import { Sidebar } from "@/components/layouts/SideBar";
import { ImageGrid } from "@/components/image-grid";
import { mockImages } from "@/data/images";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedOrientation, setSelectedOrientation] = useState("all");
  const [profile, setProfile] = useState<TProfile | null>(null);
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const mockProfile: TProfile = {
          id: "mock-user-id",
          username: "Creator",
          avatar_url: null,
          plan_type: "standard",
          image_limit: 1000,
          image_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setProfile(mockProfile);
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    loadProfile();
  }, []);
  return (
    <div className="min-h-screen bg-brand-black">
      <Sidebar
        username={profile?.username || "User"}
        imageCount={profile?.image_count || 0}
        imageLimit={profile?.image_limit || 1000}
        planType={profile?.plan_type || "standard"}
        selectedCategory={selectedCategory}
        selectedOrientation={selectedOrientation}
      />
      <div>
        <div className="ml-72 pt-[80px] flex justify-between items-center">
          <SearchBar />
          <Button
          className="text-brand-white border border-brand-orange/30">
            Recent
            <ChevronDown className="text-brand-white"/>
          </Button>
        </div>
        <ImageGrid images={mockImages} />
      </div>
    </div>
  );
}
