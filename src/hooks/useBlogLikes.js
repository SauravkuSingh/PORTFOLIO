"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const STORAGE_KEY = (slug) => `blog-liked:${slug}`;

export const useBlogLikes = (slug) => {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [pending, setPending] = useState(false);

  // Restore "did I like this?" from localStorage
  useEffect(() => {
    if (typeof window === "undefined" || !slug) return;
    setLiked(window.localStorage.getItem(STORAGE_KEY(slug)) === "1");
  }, [slug]);

  // Fetch initial count + subscribe to realtime updates for this slug
  useEffect(() => {
    if (!supabase || !slug) return;

    let active = true;

    (async () => {
      const { data } = await supabase
        .from("blog_likes")
        .select("count")
        .eq("slug", slug)
        .maybeSingle();
      if (active && data) setCount(data.count);
    })();

    const channel = supabase
      .channel(`blog_likes:${slug}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blog_likes",
          filter: `slug=eq.${slug}`,
        },
        (payload) => {
          const next = payload.new?.count;
          if (typeof next === "number") setCount(next);
        },
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [slug]);

  const toggle = async () => {
    if (pending || !supabase || !slug) return;
    setPending(true);

    const wasLiked = liked;
    const optimisticCount = wasLiked ? Math.max(count - 1, 0) : count + 1;
    setLiked(!wasLiked);
    setCount(optimisticCount);

    const fn = wasLiked ? "decrement_blog_likes" : "increment_blog_likes";
    const { data, error } = await supabase.rpc(fn, { p_slug: slug });

    if (error) {
      // Revert on failure
      setLiked(wasLiked);
      setCount(count);
    } else {
      if (typeof data === "number") setCount(data);
      window.localStorage.setItem(STORAGE_KEY(slug), wasLiked ? "0" : "1");
    }

    setPending(false);
  };

  return { count, liked, toggle, pending, enabled: !!supabase };
};
