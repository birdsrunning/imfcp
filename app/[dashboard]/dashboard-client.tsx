// dashboard client side
"use client";
import React from "react";
import { useEffect, useState } from "react";
import type { TProfile } from "@/types/types";
import { ImageGrid } from "@/components/image-grid";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type ProfileType = {
  id: string | undefined;
  username: string | undefined;
};

type Data = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  categories: string[];
  thumbnailUrlKey: string;
  originalKey: string;
  isPremium: boolean;
  orientation: "landscape" | "portrait";
  createdAt: Date;
  updatedAt: Date;
};

type SessionType = {
  role: "user" | "admin" | undefined;
  paymentStatus: "free" | "paid" | undefined;
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
  };
} | null;

export default function Dashboard({
  data,
  session,
}: {
  data: Data[];
  session: SessionType;
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedOrientation, setSelectedOrientation] = useState("all");
  const [profile, setProfile] = useState<ProfileType | null>(null);
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const mockProfile: ProfileType = {
          id: session?.user.id,
          username: session?.user.name,
          // avatar_url: null,
          // plan_type: "standard",
          // image_limit: 1000,
          // image_count: 0,
          // created_at: new Date().toISOString(),
          // updated_at: new Date().toISOString(),
        };
        setProfile(mockProfile);
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    loadProfile();
  }, []);
  
  return (
    <div>
      <div className="flex justify-between items-center">
        <SearchBar />
        <Button className="text-brand-white border border-brand-orange/30">
          Recent
          <ChevronDown className="text-brand-white" />
        </Button>
      </div>
      
    </div>
  );
}
