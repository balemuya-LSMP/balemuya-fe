/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useParams } from "next/navigation";
import { useGetPostByIdQuery } from "@/store/api/blog.api";

export default function BlogDatailsPage() {
  const {id} = useParams();
  const { data: post, isLoading, isError } = useGetPostByIdQuery(id as string);
  
  console.log(`The blog details whith ${id} is`, post);
    return (
        <div>
            <h1>Blog Details Page</h1>
        </div>
    )
}